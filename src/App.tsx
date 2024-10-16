import React from "react";
import { useEffect, useState } from "react";

import "./styles.css";

import transactions from "./data.json";
import Transaction from "./TransactionType";

export default function App() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState();

  const fetchTransactions = async (): Promise<Transaction[]> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(transactions);
      }, 1000);
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchTransactions();
        setData(response);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  // TODO
  // - Implement pagination to show a limited number of transactions per page.
  // - Add sorting functionality to allow users to sort transactions by date or amount.

  const filteredTransactions = data.filter((transaction) => {
    const itemDate = new Date(transaction.date);
    const start = new Date(startDate);
    const end = new Date(startDate);

    return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
  });

  const totalAmount = data?.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  return (
    <div className="App">
      <h1>Transactions</h1>
      <div>
        <label>
          Start date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate((e.target as HTMLInputElement).value)}
          />
        </label>
        <label>
          End date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate((e.target as HTMLInputElement).value)}
          />
        </label>
      </div>
      <ul>
        {filteredTransactions?.map((item) => (
          <li key={item.id}>
            {item.id} - {item.date} - {item.description} -{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(item.amount)}
          </li>
        ))}
      </ul>
      <div>
        <h2>Summary</h2>
        <p>Total Transactions: {filteredTransactions?.length}</p>
        <p>
          Total Amount:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalAmount)}
        </p>
      </div>
      <div className="error">{error ? error : null}</div>
    </div>
  );
}
