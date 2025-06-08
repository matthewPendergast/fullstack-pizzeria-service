# Overview

A full-stack pizza ordering web app being built with React, Node, Express, and PostgreSQL. This project will emulate a real pizza ordering website, and it is currently in active MVP development.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **DevOps:** Docker
- **Testing:** Jest

## MVP Features

- View restaurant menu
- Add/remove items from cart (with anonymous user support)
- Mock checkout with fake order confirmation page
- User signup/login functionality
- Backend stores order info for logged-in users
- Responsive UI inspired by real-world applications

## Roadmap

### MVP Phase:

- ⬜ Design database schema and populate with test seed data
- ⬜ Menu functionality
    - ⬜ Backend: API route for menu retrieval
    - ⬜ Testing: Unit & integration tests
    - ⬜ Frontend: Menu page UI
- ⬜ Cart functionality
    - ⬜ Backend: API routes (add/update/remove/view items)
    - ⬜ Testing: Unit & integration tests
    - ⬜ Frontend: Interactive cart UI
- ⬜ User authentication
    - ⬜ Backend: Signup/login API routes
    - ⬜ Testing: Auth route tests
    - ⬜ Frontend: Signup/Login pages
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
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── index.ts
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
├── scripts/
└── README.md
```
