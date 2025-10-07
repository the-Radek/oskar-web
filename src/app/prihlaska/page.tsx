import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Přihláška',
};

export default function ThemedGame() {
  redirect(
    'https://docs.google.com/forms/d/e/1FAIpQLSfEIT4bl2GNx_M8fPmkToFuHEzBQ3a5OyF55v42VP4Y5cJvIA/viewform'
  );
}
