import { countBookings } from "./booking.model.js";

export async function getBookingCount(req, res, next) {
  try {
    const result = await countBookings();
    res.json({ totalBookings: result.TOTAL });
  } catch (err) {
    next(err);
  }
}
