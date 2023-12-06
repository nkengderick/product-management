# Product Management System with MERN-Stack

This project demonstrates a full-stack application for managing products, built with a Express server connected to a MongoDB database with React user interface integrated.

## Features

- Create, read, update, and delete products using ExpressJs queries and mutations.
- Manage product information like name, image URL, price, and category.
- Includes a pre-populated database with 500 randomized products with images from [picsum.photos](https://picsum.photos/).

## Stack

- **Frontend:** React Js
- **Backend:** Express Server
- **Database:** MongoDB

## How It Works

### Product Model

- A Mongoose schema defines a product structure with fields for name, imageUrl, price, and category.
- Auto-incrementing IDs ensure unique identifiers for each product.

### RESTFul API

Exposes five main functionalities:

- **CreateProduct:** Adds a new product with provided information.
- **getProducts:** Fetches a list of all available products in the database.
- **getProductById:** Fetches a specific product by id.
- **deleteProduct:** Fetches a specific product by id and deletes it.
- **updateProduct:** Fetches a specific product by id and edits it with provided information.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/product-management-system.git
   cd product-management-system

2. Install server dependencies
    ```
    cd server
    npm install
    ```

3. Set up MonogoDB connection
create a `.env` file in the `server` directory and provide your mongoDB string and prefered port

    ```
    PORT: 5000
    MONGODB_URI: 'your_mongodbconnection_string'
    ```

4. Run the Server

    ```
    cd server
    npm start
    ```



## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.


