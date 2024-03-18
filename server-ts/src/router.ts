import { Router } from 'express'

const router = Router();

// routers are the supp ui for the app
// app is the whole API

//* Product routes
router.get('/product', (req,res) => {
  res.json({message: "Hello"})
})

router.get('/product/:id', () => {})

router.put('/product/:id', () => {})

router.post('/product/', () => {})

router.delete('/product/:id', () => {})

//* Update Routers
router.get('/update', () => {})

router.get('/update/:id', () => {})

router.put('/update/:id', () => {})

router.post('update/', () => {})

router.delete('/update/:id', () => {})

//* Update Point Route
router.get('/updatepoint', () => { })

router.get('/updatepoint/:id', () => { })

router.put('/updatepoint/:id', () => { })

router.post('updatepoint/', () => { })

router.delete('/updatepoint/:id', () => { })

export default router;