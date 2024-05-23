import Image from "next/image";

import LogoSVG from "@/public/robot.svg"

const Logo = () => {
    return (
        <div className="flex justify-center items-center rounded-lg border bg-cblue-500 bg-opacity-[0.08] border-cblue-500 p-3 w-14 h-14">
            <Image
                src={LogoSVG}
                width={32}
                height={32}
                alt="Logo"
            />
        </div>
    )
}

export default Logo;