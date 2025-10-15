export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageId?: string;
  slug: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Pitch Your Startup Idea',
    excerpt: 'A practical guide to crafting a pitch that captures attention and funding.',
    date: '2024-10-05',
    imageId: 'event-1',
    slug: 'how-to-pitch-your-startup-idea',
  },
  {
    id: '2',
    title: 'Building MVPs Quickly',
    excerpt: 'Best practices for iterating fast and validating product-market fit.',
    date: '2024-09-20',
    imageId: 'event-3',
    slug: 'building-mvps-quickly',
  },
];
