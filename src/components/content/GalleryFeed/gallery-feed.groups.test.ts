import { describe, expect, it } from 'vitest';
import type { ImageThumb } from '@/lib/data/image/types';
import { groupByYear } from './gallery-feed.groups';

const image = (id: number, createdAt: string): ImageThumb => ({
  id,
  src: `/${id}.jpg`,
  alt: '',
  width: 1,
  height: 1,
  createdAt,
});

describe('groupByYear', () => {
  it('is empty for no images', () => {
    expect(groupByYear([])).toEqual([]);
  });

  it('splits consecutive runs of the same year, keeping the order', () => {
    const images = [
      image(4, '2024-06-01T00:00:00.000Z'),
      image(3, '2024-01-01T00:00:00.000Z'),
      image(2, '2023-12-31T23:59:59.999Z'),
      image(1, '2022-05-05T00:00:00.000Z'),
    ];
    expect(groupByYear(images).map((group) => [group.year, group.images.map((i) => i.id)])).toEqual(
      [
        [2024, [4, 3]],
        [2023, [2]],
        [2022, [1]],
      ],
    );
  });

  it('uses the UTC year', () => {
    expect(groupByYear([image(1, '2024-01-01T00:30:00.000Z')])[0].year).toBe(2024);
  });
});
