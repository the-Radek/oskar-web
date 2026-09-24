import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GoBackButton from './go-back-button.component';

const { back } = vi.hoisted(() => ({ back: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ back }) }));

function stubHistory(urls: string[], index: number) {
  vi.stubGlobal('navigation', {
    currentEntry: { index },
    entries: () => urls.map((url) => ({ url })),
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  back.mockClear();
});

describe('GoBackButton', () => {
  it('always renders without a condition and goes back on click', () => {
    render(<GoBackButton>Zpět</GoBackButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Zpět' }));
    expect(back).toHaveBeenCalledTimes(1);
  });

  it('renders when the previous page has the given path, ignoring the query', () => {
    stubHistory(['http://localhost/clanky?page=3&pageSize=20', 'http://localhost/clanky/42'], 1);
    render(<GoBackButton from="/clanky">Zpět</GoBackButton>);
    expect(screen.getByRole('button', { name: 'Zpět' })).toBeInTheDocument();
  });

  it('renders nothing when the previous page is elsewhere', () => {
    stubHistory(['http://localhost/kontakty', 'http://localhost/clanky/42'], 1);
    const { container } = render(<GoBackButton from="/clanky">Zpět</GoBackButton>);
    expect(container).toBeEmptyDOMElement();
  });

  it('does not match nested paths', () => {
    stubHistory(['http://localhost/clanky/7', 'http://localhost/clanky/42'], 1);
    const { container } = render(<GoBackButton from="/clanky">Zpět</GoBackButton>);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there is no previous entry', () => {
    stubHistory(['http://localhost/clanky/42'], 0);
    const { container } = render(<GoBackButton from="/clanky">Zpět</GoBackButton>);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when the Navigation API is unavailable', () => {
    const { container } = render(<GoBackButton from="/clanky">Zpět</GoBackButton>);
    expect(container).toBeEmptyDOMElement();
  });
});
