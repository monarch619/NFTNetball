/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { BorderBeam } from "./border-beam";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center mt-[1rem] p-3">
      <h1 className="scroll-m-20 text-4xl mt-5 sm:text-4xl md:text-6xl font-semibold tracking-tight lg:text-6xl text-center max-w-[700px]">
        Welcome to NFTNetball
      </h1>
      <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
      Where Sports Meet Innovation

      </p>

      <div className="relative flex max-w-6xl justify-center gap-2 overflow-hidden">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 3 }}
          className="relative flex max-w-xs justify-center overflow-hidden"
        >
          <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
            <div className="relative rounded-xl p-1">
              <img
                src="/images/image-1.jpg"
                alt="Hero Image"
                className="block dark:hidden w-[1200px] rounded-[inherit] border object-contain shadow-lg"
              />
              <img
                src="/images/image-1.jpg"
                alt="Hero Image"
                className="hidden dark:block w-[1200px] rounded-[inherit] border object-contain shadow-lg"
              />
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          </div>
        </motion.div>

        {/*  */}

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 3 }}
          className="relative flex max-w-xs justify-center overflow-hidden"
        >
          <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
            <div className="relative rounded-xl p-1">
              <img
                src="/images/image-2.jpg"
                alt="Hero Image"
                className="block dark:hidden w-[1200px] rounded-[inherit] border object-contain shadow-lg"
              />
              <img
                src="/images/image-2.jpg"
                alt="Hero Image"
                className="hidden dark:block w-[1200px] rounded-[inherit] border object-contain shadow-lg"
              />
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          </div>
        </motion.div>

        {/*  */}

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 3 }}
          className="relative flex max-w-xs justify-center overflow-hidden"
        >
          <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
            <div className="relative rounded-xl p-1">
              <img
                src="/images/image-3.jpg"
                alt="Hero Image"
                className="block dark:hidden w-[1200px] rounded-[inherit] border object-contain shadow-lg"
              />
              <img
                src="/images/image-3.jpg"
                alt="Hero Image"
                className="hidden dark:block w-[1200px] rounded-[inherit] border object-contain shadow-lg"
              />
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex gap-3 mt-5 items-center justify-center">
        <ConnectWallet btnTitle="Play" style={{ backgroundColor: "lightpink"}} />

        <Link href="/" target="_blank">
          <Button variant="ghost" className="">
            Explore
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
