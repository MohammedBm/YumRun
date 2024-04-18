/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUser:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: JohnDoe@email.com
 *        name:
 *          type: string
 *          default: John Doe
 *        addressLine1:
 *          type: string
 *          default: 123 Main St
 *        country:
 *          type: string
 *          default: USA
 *        city:
 *          type: string
 *          default: New York
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        email:
 *          type: string
 */

