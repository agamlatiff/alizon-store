# AlizonStore

AlizonStore is a full-stack e-commerce platform built with modern web technologies. It serves as a portfolio project to showcase proficiency in building robust, scalable, and user-friendly web applications. The platform features separate interfaces for customers and sellers, providing a complete e-commerce experience from product browsing to order management.

## Features

### Customer-Facing (Storefront)

  * **Product Catalog:** Browse products with filtering and searching capabilities.
  * **Shopping Cart:** Add products to a cart and manage quantities.
  * **Checkout Process:** A seamless checkout process with a simulated payment gateway.
  * **User Authentication:** Sign up, sign in, and log out with credentials or Google.

### Seller-Facing (Dashboard)

  * **Sales Analytics:** View key metrics like total revenue, sales, and customer count on a dashboard with charts.
  * **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products.
  * **Category Management:** Organize products into categories with CRUD operations.
  * **Brand Management:** Manage brands with CRUD functionality.
  * **Location Management:** Manage store locations with CRUD functionality.
  * **Order Management:** View and manage customer orders.
  * **Customer Management:** View a list of all registered customers.

## Tech Stack

This project is built with a modern, full-stack tech stack:

  * **Framework:** [Next.js](https://nextjs.org/) (React)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/ui](https://ui.shadcn.com/) for UI components
  * **Database:** [PostgreSQL](https://www.postgresql.org/)
  * **ORM:** [Prisma](https://www.prisma.io/)
  * **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Credentials and Google Provider)
  * **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
  * **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
  * **Form Validation:** [Zod](https://zod.dev/)
  * **Charts:** [Recharts](https://recharts.org/)
  * **File Storage:** [Supabase Storage](https://supabase.com/storage)
  * **Deployment:** Vercel

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js (v18 or later recommended)
  * npm, yarn, or pnpm
  * PostgreSQL database

### Installation

1.  **Clone the repo**

    ```sh
    git clone https://github.com/agamlatiff/alizon-store.git
    ```

2.  **Install NPM packages**

    ```sh
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env.local` file in the root of the project and add the necessary environment variables. You'll need to include database credentials, NextAuth.js settings, and Supabase credentials.

4.  **Run database migrations**

    ```sh
    npx prisma migrate dev
    ```

5.  **Start the development server**

    ```sh
    npm run dev
    ```

    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## Contact

Agam Latifullah - [agam.latiff@gmail.com](mailto:agam.latiff@gmail.com)

Project Link: [https://github.com/agamlatiff/alizon-store](https://www.google.com/search?q=https://github.com/agamlatiff/alizon-store)
