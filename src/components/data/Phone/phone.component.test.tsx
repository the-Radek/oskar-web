import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Phone from './phone.component';

describe('Phone', () => {
  it('prefixes the default country code and strips formatting for the tel: href', () => {
    render(<Phone>602 829 892</Phone>);
    expect(screen.getByRole('link', { name: '602 829 892' })).toHaveAttribute(
      'href',
      'tel:+420602829892',
    );
  });

  it('keeps an explicit country code as-is', () => {
    render(<Phone>+421 111 222 333</Phone>);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'tel:+421111222333');
  });
});
