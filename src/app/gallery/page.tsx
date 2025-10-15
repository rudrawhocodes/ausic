import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GalleryPage() {
  return (
    <section id="gallery" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Gallery</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">A selection of images from events and activities.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PlaceHolderImages.map((img) => (
            <div key={img.id} className="rounded-lg overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={img.imageUrl} alt={img.description} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
