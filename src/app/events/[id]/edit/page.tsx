import { EditEventSection } from '@/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events: Edit',
  description: 'Edit an existing Event',
}

export default function EditEventPage() {
  return (
    <EditEventSection />
  );
}
