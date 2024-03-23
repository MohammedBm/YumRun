/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUser:
 *      type: object
 *      required:
 *        - name
 *        - age
 *      properties:
 *        name:
 *          type: string
 *          default: John Doe
 *        age:
 *          type: integer
 *          default: 30
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        age:
 *          type: integer
 */

