import { Express, request, response } from 'express'
import SwaggerJsdoc from 'swagger-jsdoc'
import SwaggerUi from 'swagger-ui-express'
import { version } from '../../package.json'
import log from './logger'

const options: SwaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "YumRun API Docs",
      version,
    },
    components: {
      // securitySchemes: {
      //   FirebaseFirestore: {
      //     type: 'apiKey',
      //     name: 'Authorization',
      //   }
      // }
    },
    security: [
      // {
      //   FirebaseFirestore: []
      // }
    ]
  },
  apis: ['./src/router.ts', './src/server.ts', './src/schema/*.ts'],
}

const swaggerSpec = SwaggerJsdoc(options);

function swaggerDoc(app: Express, port: number) {
  // swagger page
  app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))

  // docs in JSON format
  app.get('docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)

    log.info("Docs avaliable at http://localhost:" + port + "/docs")
  })
}

export default swaggerDoc