"use client";

import { motion } from "framer-motion";
import { Clock, Users, Video, MapPin, Sparkles, Star, ArrowRight, CheckCircle2 } from "lucide-react";

export type ServiceType = "individual" | "group" | "online" | "in-person" | "mixed";

export interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  duration: string;
  price: number;
  currency?: string;
  targetAudience: string[];
  expectedOutcomes: string[];
  featured?: boolean;
  popular?: boolean;
  ctaText?: string;
  ctaHref?: string;
  onClick?: () => void;
  className?: string;
}

const ServiceTypeIcons = {
  individual: Users,
  group: Users,
  online: Video,
  "in-person": MapPin,
  mixed: Users,
};

const ServiceTypeLabels = {
  individual: "個別",
  group: "グループ",
  online: "オンライン",
  "in-person": "対面",
  mixed: "オンライン/対面",
};

export default function ServiceCard({
  name,
  description,
  type,
  duration,
  price,
  currency = "JPY",
  targetAudience,
  expectedOutcomes,
  featured = false,
  popular = false,
  ctaText = "詳細を見る",
  ctaHref = "#",
  onClick,
  className = "",
}: ServiceCardProps) {
  const TypeIcon = ServiceTypeIcons[type];
  const typeLabel = ServiceTypeLabels[type];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden group cursor-pointer ${className}`}
      role="article"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" && onClick) onClick();
      }}
    >
      {/* Badges */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {featured && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
            <Sparkles size={12} />
            注目
          </span>
        )}
        {popular && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-bold shadow-lg">
            <Star size={12} className="fill-white" />
            人気
          </span>
        )}
      </div>

      {/* Service Type Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
          <TypeIcon size={20} className="text-teal-400" />
        </div>
        <span className="text-sm font-medium text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full">
          {typeLabel}
        </span>
      </motion.div>

      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
          {name}
        </h3>
        <p className="text-zinc-300 leading-relaxed mb-6">{description}</p>
      </motion.div>

      {/* Service Details Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock size={16} className="text-teal-400" />
          <span className="text-sm">{duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-teal-400 font-bold text-lg">{formatPrice(price)}</div>
        </div>
      </motion.div>

      {/* Target Audience */}
      {targetAudience.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">対象者</h4>
          <p className="text-sm text-zinc-300 leading-relaxed">{targetAudience.slice(0, 2).join("、")}</p>
          {targetAudience.length > 2 && (
            <p className="text-xs text-zinc-500 mt-1">+{targetAudience.length - 2}</p>
          )}
        </motion.div>
      )}

      {/* Expected Outcomes */}
      {expectedOutcomes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">期待できる効果</h4>
          <ul className="space-y-2">
            {expectedOutcomes.slice(0, 3).map((outcome, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle2 size={14} className="text-teal-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
            {expectedOutcomes.length > 3 && (
              <li className="text-xs text-zinc-500 pl-6">+{expectedOutcomes.length - 3}</li>
            )}
          </ul>
        </motion.div>
      )}

      {/* CTA Button */}
      <motion.a
        href={ctaHref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:shadow-xl hover:shadow-teal-500/20 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        {ctaText}
        <ArrowRight size={18} />
      </motion.a>
    </motion.article>
  );
}
