import db from "../db";


export const createUser = async (req, res) => {
  try {
    const user = await db.collection("users").add(req.body);
    res.json({ id: user.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}