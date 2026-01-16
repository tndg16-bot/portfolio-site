"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const LiquidCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // stiffness: 150, damping: 20 -> ヌルヌルとした「後を引く」質感のための設定
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* 液体のようなメインカーソル */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 border border-japan-indigo/40 bg-japan-indigo/10"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    backdropFilter: "blur(8px)",
                    borderRadius: "45% 55% 52% 48% / 51% 47% 53% 49%",
                }}
            >
                {/* 水滴のコア */}
                <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-japan-indigo opacity-80 shadow-[0_0_10px_rgba(27,54,93,0.5)]" />
            </motion.div>

            {/* マウスの軌跡（Trails）- 簡易版。Framer Motionで制御 */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-12 w-12 rounded-full border border-japan-indigo/20 bg-japan-indigo/5 shadow-xl"
                style={{
                    x: useSpring(cursorX, { stiffness: 50, damping: 30 }),
                    y: useSpring(cursorY, { stiffness: 50, damping: 30 }),
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};
