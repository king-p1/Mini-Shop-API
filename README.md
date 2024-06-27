  Mini Shop API

This is a RESTful API for a mini shop built with Node.js, Express, and MongoDB.
 The API allows users to manage products and orders, including creating, updating, and retrieving product information,
 as well as placing and canceling orders. 

  N.B : There is no user authentication or authorization on this API

Features

- Products: 
  - Get a list of all products
  - Get details of a specific product
  - Add a new product
  - Update details of an existing product
  - Delete a product

- Orders:
  - Create a new order
  - Cancel an order
  - Update details of an existing order
  - Get details of a specific order


-Installation

1. Clone the repository:
    
    git clone https://github.com/your-username/mini-shop-api.git
     
    

2. Install dependencies:
   
    npm install
   

3. Set up environment variables:
    Create a `.env` file in the root directory and add your MongoDB URI and other necessary configurations:
    
    MONGO_URI=your_mongodb_uri
    

4. Start the server:
    
    npm run start
     

-Endpoints:

  -Products :
    -base-url: '/api/v1/products'

-Get all products
  - URL: `/get-all-products`
  - Method: `GET`
  - Description: Retrieves a list of all products available for sale.

- Get a specific product
  - URL : `/get-single-product/:id/:name`
  - Method : `GET`
  - Description : Retrieves details of a specific product by its ID.

- Add a new product 
  - URL : `/create-product`
  - Method : `POST`
  - Description : Adds a new product to the shop.
  - Body :
    json
    {
      "name": "Product Name",
      "price": 100,
      "description": "Product Description",
      "availabile": true
    }
    

- Update a product 
  - URL : `/update-product/:id/:name`
  - Method : `PUT`
  - Description : Updates the details of an existing product by its ID.
  - Body : (Provide any fields you want to update)
    ```json
    {
      "name": "Updated Product Name",
      "price": 150,
      "description": "Updated Description",
      "availability": false
    }
   

- Delete a product 
  - URL : `/delete-product/:id/:name`
  - Method : `DELETE`
  - Description : Deletes the  product by its ID and name.
  

-Orders
    - base url : '/api/v1/orders'

- Create an order
  - URL: `/all-orders`
  - Method: `GET`
  - Description: Retrieves all orders.
  


- Get a specific order
  - URL: `/single-order/:id`
  - Method: `GET`
  - Description: Retrieves details of a specific order.



- Update an order
  - URL : `/update-order/:id`
  - Method : `PUT`
  - Description : Updates an order for a product.
  - Body:
         json:{
      "quantity": 2,
      "status": "Pending",
      "address": "123 Main Street"
    }


- Create an order 
  - URL : `/create-order`
  - Method : `POST`
  - Description : Creates a new order for a product.
  - Body:
         json:{
      "productID": "The id of the interested product"
      "quantity": 2,
      "status": "Pending",
      "address": "123 Main Street"
    }
   

- Cancel an order:
  - URL: `/cancel-order/:id`
  - Method: `DELETE`
  - Description: Cancels an existing order by its ID.

 
-Error Handling

   - The API will return appropriate error messages and status codes for invalid requests, 
      such as missing parameters or non-existent resources.

 