import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express Demo API",
      version: "1.0.0",
      description:
        "A demo Express.js API with authentication, users, posts, and comments",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            username: {
              type: "string",
              description: "Username",
            },
            email: {
              type: "string",
              description: "User email",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User creation date",
            },
          },
        },
        Post: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Post ID",
            },
            title: {
              type: "string",
              description: "Post title",
            },
            content: {
              type: "string",
              description: "Post content",
            },
            author: {
              $ref: "#/components/schemas/User",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Post creation date",
            },
          },
        },
        Comment: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Comment ID",
            },
            content: {
              type: "string",
              description: "Comment content",
            },
            author: {
              $ref: "#/components/schemas/User",
            },
            post: {
              type: "string",
              description: "Post ID this comment belongs to",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Comment creation date",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            status: {
              type: "integer",
              description: "HTTP status code",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
