import { Badge } from '@/components/ui/Badge';
import type { TagWithCount } from '@/types';

/** Trending topics = most-used tags, shown as a cloud of pills. */
export function TrendingTopics({ tags }: { tags: TagWithCount[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.slug} href={`/tags/${tag.slug}`} variant="muted">
          #{tag.name}
          <span className="ml-1.5 text-muted/70">{tag.count}</span>
        </Badge>
      ))}
    </div>
  );
}
