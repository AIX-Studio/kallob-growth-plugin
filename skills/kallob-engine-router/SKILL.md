---
name: kallob-engine-router
description: Open Kallob Growth Studio (its work, results, mini-apps such as Offers and Image Studio, engine library, settings) with growth_studio_open, route a business outcome to the right Kallob engine from the Kallob Cloud engine library, run a traceable local-first workflow, or fulfill a Growth Studio Codex bridge request. Use for Kallob Growth Studio and Kallob engines; do not load unrelated engines.
---

# Kallob Engine Router

Use progressive disclosure. Load one routing layer at a time and stop when the correct engine is known.

## First run: Node.js

Growth Studio runs on this machine with Node.js 22.5 or newer. If the `kallob-growth` MCP tools are missing, or calling one fails because the server cannot start, check before anything else:

1. Run `node --version`. If it prints `v22.5.0` or newer, Node is not the problem: report the tool's error instead.
2. Otherwise install the current Node.js LTS, telling the person what you install and why:
   - macOS: `brew install node` when Homebrew is installed; otherwise download the macOS installer (.pkg) from https://nodejs.org/en/download and ask the person to run it.
   - Windows: `winget install --id OpenJS.NodeJS.LTS -e`.
3. Run `node --version` again, then ask the person to quit and reopen Codex so the plugin starts with Node. Do not continue with the request until the tools are available.

## Updates

Growth Studio updates itself from Kallob Cloud. If a tool answers that Growth Studio is updating, wait about a minute and call it again; do not work around it.

## Open Growth Studio

When the person wants to see or work in Growth Studio — their work, results, a mini-app (Offers, Image Studio, Brand Profile, Research Studio), the engine library or settings — call `growth_studio_open` from the `kallob-growth` MCP server (with `view`, or `mini_app: "offers" | "image-studio" | "brand-profile" | "research"` to open a mini-app directly) and open the returned `url` in the in-app browser. It starts the local Studio when needed; the person's data stays in their own workspace on this machine.

## Growth Studio bridge

If the user asks to sync Google Drive through Codex, names a Growth Studio request ID, or provides the generated bridge prompt, read [../../references/codex-google-drive-bridge.md](../../references/codex-google-drive-bridge.md) and follow it. This is a connector workflow, not an engine run: do not load the engine catalog or create an engine run unless the user separately asks for one.

## Engine library: Kallob Cloud only

The engine library lives only in Kallob Cloud. The `kallob-growth` MCP tools read it through the Kallob connection the person made in Growth Studio Settings. This plugin ships no engine guides and no copies.

- `growth_catalog` lists the applications, packs and engines, with `access` and `available` for this person. Route only to engines with `available: true`.
- `growth_engine_get` returns one engine's full guide (`guide.markdown`). It also returns, in `references`, the documents a run needs:
  - `output-routing`;
  - `shared-business-context`;
  - the contract for the pack's kind: `pack-contract` or `industry-overlay-contract`.
- If a tool says an engine or application is not included in the person's plan, tell them so and offer the engines that are available. Do not look for the guide anywhere else.
- If a tool says Kallob is not connected, stop before routing. Call `growth_studio_open` with `view: "settings"`, open the url, and ask the person to click Connect Kallob, then continue. Do not improvise an engine from memory.

## Route

Call `growth_catalog` once, then:

1. If the user names an exact engine, match it by id or title in the catalog.
2. If the user names a pack, select from that pack's engines.
3. If the user states only a business outcome, choose the most likely functional pack, then the smallest engine that produces the outcome.
4. Add an industry overlay only when industry vocabulary, policy, KPI, exception, or workflow composition materially changes execution. Then apply the `industry-overlay-contract` that `growth_engine_get` returns.
5. For content-only work, choose from the Content Marketing pack.

Read the full guide of the selected engine only, with `growth_engine_get`. Do not fetch every engine.

## Workspace

Before running an engine, search the current project and explicitly supplied paths for business-ai-workspace.yaml. Do not search the entire home directory.

- If none exists, read ../../references/workspace-setup.md and use ../../scripts/init_workspace.py.
- If one exists, read the manifest, the relevant shared files, the selected domain context, and the selected overlay context when applicable.
- If several exist and the user did not identify one, ask which workspace to use.

## Run

1. Read the selected engine guide completely (`guide.markdown` from `growth_engine_get`).
2. Read `output-routing` from the same result before saving the primary deliverable or proposing a durable shared-context update.
3. Apply the pack or overlay contract from the same result only when creating or changing the engine contract. Ordinary runs follow the selected guide.
4. Create a run with ../../scripts/new_run.py. Never overwrite an earlier run.
5. Keep the primary deliverable in that run. Business Context is curated shared memory, not the default output destination.
6. Use the engine guide's minimum inputs, operating procedure, deliverable structure, quality gates, guardrails, and human checkpoint.
7. Separate evidence, assumptions, AI interpretation, recommendation, and human decision.
8. Save proposed durable updates in review.md. Do not silently rewrite shared context. Recommend a destination by accountable owner and usage, explain exceptions, and ask for approval.
9. Finish with the result path, the approval needed, unresolved gaps, and the next useful action.

For a multi-engine outcome:
- state the sequence;
- create one run per engine;
- pass outputs by local path.

Keep the following behind explicit authorization and the designated human checkpoint: external publishing, sending, spending, commitments, personnel decisions, financial transactions, clinical decisions, and other consequential actions.
