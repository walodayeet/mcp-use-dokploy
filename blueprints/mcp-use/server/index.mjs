/**
 * Minimal self-contained MCP server using the mcp-use SDK.
 *
 * This is the default stub server bundled with the Dokploy template.
 * Replace or extend the tools/resources below with your own logic.
 *
 * The MCP endpoint will be available at:
 *   http://<your-domain>/mcp
 *
 * Connect your MCP client (Claude, Cursor, etc.) using that URL.
 */

import { MCPServer } from "mcp-use/server";
import { z } from "zod";

const server = new MCPServer({
  name: "mcp-use-server",
  version: "1.0.0",
  description: "A self-hosted MCP server powered by mcp-use",
});

// ── Example tool: echo ────────────────────────────────────────────────────────
server.tool(
  {
    name: "echo",
    description: "Echoes back the provided message",
    schema: z.object({ message: z.string().describe("The message to echo back") })
  },
  async ({ message }) => ({
    content: [{ type: "text", text: `Echo: ${message}` }],
  })
);

// ── Example tool: get_time ────────────────────────────────────────────────────
server.tool(
  {
    name: "get_time",
    description: "Returns the current UTC time"
  },
  async () => ({
    content: [{ type: "text", text: new Date().toUTCString() }],
  })
);

// ── Start HTTP/SSE server ─────────────────────────────────────────────────────
const port = parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

await server.listen({ port, host });

console.log(`✓ MCP server running at http://${host}:${port}/mcp`);
