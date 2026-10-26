<!-- AUTHORED-BY Codex GPT-6.1-Sol -->

# VOC-05 interpretation notes

1. Which gate applies after retargeting this lane to `jeswr/portfolio`?
   The brief's Working rules prescribe pnpm workspace lint/build/typecheck/test,
   `lint:root`, and a Turbo `gate`, but this checkout has no `AGENTS.md`, pnpm
   workspace, or scripts for typecheck/test/lint:root/gate. Options: use the
   existing npm CI gate in `.github/workflows/ci.yml`, or introduce SDK workspace
   tooling. Conservative reading: use `npm run lint:ci` and the Playwright suite
   (which builds and serves production), including the required route tests;
   run the installed TypeScript compiler directly. Keep manifests and lockfiles
   unchanged.

2. Does “keep html pointing at the app README” require new monorepo URLs?
   The VOC-05 description and DECISIONS V12 request adding Turtle representations;
   existing HTML targets are `jeswr/pod-docs`, `jeswr/pod-drive`, and
   `jeswr/solid-chat-interop` repository READMEs. Options: preserve these targets,
   or redirect HTML to `solid-sdk/main/apps/<app>/README.md`. Conservative reading:
   preserve all three existing HTML targets and test them explicitly.

Neither interpretation blocks implementation. Draft PR creation and preview
deployment checks remain with the integrator as specified in the lane brief.
