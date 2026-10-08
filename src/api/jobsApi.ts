import type { Job } from '../types/index.ts'
import { http } from './http.ts'

// Example resource module. Add one file like this per backend resource.
export const jobsApi = {
  list: () => http.get<Job[]>('/jobs'),
  getById: (id: string) => http.get<Job>(`/jobs/${id}`),
  create: (payload: Omit<Job, 'id' | 'createdAt'>) => http.post<Job>('/jobs', payload),
  update: (id: string, payload: Partial<Job>) => http.patch<Job>(`/jobs/${id}`, payload),
  remove: (id: string) => http.delete<void>(`/jobs/${id}`),
}
