import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

type Props = {
  nft: NFT[] | undefined;
};

export function Inventory({ nft }: Props) {
  const address = useAddress();
  const { contract: toolContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  async function stakeNFT(id: string) {
    if (!address) {
      return;
    }

    const isApproved = await toolContract?.erc1155.isApproved(
      address,
      STAKING_ADDRESS
    );

    if (!isApproved) {
      await toolContract?.erc1155.setApprovalForAll(STAKING_ADDRESS, true);
    }
    await stakingContract?.call("stake", [id, 1]);
  }

  if (nft?.length === 0) {
    return (
      <div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">No tools.</p>
        <Link href="/shop">
          <Button>Shop Tool</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {nft?.map((nft) => (
        <Card className="p-5" key={nft.metadata.id}>
          <div className="items-center">
            <MediaRenderer
              src={nft.metadata.image}
              height="100px"
              width="100px"
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">{nft.metadata.name}</p>
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={() => stakeNFT(nft.metadata.id)}
            >
              Equip
            </Web3Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
