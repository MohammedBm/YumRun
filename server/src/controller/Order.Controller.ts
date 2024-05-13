import Stripe from 'stripe';
import db from '../db';
require('dotenv').config()

const STRIPE = new Stripe(process.env.STRIPE_API_KEY)
const FRONTEND_URL = process.env.FRONTEND_URL
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string
    name: string
    quantity: number
  }[];
  deliveryDetails: {
    email: string
    name: string
    addressLine1: string
    city: string
  }
  storeId: string,
  userId: string
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await db.collection('orders').where('user', '==', req.body.userId).get()
    const ordersData = orders.docs.map((order) => {
      return {
        id: order.id,
        ...order.data()
      }
    })
    res.json(ordersData)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error });
  }
}

export const getMyStoreOrders = async (req, res) => {
  try {
    const store = await db.collection('stores').where('user', '==', req.body.userId).get()

    if (store.size === 0) {
      return res.status(404).json({ message: 'Store not found' })
    }

    const orders = await db.collection('orders').where('store._id', '==', store.docs[0].id).get()

    const ordersData = orders.docs.map((order) => {
      return {
        id: order.id,
        ...order.data()
      }
    })

    res.json(ordersData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error });
  }

}

export const stripeWebhookHandler = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.log("error message is here =====> ", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }


  if (event.type === 'checkout.session.completed') {
    const order = await db.collection('orders').doc(event.data.object.metadata.orderId).get()

    if (!order.exists) {
      return res.status(404).json({ message: 'Order not found' })
    }

    await order.ref.update({ status: 'paid', totalAmount: event.data.object.amount_total })
  }

  res.status(200).send()
}

export const createCheckoutSession = async (req, res) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body
    //fetch restaurant by id
    const storeRef = await db.collection('stores').doc(checkoutSessionRequest.storeId).get();
    const storeData = storeRef.data();
    const menuItemsQuery = await storeRef.ref.collection('menuItems').get();
    const menuItems = menuItemsQuery.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    // store with menuItems

    const store = {
      ...storeData,
      _id: storeRef.id,
      deliveryPrice: storeData.deliveryPrice,
      menuItems: menuItems,
    }
    if (!storeRef.exists) {
      throw new Error('Store not found')
    }


    // createee new order with store info and user info
    const newOrder = await db.collection('orders').add({
      store: store,
      user: checkoutSessionRequest.userId,
      status: 'placed',
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      createdAt: new Date()
    })

    // console.log(checkoutSessionRequest.userId)
    const lineItems = createLineItems(checkoutSessionRequest, store.menuItems)
    const session = await createSession(lineItems, newOrder.id, store.deliveryPrice, store._id)

    if (!session.url) {
      return res.status(500).json({ message: 'Error creating stripe session' })
    }

    await newOrder;
    res.json({ url: session.url })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.raw.message })
  }

}

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any[]) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find((item) => item.id.toString() === cartItem.menuItemId.toString())

    if (!menuItem) {
      throw new Error(`Menu item not found ${cartItem.menuItemId}`)
    }

    // console.log(menuItem)
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: cartItem.quantity
    }
    return line_item
  })

  return lineItems
}

const createSession = async (lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], orderId: string, deliveryPrice: number, storeId: string) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: (deliveryPrice), // Convert deliveryPrice to cents
            currency: "usd"
          }
        }
      }
    ],
    mode: 'payment',
    metadata: {
      orderId,
      storeId
    },
    success_url: `${FRONTEND_URL}/order-status?succes=true`,
    cancel_url: `${FRONTEND_URL}/detail/${storeId}?canceled=true`
  })

  return sessionData
}

