import type { z } from 'zod';

import type { AssessmentApi } from './client';
import { ApiError } from './errors';
import { assessmentListItemSchema, assessmentSchema, sampleSchema } from './schemas';

async function request(baseUrl: string, path: string): Promise<Response> {
  const response = await fetch(`${baseUrl}${path}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed with ${response.status}`, response.status);
  }
  return response;
}

async function getJson<T extends z.ZodType>(baseUrl: string, path: string, schema: T) {
  const response = await request(baseUrl, path);
  return schema.parse(await response.json());
}

export function createHttpApi(baseUrl: string): AssessmentApi {
  const assessmentPath = (id: string) => `/assessments/${encodeURIComponent(id)}`;

  return {
    listAssessments: () => getJson(baseUrl, '/assessments', assessmentListItemSchema.array()),
    getAssessment: (id) => getJson(baseUrl, assessmentPath(id), assessmentSchema),
    getSample: (id, sampleId) =>
      getJson(
        baseUrl,
        `${assessmentPath(id)}/samples/${encodeURIComponent(sampleId)}`,
        sampleSchema,
      ),
    downloadReport: async (id) => (await request(baseUrl, `${assessmentPath(id)}/report`)).blob(),
  };
}
