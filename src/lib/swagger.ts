import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory API",
      version: "1.0.0",
      description: "API documentation for Inventory System",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
    ],
  },
//   apis: ["./app/api/**/*.ts"],
  apis: ["./src/app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
