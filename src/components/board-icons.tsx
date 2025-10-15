"use client";

import { Mail, Phone, Linkedin } from 'lucide-react';

type Props = {
  email?: string;
  phone?: string;
  linkedin?: string | null;
};

export default function BoardIcons({ email, phone, linkedin }: Props) {
  return (
    <div className="flex items-center gap-4">
      {email && (
        <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary">
          <Mail className="h-5 w-5" />
        </a>
      )}
      {phone && (
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-muted-foreground hover:text-primary">
          <Phone className="h-5 w-5" />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} className="text-muted-foreground hover:text-primary">
          <Linkedin className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
