import { Metadata } from 'next';
import CreateWidget from './create';

export const metadata: Metadata = {
  title: 'Add Widget | Widgets',
  description: 'Add widget to your collection',
};

export default function Page() {
  return <CreateWidget />;
}
