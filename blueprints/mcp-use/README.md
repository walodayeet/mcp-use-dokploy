# MCP Use — Dokploy Template

A self-hosted Dokploy template that runs **both** the [mcp-use](https://github.com/mcp-use/mcp-use) MCP server and the [MCP Inspector](https://github.com/mcp-use/inspector) dashboard UI in a **single container**.

## Ports

| Port | Service | Purpose |
|------|---------|---------|
| `3000` | MCP Server | MCP clients connect here → `/mcp` endpoint |
| `8080` | Inspector UI | Dashboard to inspect & debug your MCP server |

## Quick Start (local)

```bash
docker compose up --build
```

- **Inspector dashboard:** http://localhost:8085
- **MCP endpoint:** http://localhost:3005/mcp

## Connecting an MCP Client

Add this to your MCP client config (Claude, Cursor, etc.):

```json
{
  "mcpServers": {
    "my-server": {
      "url": "http://localhost:3005/mcp"
    }
  }
}
```

When deployed via Dokploy, replace `localhost:3005` with your assigned domain.

## Customising the Server

The built-in server (`server/index.mjs`) ships with two example tools (`echo`, `get_time`).

To replace it with your own MCP server, either:

1. **Edit `server/index.mjs`** directly before building, or
2. **Mount a volume** by uncommenting this line in `docker-compose.yml`:
   ```yaml
   # - ./my-server:/app/server
   ```

## Dokploy Deployment

Managed via `template.toml` — Dokploy will auto-assign domains for both the inspector UI (port 8080) and the MCP endpoint (port 3000).

## License

MIT — [mcp-use](https://github.com/mcp-use/mcp-use) | [mcp-use/inspector](https://github.com/mcp-use/inspector)
