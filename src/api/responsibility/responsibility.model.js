import oracledb from "oracledb";

export async function createResponsibility({ roleId, text }) {
  const conn = await oracledb.getConnection();
  await conn.execute(
    `INSERT INTO Responsibility (ResponsibilityID, RoleID, ResponsibilityText)
     VALUES (:id, :roleId, :text)`,
    {
      id: Date.now(), // unique ID
      roleId,
      text,
    }
  );
  await conn.commit();
  await conn.close();
}

export async function getResponsibilities() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT r.ResponsibilityID, r.RoleID, r.ResponsibilityText, rl.Title as RoleTitle
     FROM Responsibility r
     JOIN Role rl ON r.RoleID = rl.RoleID`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

export async function deleteResponsibility(id) {
  const conn = await oracledb.getConnection();
  await conn.execute(
    `DELETE FROM Responsibility WHERE ResponsibilityID = :id`,
    { id }
  );
  await conn.commit();
  await conn.close();
}

