import { MetadataRoute } from 'next'
import { getAllPostIds } from '@/lib/posts'
import { getCaseStudies } from '@/data/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://takahiro-motoyama.vercel.app'
  const lastModified = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/philosophy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sessions`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = getAllPostIds().map((post) => ({
    url: `${baseUrl}/blog/${post.params.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Case studies
  const caseStudies: MetadataRoute.Sitemap = getCaseStudies().map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts, ...caseStudies]
}
