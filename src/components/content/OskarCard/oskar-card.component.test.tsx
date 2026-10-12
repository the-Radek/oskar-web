import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import OskarCard from './oskar-card.component';

const image = {
  src: '/turnus.png',
  width: 400,
  height: 300,
  blurDataURL: 'data:image/png;base64,AAAA',
  blurWidth: 0,
  blurHeight: 0,
};

describe('OskarCard', () => {
  it('renders title, dates, text and price', () => {
    render(
      <OskarCard
        title="TURNUS II."
        dateRange="13. 7. 2026 - 25. 7. 2026"
        text="Vede to Vojta."
        price="8 300,-"
        image={image}
        imageAlt="Turnus 2"
      />,
    );
    expect(screen.getByText('TURNUS II.')).toBeInTheDocument();
    expect(screen.getByText('13. 7. 2026 - 25. 7. 2026')).toBeInTheDocument();
    expect(screen.getByText('Vede to Vojta.')).toBeInTheDocument();
    expect(screen.getByText('Cena: 8 300,-')).toBeInTheDocument();
    expect(screen.getByAltText('Turnus 2')).toBeInTheDocument();
  });
});
