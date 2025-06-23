import { createPayment, getAllPayments } from "./payment.model.js";

export async function addPayment(req, res, next) {
  try {
    const { bookingId, paymentDate, amount, method, status } = req.body;
    if (!bookingId || !paymentDate || !amount || !method || !status) {
      throw new Error("All fields are required");
    }

    await createPayment({ bookingId, paymentDate, amount, method, status });
    res.status(201).json({ message: "Payment recorded successfully" });
  } catch (err) {
    next(err);
  }
}

export async function fetchAllPayments(req, res, next) {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (err) {
    next(err);
  }
}
