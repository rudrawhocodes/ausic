import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const stats = [
    { value: '10+', label: 'Startups' },
    { value: '500+', label: 'Members' },
    { value: '20+', label: 'Mentors' },
];

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(p => p.id === 'about-visual');

    return (
        <section id="about" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">
                            Who are we?
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            A.U.S.I.C, the Adani University Startup and Innovation Council, is the premier student body dedicated to fostering a culture of entrepreneurship and innovation. We empower aspiring founders and business leaders on campus.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            Through mentorship, networking events, and access to resources, we provide a launchpad for students to transform their groundbreaking ideas into successful business ventures. We connect students with industry experts, venture capitalists, and successful entrepreneurs.
                        </p>
                    </div>
                    <div className="space-y-8">
                        {aboutImage && (
                            <div className="rounded-lg overflow-hidden glass-card shadow-2xl shadow-primary/10">
                                <Image
                                    src={aboutImage.imageUrl}
                                    alt={aboutImage.description}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-3 gap-6 text-center">
                            {stats.map(stat => (
                                <div key={stat.label} className="glass-card p-4 rounded-lg">
                                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
