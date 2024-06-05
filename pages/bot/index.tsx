import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import DiscordBtn from "@/pages/components/Discordbtn";

import FullRobot from "@/public/avatar/Robot-full.svg"

const Page: React.FC = () => {

    const handleInviteBot = () => {
        toast.success("Coming Soon");
    }

    return (
        <div className="flex flex-col h-full gap-8 p-8 bg-cdark-100 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex rounded-lg bg-cdark-200 border border-cdark-100 p-3">
                    <Image
                        src={FullRobot}
                        width="32"
                        height="32"
                        alt="full robot"
                    />
                </div>
                <p className="text-cwhite text-center text-2xl font-medium">Invite Gib To your Server</p>
            </div>
            <div onClick={handleInviteBot}>
                <DiscordBtn btnName="Invite bot" />
            </div>
        </div>
    );
}

export default Page;