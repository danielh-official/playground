import ShowWidget from './show';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Show Widget | Widgets',
  description: 'Show widget from your collection',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ShowWidget id={id} />;
}
