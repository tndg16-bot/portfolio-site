"use client";

import Link from "next/link";
import { Folder, Calendar, ArrowRight } from "lucide-react";
import { PostData } from "@/lib/posts";

interface RelatedPostsProps {
    posts: PostData[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="mt-20 pt-10 border-t border-zinc-800">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-teal-500 rounded-full"></span>
                あわせて読みたい
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="group flex flex-col h-full glass-card rounded-xl overflow-hidden hover:border-teal-500/30 transition-all duration-300"
                    >
                        <div className="p-5 flex flex-col flex-grow">
                            {/* Meta */}
                            <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} className="text-teal-400" />
                                    <time>{post.date}</time>
                                </div>
                                {post.category && (
                                    <div className="flex items-center gap-1">
                                        <Folder size={12} className="text-purple-400" />
                                        <span>{post.category}</span>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h4 className="text-lg font-bold text-zinc-100 mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
                                {post.title}
                            </h4>

                            {/* Arrow */}
                            <div className="mt-auto pt-4 flex justify-end">
                                <span className="flex items-center gap-1 text-sm text-zinc-500 group-hover:text-teal-400 transition-colors">
                                    Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
