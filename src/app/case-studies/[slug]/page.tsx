import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudies, getCaseStudyBySlug } from '@/data/case-studies';
import CaseStudyDetailClient from './CaseStudyDetailClient';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      type: 'article',
    },
  };
}

// Generate static params
export function generateStaticParams() {
  const caseStudies = getCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
