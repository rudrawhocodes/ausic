import { boardRoom } from '@/lib/data';
import BoardIcons from '@/components/board-icons';

export default function TeamPage() {
  return (
    <section id="team" className="py-20 md:py-32 pt-36 md:pt-48 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the passionate individuals who drive our club's mission forward.
          </p>
        </div>
        <div className="mb-12">
          <h3 className="text-3xl font-semibold text-primary text-center mb-6">Board Room</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {boardRoom.slice(0, 6).map((b) => {
              const initials = b.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
              return (
                <div key={b.id} className="bg-card p-6 rounded-lg shadow-md border border-border/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-28 w-28 rounded-full bg-primary/5 flex items-center justify-center text-primary font-extrabold text-2xl border-2 border-primary/20">
                        {initials}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold">{b.name}</h4>
                      <p className="text-primary mb-3">{b.role}</p>
                      <BoardIcons email={b.email} phone={b.phone} linkedin={b.linkedin} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="/join-team" className="inline-block bg-primary text-background px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">Join the Team</a>
          <p className="text-sm text-muted-foreground mt-3">We currently have vacancies for lead positions for students — click to learn more.</p>
        </div>
      </div>
    </section>
  );
}
