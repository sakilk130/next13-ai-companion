'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@prisma/client';
import qs from 'query-string';

import { cn } from '@/lib/utils';

interface CategoriesProps {
  data: Category[];
}
const Categories: FC<CategoriesProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  };

  return (
    <div className="flex w-full p-1 space-x-2 overflow-x-auto">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition',
          !categoryId ? 'bg-primary/25' : 'bg-primary/10'
        )}
      >
        Newest
      </button>
      {data.map((category) => (
        <button
          onClick={() => onClick(category.id)}
          className={cn(
            'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition',
            category.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
          )}
          key={category.id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export { Categories };
