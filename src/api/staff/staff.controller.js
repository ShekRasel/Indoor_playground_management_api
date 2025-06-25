import { registerStaff, loginStaff,fetchAllStaff,removeStaff  } from './staff.service.js';

export async function signup(req, res, next) {
  try {
    const user = await registerStaff(req.body);
    res.status(201).json({ message: 'Staff registered', user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginStaff(req.body);
    res.json({ message: 'Login successful', ...result });
  } catch (err) {
    next(err);
  }
}

export async function getAllStaff(req, res, next) {
  try {
    const staff = await fetchAllStaff();
    res.json({ staff });
  } catch (err) {
    next(err);
  }
}

export async function deleteStaff(req, res, next) {
  try {
    const { id } = req.params;
    await removeStaff(id);
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    next(err);
  }
}