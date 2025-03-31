import { z } from 'zod';

export const readHtmlToolParamSchemeRaw = {
  url: z.string().describe('The URL to read'),
};

export const readHtmlToolParamScheme = z.object(readHtmlToolParamSchemeRaw);

export type ReadHtmlToolParam = z.infer<typeof readHtmlToolParamScheme>;
