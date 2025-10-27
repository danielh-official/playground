import EditWidget from './edit';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Widget | Widgets',
  description: 'Edit widget from your collection',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditWidget id={id} />;
}
