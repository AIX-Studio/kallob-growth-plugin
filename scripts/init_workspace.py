#!/usr/bin/env python3
"""Create a shared Business AI workspace for all engine packs."""

from __future__ import annotations

import argparse
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.strip().lower())
    return value.strip("-") or "business-ai-workspace"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--name", default="Business AI Engine Workspace")
    parser.add_argument("--language", default="vi")
    parser.add_argument("--timezone", default="Asia/Ho_Chi_Minh")
    args = parser.parse_args()
    destination = args.destination.expanduser().resolve()
    if destination.exists() and any(destination.iterdir()):
        raise SystemExit(f"Destination is not empty: {destination}")
    template = Path(__file__).resolve().parents[1] / "assets" / "workspace-template"
    destination.mkdir(parents=True, exist_ok=True)
    shutil.copytree(template, destination, dirs_exist_ok=True)
    replacements = {
        "{{WORKSPACE_ID}}": slugify(args.name),
        "{{WORKSPACE_NAME}}": args.name,
        "{{CREATED_AT}}": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "{{LANGUAGE}}": args.language,
        "{{TIMEZONE}}": args.timezone,
    }
    for path in destination.rglob("*"):
        if path.is_file():
            text = path.read_text(encoding="utf-8")
            for token, value in replacements.items():
                text = text.replace(token, value)
            path.write_text(text, encoding="utf-8")
    print(destination)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
