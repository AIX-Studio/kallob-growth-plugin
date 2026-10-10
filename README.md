# Kallob Growth Studio 0.22.0

Kallob Growth Studio for Codex: Kallob's mini-apps for your business, run by Codex on your own machine. Your work stays on this machine; your Kallob plan decides which mini-apps you can use after you sign in.

## Install

```bash
codex plugin marketplace add AIX-Studio/kallob-growth-plugin
codex plugin add kallob-business-ai-engine-packs@kallob-growth
```

Quit and reopen Codex, then ask it to "open Growth Studio". Growth Studio needs Node.js 22.5 or newer; Codex offers to install it when it is missing. In Growth Studio, open Settings → Connect Kallob.

Growth Studio updates itself from Kallob Cloud. Your data lives in `~/.kallob-growth`.

Package 0.22.0, seed Studio 0.43.0 (4c625a1-mv25vzmo), built from `4c625a1` of the private kallob-growth-studio repository by `scripts/release-plugin.mjs`. Do not edit this repository by hand.
