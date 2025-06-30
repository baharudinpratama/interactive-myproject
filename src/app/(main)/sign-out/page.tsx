"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        signOut({ callbackUrl: "/sign-in" })
    }, []);
    return (<></>);
}