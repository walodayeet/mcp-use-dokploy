FROM node:20-alpine

# Install curl for healthchecks and supervisor to manage processes
RUN apk add --no-cache curl supervisor

WORKDIR /app

# Install mcp-use and zod locally so ESM imports resolve correctly
# (global installs don't work well with ES module path resolution)
RUN npm install mcp-use zod

# Install inspector globally so it can be launched with npx
RUN npm install -g @mcp-use/inspector

# Copy the built-in stub MCP server
COPY server/index.mjs /app/server/index.mjs

# Supervisor config to run both processes
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# MCP server port (mcp-use default: 3000)
EXPOSE 3000
# Inspector dashboard port
EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV INSPECTOR_PORT=8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
