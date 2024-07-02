# Tech Product Hunt

[Live Site URL](https://assignment-12-d1822.web.app/)

## Description

Tech Product Hunt is a platform where users can discover, share, and review the latest tech products including web apps, AI tools, software, games, and mobile apps. Users can submit new products, upvote or downvote existing products, and post reviews.

## Key Features

1. **User Roles & Permissions**
   - Normal Users: Browse, upvote, submit, and review products.
   - Moderators: Review and approve/reject products, handle reported products, mark products as featured.
   - Admins: Manage user roles, monitor site activities.

2. **Product Management**
   - Add new products with details such as name, image, description, tags, and external links.
   - Products can be upvoted and reported by users.
   - Moderators can accept/reject and feature products.

3. **Authentication**
   - User registration and login with email/password and Google Sign-in.
   - JWT-based authentication to secure API routes.

4. **Responsive Design**
   - Fully responsive layout for mobile, tablet, and desktop views.

5. **User Dashboard**
   - Manage profile information.
   - Add and manage products.
   - Subscription management for premium features.

## Tech Stack

- **Front-end**: React.js, Tailwind CSS, Daisy UI, Axios, Firebase Authentication
- **Back-end**: Node.js, Express.js, MongoDB,  JSON Web Token (JWT)
- **Tools**: Git, GitHub, Vercel

Installation:

1. Clone the repository:

   git clone <repository-url>
   cd product-hunt-clone

2. Install dependencies:

    # Install backend dependencies
   
       cd backend
       npm install

# Install frontend dependencies

      cd ../frontend
      npm install

  Setting Up Environment Variables
  
1. Create a .env file in the backend directory:

     PORT=5000
   
    MONGODB_URI=<your-mongodb-uri>
    
    JWT_SECRET=<your-jwt-secret>

3.   Replace <your-mongodb-uri> and <your-jwt-secret> with your actual MongoDB URI and a secret string for JWT.   
   

   
