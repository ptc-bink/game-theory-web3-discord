import React from "react";
import Image from "next/image";

import Driver from "@/public/avatar/driver.svg"

const Projects: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-8 p-12 bg-cdark-100 justify-center items-center text-cwhite">
            <div className="flex justify-center items-center min-h-[calc(100vh-280px)]">
                <div className="flex flex-col w-fit gap-4 px-3 py-4 justify-center items-center">
                    <Image
                        src={Driver}
                        width="32"
                        height="32"
                        alt="no server to show"
                    />
                    <div className="flex flex-col w-full text-center justify-center gap-2">
                        <p className="text-2xl font-medium text-cwhite">Coming Soon</p>
                        <p className="text-base leading-[18px] font-normal text-cgrey-900">Your trusted projects will show here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;