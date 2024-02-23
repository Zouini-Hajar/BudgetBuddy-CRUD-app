export interface Transaction {
  id?: number;
  type: string;
  description: string;
  amount: number;
  categoryId: number;
  date: string;
}
