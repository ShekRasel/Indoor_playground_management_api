import oracledb from "oracledb";

export async function getAllRoles() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(`SELECT RoleID, Title FROM Role`, [], {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  });
  await conn.close();
  return result.rows;
}

export async function createRole(title) {
  const id = Math.floor(Math.random() * 900000 + 100000);
  const conn = await oracledb.getConnection();

  await conn.execute(
    `INSERT INTO Role (RoleID, Title) VALUES (:id, :title)`,
    { id, title },
    { autoCommit: true }
  );

  await conn.close();
  return { id, title };
}

export async function updateRole(id, newTitle) {
  const conn = await oracledb.getConnection();

  const result = await conn.execute(
    `UPDATE Role SET Title = :title WHERE RoleID = :id`,
    { id, title: newTitle },
    { autoCommit: true }
  );

  await conn.close();

  if (result.rowsAffected === 0) {
    throw new Error("Role not found");
  }

  return { id, title: newTitle };
}

export async function deleteRole(id) {
  const conn = await oracledb.getConnection();

  const result = await conn.execute(
    `DELETE FROM Role WHERE RoleID = :id`,
    { id },
    { autoCommit: true }
  );

  await conn.close();

  if (result.rowsAffected === 0) {
    throw new Error("Role not found");
  }

  return { message: "Role deleted successfully" };
}
