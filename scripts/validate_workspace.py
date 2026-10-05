#!/usr/bin/env python3
"""Validate the shared Business AI workspace structure."""

from __future__ import annotations

import argparse
from pathlib import Path


CORE = [
    "business-ai-workspace.yaml",
    "shared/business-context.md",
    "shared/objectives-and-metrics.md",
    "shared/customers-and-offers.md",
    "shared/organization-and-approvals.md",
    "shared/claims-and-policies.md",
    "shared/tools-and-data.md",
    "shared/source-library.md",
    "shared/cross-domain-learnings.md",
]
DOMAINS = ["content-marketing", "marketing-growth", "sales-support", "operations", "leadership-management", "people-talent", "finance-cashflow", "product-innovation", "partner-community"]
OVERLAYS = ["fnb-operations", "retail-growth", "professional-services", "education-training", "real-estate-sales", "clinic-administration", "manufacturing-operations", "ecommerce-growth"]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workspace", type=Path)
    args = parser.parse_args()
    workspace = args.workspace.expanduser().resolve()
    required = CORE + [f"domains/{name}/context.md" for name in DOMAINS] + [f"overlays/{name}/context.md" for name in OVERLAYS]
    missing = [item for item in required if not (workspace / item).is_file()]
    if missing:
        print("Missing required files:")
        for item in missing:
            print(f"- {item}")
        return 1
    manifest = (workspace / "business-ai-workspace.yaml").read_text(encoding="utf-8")
    if "{{" in manifest or "}}" in manifest:
        print("Manifest contains unresolved template tokens")
        return 1
    print(f"Workspace structure is valid: {workspace}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
