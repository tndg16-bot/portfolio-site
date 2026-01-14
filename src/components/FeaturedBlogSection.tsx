"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Folder } from "lucide-react";
import { PostData } from "@/lib/posts";

export default function FeaturedBlogSection() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts/featured');
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="section-blog" className="w-full max-w-7xl px-4 py-24">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="flex flex-col items-center"
            >
                <motion.div variants={itemVariants} className="mb-4 flex justify-center">
                    <div className="flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1 text-sm font-medium text-teal-400 border border-teal-500/20">
                        <BookOpen size={16} />
                        <span>Blog</span>
                    </div>
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-4xl font-bold md:text-5xl text-white mb-4 text-center">
                    思考の記録
                </motion.h2>

                <motion.p variants={itemVariants} className="text-zinc-400 text-lg max-w-2xl mx-auto text-center mb-16">
                    日々の気づきや、技術・キャリアに関する考察
                </motion.p>

                <div className="grid gap-6 md:grid-cols-3 w-full mb-12">
                    {isLoading ? (
                        // Skeleton loading
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-64 rounded-xl bg-white/5 animate-pulse" />
                        ))
                    ) : (
                        posts.map((post) => (
                            <motion.div
                                key={post.id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-teal-500/30 transition-all bg-black/20"
                                >
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 text-xs text-zinc-400 mb-4">
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

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        {post.description && (
                                            <p className="text-zinc-400 text-sm line-clamp-3 mb-4 flex-grow">
                                                {post.description}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-4 flex items-center text-teal-400 text-sm font-medium">
                                            続きを読む <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>

                <motion.div variants={itemVariants}>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-800 text-zinc-300 hover:bg-teal-500/20 hover:text-teal-400 transition-all border border-transparent hover:border-teal-500/30"
                    >
                        記事一覧へ
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
