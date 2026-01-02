import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

// Force dynamic generation at runtime, not build time
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alizonstore.vercel.app'

  // Static pages (always available)
  const staticPages = [
    '',
    '/catalogs',
    '/about',
    '/contact',
    '/faq',
    '/terms',
    '/privacy',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))

  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: { id: true, updated_at: true },
    })

    const productUrls = products.map((product) => ({
      url: `${baseUrl}/catalogs/detail-product/${product.id}`,
      lastModified: product.updated_at,
    }))

    // Get all categories
    const categories = await prisma.category.findMany({
      select: { id: true },
    })

    const categoryUrls = categories.map((category) => ({
      url: `${baseUrl}/catalogs?categories=${category.id}`,
      lastModified: new Date(),
    }))

    return [
      ...staticPages,
      ...productUrls,
      ...categoryUrls,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static pages if database is unavailable
    return staticPages
  }
}

