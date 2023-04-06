const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const { addExpense, getExpensesByUser, getTotalExpense } = require("../controllers/expenseController");
const createPayment = require("../controllers/paymentController");
const router = express.Router();

router.post('/expense', authenticateUser, addExpense);
router.get('/expense', authenticateUser, getExpensesByUser);
//router.delete("/expense/:expenseId", DeleteExpense);
router.get('/totalExpense', getTotalExpense);

// Payment routes
router.post('/payment', authenticateUser, createPayment);

module.exports = router;
