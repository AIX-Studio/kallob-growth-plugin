---
name: kallob-growth-studio
description: Open Kallob Growth Studio (its work, results, mini-apps such as Offers, Image Studio and Research Studio, knowledge and settings) with growth_studio_open, work on a task Growth Studio hands to Codex, or fulfill a Growth Studio Codex bridge request. Use for Kallob Growth Studio.
---

# Kallob Growth Studio

Growth Studio runs on this machine and hands work to Codex as tasks. Each task's prompt says what to do, how to do it, its limits and where the result goes; follow it. Do not bring in other installed skills or playbooks for a Growth Studio task.

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

When the person wants to see or work in Growth Studio — their work, results, a mini-app (Offers, Image Studio, Brand Profile, Research Studio), knowledge or settings — call `growth_studio_open` from the `kallob-growth` MCP server (with `view`, or `mini_app: "offers" | "image-studio" | "brand-profile" | "research"` to open a mini-app directly) and open the returned `url` in the in-app browser. It starts the local Studio when needed; the person's data stays in their own workspace on this machine.

If a tool says Kallob is not connected, call `growth_studio_open` with `view: "settings"`, open the url, and ask the person to click Connect Kallob, then continue.

## Growth Studio bridge

If the user asks to sync Google Drive through Codex, names a Growth Studio request ID, or provides the generated bridge prompt, read [../../references/codex-google-drive-bridge.md](../../references/codex-google-drive-bridge.md) and follow it.

Keep the following behind explicit authorization: external publishing, sending, spending, commitments and other consequential actions.
