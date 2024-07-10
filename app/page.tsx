"use client";

import {
  MediaRenderer,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  FARMER_ADDRESS,
  REWARDS_ADDRESS,
  STAKING_ADDRESS,
  TOOLS_ADDRESS,
} from "~/const/addresses";
import { ClaimFarmer } from "~/components/claim-farmer";
import { Card } from "~/components/ui/card";
import { Inventory } from "~/components/inventory";
import { Equipped } from "~/components/equipped";
import { Skeleton } from "~/components/ui/skeleton";

import HeroSection from "~/components/hero-section";
import PageWrapper from "~/components/page-wrapper";
export default function Home() {
  const address = useAddress();

  const { contract: farmerContract } = useContract(FARMER_ADDRESS);
  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);

  const { data: ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(
    farmerContract,
    address
  );
  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(
    toolsContract,
    address
  );

  const { data: equippedTools } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [
    address,
  ]);

  if (!address) {
    return (
      <PageWrapper>
        <HeroSection />
      </PageWrapper>
    );
  }

  if (loadingOwnedFarmers) {
    return (
      <PageWrapper>
        <div className="flex h-[100vh] justify-center items-center">
          <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
        </div>
      </PageWrapper>
    );
  }

  if (ownedFarmers?.length === 0) {
    return (
      <PageWrapper>
        <ClaimFarmer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="grid grid-cols-2 gap-10">
        <Card className="p-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Farmer:
          </h1>
          <div className="grid grid-cols-2 gap-10">
            <div>
              {ownedFarmers?.map((nft) => (
                <div key={nft.metadata.id}>
                  <MediaRenderer
                    src={nft.metadata.image}
                    height="100%"
                    width="100%"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold">$GOAL Balance:</p>
              {rewardBalance && (
                <p>{ethers.utils.formatUnits(rewardBalance, 18)}</p>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Inventory:
          </h1>
          {!loadingOwnedTools ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : (
            <Inventory nft={ownedTools} />
          )}
        </Card>
      </div>
      <Card className="p-5 my-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-[30px]">
          Equipped Tools:
        </h1>
        <div className="grid grid-cols-3 gap-10">
          {equippedTools &&
            equippedTools[0].map((nft: BigNumber) => (
              <Equipped key={nft.toNumber()} tokenId={nft.toNumber()} />
            ))}
        </div>
      </Card>
    </PageWrapper>
  );
}
