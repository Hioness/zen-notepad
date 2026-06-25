# Zen Notepad

A minimalist, distraction-free notepad with a zen aesthetic.
Built with vanilla HTML, CSS, and JS — no build tools required,
minimal dependencies loaded via CDN.

**[→ Try the live demo](https://notepad-teal-five.vercel.app/)**

![Zen Notepad Light Theme](assets/screenshot-light.png)

![Zen Notepad Dark Theme](assets/screenshot-dark.png)

## Features

### 👁️ Multi-Note Sidebar

Manage multiple notes with a responsive sidebar:

- **Create** notes with the "+ New note" button
- **Switch** between notes by clicking titles in the sidebar
- **Delete** notes with the × button (confirm dialog with Shift+click bypass)
- **Auto-save**: All notes are persisted to localStorage — nothing is lost on reload
- **Per-note font memory**: Each note remembers its font (Mono/Sans/Serif) independently
- **Font inheritance**: Deleting a note transfers its font to the auto-created replacement

The sidebar is **fixed-position** on desktop (≥900px) — it slides in/out over the content via `transform: translateX()` while shifting the editor area right with an animated `margin-left` for a smooth, GPU-friendly transition. On mobile (<900px) it slides as an **overlay** over the full viewport with a backdrop.

The sidebar list is independently scrollable — the header and "New note" button stay pinned at the top, while the note list scrolls vertically with its own `overflow-y: auto`. The sidebar's fixed positioning is GPU-accelerated with `will-change: transform` for smooth performance.

A floating toggle button is visible when the sidebar is closed; the same button integrates into the sidebar header when open.

### 🌊 Animated ASCII Wave Background

A subtle, animated background featuring wave patterns created with block characters
(`█▓▒░·`). The animation uses sine and cosine functions to create a calming,
ever-changing visual effect. Automatically pauses when the tab is hidden and
respects the `prefers-reduced-motion` system setting.

### ✍️ Rich Text Editor

- **Contenteditable** interface for natural writing
- **Three font options**: Sans (Inter), Serif (Cormorant Garamond), Mono (JetBrains Mono) — independently per note
- **Formatting tools**: Bold, Italic, heading (cycles H1 → H2 → clear), bullet lists, horizontal rules
- **Toolbar active-state indicators**: Buttons light up to show when the cursor is in a bold, italic, heading, or list context — the heading button shows the current level (H1/H2) and what the next click will do
- **Tab key support**: Inserts 4 spaces for indentation

### 📋 Markdown Export & Import

Export your formatted text as Markdown with the copy button, preserving:

- Headings (`# H1`, `## H2`, `### H3`)
- Bold text (`**bold**`)
- Italic text (`*italic*`)
- Lists, blockquotes, code blocks, inline code, and links

The Import Markdown button (bottom-left) allows pasting Markdown back in,
inserting at the cursor position. The import/export pair round-trips all
supported formatting — what the app exports can be imported back correctly.

### 🔒 Paste Sanitization

Pasted content is sanitized with **DOMPurify** to strip any executable HTML,
script tags, or event handlers. Only safe semantic tags are preserved.

### 🌓 Dark/Light Theme

- Toggle between warm cream (`#F0EEE6`) and deep gray (`#1a1a1a`) themes
- Theme preference saved to localStorage
- Smooth transitions between modes

### 💾 Auto-save with Resilience

- All notes and their fonts automatically save to localStorage 500ms after you stop typing
- Each note's content and font selection persist independently
- Theme preference persists across sessions
- A warning banner appears if localStorage quota is exceeded
- Flushes pending saves immediately on `beforeunload` and tab `visibilitychange`
- Never lose your work

### 🗑️ Styled Confirm Dialog

Delete confirmations use a custom modal overlay instead of the browser's native `window.confirm()`:

- Centered dialog with Cancel and Delete buttons
- Click backdrop or press Escape to dismiss
- Hold **Shift** while clicking delete to skip the confirmation entirely
- Accessible `role="alertdialog"` with focus trap while open

### 📊 Word Counter

- Real-time word count displayed in the bottom-left corner
- Updates as you type
- Handles singular/plural grammar ("1 word" vs "N words")

### 🎨 Minimalist UI

- Floating toolbar (bottom-right) with hover-to-reveal opacity
- Sidebar toggle button (top-left) — floating when sidebar closed, inside header when open
- Theme toggle button (top-right)
- No distracting UI elements while writing
- Responsive design for mobile and desktop

### ♿ Accessibility

- Sidebar has `role="navigation"` with `aria-label`; overlay dismisses with backdrop and Escape
- Editor has an accessible name (`role="textbox"`, `aria-label="Editor"`)
- Import Markdown modal is a proper dialog (`role="dialog"`, `aria-modal="true"`)
- Focus is trapped inside the modal and confirm dialog while open
- Background content is hidden from assistive tech when modal/overlay is active
- All toolbar and sidebar buttons have `aria-label`
- Sidebar toggle buttons maintain synced `aria-expanded` state

## Usage

1. Open `index.html` in any modern web browser
2. Start typing in the editor area
3. Use the toolbar buttons to format your text
4. Click the font button (`Aa`) to cycle the current note's font
5. Open the sidebar (top-left hamburger) to create, switch, or delete notes
6. Click the copy button to copy your text as Markdown
7. Click the Import Markdown button (clipboard icon) to paste Markdown back in
8. Toggle the theme with the 🌙/☀️ button in the top-right

## Keyboard Shortcuts

| Key             | Action                      |
|-----------------|-----------------------------|
| `Tab`           | Insert 4 spaces             |
| `Escape`        | Close sidebar (mobile), close confirm/modal dialogs |

## Technical Details

- **No build process**: Pure HTML/CSS/JS in a single file
- **CDN dependencies**: Google Fonts via `fonts.googleapis.com` + DOMPurify via jsDelivr
- **LocalStorage**: Used for persisting notes, fonts, and theme preferences
- **Clipboard API**: For copying formatted markdown, with `execCommand` fallback
- **requestAnimationFrame**: For smooth ASCII background animation

## Browser Support

Works in all modern browsers that support:

- `contenteditable`
- CSS custom properties (variables)
- Clipboard API
- localStorage
- Lookbehind assertions in JavaScript regular expressions

## File Structure

```text
.
├── index.html          # Main application (single-file)
├── assets/
│   ├── favicon.svg     # Notepad icon
│   ├── screenshot-light.png  # Light theme screenshot
│   └── screenshot-dark.png   # Dark theme screenshot
├── site.webmanifest    # PWA manifest
├── temp/               # Scratch workspace (gitignored)
└── README.md           # This file
```

## Local Development

To run locally with a simple HTTP server:

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

Or simply open `index.html` directly in your browser (all asset paths are
relative for local use).

## License

MIT License — feel free to use, modify, and distribute.

## Credits

Inspired by the reflection project by Chris McLeod.
