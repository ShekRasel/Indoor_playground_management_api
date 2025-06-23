// staffSchedule.model.js
import oracledb from "oracledb";

export async function createStaffSchedule(schedule) {
  const conn = await oracledb.getConnection();
  await conn.execute(
    `INSERT INTO StaffSchedule (ScheduleID, StaffID, PlayAreaID, ShiftDate, ShiftTime)
   VALUES (:id, :staffId, :playAreaId, TO_DATE(:shiftDate, 'YYYY-MM-DD'), :shiftTime)`,
    {
      id: Date.now(),
      staffId: schedule.staffId,
      playAreaId: schedule.playAreaId,
      shiftDate: schedule.shiftDate,
      shiftTime: schedule.shiftTime,
    }
  );
  await conn.commit();
  await conn.close();
}

export async function getStaffSchedules() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT ss.ScheduleID, ss.StaffID, s.Name AS StaffName,
            ss.PlayAreaID, p.Name AS PlayAreaName,
            ss.ShiftDate, ss.ShiftTime
     FROM StaffSchedule ss
     JOIN Staff s ON ss.StaffID = s.StaffID
     JOIN PlayArea p ON ss.PlayAreaID = p.PlayAreaID`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

export async function deleteStaffSchedule(id) {
  const conn = await oracledb.getConnection();
  await conn.execute(`DELETE FROM StaffSchedule WHERE ScheduleID = :id`, {
    id,
  });
  await conn.commit();
  await conn.close();
}
