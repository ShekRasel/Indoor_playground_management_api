import { getAllPlayAreas } from './playarea.model.js';

export async function getPlayAreas(req, res, next) {
  try {
    const data = await getAllPlayAreas();
    res.json(data);
  } catch (err) {
    next(err);
  }
}
