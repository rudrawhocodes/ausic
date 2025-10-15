import { events } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function EventsPage() {
  return (
    <section id="events" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Events</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Join us for our upcoming workshops, talks, and competitions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const image = PlaceHolderImages.find((p) => p.id === event.imageId);
            return (
              <Card key={event.id} className="glass-card overflow-hidden group">
                {image && (
                  <div className="overflow-hidden aspect-video relative">
                    <Image
                      src={image.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardDescription>{event.date}</CardDescription>
                    <Badge variant="secondary">{event.type}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow">
                   <p className="text-muted-foreground mb-4">{event.description}</p>
                   <Button variant="link" className="p-0 h-auto text-primary justify-start group">
                    Learn More <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
