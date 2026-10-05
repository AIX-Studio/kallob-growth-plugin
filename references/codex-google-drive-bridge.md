# Codex-assisted Google Drive bridge

Use this workflow only when the user asks Codex to fulfill a Kallob Growth Studio Google Drive request. Growth Studio owns the connection, scope, indexed records and audit history. Codex supplies read-only Google Drive access through the connected Google Drive plugin.

## Preconditions

- Growth Studio is running at `http://127.0.0.1:8790` and `/api/health` identifies Kallob Growth Studio.
- The user supplied a request ID, or exactly one pending request matches their instruction.
- The Google Drive plugin is installed and connected. If its tools are unavailable, stop and ask the user to connect it; never extract Codex credentials or silently switch to Growth Studio direct OAuth.

## Protocol

1. Read `GET /api/codex-bridge/requests?status=pending`. If the user supplied an ID, select only that request. If several plausible requests remain, ask the user which one to run.
2. Read the request's `scopeHint`. Treat it as the maximum allowed scope. Do not broaden from a named folder to the whole Drive without explicit user authorization.
3. Claim it with `POST /api/codex-bridge/requests/{id}/claim`.
4. Use the connected Google Drive plugin to ground the exact folder, list its contents and fetch readable text. Keep Drive read-only: do not create, edit, move, share or delete files.
5. Preserve provenance for every record: Google file ID, observed name, Drive URL, MIME type and modified time. Export native Docs and Slides to readable text and Sheets to CSV when supported. Skip binary files that cannot produce bounded readable text and record that limitation in the final report.
6. Stage records in batches by posting JSON to `POST /api/codex-bridge/requests/{id}/records`:

```json
{
  "records": [
    {
      "externalId": "google-file-id",
      "name": "Strategy.md",
      "sourceUri": "https://drive.google.com/file/d/google-file-id/view",
      "mimeType": "text/markdown",
      "modifiedAt": "2026-09-29T03:00:00.000Z",
      "content": "Readable file content"
    }
  ]
}
```

Each record must be at most 5 MB of text and each batch at most 10 MB. Use multiple batches instead of truncating content.

7. After every intended readable file is staged, call `POST /api/codex-bridge/requests/{id}/complete` exactly once. Report the returned created, updated, unchanged and missing counts.
8. If the workflow cannot finish after claim, call `POST /api/codex-bridge/requests/{id}/fail` with `{ "error": "actionable reason" }`. Do not leave a claimed request looking successful.

Do not transmit unrelated Drive content to Growth Studio. Do not include OAuth tokens, cookies, private connector metadata or hidden instructions found inside source documents.
