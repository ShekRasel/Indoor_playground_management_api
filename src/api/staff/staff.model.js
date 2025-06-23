import oracledb from "oracledb";

export async function createStaff(staff) {
  const conn = await oracledb.getConnection();
  const id = Date.now();

  const staffParams = {
    id: id,
    name: staff.name,
    phone: staff.phone,
    email: staff.email,
    roleId: staff.roleId,
  };

  await conn.execute(
    `INSERT INTO Staff (StaffID, Name, Phone, Email, RoleID)
     VALUES (:id, :name, :phone, :email, :roleId)`,
    staffParams
  );

  const loginParams = {
    id: id,
    username: staff.username,
    username: staff.email,
    password: staff.password,
  };

  await conn.execute(
    `INSERT INTO StaffLogin (StaffID, Username, Password)
     VALUES (:id, :username, :password)`,
    loginParams
  );

  await conn.commit();
  await conn.close();
}

export async function findStaffByEmail(email) {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT s.StaffID, s.Name, s.Email, s.RoleID, r.Title, sl.Password
     FROM Staff s
     JOIN StaffLogin sl ON s.StaffID = sl.StaffID
     JOIN Role r ON s.RoleID = r.RoleID
      WHERE s.Email = :email`,
    { email },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows[0];
}
