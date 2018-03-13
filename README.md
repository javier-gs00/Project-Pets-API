# Project-Pets-API

## ABOUT

API for Project Pets built with Nodejs and Express, connecting to a MongoDB database.

It is fully functional and currently hosted on Heroku, in the following link.

> https://project-pets-api.herokuapp.com/api

App still in development.

---
## ENDPOINTS

### Search products (GET)
/api/product?query=user_query

### Search a product by Id (GET)
/api/product/:id

### Search products by category (GET)
/api/product/category/:category

### Get all the stores (GET)
/api/stores

### Get a single store by name (GET)
/api/stores/:store_name