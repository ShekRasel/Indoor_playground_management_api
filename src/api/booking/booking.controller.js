import { countBookings, getAllBookings } from "./booking.model.js";

export async function getBookingCount(req, res, next) {
  try {
    const result = await countBookings();
    res.json({ totalBookings: result.TOTAL });
  } catch (err) {
    next(err);
  }
}

export async function fetchAllBookings(req, res, next) {
  try {
    const bookings = await getAllBookings();
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
}
