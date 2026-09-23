import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import IconSection from './icon-section.component';

const icon = { src: '/icon.png', width: 80, height: 80, blurWidth: 0, blurHeight: 0 };

describe('IconSection', () => {
  it('renders as a labeled section with title, icon and text', () => {
    render(
      <IconSection icon={icon} alt="Disko koule" label="area" title="Objekt">
        Objekt leží v lese.
      </IconSection>,
    );
    const section = screen.getByRole('region', { name: 'area' });
    expect(section).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Objekt' })).toBeInTheDocument();
    expect(screen.getByAltText('Disko koule')).toBeInTheDocument();
    expect(screen.getByText('Objekt leží v lese.')).toBeInTheDocument();
  });
});
