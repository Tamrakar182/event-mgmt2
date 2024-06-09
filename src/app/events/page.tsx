import { EventListSection } from '@/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events: List',
    description: 'Lists all Events',
}

export default function EventListPage() {
  return (
    <EventListSection />
  );
}
