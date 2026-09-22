import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Email from './email.component';

describe('Email', () => {
  it('renders a mailto: link', () => {
    render(<Email>spolek.oskar@gmail.com</Email>);
    expect(screen.getByRole('link', { name: 'spolek.oskar@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:spolek.oskar@gmail.com',
    );
  });
});
