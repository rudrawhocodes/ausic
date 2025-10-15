import Image from 'next/image';
import { type TeamMember } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const image = PlaceHolderImages.find(p => p.id === member.imageId);

  return (
    <Card className="group glass-card text-center hover:scale-[1.02] hover:shadow-xl transition-transform duration-300 relative overflow-hidden">
      <CardContent className="p-6 hover:translate-y-[-4px] transition-transform duration-300">
        {/* hover tint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent to-primary/4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {image && (
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary group-hover:scale-105 transition-all duration-300 animate-float">
            <Image
              src={image.imageUrl}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
        <p className="text-primary">{member.role}</p>
  <div className="mt-4 flex justify-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
          {member.email ? (
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/5">
              <a href={`mailto:${member.email}`}>
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </Button>
          ) : (
            // fallback to github if no email
            <></>
          )}

          {member.phone ? (
            <Button variant="ghost" size="icon" asChild>
              <a href={`tel:${member.phone.replace(/\s+/g, '')}`}>
                <Phone className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </Button>
          ) : (
            <></>
          )}

          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/5">
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </Button>

          {member.socials.twitter && (
            <Button variant="ghost" size="icon" asChild>
              <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
