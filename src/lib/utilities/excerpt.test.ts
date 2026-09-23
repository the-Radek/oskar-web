import { describe, expect, it } from 'vitest';
import { excerpt } from './excerpt';

describe('excerpt', () => {
  it('strips common markdown syntax', () => {
    expect(excerpt('# Title\n\nSome **bold** and _italic_ text.')).toBe(
      'Title Some bold and italic text.',
    );
  });

  it('keeps link labels but drops the url', () => {
    expect(excerpt('See [the camp](https://example.com) for details.')).toBe(
      'See the camp for details.',
    );
  });

  it('drops images entirely', () => {
    expect(excerpt('![alt text](https://example.com/img.png) Caption follows.')).toBe(
      'Caption follows.',
    );
  });

  it('returns short text unchanged', () => {
    expect(excerpt('Short text.', 200)).toBe('Short text.');
  });

  it('truncates on a word boundary and adds an ellipsis', () => {
    const result = excerpt('one two three four five', 12);
    expect(result).toBe('one two…');
  });
});
