import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useChunkedWindow } from './use-chunked-window';

const initial = { items: [3, 4], hasOlder: true, hasNewer: true };

function setup(load = vi.fn(), onPrepend = vi.fn()) {
  const hook = renderHook(() => useChunkedWindow<number>({ initial, load, onPrepend }));
  return { ...hook, load, onPrepend };
}

describe('useChunkedWindow', () => {
  it('appends older chunks after the last item', async () => {
    const { result, load } = setup(vi.fn().mockResolvedValue({ items: [5, 6], hasMore: false }));
    await act(() => result.current.loadMore('older'));
    expect(load).toHaveBeenCalledWith('older', 4);
    expect(result.current.items).toEqual([3, 4, 5, 6]);
    expect(result.current.hasMore).toEqual({ older: false, newer: true });
  });

  it('prepends newer chunks before the first item and reports the count', async () => {
    const { result, load, onPrepend } = setup(
      vi.fn().mockResolvedValue({ items: [1, 2], hasMore: true }),
    );
    await act(() => result.current.loadMore('newer'));
    expect(load).toHaveBeenCalledWith('newer', 3);
    expect(result.current.items).toEqual([1, 2, 3, 4]);
    expect(onPrepend).toHaveBeenCalledWith(2);
  });

  it('loads one chunk at a time per direction', async () => {
    let finish: (chunk: { items: number[]; hasMore: boolean }) => void = () => {};
    const load = vi.fn(
      () => new Promise<{ items: number[]; hasMore: boolean }>((r) => (finish = r)),
    );
    const { result } = setup(load);

    let first: Promise<void>;
    act(() => {
      first = result.current.loadMore('older');
    });
    await act(() => result.current.loadMore('older'));
    expect(load).toHaveBeenCalledTimes(1);

    await act(async () => {
      finish({ items: [5], hasMore: true });
      await first;
    });
    expect(result.current.items).toEqual([3, 4, 5]);
  });

  it('does not load when there is nothing more in that direction', async () => {
    const load = vi.fn().mockResolvedValue({ items: [5], hasMore: false });
    const { result } = setup(load);
    await act(() => result.current.loadMore('older'));
    await act(() => result.current.loadMore('older'));
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('rejects when loading fails, and can be tried again', async () => {
    const load = vi
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({ items: [5], hasMore: true });
    const { result } = setup(load);

    await act(async () => {
      await expect(result.current.loadMore('older')).rejects.toThrow('boom');
    });
    await act(() => result.current.loadMore('older'));
    expect(result.current.items).toEqual([3, 4, 5]);
  });

  it('swaps the window and drops a load that was started before', async () => {
    let finish: (chunk: { items: number[]; hasMore: boolean }) => void = () => {};
    const load = vi.fn(
      () => new Promise<{ items: number[]; hasMore: boolean }>((r) => (finish = r)),
    );
    const { result, onPrepend } = setup(load);

    let stale: Promise<void>;
    act(() => {
      stale = result.current.loadMore('newer');
    });
    act(() => result.current.replace({ items: [10, 11], hasOlder: false, hasNewer: false }));
    await act(async () => {
      finish({ items: [1, 2], hasMore: true });
      await stale;
    });

    expect(result.current.items).toEqual([10, 11]);
    expect(result.current.hasMore).toEqual({ older: false, newer: false });
    expect(onPrepend).not.toHaveBeenCalled();
  });
});
