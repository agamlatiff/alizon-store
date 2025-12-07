// JSON-LD Structured Data Components for SEO

import Script from 'next/script';

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  contactPhone?: string;
}

export function OrganizationJsonLd({
  name = 'AlizonStore',
  url = 'https://alizonstore.vercel.app',
  logo = 'https://alizonstore.vercel.app/favicon.png',
  description = 'Your Premium E-Commerce Destination. Shop the latest trends in fashion and more.',
  contactPhone = '+6285922430828',
}: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactPhone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Indonesian'],
    },
    sameAs: [
      // Add social media links here if available
    ],
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
  url: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = 'USD',
  availability = 'InStock',
  brand,
  sku,
  url,
}: ProductJsonLdProps) {
  const availabilityMap = {
    InStock: 'https://schema.org/InStock',
    OutOfStock: 'https://schema.org/OutOfStock',
    PreOrder: 'https://schema.org/PreOrder',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    sku,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: availabilityMap[availability],
      url,
    },
  };

  return (
    <Script
      id="product-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}
