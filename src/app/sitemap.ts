import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://mulibox.com',
            lastModified: new Date(),
            // alternates: {
            //     languages: {
            //         fa: 'https://mulibox.com/fa',
            //     },
            // },
        },
    ]
}