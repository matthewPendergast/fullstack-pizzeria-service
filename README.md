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
- User signup/login functionality
- Add/remove items from cart
- Mock checkout with fake order confirmation page
- Backend stores order info for logged-in users
- Responsive UI inspired by real-world applications

## Roadmap

### MVP Phase:

- ✅ Menu functionality
    - ✅ Backend: API route for menu retrieval
    - ✅ Testing: Integration tests
    - ✅ Frontend: Menu page UI
- ✅ User authentication
    - ✅ Backend: Signup/login API routes
    - ✅ Testing: Auth route tests
    - ✅ Frontend: Signup/login pages
- ⬜ Cart functionality
    - ⬜ Backend: API routes (add/update/remove/view items)
    - ⬜ Testing: Unit & integration tests
    - ⬜ Frontend: Interactive cart UI
- ⬜ Checkout & order placement
    - ⬜ Backend: Checkout/order process
    - ⬜ Testing: Order route tests
    - ⬜ Frontend: Checkout & order confirmation UI
- ⬜ UI/UX
- ⬜ Assess, refine, optimize, & polish
- ⬜ Deployment

## API Documentation

### Menu

<details>
	<summary>
		<b>GET</b>
		<code>/api/menu</code>
		(Returns a list of all available menu items)
	</summary>

#### Parameters

> None

#### Headers

> None

#### Responses

> | HTTP Code | Content-Type       | Response                      |
> | --------- | ------------------ | ----------------------------- |
> | `200`     | `application/json` | Array of menu items           |
> | `500`     | `application/json` | Failed to retrieve menu items |

#### Example Response

> ```json
> [
> 	{
> 		"id": 1,
> 		"name": "Cheese Pizza",
> 		"description": "Three-cheese blend of mozzarella, provolone, and parmesan.",
> 		"price": "8.99",
> 		"category": "pizza",
> 		"image_url": null,
> 		"created_at": "2025-06-09T05:55:02.997Z"
> 	},
> 	{
> 		"id": 2,
> 		"name": "Pepperoni Pizza",
> 		"description": "Crisp pepperoni, mozzarella, provolone, and parmesan.",
> 		"price": "9.99",
> 		"category": "pizza",
> 		"image_url": null,
> 		"created_at": "2025-06-09T05:55:02.997Z"
> 	}
> ]
> ```

---

</details>

### Authentication

<details>
	<summary>
		<b>POST</b>
		<code>/api/auth/signup</code>
		(Creates a new user account)
	</summary>

#### Parameters

> | Name     | Type     | Data Type | Description              |
> | -------- | -------- | --------- | ------------------------ |
> | username | required | string    | Desired username         |
> | email    | required | string    | Email for the account    |
> | password | required | string    | Password for the account |

#### Headers

> | Name         | Value            | Required | Description            |
> | ------------ | ---------------- | -------- | ---------------------- |
> | Content-Type | application/json | Yes      | Must be JSON formatted |

#### Responses

> | HTTP Code | Content-Type       | Response        |
> | --------- | ------------------ | --------------- |
> | `201`     | `application/json` | id and username |
> | `400`     | `application/json` | Missing fields  |
> | `500`     | `application/json` | Signup failed   |

#### Example Request

> ```json
> {
> 	"username": "john_doe",
> 	"email": "john_doe@example.com",
> 	"password": "securePassword123"
> }
> ```

#### Example Response

> ```json
> {
> 	"id": 1,
> 	"username": "john_doe"
> }
> ```

---

</details>

<details>
	<summary>
		<b>POST</b>
		<code>/api/auth/login</code>
		(Logs in an existing user)
	</summary>

#### Parameters

> | Name     | Type     | Data Type | Description         |
> | -------- | -------- | --------- | ------------------- |
> | email    | required | string    | Registered email    |
> | password | required | string    | Associated password |

#### Headers

> | Name         | Value            | Required | Description            |
> | ------------ | ---------------- | -------- | ---------------------- |
> | Content-Type | application/json | Yes      | Must be JSON formatted |

#### Responses

> | HTTP Code | Content-Type       | Response            |
> | --------- | ------------------ | ------------------- |
> | `200`     | `application/json` | id and username     |
> | `400`     | `application/json` | Missing credentials |
> | `401`     | `application/json` | Invalid credentials |
> | `500`     | `application/json` | Login failed        |

#### Example Request

> ```json
> {
> 	"email": "john_doe@example.com",
> 	"password": "securePassword123"
> }
> ```

#### Example Response

> ```json
> {
> 	"id": 1,
> 	"username": "john_doe"
> }
> ```

---

</details>

<details>
	<summary>
		<b>POST</b>
		<code>/api/auth/logout</code>
		(Logs out the current user)
	</summary>

#### Parameters

> None

#### Headers

> | Name   | Value           | Required | Description                           |
> | ------ | --------------- | -------- | ------------------------------------- |
> | Cookie | token=JWT_TOKEN | Yes      | Must contain a valid token from login |

#### Responses

> | HTTP Code | Content-Type       | Response      |
> | --------- | ------------------ | ------------- |
> | `200`     | `application/json` | Logged out    |
> | `401`     | `application/json` | Unauthorized  |
> | `500`     | `application/json` | Logout failed |

---

</details>

<details>
	<summary>
		<b>GET</b>
		<code>/api/auth/me</code>
		(Returns basic authenticated user info)
	</summary>

#### Parameters

> None

#### Headers

> | Name   | Value           | Required | Description                           |
> | ------ | --------------- | -------- | ------------------------------------- |
> | Cookie | token=JWT_TOKEN | Yes      | Must contain a valid token from login |

#### Responses

> | HTTP Code | Content-Type       | Response        |
> | --------- | ------------------ | --------------- |
> | `200`     | `application/json` | id and username |
> | `401`     | `application/json` | Unauthorized    |

#### Example Response

> ```json
> {
> 	"id": 1,
> 	"username": "john_doe"
> }
> ```

---

</details>

### Health

<details>
	<summary>
		<b>GET</b>
		<code>/api/health</code>
		(Returns basic server health info)
	</summary>

#### Parameters

> None

#### Headers

> None

#### Responses

> | HTTP Code | Content-Type       | Response                         |
> | --------- | ------------------ | -------------------------------- |
> | `200`     | `application/json` | Health status and server metrics |
> | `500`     | `application/json` | Unexpected internal error        |

#### Example Response

> ```json
> {
> 	"status": "ok",
> 	"timestamp": 1718149634291,
> 	"uptime": 5234.1991027
> }
> ```

---

</details>

## Project Structure

> ```bash
> pizza-store/
> ├── api/
> │   ├── __tests__/
> │   ├── db/init/
> │   └── src/
> │       ├── config/
> │       ├── controllers/
> │       ├── middlewares/
> │       ├── models/
> │       ├── routes/
> │       ├── utils/
> │       ├── app.ts
> │       └── index.ts
> │
> ├── client/
> │   ├── public/
> │   ├── src/
> │   │   ├── __tests__/
> │   │   ├── assets/
> │   │   ├── components/
> │   │   ├── context/
> │   │   ├── hooks/
> │   │   ├── pages/
> │   │   ├── App.tsx
> │   │   └── main.tsx
> │   └── index.html
> │
> └── scripts/
> ```
