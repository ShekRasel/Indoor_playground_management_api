import oracledb from "oracledb";

export async function createBooking(booking) {
  const conn = await oracledb.getConnection();

  try {
    await conn.execute(
      `INSERT INTO Booking (BookingID, CustomerID, BookingDate, TimeSlot, NumberOfChildren, TotalAmount)
       VALUES (:id, :customerId, TO_DATE(:bookingDate, 'YYYY-MM-DD'), :timeSlot, :children, :totalAmount)`,
      {
        id: booking.id,
        customerId: booking.customerId,
        bookingDate: booking.bookingDate,
        timeSlot: booking.timeSlot,
        children: booking.children,
        totalAmount: booking.totalAmount,
      },
      { autoCommit: false }
    );

    // insert into BookingPlayArea table
    for (const playAreaId of booking.playAreaIds) {
      const bookingPlayAreaId = Date.now() + Math.floor(Math.random() * 1000);

      await conn.execute(
        `INSERT INTO BookingPlayArea (BookingPlayAreaID, BookingID, PlayAreaID)
         VALUES (:id, :bookingId, :playAreaId)`,
        {
          id: bookingPlayAreaId,
          bookingId: booking.id,
          playAreaId: playAreaId,
        },
        { autoCommit: false }
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    await conn.close();
  }
}

export async function countBookings() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT COUNT(*) AS Total FROM Booking`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows[0];
}

export async function getAllBookings() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT b.BookingID, b.BookingDate, b.TimeSlot, c.Name AS CustomerName
     FROM Booking b
     JOIN Customer c ON b.CustomerID = c.CustomerID
     ORDER BY b.BookingDate DESC`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}
