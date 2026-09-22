import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShowIf from './show-if.component';

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ShowIf', () => {
  it('renders children when the query matches', () => {
    mockMatchMedia(true);
    render(
      <ShowIf below="md">
        <p>visible</p>
      </ShowIf>,
    );
    expect(screen.getByText('visible')).toBeInTheDocument();
  });

  it('renders nothing when the query does not match', () => {
    mockMatchMedia(false);
    render(
      <ShowIf below="md">
        <p>hidden</p>
      </ShowIf>,
    );
    expect(screen.queryByText('hidden')).not.toBeInTheDocument();
  });
});
