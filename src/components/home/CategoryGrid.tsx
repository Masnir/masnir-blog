import Link from 'next/link';
import { ArrowRightIcon } from '@/components/ui/icons';
import type { Category } from '@/types';

/** Grid of category cards for the homepage / categories index. */
export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-fg transition-colors group-hover:text-accent">
              {category.name}
            </h3>
            <ArrowRightIcon className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </div>
          <p className="mt-2 text-sm text-muted">{category.description}</p>
        </Link>
      ))}
    </div>
  );
}
