"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { SystemStatusLabel } from "@/data/enums";

export function SystemStatus() {
    const [time, setTime] = useState("");
    const [status, setStatus] = useState<SystemStatusLabel>(SystemStatusLabel.Available);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = now.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });
            setTime(istTime);

            // Dynamic status based on IST time
            const hour = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false });
            const h = parseInt(hour);
            if (h >= 0 && h < 7) setStatus(SystemStatusLabel.Sleeping);
            else if (h >= 9 && h < 18) setStatus(SystemStatusLabel.Coding);
            else setStatus(SystemStatusLabel.Available);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mt-6"
        >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/10 shadow-sm transition-all hover:border-green-500/30">
                <Clock size={14} className="text-green-500" />
                <span className="text-[11px] font-mono font-bold text-gray-600 dark:text-gray-400 tabular-nums">
                    {time} IST
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/10 shadow-sm transition-all hover:border-green-500/30">
                <Activity size={14} className="text-green-500" />
                <span className="text-[11px] font-mono font-bold text-gray-600 dark:text-gray-400">
                    {status}
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/10 shadow-sm transition-all hover:border-green-500/30">
                <MapPin size={14} className="text-green-500" />
                <span className="text-[11px] font-mono font-bold text-gray-600 dark:text-gray-400">
                    Bengaluru, IN
                </span>
            </div>
        </motion.div>
    );
}
