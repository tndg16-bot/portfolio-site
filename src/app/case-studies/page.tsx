import { Metadata } from 'next';
import CaseStudiesContent from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Case Studies - 変化の物語',
  description: 'コーチングとコンサルティングを通じて、クライアントが直面した課題と、それをどう乗り越えたかの記録です。',
  openGraph: {
    title: 'Case Studies - 変化の物語 | 本山 貴裕',
    description: 'コーチングとコンサルティングを通じて、クライアントが直面した課題と、それをどう乗り越えたかの記録です。',
    url: 'https://takahiro-motoyama.vercel.app/case-studies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - 変化の物語 | 本山 貴裕',
    description: 'コーチングとコンサルティングを通じて、クライアントが直面した課題と、それをどう乗り越えたかの記録です。',
  },
  alternates: {
    canonical: 'https://takahiro-motoyama.vercel.app/case-studies',
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
