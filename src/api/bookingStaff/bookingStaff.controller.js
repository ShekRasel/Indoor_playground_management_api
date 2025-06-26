import {
  assignStaffToBooking,
  getBookingStaffs,
  deleteBookingStaffById,
} from "./bookingStaff.model.js";

export async function addBookingStaff(req, res, next) {
  try {
    const { bookingId, staffId } = req.body;
    if (!bookingId || !staffId) throw new Error("BookingID & StaffID required");
    await assignStaffToBooking({ bookingId, staffId });
    res.json({ message: "Staff assigned to booking successfully" });
  } catch (err) {
    next(err);
  }
}

export async function fetchBookingStaffs(req, res, next) {
  try {
    const result = await getBookingStaffs();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function removeBookingStaff(req, res, next) {

  try {
    const { id } = req.params;
    if (!id) throw new Error("BookingStaffID is required");
    await deleteBookingStaffById(id);
    res.json({ message: "BookingStaff deleted successfully" });
  } catch (err) {
    next(err);
  }
}
