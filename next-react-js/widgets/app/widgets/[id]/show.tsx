'use client';

import Link from 'next/link';
import db, { Widget } from '@/app/db';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

async function getWidget(id: string): Promise<Widget | undefined> {
  const widget = await db.widgets.get(Number(id));

  return widget;
}

interface ShowWidgetProps {
  id: string;
}

export default function ShowWidget(props: ShowWidgetProps) {
  const router = useRouter();

  const id = props.id;

  const [widget, setWidget] = useState<Widget | null>(null);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [archivedAt, setArchivedAt] = useState<Date | null>(null);

  useEffect(() => {
    getWidget(id).then((widget) => {
      if (widget) {
        setWidget(widget);
      }

      setName(widget?.name ?? '');
      setDescription(widget?.description ?? '');
      setUrl(widget?.url ?? '');
      setNumber(widget?.number ?? 0);
      setArchivedAt(widget?.archived_at ?? null);

      document.title = `${widget?.name || 'Show Widget'} | Widgets`;
    });
  }, [id]);

  if (!widget) {
    return <div>Loading...</div>;
  }

  const deleteWidget = () => {
    if (confirm('Are you sure you want to delete this widget?')) {
      db.widgets.delete(widget.id).then(() => {
        router.push('/');
      });
    }
  };

  const toggleWidgetArchiveStatus = () => {
    const date = new Date();

    if (
      !archivedAt &&
      confirm('Are you sure you want to archive this widget?')
    ) {
      db.widgets
        .update(widget.id, { archived_at: date, updated_at: date })
        .then(() => {
          setArchivedAt(date);
        });
    } else if (
      !!archivedAt &&
      confirm('Are you sure you want to unarchive this widget?')
    ) {
      db.widgets
        .update(widget.id, { archived_at: null, updated_at: date })
        .then(() => {
          setArchivedAt(null);
        });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <Link
            href={!!archivedAt ? '/widgets/archived' : '/'}
            className="p-2 rounded bg-gray-200 text-black hover:bg-gray-300 mb-4 inline-block"
          >
            ← Back to Widgets
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/widgets/${widget.id}/edit`}
              className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 mb-4 inline-block"
            >
              Edit Widget
            </Link>
            <button
              onClick={deleteWidget}
              className="p-2 rounded bg-red-500 text-white hover:bg-red-600 mb-4 inline-block cursor-pointer"
            >
              Delete Widget
            </button>
            <button
              onClick={toggleWidgetArchiveStatus}
              className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 mb-4 inline-block cursor-pointer"
            >
              {!!archivedAt ? 'Unarchive' : 'Archive'} Widget
            </button>
          </div>
        </div>
        <div className="flex gap-6 justify-between w-full">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              {name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-zinc-400">URL:</span>
            <a
              href={url}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 dark:text-zinc-400">Number:</span>
            <span className="text-black dark:text-zinc-50">{number}</span>
          </div>
        </div>
        <div>
          <h2 className="mt-8 mb-2 text-xl font-semibold text-black dark:text-zinc-50">
            Description
          </h2>
          <p className="text-black dark:text-zinc-50">{description}</p>
        </div>
      </main>
    </div>
  );
}
