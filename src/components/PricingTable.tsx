"use client";

import { motion } from "framer-motion";
import { Check, X, Star, ArrowRight } from "lucide-react";

export interface PricingFeature {
  name: string;
  included: boolean;
  tierIds?: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  period?: string;
  features: PricingFeature[];
  popular?: boolean;
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface PricingTableProps {
  tiers: PricingTier[];
  currency?: string;
  showPopular?: boolean;
  className?: string;
}

export default function PricingTable({
  tiers,
  currency = "JPY",
  showPopular = true,
  className = "",
}: PricingTableProps) {
  const formatPrice = (amount: number, curr = currency) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: curr,
    }).format(amount);
  };

  // Determine if tier has a particular feature
  const hasFeature = (tier: PricingTier, featureName: string) => {
    const feature = tier.features.find((f) => f.name === featureName);
    if (!feature) return false;
    // If tierIds is specified, check if current tier is included
    if (feature.tierIds && feature.tierIds.length > 0) {
      return feature.tierIds.includes(tier.id);
    }
    return feature.included;
  };

  // Get all unique feature names
  const allFeatures = Array.from(
    new Set(tiers.flatMap((tier) => tier.features.map((f) => f.name)))
  );

  return (
    <section className={`w-full ${className}`}>
      {/* Desktop: Table Layout */}
      <div className="hidden lg:block max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-6 text-zinc-500 font-medium min-w-[200px]">
                  機能
                </th>
                {tiers.map((tier, i) => (
                  <motion.th
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 text-center min-w-[200px] relative ${
                      tier.popular ? "bg-teal-500/5" : ""
                    }`}
                  >
                    {showPopular && tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold shadow-lg">
                          <Star size={10} className="fill-white" />
                          人気
                        </span>
                      </div>
                    )}
                    <div className="text-xl font-bold text-white mb-2">
                      {tier.name}
                    </div>
                    {tier.description && (
                      <p className="text-sm text-zinc-400 mb-4">{tier.description}</p>
                    )}
                    <div className="text-3xl font-bold text-teal-400 mb-1">
                      {formatPrice(tier.price, tier.currency)}
                    </div>
                    {tier.period && (
                      <p className="text-sm text-zinc-500">{tier.period}</p>
                    )}
                    {tier.badge && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-teal-500/10 text-teal-400">
                        {tier.badge}
                      </span>
                    )}
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((featureName, i) => (
                <motion.tr
                  key={featureName}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.02 }}
                  className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-6 text-zinc-300">{featureName}</td>
                  {tiers.map((tier) => (
                    <td
                      key={`${tier.id}-${featureName}`}
                      className={`p-6 text-center ${
                        tier.popular ? "bg-teal-500/5" : ""
                      }`}
                    >
                      {hasFeature(tier, featureName) ? (
                        <Check className="w-5 h-5 text-teal-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-zinc-600 mx-auto" />
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-6"></td>
                {tiers.map((tier, i) => (
                  <motion.td
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`p-6 text-center ${
                      tier.popular ? "bg-teal-500/5" : ""
                    }`}
                  >
                    <motion.a
                      href={tier.ctaHref || "#"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        tier.popular
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-teal-500/20"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      {tier.ctaText || "選択する"}
                      <ArrowRight size={16} />
                    </motion.a>
                  </motion.td>
                ))}
              </tr>
            </tfoot>
          </table>
        </motion.div>
      </div>

      {/* Mobile/Tablet: Card Layout */}
      <div className="lg:hidden space-y-6 max-w-md mx-auto sm:max-w-2xl">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel rounded-2xl overflow-hidden ${
              tier.popular ? "border-teal-500/30" : "border-white/5"
            }`}
          >
            {/* Header */}
            <div className={`p-6 ${tier.popular ? "bg-teal-500/5" : ""}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  {showPopular && tier.popular && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold mb-2">
                      <Star size={10} className="fill-white" />
                      人気
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                </div>
              </div>
              {tier.description && (
                <p className="text-sm text-zinc-400 mb-4">{tier.description}</p>
              )}
              <div className="text-3xl font-bold text-teal-400 mb-1">
                {formatPrice(tier.price, tier.currency)}
              </div>
              {tier.period && (
                <p className="text-sm text-zinc-500">{tier.period}</p>
              )}
              {tier.badge && (
                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-teal-500/10 text-teal-400">
                  {tier.badge}
                </span>
              )}
            </div>

            {/* Features */}
            <div className="p-6 pt-0">
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm"
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={feature.included ? "text-zinc-300" : "text-zinc-600 line-through"}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={tier.ctaHref || "#"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-teal-500/20"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {tier.ctaText || "選択する"}
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
