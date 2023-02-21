export interface ErrorStatus extends Error {
  status?: string;
  statusCode?: number;
}
