"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import Logo from "./components/Logo";

import DiscordSVG from "@/public/avatar/discord.svg"
import { baseURL_back } from "@/utils/_config";
import { getUser } from "@/hook";
import { useRouter } from "next/router";
import { IUserInfo } from "@/utils/_type";
import toast from "react-hot-toast";

export default function Page() {

  const router = useRouter();

  const initAction = async () => {

    toast.success("Welcome to Game Theory")

    const res: any = await getUser();

    console.log("res ====>", res);

    if (res.status == 200) {
      router.push("/dashboard");
    }

  };

  useEffect(() => {
    initAction();
  }, []);

  const handleLogin = async () => {

    window.location.href = `${baseURL_back}/auth/discord`

  }

  return (
    <div className="flex absolute z-[60] top-0 left-0 w-screen h-screen bg-cdark-50 backdrop-blur-sm justify-center items-center">
      <div className="h-screen flex justify-center items-center">
        <div className="grid gap-8 bg-center sm:bg-cdark-200 bg-cdark-50 h-[348px] w-[393px] rounded-2xl border p-[50px] border-transparent sm:border-cdark-200">
          <div className="grid gap-4 w-full">
            <div className="flex justify-center">
              <Logo />
            </div>
            <div className="grid gap-2 w-full text-center">
              <p className="!text-cwhite text-2xl leading-8 font-medium">
                Welcome to
              </p>
              <p className="text-cwhite text-2xl leading-8 font-medium">
                MarketPlace Admin Panel
              </p>
              <p className="text-cgrey-900 text-base leading-6 font-normal">
                Login to your discord
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button aria-label="discord" onClick={handleLogin} className="flex items-center hover:cursor-pointer hover:bg-[#5815F2] bg-cblue-500 rounded-lg px-6 py-3 border border-cblue-500 border-opacity-[0.08]">
              <p className=" text-cwhite text-base font-semibold pr-2">
                Login with Discord
              </p>
              <Image
                src={DiscordSVG}
                width={20}
                height={14}
                alt="Discord"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}