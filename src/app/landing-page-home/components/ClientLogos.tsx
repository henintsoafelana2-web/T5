import React from 'react';

const clients = [
  { name: 'TechMada', key: 'client-1' },
  { name: 'AirMadagascar', key: 'client-2' },
  { name: 'BFV-SG', key: 'client-3' },
  { name: 'MobiJob', key: 'client-4' },
  { name: 'Orange MG', key: 'client-5' },
  { name: 'Telma', key: 'client-6' },
  { name: 'Jovenna', key: 'client-7' },
  { name: 'GasyNet', key: 'client-8' },
  { name: 'Axian Group', key: 'client-9' },
  { name: 'Canal+MG', key: 'client-10' },
];

export default function ClientLogos() {
  return (
    <section className="py-12 overflow-hidden border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 mb-8">
        <p className="text-center text-sm font-medium text-muted-foreground tracking-widest uppercase">
          Ils nous font confiance
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clients, ...clients]?.map((client, i) => (
            <div
              key={`marquee-${client?.key}-${i}`}
              className="flex items-center justify-center mx-8 px-8 py-3 glass-card rounded-xl min-w-[140px]"
            >
              <span className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-default">
                {client?.name}
              </span>
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}