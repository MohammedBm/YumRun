/**
 * @openapi
 * components:
 *  schemas:
 *    CreateStore:
 *      type: object
 *      required:
 *        - storeName
 *        - city
 *        - country
 *        - deliveryPrice
 *        - deliveryTime
 *        - imageFile
 *        - user
 *        - cuisines
 *        - menuItems
 *      properties:
 *        storeName:
 *          type: string
 *          default: John's Pizza
 *        city:
 *          type: string
 *          default: New York
 *        country:
 *          type: string
 *          default: USA
 *        deliveryPrice:
 *          type: number
 *          default: 500
 *        deliveryTime:
 *          type: string
 *          default: 30
 *        imageFile:
 *          type: string
 *          default: http://dummyimage.com/226x100.png/ff4444/ffffff
 *          format: uri
 *        user:
 *          type: string
 *          default: 123456
 *        cuisines:
 *          type: array
 *          items:
 *            type: string
 *          example: ["Pizza", "Chiness"]
 *        menuItems:
 *          type: array
 *          items:  
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: Tuna
 *              price:
 *                type: number
 *                default: 550
 *    CreateStoreResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        storeName:
 *          type: string
 *        city:
 *          type: string
 *        country:
 *          type: string
 *        deliveryPrice:
 *          type: number
 *        deliveryTime:
 *          type: string
 *        cuisines:
 *          type: array
 *        menuItems:
 *          type: array
 */

