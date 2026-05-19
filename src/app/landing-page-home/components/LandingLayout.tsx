import React from 'react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}