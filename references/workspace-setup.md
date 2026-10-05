# Business AI Workspace Setup

Use this guide only when no business-ai-workspace.yaml exists or the user asks to configure durable shared data.

## Initialize

Run scripts/init_workspace.py with a destination inside the current project. Default to business-ai-engine-workspace unless the user specifies another name or path. Then run scripts/validate_workspace.py.

## Minimum viable shared context

Fill only explicit facts or first-party evidence. Do not block the first engine run merely because every field is incomplete.

Establish at minimum:

- business model, market and important constraints;
- one current objective with baseline, target, review horizon and owner;
- priority customers and current offers;
- organization owner and approval rights for the selected engine;
- claims/policies that constrain the output;
- source locations and tool availability;
- selected domain context;
- industry overlay only when applicable.

Mark unresolved fields Unknown. Mark AI-generated hypotheses Proposed. Never store credentials.

## Existing content workspace

If a content-engine-workspace already exists, link its source files from the shared source library or migrate confirmed facts deliberately. Do not create two competing copies of audience, offer, claims or brand data without identifying which is authoritative.
