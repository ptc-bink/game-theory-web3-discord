"use client"

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default Providers;
