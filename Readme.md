# Product Management System with MERN-Stack

This project demonstrates a full-stack application for managing products, built with a Express server connected to a MongoDB database with React user interface integrated.

## Features

- Create, read, update, and delete products using ExpressJs queries and mutations.
- Manage product information like name, image URL, price, quantity and category.
- Includes a pre-populated database with 500 randomized products with images from [picsum.photos](https://picsum.photos/).
- User Interface integrated to interact with the server

## Stack

- **Frontend:** React Js
- **Backend:** Express Server
- **Database:** MongoDB

## How It Works

### Product Model

- A Mongoose schema defines a product structure with fields for name, imageUrl, price, quantity and category.
- Auto-incrementing IDs ensure unique identifiers for each product.

### RESTFul API

Exposes five main functionalities:

- **CreateProduct:** Adds a new product with provided information.
- **getProducts:** Fetches a list of all available products in the database.
- **getProductById:** Fetches a specific product by id.
- **deleteProduct:** Fetches a specific product by id and deletes it.
- **updateProduct:** Fetches a specific product by id and edits it with provided information.

### React Frontend Components

The React frontend of the Product Management System includes several components for a user-friendly interface.

### Home Component

The `Home` component serves as the landing page where users can view a list of products, search for products by name, and filter products based on categories.

- Features:
  - Display a list of products with images, names, prices, and categories.
  - Implement a search bar to filter products by name.
  - Responsive design for optimal user experience.

### ProductForm Component

The `ProductForm` component provides a form for users to add new products to the system.

- Features:
  - Input fields for product name, image URL, price, and category.
  - Submission of the form sends data to the server for product creation.
  - User-friendly interface for adding products.

### ProductList Component

The `ProductList` component offers an organized view of products with filtering options.

- Features:
  - Display products in a card format with images and details.
  - Filter products by category and price range using dropdown menus.
  - Real-time updating of the product list based on user selections.

### SearchBar Component

The `SearchBar` component is a reusable search bar used in the `Home` component.

- Features:
  - Input field for searching products by name.
  - Dynamic updating of the product list based on user input.

### InventoryTracking Component

The `InventoryTracking` component allows users to track inventory levels, update quantities, and delete products.

- Features:
  - Displays current stock levels and allows users to increment, decrement, or delete products from the inventory table.
  - Provides visual cues for low-stock items.

### Report Component

The `Report` component generates a report summarizing the number of categories, products, quantity, unit price, and total price for each category.

- Features:
  - Provides an overview of the inventory with category-wise totals and average unit price.
  - Lists low-stock items and allows users to print the report.


### Styling and UI Enhancements

CSS styles have been applied to enhance the user interface, including:

- Responsive design for optimal viewing on various devices.
- Consistent styling across components for a cohesive look and feel.

Feel free to explore each component for a detailed understanding of their features and functionality.


## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/nkengderick/product-management.git
   cd product-management-system

2. Navigate to the Project directory
    ```
    cd project-management
    ```

3. Install server dependencies
    ```
    cd server
    npm install
    ```

4. Set up MonogoDB connection
create a `.env` file in the `server` directory and provide your mongoDB string and prefered port

    ```
    PORT: 5000
    MONGODB_URI: 'your_mongodbconnection_string'
    ```

5. Run the Server

    ```
    cd server
    npm start
    ```
6. Install client dependencies
    ```
    cd client
    npm install
    ```

7. Run the client
    ```
    cd client
    # $env:REACT_APP_API_URL="your_server_url e.g http://localhost:5000/api"
    # >> npm start
    ```
8. Host the site


## How to Use

### 1. Search for Products on Home Page
  
- On the Home page, you can use the search bar to find products by `name` or `category`.
- Simply start typing in the `search bar`, and the product list will dynamically update based on your search term.
  
### 2. View and Sort Products on Product List Page

- Navigate to the Product List page by clicking `Products` top right.
- Use the dropdown menus to filter products based on `category` and `price range`.
- The product list will update in real-time according to the selected category and price range.
  
### 3. Add a New Product
  
- Navigate to tha Add Product page by clicking `Add Product` top right.
- Fill in the required details, such as name, image URL, price, and category.
- Click the "Add Product" or "Submit" button to add the new product to the database.

Feel free to explore other features and functionalities provided by the application.

### 4. Track Inventory

- Navigate to the `InventoryTracking` page by clicking `Inventory` top right.
- View current stock levels, increment, decrement, or delete products directly from the inventory table.

### 5. Generate and Print Inventory Report

- Navigate to the `Report` page by clicking `Report` top right.
- View a summary of the number of categories, products, quantity, unit price, and total price for each category.
- Print the report for your records.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE](https://choosealicense.com/licenses/isc/) file for details.

