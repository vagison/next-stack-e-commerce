This file describes the installation process of the e-commerce API for Node JS test task at NextStack.
======================================================================================================

## Pre-installation Setup
1. Create a MongoDB cluster to serve as the database. In the .env file, assign the variables listed in .env.dist with your credentials.
2. Install ts-node and tsc packages globally through ```npm i -g ts-node tsc```

## Installation
To install the API, follow these steps:
1. Clone the repository: ```git clone https://github.com/vagison/next-stack-e-commerce.git```
2. Navigate to the project directory: ```cd next-stack-e-commerce```
3. Install the dependencies: ```npm i```

## Running
To run the API, follow these steps:
1. To start the compiled application located in the dist directory using Node you have to run the following commands:

    ```npm run build```
   
    ```npm start```
3. Alternatively to run the app in development mode with nodemon you have to run the following command: ```npm run dev```
4. To clean the dist directory, you can use the following command: ```npm run clean```

## Environment Configuration
Create a .env file in the root of the project and configure the environment variables listed in .env.dist:

## Seeding (optional)
To use the seeding functionality:
1. Ensure you have MongoDB running and have configured the connection URI via dbConfig through .env.
2. Call the seed function with the desired number of mock products, instead of ```number``` to generate and insert into the database: ```npm run seed number```.

## API description
app.js is the entry point of the app. It starts the server, initiates the the database connection and more:

The folder structure of the project is self explanatory. Here's a brief introduction to it:
-------------------------------------------------------------------------------------------
* Config: Contains all configurations required for database connection, CORS, and JWT settings.
* Controllers: Houses the actual implementations of server-side functions.
* Middleware: Includes functions meant to be executed when Routes attempt to access Controllers. This also contains error-handling logic, cookie parser, and Express validators.
* Models: Defines the schemas for server-side entities.
* Routes: Represents server-side endpoints that expect calls from the client-side. Routes redirect these calls to Controllers.
* Util: Serves as a folder to store seeding and helper functions, validator schemas and database initializing logic.

There are some files in the root directory apart from app.js:
-------------------------------------------------------------
* package.json - includes a list of the packages and their versions used for this project.
* tsconfig.json - is the TypeScript configuration file, defining compiler options and project settings.
* .gitignore - used to exclude files from being pushed to the repository.

Server-side entities
---------------------
* Order
* Product
* User

## Using API endpoints
To use the endpoints, you can visit the Postman URL below and then either fork or download the collection:

https://www.postman.com/grey-equinox-5383/workspace/d2829742-cad9-4980-812b-0c5fe19db744/collection/24141891-a1c31902-f240-456c-b79d-e758880a8053

The request names are self-explanatory, and any additional information can be found within the requests themselves.

Note that the local variable "baseURL" should be manually set in your Postman client (in Environments section) according to your usage (default is http://localhost:3000).