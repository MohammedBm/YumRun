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

// Function to get the details of a store
export const fetchStore = async (req, res) => {
  try {
    const storeQuery = db.collection('stores').where('user', '==', req.params.id);
    const storeSnapshot = await storeQuery.get();
    // Check if the query returned any documents
    if (storeSnapshot.empty) {
      return res.status(404).json({ message: 'Store not found' });
    }


    // Get the store data from the first document returned by the query
    const storeData = storeSnapshot.docs[0].data();

    // Get the menu items for the store
    const menuItemsQuery = await storeSnapshot.docs[0].ref.collection('menuItems').get();
    const menuItems = menuItemsQuery.docs.map((doc) => doc.data());

    // Send the store data and menu items back to the client
    //combine store and menuItems into one object
    res.json({
      ...storeData,
      menuItems: menuItems,
    });
    // query that searches store collection for an object with req.params.id
    // get the store object
  } catch (error) {
    // Send an error response back to the client
    console.error('Error getting store and menu items:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { user, storeName, city, country, deliveryPrice, deliveryTime, cuisines, imageFile, menuItems } = req.body;
    const storeRef = await db.collection('stores').where('user', '==', req.params.id).get();
    if (storeRef.empty) {
      return res.status(404).json({ message: 'Store not found, from update' });
    }

    const storeDoc = storeRef.docs[0];

    storeDoc.ref.update({
      user,
      storeName,
      city,
      country,
      deliveryPrice,
      deliveryTime,
      cuisines,
      imageFile: req.body.imageFile,
      lastUpdate: Date.now(),
    }).then(() => {
      const mref = db.collection('stores').doc(storeDoc.id);
      const menuItemsCollectionRef = mref.collection('menuItems');
      menuItemsCollectionRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      }).then(() => {
        // Add new documents based on your current form values
        for (const menuItem of req.body.menuItems) {
          menuItemsCollectionRef.add(menuItem)
            .then(() => {
              console.log('Menu item added successfully');
            })
            .catch((error) => {
              console.error('Error adding menu item:', error);
            });
        }
      }).catch((error) => {
        console.error('Error deleting menu items:', error);
      });

    })
    res.json({
      message: 'Store updated',
      data: {
        user,
        storeName,
        city,
        country,
        deliveryPrice,
        deliveryTime,
        cuisines,
        menuItems,
        imageFile,
        lastUpdate: Date.now(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating store' });
  }
}

export const fetchStoreById = async (req, res) => {
  try {
    const storeRef = await db.collection('stores').doc(req.params.id).get();
    if (!storeRef.exists) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const storeData = storeRef.data();
    const menuItemsQuery = await storeRef.ref.collection('menuItems').get();
    // fetch menu item with their respective menuItem id
    const menuItems = menuItemsQuery.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    res.json({
      ...storeData,
      menuItems: menuItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching store' });
  }
}