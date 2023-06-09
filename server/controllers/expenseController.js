// Load environment variables from .env file
require('dotenv').config();

// Import required packages and models
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Expense = require('../models/expense');


const addExpense = async (req, res) => {
    try {
        const { amount, description, date, category } = req.body;
        const userId = req.user.id;

        // Create a new expense and associate it with the user
        const expense = await Expense.create({
            amount,
            description,
            date,
            category,
            userId,
        });

        // Update the user's totalExpense field
        const user = await User.findByPk(userId);
        await user.increment('totalExpense', { by: amount });

        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getExpensesByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find all expenses for the user
        const expense = await Expense.findAll({ where: { userId } });
        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const getTotalExpense = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['username', 'totalExpense']
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports = {
    addExpense,
    getExpensesByUser,
    getTotalExpense
}