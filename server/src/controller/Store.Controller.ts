// Import necessary Firebase modules
import db from '../db'; // Adjust import path as needed

// Function to create a new store if the user does not already own one
export const createStore = async (req, res) => {
  try {
    console.log(req.body)
    // Query the Firestore database to check if the user already owns a store
    const storeQuery = db.collection('stores').where('user', '==', req.body.user);
    // const querySnapshot = await storeQuery.get();
    // Check if the query returned any documents
    // console.log(storeQuery)

    // If the user does not own a store, proceed to create a new store
    // Generate a unique document ID for the new store
    const storeId = req.body.storeId || db.collection('stores').doc().id;
    // // Reference to the new store document in the Firestore database
    const storeRef = db.collection('stores').doc(storeId);

    console.log(storeId)
    // Set the store data
    await storeRef.set({
      user: req.body.user,
      storeName: req.body.storeName,
      city: req.body.city,
      country: req.body.country,
      deliveryPrice: req.body.deliveryPrice,
      deliveryTime: req.body.deliveryTime,
      cuisines: req.body.cuisines,
      imageFile: req.body.imageFile,
      lastUpdate: Date.now(),
    });

    // Create a subcollection for menu items under the store document
    const menuItemsCollection = storeRef.collection('menuItems');

    // Add each menu item from the request body to the subcollection
    for (const menuItem of req.body.menuItems) {
      // Generate a new document for each menu item with a unique ID
      const newMenuItemRef = menuItemsCollection.doc();

      // Set the menu item data in the subcollection
      await newMenuItemRef.set(menuItem);
    }

    // Send a successful response back to the client
    res.json({
      message: 'Store and menu items created successfully',
      storeId: storeId,
      data: {
        user: req.body.user,
        storeName: req.body.storeName,
        city: req.body.city,
        country: req.body.country,
        deliveryPrice: req.body.deliveryPrice,
        deliveryTime: req.body.deliveryTime,
        cuisines: req.body.cuisines,
        menuItems: req.body.menuItems,
        imageUrl: req.body.imageUrl || '',
        lastUpdate: req.body.lastUpdate,
      },
    });
  } catch (error) {
    // Send an error response back to the client
    console.error('Error creating store and menu items:', error);
    res.status(500).json({ error: error.message });
  }
};
