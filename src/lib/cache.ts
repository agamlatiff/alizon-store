import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

// Cache duration in seconds
const CACHE_DURATION = 60; // 1 minute for frequently updated data
const STATIC_CACHE_DURATION = 300; // 5 minutes for relatively static data

/**
 * Cached function to get all categories
 * Revalidates every 5 minutes
 */
export const getCategoriesCached = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return categories;
  },
  ['categories'],
  { revalidate: STATIC_CACHE_DURATION, tags: ['categories'] }
);

/**
 * Cached function to get all brands
 * Revalidates every 5 minutes
 */
export const getBrandsCached = unstable_cache(
  async () => {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return brands;
  },
  ['brands'],
  { revalidate: STATIC_CACHE_DURATION, tags: ['brands'] }
);

/**
 * Cached function to get all locations
 * Revalidates every 5 minutes
 */
export const getLocationsCached = unstable_cache(
  async () => {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return locations;
  },
  ['locations'],
  { revalidate: STATIC_CACHE_DURATION, tags: ['locations'] }
);

/**
 * Cached function to get new arrivals (latest 8 products)
 * Revalidates every 1 minute
 */
export const getNewArrivalsCached = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        name: true,
        images: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return products;
  },
  ['new-arrivals'],
  { revalidate: CACHE_DURATION, tags: ['products'] }
);

/**
 * Cached function to get featured categories with product count
 * Revalidates every 5 minutes
 */
export const getFeaturedCategoriesCached = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        products: {
          _count: 'desc',
        },
      },
    });
    return categories;
  },
  ['featured-categories'],
  { revalidate: STATIC_CACHE_DURATION, tags: ['categories'] }
);
