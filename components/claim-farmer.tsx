import {
  MediaRenderer,
  Web3Button,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "../const/addresses";
import { Card } from "./ui/card";

export function ClaimFarmer() {
  const { contract } = useContract(FARMER_ADDRESS);
  const { data: metadata } = useContractMetadata(contract);

  return (
    <div className="container max-w-7xl my-8">
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Claim Player to start playing
        </h1>
        <Card className="overflow-hidden my-5">
          <MediaRenderer src={metadata?.image} height="100%" width="100%" />
        </Card>

        <Web3Button
          contractAddress={FARMER_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
        >
          Claim Player
        </Web3Button>
      </div>
    </div>
  );
}
