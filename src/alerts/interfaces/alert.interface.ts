export interface Alert {
  userId: string;
  symbol: string;
  threshold: number;
  direction: 'above' | 'below';
  email: string;
}
