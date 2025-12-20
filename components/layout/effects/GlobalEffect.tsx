"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";

export const GlobalEffect = () => {
    const { setIsMounted } = useStore();

    useEffect(() => {
        setIsMounted(true);
    }, [setIsMounted]);

    return null;
};
