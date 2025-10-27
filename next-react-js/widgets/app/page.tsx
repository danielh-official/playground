'use client';

import db, { Widget } from './db';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';

export default function Home() {
  const widgets = useLiveQuery(
    () => db.widgets.filter((widget) => !widget.archived_at).toArray(),
    []
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex gap-6 justify-between w-full">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Widgets
          </h1>
          <div>
            <Link
              href="/widgets/create"
              className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Add Widget
            </Link>
            <Link
              href="/widgets/archived"
              className="ml-4 p-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              View Archived
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          {widgets?.map((widget: Widget) => (
            <Link
              key={widget.id}
              href={`/widgets/${widget.id}`}
              className="rounded-lg border border-zinc-100 p-4 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
            >
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {widget.name}{' '}
                <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {widget.description}
              </p>
            </Link>
          ))}
          {widgets?.length === 0 && (
            <p className="text-zinc-600 dark:text-zinc-400">
              No widgets found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
