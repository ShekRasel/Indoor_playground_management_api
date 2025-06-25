import oracledb from "oracledb";

export async function getAllRoles() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(`SELECT RoleID, Title FROM Role`, [], {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  });
  await conn.close();
  return result.rows;
}
