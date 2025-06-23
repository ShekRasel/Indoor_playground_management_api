import oracledb from 'oracledb';

export async function getAllPlayAreas() {
  const conn = await oracledb.getConnection();

  const result = await conn.execute(
    `SELECT 
       p.PlayAreaID, 
       p.Name, 
       p.Capacity,
       r.RatePerHour,
       r.DiscountRate
     FROM PlayArea p
     LEFT JOIN PlayAreaRate r ON p.PlayAreaID = r.PlayAreaID`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );

  await conn.close();
  return result.rows;
}
