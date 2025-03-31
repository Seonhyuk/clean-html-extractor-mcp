import { CallToolResult } from '@modelcontextprotocol/sdk/types';
import { load } from 'cheerio';

import { ReadHtmlToolParam } from '@/server/scheme';

export async function readHtml(params: ReadHtmlToolParam) {
  try {
    const response = await fetch(params.url);
    const html = await response.text();

    const text = extractTextAndLinks(html);

    const result: CallToolResult = {
      content: [
        {
          type: 'text',
          text,
        },
      ],
      isError: false,
    };

    return result;
  } catch (error) {
    const result: CallToolResult = {
      content: [{ type: 'text', text: `${error}` }],
      isError: true,
    };

    return result;
  }
}

function extractTextAndLinks(html: string) {
  const dom = load(html);

  dom('head').remove();
  dom('style').remove();
  dom('link[rel="stylesheet"]').remove();

  dom('a').each((_, element) => {
    const _a = dom(element);
    const href = _a.attr('href');
    const text = _a.text();

    const attributes = element.attribs;

    for (const attributeName in attributes) {
      _a.removeAttr(attributeName);
    }

    if (href) {
      _a.attr('href', href);
    }

    _a.html(text);
  });

  let result = '';

  function traverseNode(_: any, element: any) {
    const _element = dom(element);

    if (element.type === 'text') {
      result += _element.text();
    } else if (element.type === 'tag') {
      if (element.name === 'a') {
        result += dom.html(_element);
      } else {
        _element.contents().each(traverseNode);
      }
    }
  }

  dom('body').contents().each(traverseNode);

  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

export const readHtmlToolName = 'read-html';
export const readHtmlToolDescription = 'Read the HTML of a given URL';
