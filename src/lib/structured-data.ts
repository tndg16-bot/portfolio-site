export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "本山貴大",
  "givenName": "貴大",
  "familyName": "本山",
  "jobTitle": "Life Self-Determination Coach",
  "description": "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
  "url": "https://takahiro-motoyama.vercel.app",
  "image": "https://takahiro-motoyama.vercel.app/images/profile.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/takahiro-motoyama/"
  ],
  "knowsAbout": [
    "コーチング",
    "AI活用",
    "人生設計",
    "自己決定",
    "ライフコーチ",
    "キャリアデザイン"
  ]
};

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "本山 貴大 | Life Self-Determination Protocol",
  "description": "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
  "url": "https://takahiro-motoyama.vercel.app",
  "logo": "https://takahiro-motoyama.vercel.app/images/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "takahiro.motoyama@example.com",
    "availableLanguage": "Japanese"
  }
};

export const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "本山 貴大 | Life Self-Determination Protocol",
  "description": "「ノウハウ依存」から「人生の自己決定」へ。AIと哲学で、自律的な人生をデザインする。",
  "url": "https://takahiro-motoyama.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://takahiro-motoyama.vercel.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "モヤモヤ整理セッション",
  "description": "60分で、価値観と判断軸を言語化して、次の一歩まで落とします。無料のモヤモヤ整理セッションを予約。",
  "provider": {
    "@type": "Person",
    "name": "本山貴裕"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Japan"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://takahiro-motoyama.vercel.app/sessions",
    "serviceMode": "online"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY",
    "availability": "https://schema.org/InStock",
    "description": "現在、審査制にてご案内しております。詳細は個別にお伝えいたします。"
  }
};
