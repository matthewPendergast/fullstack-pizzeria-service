# Overview

A full-stack pizza ordering web app being built with React, Node, Express, and PostgreSQL. This project will emulate a real pizza ordering website, and it is currently in active MVP development.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **DevOps:** Docker
- **Testing:** Jest

## MVP Features (in progress)

- View restaurant menu
- Add/remove items from cart (with anonymous user support)
- Mock checkout with fake order confirmation page
- User signup/login functionality
- Backend stores order info for logged-in users
- Responsive UI inspired by real-world applications

## Roadmap

### MVP Phase:

- ✅ Menu functionality
    - ✅ Backend: API route for menu retrieval
    - ✅ Testing: Integration tests
    - ✅ Frontend: Menu page UI
- 🔄 User authentication
    - ✅ Backend: Signup/login API routes
    - ✅ Testing: Auth route tests
    - ⬜ Frontend: Signup/login pages
- ⬜ Cart functionality
    - ⬜ Backend: API routes (add/update/remove/view items)
    - ⬜ Testing: Unit & integration tests
    - ⬜ Frontend: Interactive cart UI
- ⬜ Checkout & order placement
    - ⬜ Backend: Checkout/order process
    - ⬜ Testing: Order route tests
    - ⬜ Frontend: Checkout & order confirmation UI
- ⬜ Assess, refine, optimize, & polish
- ⬜ Deployment

## Project Structure

```bash
pizza-store/
├── api/
│   ├── __tests__/
│   ├── db/init/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       ├── app.ts
│       └── index.ts
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
│
└── scripts/
```

## API Documentation

### Menu

- **GET** `/api/menu`

    Returns a list of all available menu items.

    **Response:**

    ```json
    [
    	{
    		"id": 1,
    		"name": "Cheese Pizza",
    		"description": "Three-cheese blend of mozzarella, provolone, and parmesan.",
    		"price": "8.99",
    		"category": "pizza",
    		"image_url": null,
    		"created_at": "2025-06-09T05:55:02.997Z"
    	},
    	{
    		"id": 2,
    		"name": "Pepperoni Pizza",
    		"description": "Crisp pepperoni, mozzarella, provolone, and parmesan.",
    		"price": "9.99",
    		"category": "pizza",
    		"image_url": null,
    		"created_at": "2025-06-09T05:55:02.997Z"
    	}
    ]
    ```

### Authentication

- **POST** `/api/auth/signup`

    Creates a new user account.

    **Request:**

    ```json
    {
    	"username": "john_doe",
    	"email": "john_doe@example.com",
    	"password": "securePassword123"
    }
    ```

    **Response:**

    ```json
    {
    	"id": 1,
    	"username": "john_doe"
    }
    ```

- **POST** `/api/auth/login`

    Logs in an existing user.

    **Request:**

    ```json
    {
    	"email": "john_doe@example.com",
    	"password": "securePassword123"
    }
    ```

    **Response:**

    ```json
    {
    	"id": 1,
    	"username": "john_doe"
    }
    ```
