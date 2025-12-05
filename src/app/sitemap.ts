import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alizon-store.com'

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
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/catalogs`,
      lastModified: new Date(),
    },
    ...productUrls,
    ...categoryUrls,
  ]
}
