# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## WebID + agent descriptors

The homepage doubles as Jesse's WebID document (`https://jeswr.org/#me`): its
RDFa is content-negotiated to Turtle/JSON-LD by `middleware.ts`. The profile
also points at a self-describing **agent** (`interop:hasAuthorizationAgent` /
`schema:agent` → `https://jeswr.org/agent`):

- `/agent` — the agent's IRI; serves the ANP Agent Description (Turtle by
  default, JSON-LD via `Accept`; browsers are 303-redirected to `/`).
- `/.well-known/agent-descriptions` — the same document at the ANP discovery
  path (JSON-LD by default).
- `/.well-known/agent-card.json` — the A2A Agent Card (static JSON).

All three are generated from the single descriptor in
`scripts/agent/descriptor.mjs` via
[`@jeswr/solid-agent-card`](https://github.com/jeswr/solid-agent-card) and
committed. To change the agent description:

```bash
cd scripts/agent
npm install        # standalone mini-workspace; ignore-scripts=true
npm run generate   # rewrites public/.well-known/agent-card.json +
                   # config/agent-description.generated.ts
npm run verify     # freshness + a discoverAgent round-trip with the
                   # owner back-link required (fail-closed)
```

`npm run verify` must pass before committing regenerated artifacts.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
