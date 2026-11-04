import type { Assessment, AssessmentListItem, Sample } from './schemas';

/** The only surface the UI depends on. A real backend implements this same interface. */
export interface AssessmentApi {
  listAssessments(): Promise<AssessmentListItem[]>;
  getAssessment(assessmentId: string): Promise<Assessment>;
  getSample(assessmentId: string, sampleId: string): Promise<Sample>;
  downloadReport(assessmentId: string): Promise<Blob>;
}
