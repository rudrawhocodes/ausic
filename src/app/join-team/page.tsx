import Link from 'next/link';

export default function JoinTeamPage() {
  return (
    <section id="join-team" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Join Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We're recruiting student leads to help run initiatives across domains including Product, Marketing, Events, and Ventures.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">Open Lead Positions</h3>
            <ul className="mt-4 list-disc list-inside text-muted-foreground">
              <li>Head of Product</li>
              <li>Head of Marketing</li>
              <li>Head of Events</li>
              <li>Head of Ventures</li>
            </ul>
            <p className="mt-4 text-muted-foreground">Ideal candidates are proactive students with leadership experience and a passion for entrepreneurship.</p>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">How to Apply</h3>
            <p className="mt-4 text-muted-foreground">Send your CV and a short cover note describing why you'd be a good fit to <a href="mailto:contact@ausic.example" className="text-primary">contact@ausic.example</a> with the subject "Join Team - [Role]".</p>
            <p className="mt-4 text-muted-foreground">Alternatively, fill in the short application form below and we'll reach out.</p>
            <div className="mt-4">
              <Link href="/contact" className="inline-block bg-primary text-background px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">Open Application Form</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
