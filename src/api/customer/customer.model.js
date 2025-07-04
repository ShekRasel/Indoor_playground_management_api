import oracledb from "oracledb";

export async function createCustomer(customer) {
  const conn = await oracledb.getConnection();
  const id = Date.now();

  const customerParams = {
    id: id,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
  };

  await conn.execute(
    `INSERT INTO Customer (CustomerID, Name, Phone, Email, Address)
     VALUES (:id, :name, :phone, :email, :address)`,
    customerParams
  );

  const loginParams = {
    id: id,
    username: customer.username,
    password: customer.password,
  };

  await conn.execute(
    `INSERT INTO CustomerLogin (CustomerID, Username, Password)
     VALUES (:id, :username, :password)`,
    loginParams
  );

  await conn.commit();
  await conn.close();
}

export async function findCustomerByEmail(email) {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT c.CustomerID, c.Name, c.Phone, c.Email, c.Address, cl.Password
     FROM Customer c
     JOIN CustomerLogin cl ON c.CustomerID = cl.CustomerID
      WHERE c.Email = :email`,
    { email },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows[0];
}

export async function getAllCustomers() {
  const conn = await oracledb.getConnection();
  const result = await conn.execute(
    `SELECT c.CustomerID, c.Name, c.Phone, c.Email, c.Address, cl.Username
     FROM Customer c
     JOIN CustomerLogin cl ON c.CustomerID = cl.CustomerID`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  await conn.close();
  return result.rows;
}

export async function deleteCustomerById(customerId) {
  const conn = await oracledb.getConnection();

  // Delete login info first due to FK constraint
  await conn.execute(
    `DELETE FROM CustomerLogin WHERE CustomerID = :id`,
    { id: customerId }
  );

  // Then delete customer
  await conn.execute(
    `DELETE FROM Customer WHERE CustomerID = :id`,
    { id: customerId }
  );

  await conn.commit();
  await conn.close();
}
