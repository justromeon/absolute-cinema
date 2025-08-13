# Absolute Cinema

Modern web application that allows users to discover trending movies and search for their next favorite film. It features a clean, responsive design and a fast, debounced search functionality powered by the TMDB API. The project has been successfully ported from JavaScript to TypeScript for improved type-safety and developer experience.

### Prerequisites

You'll need **Node.js** (LTS recommended) and **npm** installed on your system, as well as a working **PostgreSQL server**.

## Database Setup

You will need to set up your PostgreSQL database and run the following SQL script to create the necessary table:

```sql
CREATE TABLE movies (
    movie_id INT PRIMARY KEY NOT NULL,
    count INT DEFAULT 1 NOT NULL,
    poster_url TEXT
);
```

### Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
VITE_TMDB_API_KEY="your_api_key_here"
POSTGRES_URL="your_postgres_url"
```

### Installation

1. Clone the repository:

   ```bash
   git clone <repo_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd absolute-cinema
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Features

* **Trending Movies:** See a list of trending movies on the homepage based on user search count.
* **Movie Search:** A debounced search input to find specific movies.
* **Responsive Design:** An optimized user interface for various screen sizes.
* **TypeScript support:** The entire codebase is now type-safe.

## Technology Stack

* **React:** A JavaScript library for building user interfaces.
* **TypeScript:** A typed superset of JavaScript for enhanced development.
* **Vite:** A fast build tool for modern web projects.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Neon Postgres:** A serverless SQL database to store search counts.
