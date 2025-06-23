// src/api/payment/payment.model.js
import oracledb from "oracledb";

export async function createPayment(payment) {
  const conn = await oracledb.getConnection();
  await conn.execute(
    `INSERT INTO Payment (PaymentID, BookingID, PaymentDate, Amount, Method, Status)
     VALUES (:id, :bookingId, TO_DATE(:paymentDate, 'YYYY-MM-DD'), :amount, :method, :status)`,
    {
      id: Date.now(),
      bookingId: payment.bookingId,
      paymentDate: payment.paymentDate,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
    }
  );
  await conn.commit();
  await conn.close();
}

export async function getAllPayments() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT p.PaymentID, p.BookingID, p.PaymentDate, p.Amount, p.Method, p.Status,
            b.CustomerID, c.Name as CustomerName
     FROM Payment p
     JOIN Booking b ON p.BookingID = b.BookingID
     JOIN Customer c ON b.CustomerID = c.CustomerID`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}
