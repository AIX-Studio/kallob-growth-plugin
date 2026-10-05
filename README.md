# Kallob Engine Router 0.12.1

Kallob Growth Studio for Codex: run Kallob's business engines on your own machine. Your work stays on this machine; the engine library and method prompts come from Kallob Cloud after you sign in.

## Install

```bash
codex plugin marketplace add AIX-Studio/kallob-growth-plugin
codex plugin add kallob-business-ai-engine-packs@kallob-growth
```

Quit and reopen Codex, then ask it to "open Growth Studio". Growth Studio needs Node.js 22.5 or newer; Codex offers to install it when it is missing. In Growth Studio, open Settings → Connect Kallob.

Growth Studio updates itself from Kallob Cloud. Your data lives in `~/.kallob-growth`.

Package 0.12.1, seed Studio 0.12.1 (8762ccd-muv70e1r), built from `8762ccd` of the private kallob-growth-studio repository by `scripts/release-plugin.mjs`. Do not edit this repository by hand.
