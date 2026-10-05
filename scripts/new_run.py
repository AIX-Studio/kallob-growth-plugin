#!/usr/bin/env python3
"""Create a traceable run folder for any Kallob engine guide."""

from __future__ import annotations

import argparse
import re
from datetime import date, datetime, timezone
from pathlib import Path


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.strip().lower())
    return value.strip("-") or "run"


def write(path: Path, content: str) -> None:
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workspace", type=Path)
    parser.add_argument("engine_id", help="For example: sales-support/01-lead-qualification")
    parser.add_argument("title")
    args = parser.parse_args()
    workspace = args.workspace.expanduser().resolve()
    if not (workspace / "business-ai-workspace.yaml").is_file():
        raise SystemExit(f"Not a Business AI workspace: {workspace}")
    parts = args.engine_id.strip("/").split("/")
    if len(parts) != 2 or not all(re.fullmatch(r"[a-z0-9-]+", part) for part in parts):
        raise SystemExit("engine_id must use PACK/ENGINE with lowercase letters, digits and hyphens")
    pack, engine = parts
    base = workspace / "runs" / pack
    candidate = base / f"{date.today().isoformat()}-{slugify(args.title)}"
    suffix = 2
    while candidate.exists():
        candidate = base / f"{date.today().isoformat()}-{slugify(args.title)}-{suffix}"
        suffix += 1
    candidate.mkdir(parents=True)
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    write(candidate / "run.md", f"""# Run: {args.title}

- Status: draft
- Engine ID: {pack}/{engine}
- Created: {now}
- Objective:
- Accountable owner:
- Human checkpoint:
- Approval status: not requested
- Related runs:
""")
    write(candidate / "input.md", "# Input\n\n## Evidence\n\n## Assumptions\n\n## Unknowns\n")
    write(candidate / "output.md", "# Output\n")
    write(candidate / "sources.md", "# Sources\n\n| Source | Date/accessed | Supports | Limitations |\n|---|---|---|---|\n")
    write(candidate / "review.md", """# Review

## Quality gates

- [ ] Selected engine guide was followed.
- [ ] Evidence, assumptions and recommendations are separated.
- [ ] Sources and limitations are recorded.
- [ ] Human checkpoint and approval status are explicit.
- [ ] No unauthorized external action was taken.

## Proposed durable context updates

- None.

## Learning after outcome

- Expected result:
- Actual result:
- Variance:
- Next adjustment:
""")
    print(candidate)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
