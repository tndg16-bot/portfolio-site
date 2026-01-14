"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { CheckCircle2, HelpCircle, ChevronDown, Search } from "lucide-react";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  faqs: FAQItem[];
  categories?: string[];
  searchable?: boolean;
  allowMultipleOpen?: boolean;
  defaultOpenId?: string;
  className?: string;
}

const defaultCategories = [
  "すべて",
  "料金",
  "セッション",
  "準備",
  "効果",
  "プライバシー",
];

export default function FAQSection({
  faqs,
  categories = defaultCategories,
  searchable = true,
  allowMultipleOpen = false,
  defaultOpenId,
  className = "",
}: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);
  const [openIds, setOpenIds] = useState<Set<string>>(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  );

  // Filter FAQs based on category and search query
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === "すべて" || faq.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  // Get unique categories from FAQs
  const availableCategories = useMemo(() => {
    const faqCategories = new Set(faqs.map((faq) => faq.category).filter(Boolean) as string[]);
    if (faqCategories.size === 0) return categories;
    return ["すべて", ...Array.from(faqCategories).sort()];
  }, [faqs, categories]);

  const toggleOpen = (id: string) => {
    if (allowMultipleOpen) {
      const newOpenIds = new Set(openIds);
      if (newOpenIds.has(id)) {
        newOpenIds.delete(id);
      } else {
        newOpenIds.add(id);
      }
      setOpenIds(newOpenIds);
    } else {
      setOpenId(openId === id ? null : id);
    }
  };

  const isOpen = (id: string) => {
    return allowMultipleOpen ? openIds.has(id) : openId === id;
  };

  return (
    <section className={`w-full ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6"
        >
          <HelpCircle size={16} />
          <span>FAQ</span>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          よくある質問
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          セッションに関する疑問にお答えします
        </p>
      </motion.div>

      {/* Search Bar */}
      {searchable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="質問を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      {availableCategories.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setOpenId(null);
                setOpenIds(new Set());
              }}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-teal-500 border-teal-400 text-white shadow-lg shadow-teal-500/20"
                  : "bg-white/5 border-white/20 text-zinc-300 hover:border-teal-500/50 hover:text-white"
              }`}
              aria-label={`${category}カテゴリの質問を表示`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </motion.div>
      )}

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-4">
        <AnimatePresence mode="wait">
          {filteredFAQs.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <HelpCircle size={48} className="text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400">
                {searchQuery ? "該当する質問が見つかりませんでした" : "まだ質問がありません"}
              </p>
            </motion.div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full p-6 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
                      isOpen(faq.id)
                        ? "bg-teal-500/20 text-teal-400"
                        : "bg-teal-500/10 text-teal-400/70"
                    }`}
                  >
                    {isOpen(faq.id) ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <HelpCircle className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {faq.category && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-teal-500/10 text-teal-400 font-medium">
                          {faq.category}
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-white pr-8">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-zinc-400 transition-transform duration-300 shrink-0 ${
                      isOpen(faq.id) ? "rotate-180 text-teal-400" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {isOpen(faq.id) && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-zinc-300 leading-relaxed pl-16">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      {searchQuery && filteredFAQs.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-zinc-500 mt-8"
        >
          {filteredFAQs.length}件の質問が見つかりました
        </motion.p>
      )}
    </section>
  );
}
