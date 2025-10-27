'use client';

import Link from 'next/link';
import db from '@/app/db';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateWidget() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;
    const number = Number(formData.get('number'));

    if (!name) {
      alert('Name is required');
      return;
    }

    const date = new Date();

    db.widgets
      .add({
        name,
        description,
        url,
        number,
        archived_at: null,
        created_at: date,
        updated_at: date,
      })
      .then(() => {
        router.push('/');
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <Link
            href="/"
            className="p-2 rounded bg-gray-200 text-black hover:bg-gray-300 mb-4 inline-block"
          >
            ← Back to Widgets
          </Link>
        </div>
        <div className="flex gap-6 justify-between w-full">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Create Widget
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
              suppressHydrationWarning
            />
            <input
              type="text"
              placeholder="Description"
              className="p-2 border border-zinc-300 rounded"
              name="description"
              suppressHydrationWarning
            />
            <input
              type="url"
              placeholder="URL"
              className="p-2 border border-zinc-300 rounded"
              name="url"
              suppressHydrationWarning
            />
            <input
              type="number"
              placeholder="Number"
              className="p-2 border border-zinc-300 rounded"
              name="number"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              suppressHydrationWarning
            >
              Create Widget
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
