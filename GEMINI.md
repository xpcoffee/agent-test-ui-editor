### **1. Always Run Long-Running Processes in the Background**

Always run development servers (like `npm run dev`, `vite`, `webpack-dev-server`) and other long-running commands in the background using `&`. This prevents the shell tool from hanging and allows for continued interaction and verification.

**Example:**
```
# Good
print(default_api.run_shell_command(command="npm run dev &", ...))

# Bad
print(default_api.run_shell_command(command="npm run dev", ...))
```

### **2. Mandate Headless Browser Testing After Frontend Refactors**

After any significant code change or refactoring in frontend code (React, Vue, etc.), you **MUST** verify the application for runtime errors in a headless browser.

The verification process is as follows:
1.  Ensure the development server is running in the background.
2.  Use a script (e.g., with Puppeteer) to launch a headless browser and navigate to the application's URL.
3.  The script **MUST** listen for the `pageerror` event to catch uncaught exceptions, including module loading errors.
4.  Report any errors found before proceeding. If no errors are found, explicitly state that the check passed without any issues.

### **3. Use Type-Only Imports for TypeScript Interfaces**

Pay close attention to TypeScript-specific syntax. When importing types or interfaces, always use the `import type { ... } from '...'` syntax to avoid runtime errors. This is a common source of module-loading failures that are not always caught by the build tools.

**Example:**
```typescript
// Good
import { getPage, type Page } from '../db';

// Bad
import { getPage, Page } from '../db';
```

### **4. Exercise Caution with File System Operations**

Exercise extreme caution with file system modification commands like `mv` and `rm`. Before executing, double-check the source and destination paths. Never move or delete critical hidden directories like `.git` or `node_modules` unless explicitly instructed to do so after a confirmation of the consequences.
