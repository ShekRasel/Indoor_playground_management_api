import { createBooking } from "./booking.model.js";

export async function handleBooking(req, res, next) {
  try {
    const {
      customerId,
      bookingDate,
      timeSlot,
      children,
      totalAmount,
      playAreaIds,
    } = req.body;
    const bookingId = Date.now();
    const booking = {
      id: bookingId,
      customerId,
      bookingDate,
      timeSlot,
      children,
      totalAmount,
      playAreaIds,
    };

    await createBooking(booking);
    res.status(201).json({ message: "Booking successful", bookingId });
  } catch (err) {
    next(err);
  }
}
