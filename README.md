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

## Dependency audit note

`npm audit` reports a few HIGH advisories that originate solely from **dev-only,
build-time tooling** — the `@ldo/*` codegen tools (shex/shacl type generation)
and `watch`. These packages are NOT part of the runtime bundle shipped to the
browser or to the server (they run only during local schema codegen / file
watching), so they do not affect the deployed site. Bumping them requires a
major upgrade with breaking API changes and is tracked separately, out of scope
for the routine dependency-bump gate.

### Dependabot automerge

Dependabot PRs for **patch** and **minor** bumps are auto-merged by
`.github/workflows/dependabot-automerge.yml` (majors are always left for manual
review). It triggers on `pull_request` so `dependabot/fetch-metadata` has PR
context, then — before merging — the workflow **self-enforces** that the repo's
**CI** workflow (lint · build · Playwright e2e) has CONCLUDED **success** for the
PR head commit, and only then squash-merges.

The CI-success guard is **load-bearing and fail-closed**: it polls the GitHub
Checks/Actions API for the `CI` workflow run on the PR head SHA (bounded, ~15 min)
and merges only when that run concluded `success`. If CI is still pending, failed,
or — while Actions billing is blocked — never scheduled, the guard times out and
the workflow **exits without merging** (no error; it just doesn't merge). This is
why nothing can auto-merge on a **Vercel-only** pass: the Vercel deployment checks
run independently of GitHub Actions, so a bump that passes only the Vercel build
never satisfies the CI-success guard. (`gh pr merge --auto` is still passed so any
other required checks like Vercel are also honoured, but the explicit CI-success
guard is what gates the merge — the workflow no longer depends on branch
protection making CI a required check.)

The one `needs:user` step:

1. Restore **GitHub Actions billing** (an account-wide block) so CI runs at all.
   Until then the guard never sees a successful CI run, so nothing auto-merges.

Marking the **CI** check a **required status check** in branch protection
(Settings → Branches → main → "Require status checks to pass before merging") is
now **optional defence-in-depth** — the workflow enforces the CI gate on its own.

## WebID + agent descriptors

The homepage doubles as Jesse's WebID document (`https://jeswr.org/#me`): its
RDFa is content-negotiated to Turtle/JSON-LD by `middleware.ts`. The profile
also points at a self-describing **agent**
(`interop:hasAuthorizationAgent` → `https://jeswr.org/agent`):

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
