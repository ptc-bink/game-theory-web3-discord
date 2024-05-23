import React from "react";
import Image from "next/image";

import FullRobot from "@/public/avatar/Robot-full.svg"
import DiscordBtn from "@/pages/components/Discordbtn";

const Page: React.FC = () => {
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
                <p className="text-[#FFFFFF] text-center text-2xl font-medium">Invite Gib To your Server</p>
            </div>
            <DiscordBtn btnName="Invite bot" />
        </div>
    );
}

export default Page;