const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
	.connect("mongodb://localhost/finance-tracker", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
	});

// Define transaction schema and model
const transactionSchema = new mongoose.Schema({
	description: String,
	amount: Number,
	subCategory: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Express middleware
app.use(cors());
app.use(express.json());

// API routes
app.get("/api/transactions", async (req, res) => {
	try {
		const transactions = await Transaction.find().sort({ subCategory: 1 });
		res.json(transactions);
	} catch (error) {
		console.error("Error retrieving transactions:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.post("/api/transactions", async (req, res) => {
	const { description, amount, subCategory } = req.body;

	try {
		const transaction = new Transaction({ description, amount, subCategory });
		await transaction.save();
		res.status(201).json(transaction);
	} catch (error) {
		console.error("Error creating transaction:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});
app.put("/api/transactions/", async (req, res) => {
	const { description, amount, subCategory, id } = req.body;
	try {
		const transaction = await Transaction.findByIdAndUpdate(
			id,
			{ description, amount, subCategory },
			{ new: true }
		);
		if (!transaction) {
			return res.status(404).json({ error: "Transaction not found" });
		}
		res.json(transaction);
	} catch (error) {
		console.error("Error updating transaction:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.delete("/api/transactions/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const transaction = await Transaction.findByIdAndDelete(id);

		if (!transaction) {
			return res.status(404).json({ error: "Transaction not found" });
		}

		res.sendStatus(204);
	} catch (error) {
		console.error("Error deleting transaction:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
