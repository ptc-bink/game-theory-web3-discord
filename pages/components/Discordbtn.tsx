import Image from "next/image";

import DiscordSVG from "@/public/avatar/discord.svg"
import { useSession, signIn, signOut } from "next-auth/react";

const DiscordBtn: React.FC<DiscordBtnProps> = ({ btnName }) => {

    const { data: session } = useSession();

    const handleClick = async () => {
        console.log("handle click");

    }

    return (
        <div onClick={() => handleClick} className="flex items-center hover:cursor-pointer bg-cblue-500 rounded-lg px-6 py-3 border border-cblue-500 border-opacity-[0.08]">
            <p className=" text-[#FFFFFF] text-base font-semibold pr-2">
                {btnName}
            </p>
            <Image
                src={DiscordSVG}
                width={20}
                height={14}
                alt="Discord"
            />
        </div>
    )
}

export default DiscordBtn;

interface DiscordBtnProps {
    btnName: string
}