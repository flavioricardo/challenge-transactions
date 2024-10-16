//Transaction ID, Date, Description, Amount (in USD)

export default interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
}
