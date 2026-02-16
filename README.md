# KancraOne WMS Frontend
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/kancralabs/kancraone-wms-fe)

KancraOne WMS is the frontend application for a modern Warehouse Management System. Built with a robust and scalable tech stack including React, TypeScript, and Vite, it provides a performant and user-friendly interface for managing warehouse operations.

## ✨ Key Features

- **Modern Authentication**: Secure login page with a sleek gradient UI, input validation, and loading states.
- **Responsive Dashboard**: A feature-rich dashboard layout with a collapsible sidebar, user profile menu, and responsive design for all devices.
- **Component-Based UI**: Built with **Shadcn UI**, offering a set of beautiful, accessible, and reusable components.
- **Type-Safe Codebase**: Fully written in **TypeScript** for an enhanced developer experience and fewer runtime errors.
- **Client-Side Routing**: Seamless navigation powered by **React Router**, including protected routes for authenticated users.
- **API Integration**: Configured with **Axios** for smooth communication with backend services, including interceptors for token management and error handling.
- **Fast Development**: Utilizes **Vite** for a blazing-fast development server and optimized production builds.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Linting**: ESLint, TypeScript-ESLint

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kancralabs/kancraone-wms-fe.git
    cd kancraone-wms-fe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Open the newly created `.env` file and set the `VITE_API_URL` to your backend API endpoint.
    ```env
    VITE_API_URL=http://localhost:3000/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🔐 Authentication & Demo Mode

The application includes a built-in demo mode for testing the UI without a live backend connection.

-   **Demo Login**: The login page (`src/pages/LoginPage.tsx`) is currently configured to bypass backend authentication for rapid UI development. You can use the credentials `username: admin` and `password: admin` to proceed to the dashboard.

-   **Connecting to Backend**: To integrate with a real backend, modify the `src/context/AuthContext.tsx` file:
    1.  Uncomment the `axiosInstance` and `LoginResponse` imports.
    2.  Remove or comment out the "Demo mode" login logic.
    3.  Uncomment the `axiosInstance.post` block to make a real API call.

## 📁 Project Structure

The project structure is organized to be scalable and maintainable.

```
src/
├── App.tsx             # Main app component with routing setup
├── assets/             # Static assets like images and fonts
├── components/         # Reusable React components
│   ├── layout/         # Layouts like DashboardLayout
│   ├── ui/             # Shadcn-UI based components (Button, Card, etc.)
│   └── ProtectedRoute.tsx # Route protection logic for authentication
├── context/            # React Context providers (e.g., AuthContext)
├── lib/                # Utility functions (cn) and Axios setup
├── pages/              # Top-level page components (LoginPage, HomePage)
├── types/              # TypeScript type definitions
├── index.css           # Global styles and Tailwind CSS directives
└── main.tsx            # Application entry point
```

## 📜 Available Scripts

-   **`npm run dev`**: Starts the Vite development server with hot-reloading.
-   **`npm run build`**: Compiles TypeScript and builds the app for production in the `dist/` directory.
-   **`npm run lint`**: Lints the codebase using ESLint to enforce code quality.
-   **`npm run preview`**: Serves the production build locally for previewing.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

Copyright © 2026 Kancra Labs. All rights reserved.
