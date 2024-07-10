import {
  MediaRenderer,
  Web3Button,
  useActiveClaimCondition,
  useContract,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { TOOLS_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { Card, CardContent } from "~/components/ui/card";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data, isLoading } = useActiveClaimCondition(
    contract,
    nft.metadata.id // Token ID required for ERC1155 contracts here.
  );

  return (
    <Card className="overflow-hidden" key={nft.metadata.id}>
      <div>
        <MediaRenderer src={nft.metadata.image} height="100%" width="100%" />
      </div>
      <CardContent>
        <p className="text-lg font-bold my-5 text-center truncate">
          {nft.metadata.name}
        </p>
        {!isLoading && data ? (
          <p className="text-center my-5">
            Cost: {ethers.utils.formatEther(data?.price)}
            {" " + data?.currencyMetadata.symbol}
          </p>
        ) : (
          <p>Loading...</p>
        )}
        <div className="flex flex-row items-center justify-center">
          <Web3Button
            contractAddress={TOOLS_ADDRESS}
            action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
          >
            Buy
          </Web3Button>
        </div>
      </CardContent>
    </Card>
  );
}
