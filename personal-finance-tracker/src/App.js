import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [transactions, setTransactions] = useState([]);
	const [description, setDescription] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [amount, setAmount] = useState("");
	useEffect(() => {
		fetch("http://localhost:5000/api/transactions")
			.then((res) => res.json())
			.then((data) => {
				setTransactions(data);
				console.log(data);
			})
			.catch((error) => alert("Error retrieving transactions:", error));
	}, []);
	const addTransaction = () => {
		if (description && amount && subCategory) {
			const newTransaction = {
				description,
				amount: parseFloat(amount),
				subCategory: subCategory,
			};
			fetch("http://localhost:5000/api/transactions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTransaction),
			})
				.then((res) => res.json())
				.then((data) => {
					setTransactions([...transactions, data]);
				})
				.catch((error) => alert("Error adding transaction:", error));

			setDescription("");
			setAmount("");
			setSubCategory("");
		}
	};

	const deleteTransaction = (id) => {
		const updatedTransactions = transactions.filter(
			(transaction) => transaction._id !== id
		);
		fetch("http://localhost:5000/api/transactions/" + id, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.status === 204) {
					setTransactions(updatedTransactions);
				} else if (res.status === 404) {
					throw new Error("Transaction not found");
				} else {
					throw new Error("Internal server error");
				}
			})
			.catch((error) => alert("Error deleting transaction:", error));
	};

	const calculateBalance = () => {
		let balance = 0;

		transactions.forEach((transaction) => {
			balance += transaction.amount;
		});

		return balance.toFixed(2);
	};

	return (
		<div className="App">
			<h1>Personal Finance Tracker</h1>
			<div className="form-container">
				<h2>Add Transaction</h2>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Sub Category"
					value={subCategory}
					onChange={(e) => setSubCategory(e.target.value)}
					required
				/>
				<button onClick={addTransaction}>Add</button>
			</div>
			<div className="transaction-list">
				<h2>Transactions</h2>
				<div className="transaction-list-header">
					<span>Description</span>
					<span>Sub Category</span>
					<span>Amount</span>
					<span>Delete</span>
				</div>
				<ul>
					{transactions.map((transaction) => (
						<li key={transaction._id}>
							{transaction.description}
							<span>{transaction.subCategory}</span>
							<span>${transaction.amount.toFixed(2)}</span>{" "}
							<button onClick={() => deleteTransaction(transaction._id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
				<p>Balance: ${calculateBalance()}</p>
			</div>
		</div>
	);
}

export default App;
