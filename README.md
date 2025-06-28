# Static Site Generator and Editor UI

A minimal static site generator with a WYSIWYG editor interface. This application allows users to create, edit, and manage static pages through a web interface.

## Features

### ✅ Implemented (Issue #1)
- **Landing Page**: Displays a list of all created pages
- **Page Creation**: WYSIWYG editor for creating new pages with:
  - Title setting
  - Paragraph addition and editing
  - Drag-and-drop paragraph reordering
  - Paragraph removal
- **Page Viewing**: Navigate to and view previously created pages
- **Page Management**: Delete pages from the landing page
- **Data Persistence**: Pages stored in browser IndexedDB

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Drag & Drop**: @dnd-kit library
- **Storage**: IndexedDB (via idb library)
- **Build Tool**: Vite
- **Testing**: Puppeteer for E2E tests

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

### Testing

Run end-to-end tests:
```bash
npm run test:e2e
```

**Note**: The development server must be running before executing E2E tests.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
│   ├── NewPage.tsx    # Page creation interface
│   └── PageView.tsx   # Page viewing interface
├── db.ts              # IndexedDB operations
├── router.tsx         # Application routing
└── App.tsx            # Main application component
```

## Usage

1. **Creating a Page**: Click "New Page" on the landing page to open the editor
2. **Adding Content**: 
   - Set a title in the title field
   - Add paragraphs using the "Add Paragraph" button
   - Edit paragraph content in the textarea fields
   - Reorder paragraphs by dragging the handle (≡ icon)
   - Remove paragraphs with the "Remove" button
3. **Saving**: Click "Save" to store the page and navigate to it
4. **Viewing Pages**: Click on any page title from the landing page to view it
5. **Deleting Pages**: Use the red "Delete" button next to each page on the landing page

## Development Notes

- Pages are stored locally in the browser's IndexedDB
- The drag-and-drop functionality uses @dnd-kit for accessibility and touch support
- E2E tests use Puppeteer to simulate user interactions
- The application follows React best practices with TypeScript for type safety

## Contributing

1. Follow the existing code style and patterns
2. Add tests for new functionality
3. Update documentation as needed
4. Ensure all E2E tests pass before committing

## Future Enhancements

- Backend storage integration
- Rich text editing capabilities
- Image and media support
- Page templates
- Export functionality
- Collaborative editing