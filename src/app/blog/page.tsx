import { blogPosts } from '@/lib/blog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <section id="blog" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Blog</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Insights, guides, and stories from our community.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const image = PlaceHolderImages.find((p) => p.id === post.imageId);
            return (
              <Card key={post.id} className="glass-card overflow-hidden group">
                {image && (
                  <div className="overflow-hidden aspect-video relative">
                    <Image src={image.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{new Date(post.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-primary">Read more →</Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
