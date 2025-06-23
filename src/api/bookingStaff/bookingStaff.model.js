import oracledb from "oracledb";

export async function assignStaffToBooking({ bookingId, staffId }) {
  const conn = await oracledb.getConnection();
  await conn.execute(
    `INSERT INTO BookingStaff (BookingStaffID, BookingID, StaffID)
     VALUES (:id, :bookingId, :staffId)`,
    {
      id: Date.now(),
      bookingId,
      staffId,
    }
  );
  await conn.commit();
  await conn.close();
}

export async function getBookingStaffs() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT bs.BookingStaffID, bs.BookingID, bs.StaffID, s.Name AS StaffName
     FROM BookingStaff bs
     JOIN Staff s ON bs.StaffID = s.StaffID`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}
