import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { readHtmlToolParamSchemeRaw } from '@/server/scheme';
import { readHtml, readHtmlToolDescription, readHtmlToolName } from '@/tools/read-html';

export async function createServer() {
  const server = new McpServer(
    {
      name: 'test-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        resources: {},
      },
    },
  );

  server.tool(readHtmlToolName, readHtmlToolDescription, readHtmlToolParamSchemeRaw, readHtml);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
