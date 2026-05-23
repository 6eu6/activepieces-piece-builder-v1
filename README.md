# activepieces-piece-builder-v1

A focused TypeScript framework for building, testing, and publishing reusable automation pieces with dynamic dropdowns and secure credential handling.

---

## Introduction

This repository provides a minimal but complete framework to help developers and automation enthusiasts create custom, reusable automation pieces for no-code platforms. It addresses common challenges such as secure API key management, dynamic dropdown UX, and local testing support.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/30piq/activepieces-piece-builder-v1.git
   cd activepieces-piece-builder-v1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

## Defining Pieces: Triggers and Actions

- Pieces are defined in TypeScript using the core framework in `src/piece-builder.ts`.
- Each piece can have triggers (events) and actions (operations).
- Use provided APIs to define inputs, outputs, and dynamic dropdowns.

Example snippet:
```typescript
import { PieceBuilder, Action, Trigger } from './src/piece-builder';

const samplePiece = new PieceBuilder('SamplePiece')
  .addTrigger(new Trigger('onEvent', { /* trigger config */ }))
  .addAction(new Action('doSomething', { /* action config */ }));

export default samplePiece;
```

## Secure API Key Management

- API keys are stored encrypted using the module in `src/api-key-service.ts`.
- Raw API keys are exposed only once at creation for secure handling.
- Use the API key service to save, retrieve, and validate keys securely.

## Implementing Dynamic Dropdowns

- Dynamic dropdowns improve UX by loading options asynchronously.
- Define dropdown data loaders in your piece actions or triggers.
- Dropdowns show human-readable labels with disambiguators to avoid confusion.

Example:
```typescript
const countriesDropdown = async () => {
  return [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
  ];
};
```

## Testing Pieces Locally

- Unit and integration tests are located in `tests/piece-builder.test.ts`.
- Tests cover piece definitions, dynamic dropdowns, and API key handling.
- Run tests with `npm run test`.
- Use sample data to simulate piece execution.

## Publishing Pieces

- After testing, pieces can be published by bundling and distributing the compiled code.
- Follow semantic versioning for releases.
- Update the `CHANGELOG.md` with changes.

## Contributing

- Fork the repository and create feature branches.
- Write tests for new features or bug fixes.
- Submit pull requests with clear descriptions.

## Changelog

See `CHANGELOG.md` for version history and updates.

---

For detailed UX guidelines, see `docs/UX-guidelines.md`.
For an example piece demonstrating best practices, see `examples/sample-piece.ts`.

---

### Validation Commands

- `npm run test` - Run all tests
- `npm run lint` - Check code style
- `npm run build` - Compile TypeScript

### Maintenance Tasks

- Update dependencies regularly
- Monitor and fix security vulnerabilities
- Incorporate community contributions and UX improvements
- Maintain documentation and examples
- Perform security audits on credential handling

---

Thank you for using activepieces-piece-builder-v1.