import { HomeSection } from '@/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home',
    description: 'Home page for event management',
}

export default function Home() {
  return (
    <HomeSection />
  );
}
