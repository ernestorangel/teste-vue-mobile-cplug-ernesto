export interface Alert {
  id: string;
  severity: 'success' | 'error' | 'warn';
  message: string;
}
