import db from "../db";


export const getAllUsers = async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    const users = snapshot.docs.map((doc) => ({
      data: doc.data(),
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const createUser = async (req, res) => {
  try {
    const user = await db.doc("users/" + req.body.uid).set(req.body);
    res.json({
      email: req.body.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateCurrentUser = async (req, res) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const userRef = await db.collection("users").doc(req.params.id);
    if (!userRef) {
      return res.status(404).json({ message: "User not found" })
    }
    userRef.update({
      name,
      addressLine1,
      country,
      city
    })
    res.json({ message: "User updated" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error updating user" })
  }
}

export const fetchUser = async (req, res) => {
  try {
    const user = await db.collection("users").doc(req.params.id).get();
    if (!user.exists) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user.data())
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching user" })
  }
}