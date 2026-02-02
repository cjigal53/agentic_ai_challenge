# /setup Command

Command for initial project setup with testing infrastructure.

## Usage

```
/setup <project-type>
```

## What This Command Does

1. **Initialize Project**
   - Creates Next.js project with TypeScript
   - Configures Tailwind CSS
   - Sets up ESLint

2. **Configure Testing**
   - Installs Jest + React Testing Library
   - Creates test configuration
   - Sets up test utilities

3. **Setup Structure**
   - Creates directory structure
   - Adds configuration files
   - Initializes git if needed

4. **Verify Setup**
   - Runs type check
   - Runs initial build
   - Verifies all configurations

## Example

```bash
/setup nextjs
```
