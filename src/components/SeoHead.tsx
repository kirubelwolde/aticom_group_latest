
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSeoSettingByRoute } from '@/hooks/useSeoSettings';
import { useLocation } from 'react-router-dom';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, keywords, image, noIndex }) => {
  const location = useLocation();
  const { data: seoSettings } = useSeoSettingByRoute(location.pathname);
  
  const finalTitle = title || seoSettings?.title || 'ATICOM Ethiopia';
  const finalDescription = description || seoSettings?.meta_description || 'Leading Ethiopian business conglomerate';
  // Normalize keywords coming from props or seoSettings to always be an array
  const rawKeywords: unknown = keywords ?? (seoSettings as any)?.meta_keywords ?? [];
  const finalKeywords: string[] = Array.isArray(rawKeywords)
    ? (rawKeywords as string[])
    : typeof rawKeywords === 'string'
      ? rawKeywords.split(',').map(k => k.trim()).filter(Boolean)
      : [];
  const finalImage = image || seoSettings?.og_image || '/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png';
  const canonicalUrl = seoSettings?.canonical_url || `https://aticom.com${location.pathname}`;
  
  const structuredData = seoSettings?.structured_data ? {
    ...seoSettings.structured_data,
    url: canonicalUrl,
    image: finalImage
  } : {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ATICOM Investment Group',
    alternateName: ['ATICOM', 'ATICOM Ethiopia', 'ATICOM Group'],
    description: finalDescription,
    url: canonicalUrl,
    image: finalImage,
    logo: '/lovable-uploads/19dd7868-19b3-4400-b881-1d6834e52292.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Around Atlas Crossroad (Cape Verde street), WMA Sets Building, 1st Floor',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
      postalCode: '1000'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+251-11-6-68-58-59',
      contactType: 'customer service',
      areaServed: 'ET',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.aticomgroup.com'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ATICOM Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bathroom Solutions',
            description: 'Premium JOMOO brand bathroom products and sanitary ware'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ceramic Tiles',
            description: 'High-quality ceramic tiles and construction materials'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agricultural Exports',
            description: 'Coffee, avocado, and agricultural products export'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Real Estate Development',
            description: 'Property development and investment opportunities'
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords.length > 0 && <meta name="keywords" content={finalKeywords.join(', ')} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta */}
      <meta 
        name="robots" 
        content={`${noIndex || !seoSettings?.index_status ? 'noindex' : 'index'}, ${!seoSettings?.follow_status ? 'nofollow' : 'follow'}`} 
      />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoSettings?.og_title || finalTitle} />
      <meta property="og:description" content={seoSettings?.og_description || finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={seoSettings?.og_type || 'website'} />
      <meta property="og:site_name" content="ATICOM" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={seoSettings?.twitter_card || 'summary_large_image'} />
      <meta name="twitter:title" content={seoSettings?.twitter_title || finalTitle} />
      <meta name="twitter:description" content={seoSettings?.twitter_description || finalDescription} />
      <meta name="twitter:image" content={seoSettings?.twitter_image || finalImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional Meta Tags */}
      <meta name="author" content="ATICOM Investment Group" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="ET" />
      <meta name="geo.placename" content="Addis Ababa" />
      <meta name="geo.position" content="9.1450;40.4897" />
      <meta name="ICBM" content="9.1450, 40.4897" />
      
      {/* Business & Industry Meta Tags */}
      <meta name="business:contact_data:street_address" content="Around Atlas Crossroad (Cape Verde street), WMA Sets Building, 1st Floor" />
      <meta name="business:contact_data:locality" content="Addis Ababa" />
      <meta name="business:contact_data:country_name" content="Ethiopia" />
      <meta name="business:contact_data:phone_number" content="+251-11-6-68-58-59" />
      <meta name="business:contact_data:email" content="info@aticomgroup.com" />
      
      {/* AI & Search Engine Optimization */}
      <meta name="classification" content="Business, Investment, Manufacturing, Agriculture, Real Estate, Construction, Export, Ethiopia" />
      <meta name="category" content="Business" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Social Media & Branding */}
      <meta name="application-name" content="ATICOM Investment Group" />
      <meta name="msapplication-TileColor" content="#417ABD" />
      <meta name="theme-color" content="#417ABD" />
      <meta name="apple-mobile-web-app-title" content="ATICOM" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* AI Chatbot & Search Engine Friendly */}
      <meta name="ai:description" content="ATICOM Investment Group is a leading Ethiopian business conglomerate specializing in bathroom solutions, ceramic tiles, agricultural exports, and real estate development. We offer premium JOMOO sanitary ware, ARERTI ceramic tiles, PEACELANDO real estate, and ATICOM-COFFEE agricultural products. Contact us at +251-11-6-68-58-59 or visit our showrooms in Addis Ababa." />
      <meta name="ai:services" content="Bathroom Solutions, Ceramic Tiles, Agricultural Exports, Real Estate Development, Construction Materials, Investment Opportunities" />
      <meta name="ai:location" content="Addis Ababa, Ethiopia" />
      <meta name="ai:contact" content="+251-11-6-68-58-59, info@aticomgroup.com" />
      <meta name="ai:showrooms" content="Main Showroom: Ethio China Road, ARERTI: Atlas Traffic Light, JOMOO: Megenagna" />
      
      {/* Enhanced Open Graph for Social Sharing */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="ATICOM Investment Group - Leading Ethiopian Business Conglomerate" />
      
      {/* Enhanced Twitter Cards */}
      <meta name="twitter:site" content="@aticomgroup" />
      <meta name="twitter:creator" content="@aticomgroup" />
      <meta name="twitter:image:alt" content="ATICOM Investment Group - Leading Ethiopian Business Conglomerate" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Manifest for PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </Helmet>
  );
};

export default SeoHead;
