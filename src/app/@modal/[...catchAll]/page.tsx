// Matches every path under this slot during client-side navigation, so navigating away from an
// open image always resolves to *some* page here (rendering null) instead of Next.js preserving
// the slot's previous state — without this, the lightbox can fail to close on navigate-away.
export default function ModalCatchAll() {
  return null;
}
