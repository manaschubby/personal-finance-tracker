import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [transactions, setTransactions] = useState([]);
	const [description, setDescription] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [edit, setEdit] = useState(false);
	const [editId, setEditId] = useState(null);
	const [amount, setAmount] = useState("");
	const clearFields = () => {
		setDescription("");
		setAmount("");
		setSubCategory("");
	};
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

			clearFields();
		}
	};

	const deleteTransaction = (id, e) => {
		setEdit(false);
		e.stopPropagation();

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
	const editTransaction = () => {
		const editTransaction = {
			description,
			amount: parseFloat(amount),
			subCategory: subCategory,
			id: editId,
		};
		const updatedTransactions = transactions.filter(
			(transaction) => transaction._id !== editId
		);
		fetch("http://localhost:5000/api/transactions/", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(editTransaction),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					throw new Error(data.error);
				}
				setTransactions([...updatedTransactions, data]);
				setEdit(false);
				clearFields();
				setEditId(null);
			})
			.catch((error) => alert("Error editing transaction:", error));
	};
	const handleEdit = (id) => {
		setEdit(true);
		const transaction = transactions.find(
			(transaction) => transaction._id === id
		);
		setDescription(transaction.description);
		setAmount(transaction.amount);
		setSubCategory(transaction.subCategory);
		setEditId(id);
	};

	const calculateBalance = () => {
		let balance = 0;

		transactions.forEach((transaction) => {
			balance += transaction.amount;
		});

		return balance.toFixed(2);
	};
	const closeModal = () => {
		setEdit(false);
		setDescription("");
		setAmount("");
		setSubCategory("");
		setEditId(null);
	};
	return (
		<div className="App">
			<h1>Personal Finance Tracker</h1>
			{/* Edit Modal */}
			{edit && (
				<div className="modal">
					<div className="modal-content form-container">
						<span className="close" onClick={closeModal}>
							&times;
						</span>
						<p>Edit Transaction</p>
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
						<button onClick={editTransaction}>Save</button>
					</div>
				</div>
			)}
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
						<li
							key={transaction._id}
							onClick={() => handleEdit(transaction._id)}
						>
							{transaction.description}
							<span>{transaction.subCategory}</span>
							<span>${transaction.amount.toFixed(2)}</span>{" "}
							<button onClick={(e) => deleteTransaction(transaction._id, e)}>
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
