"use client";

import { useContract, useNFTs } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS } from "../../const/addresses";
import PageWrapper from "~/components/page-wrapper";
import { ReloadIcon } from "@radix-ui/react-icons";
import NFTComponent from "~/components/nft";
import { Skeleton } from "~/components/ui/skeleton";
export default function Shop() {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data: nfts } = useNFTs(contract);

  return (
    <PageWrapper>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-[40px]">
        Shop
      </h1>
      <p className="my-5">
        Purchase players with $GOAL and $CHZ to increase your earnings.
      </p>

      {!nfts ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 my-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 8, 10].map((item, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className="h-[125px] w-[250px]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 my-12">
          {nfts?.map((nftItem) => (
            <NFTComponent key={nftItem.metadata.id} nft={nftItem} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
