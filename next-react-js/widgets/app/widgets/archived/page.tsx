import { Metadata } from 'next';
import ArchivedWidgets from './archived';

export const metadata: Metadata = {
  title: 'Archived Widgets | Widgets',
  description: 'Archived widgets in your collection',
};

export default function Home() {
  return <ArchivedWidgets />;
}
