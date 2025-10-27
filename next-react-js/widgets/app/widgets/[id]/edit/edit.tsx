'use client';

import Link from 'next/link';
import db, { Widget } from '@/app/db';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from 'react';

async function getWidget(id: string): Promise<Widget | undefined> {
  const widget = await db.widgets.get(Number(id));

  return widget;
}

interface EditWidgetProps {
  id: string;
}

export default function EditWidget(props: EditWidgetProps) {
  const router = useRouter();

  const { id } = props;

  const [widget, setWidget] = useState<Widget | null>(null);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    getWidget(id).then((widget) => {
      if (widget) {
        setWidget(widget);
      }

      setName(widget?.name ?? '');
      setDescription(widget?.description ?? '');
      setUrl(widget?.url ?? '');
      setNumber(widget?.number ?? 0);

      document.title = `Edit ${widget?.name || 'Widget'} | Widgets`;
    });
  }, [id]);

  if (!widget) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      alert('Name is required');
      return;
    }

    db.widgets
      .update(widget.id, {
        name,
        description,
        url,
        number,
        archived_at: null,
        created_at: widget.created_at,
        updated_at: new Date(),
      })
      .then(() => {
        router.push(`/widgets/${widget.id}`);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <Link
            href={`/widgets/${widget.id}`}
            className="p-2 rounded bg-gray-200 text-black hover:bg-gray-300 mb-4 inline-block"
          >
            ← Go Back
          </Link>
        </div>
        <div className="flex gap-6 justify-between w-full">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Edit Widget
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          <form
            className="flex flex-col gap-4 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name"
              className="p-2 border border-zinc-300 rounded"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="name"
            />
            <input
              type="text"
              placeholder="Description"
              className="p-2 border border-zinc-300 rounded"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="description"
            />
            <input
              type="url"
              placeholder="URL"
              className="p-2 border border-zinc-300 rounded"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="url"
            />
            <input
              type="number"
              placeholder="Number"
              className="p-2 border border-zinc-300 rounded"
              name="number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              aria-label="number"
            />
            <button
              type="submit"
              className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              Update Widget
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
