"use client";

import { useContract, useNFTs } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS } from "../../const/addresses";
import Link from "next/link";

import PageWrapper from "~/components/page-wrapper";
import { Button } from "~/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import NFTComponent from "~/components/nft";
export default function Shop() {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data: nfts } = useNFTs(contract);

  return (
    <PageWrapper>
      <div className="flex flex-row items-center justify-between">
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-[40px]">
        Shop
      </h1>
      <p className="my-5">Purchase players with $GOAL and $CHZ to increase your earnings.</p>

      {!nfts ? (
        <div className="h-[50vh] justify-center items-center">
          <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-10 my-12">
          {nfts?.map((nftItem) => (
            <NFTComponent key={nftItem.metadata.id} nft={nftItem} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
