"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Video, ShieldCheck, Sparkles, ArrowRight, Calendar, Star, Users, Award, Target, Lightbulb } from "lucide-react";

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency?: string;
  period?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export interface SessionTimeline {
  time: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  avatar?: string;
  rating: number;
  text: string;
  serviceType?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ServiceDetailProps {
  id: string;
  name: string;
  briefDescription: string;
  fullDescription: string;
  duration: string;
  format: string;
  pricingTiers: PricingTier[];
  targetAudience: string[];
  sessionOutline: SessionTimeline[];
  expectedOutcomes: {
    metric?: string;
    label: string;
    description: string;
  }[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  className?: string;
}

export default function ServiceDetail({
  name,
  briefDescription,
  fullDescription,
  duration,
  format,
  pricingTiers,
  targetAudience,
  sessionOutline,
  expectedOutcomes,
  testimonials,
  faqs,
  className = "",
}: ServiceDetailProps) {
  const formatPrice = (amount: number, currency = "JPY") => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-teal-400 text-teal-400" : "text-zinc-700"}
      />
    ));
  };

  return (
    <main className={`w-full min-h-screen ${className}`}>
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6"
          >
            <Sparkles size={16} />
            <span>Session Service</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
          >
            {briefDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            <span className="flex items-center gap-2 text-zinc-300">
              <Clock size={20} className="text-teal-400" />
              {duration}
            </span>
            <span className="flex items-center gap-2 text-zinc-300">
              <Video size={20} className="text-teal-400" />
              {format}
            </span>
            <span className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck size={20} className="text-teal-400" />
              完全守秘
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Full Description */}
      <section className="w-full max-w-4xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">サービス詳細</h2>
          <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line">
            {fullDescription}
          </p>
        </motion.div>
      </section>

      {/* Pricing Tier Comparison */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">料金プラン</h2>
          <p className="text-zinc-400">あなたのニーズに合わせてお選びください</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel rounded-2xl p-6 relative ${
                tier.popular
                  ? "border-teal-500/30 shadow-xl shadow-teal-500/10 scale-105"
                  : "border-white/5"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold shadow-lg">
                    <Star size={12} className="fill-white" />
                    人気
                  </span>
                </div>
              )}
              <div className="text-center mb-6 pt-4">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                {tier.description && (
                  <p className="text-sm text-zinc-400 mb-4">{tier.description}</p>
                )}
                <div className="text-3xl font-bold text-white mb-1">
                  {formatPrice(tier.price, tier.currency)}
                </div>
                {tier.period && (
                  <p className="text-sm text-zinc-500">{tier.period}</p>
                )}
              </div>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={tier.ctaHref || "#"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-teal-500/20"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {tier.ctaText || "選択する"}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Target Audience */}
      <section className="w-full max-w-4xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Users className="text-teal-400" /> 対象者
          </h2>
          <ul className="space-y-4">
            {targetAudience.map((audience, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-zinc-200 leading-relaxed"
              >
                <ArrowRight className="text-teal-400 shrink-0 mt-1" size={18} />
                <span>{audience}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Session Outline */}
      <section className="w-full max-w-4xl mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
        >
          セッションの流れ
        </motion.h2>
        <div className="space-y-4">
          {sessionOutline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-xl p-6 border border-white/5 flex gap-6"
            >
              <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 font-bold text-lg">
                {item.time}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="w-full max-w-5xl mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
        >
          期待できる効果
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expectedOutcomes.map((outcome, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel rounded-2xl p-6 border border-white/5"
            >
              {outcome.metric && (
                <div className="text-2xl font-bold text-teal-400 mb-3 flex items-center gap-2">
                  <Award className="shrink-0" />
                  {outcome.metric}
                </div>
              )}
              <h3 className="text-lg font-bold text-white mb-2">{outcome.label}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{outcome.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="w-full max-w-6xl mx-auto px-4 mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
          >
            受講者の声
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                  <span className="text-zinc-500 text-sm">{testimonial.rating}/5</span>
                </div>
                <p className="text-zinc-200 leading-relaxed mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    {testimonial.position && (
                      <div className="text-zinc-400 text-sm">{testimonial.position}</div>
                    )}
                    {testimonial.serviceType && (
                      <div className="text-teal-400 text-xs font-medium mt-1">
                        {testimonial.serviceType}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="w-full max-w-4xl mx-auto px-4 mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3"
          >
            <Lightbulb className="text-teal-400" /> よくある質問
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-panel rounded-xl p-6 border border-white/5"
              >
                <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                  <Target size={18} className="text-teal-400 shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-zinc-300 pl-6">{faq.answer}</p>
                {faq.category && (
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-medium">
                    {faq.category}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky CTA - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-lg border-t border-white/10 z-50">
        <motion.a
          href="#booking"
          whileTap={{ scale: 0.95 }}
          className="block w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-center"
        >
          今すぐ予約する
        </motion.a>
      </div>
    </main>
  );
}
