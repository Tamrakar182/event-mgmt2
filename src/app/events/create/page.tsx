import { CreateEventSection } from '@/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events: Create',
    description: 'Create a new Event',
}

export default function CreateEventPage() {
  return (
    <CreateEventSection />
  );
}
