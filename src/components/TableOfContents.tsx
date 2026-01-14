"use client";

import { useEffect, useState } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TocHeading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-80px 0px -80% 0px",
                threshold: 0,
            }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [headings]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className="glass-panel rounded-xl p-4 mb-8" aria-label="目次">
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center justify-between w-full text-left"
                aria-expanded={!isCollapsed}
            >
                <div className="flex items-center gap-2 text-teal-400 font-semibold">
                    <List size={18} />
                    <span>目次</span>
                </div>
                <span className="text-zinc-400 md:hidden">
                    {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                </span>
            </button>

            <AnimatePresence>
                {!isCollapsed && (
                    <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-2 overflow-hidden"
                    >
                        {headings.map((heading) => (
                            <li
                                key={heading.id}
                                style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                            >
                                <button
                                    onClick={() => handleClick(heading.id)}
                                    className={`
                    text-left text-sm transition-all duration-200 hover:text-teal-400
                    ${activeId === heading.id
                                            ? "text-teal-400 font-medium"
                                            : "text-zinc-400"
                                        }
                  `}
                                >
                                    {heading.text}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
}
