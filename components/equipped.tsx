import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "~/const/addresses";
import { ethers } from "ethers";

import { Card } from "~/components/ui/card";

interface EquippedProps {
  tokenId: number;
}

export const Equipped = (props: EquippedProps) => {
  const address = useAddress();

  const { contract: toolContract } = useContract(TOOLS_ADDRESS);
  const { data: nft } = useNFT(toolContract, props.tokenId);

  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  const { data: claimableRewards } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [props.tokenId, address]
  );

  return (
    <div>
      {nft && (
        <Card className="p-5">
          <div className="flex">
            <div>
              <MediaRenderer
                src={nft.metadata.image}
                height="80%"
                width="80%"
              />
            </div>
            <div className="flex flex-col space-y-1 space-x-1">
              <p className="text-2xl font-bold">{nft.metadata.name}</p>
              <p>
                Staked: {ethers.utils.formatUnits(claimableRewards[0], 0)}
              </p>
              <Web3Button
                contractAddress={STAKING_ADDRESS}
                action={(contract) =>
                  contract.call("withdraw", [props.tokenId, 1])
                }
              >
                Unstake
              </Web3Button>
            </div>
          </div>
          <div className="mt-5">
            <p>Claimable $GOALS:</p>
            <p>{ethers.utils.formatUnits(claimableRewards[1], 18)}</p>
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={(contract) =>
                contract.call("claimRewards", [props.tokenId])
              }
            >
              Claim $GOAL
            </Web3Button>
          </div>
        </Card>
      )}
    </div>
  );
};
