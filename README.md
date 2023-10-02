# Inspire My Space

Inspire My Space is a revolutionary interior design application designed to elevate your decision-making process when it comes to transforming your living spaces. Whether you're an individual looking to revamp your home or a professional interior designer seeking a powerful tool, Inspire My Space provides a visually engaging platform to bring your design visions to life.

### Installation & Usage
To run the application locally, follow these steps:

1. Copy the SSH key on the GitHub Repo.
2. Open your terminal and navigate to the desired directory using the command `cd <write file path here>`.
3. Run the command `git clone <Paste SSH key here>`.
6. Run the command `npm install` to install the required dependencies.
7. Run the command `code .` in the terminal to open the project in VSCode.
8. Go to ElephantSQL website and create a cluster and respective database. Make sure to copy the SRV connection string as you will need it later. 
9. In the interior-server folder create a file called `.env`.
10. In this file paste the following:
`FLASK_APP=app 
FLASK_DEBUG=1
SQLALCHEMY_DATABASE_URI=<Add SRV connection string from ElephantSQL>`
11. Run the commands `pipenv shell` & `pipenv install` in the terminal.
12. Run the command  `interior-client` & `npm run dev` in the terminal.
13. Open the project accessing: `http://localhost:5173/.

## Tech Stack
Inspire My Space is built using the following technologies - make sure are available when following Installation & Usage:

- Frontend: HTML, CSS, Javascript, React, Three.js, Vitest
- Backend: Python (Flask), Docker, PostgreSQL, Amazon Cloud Storage Service, GitHub Actions, Pytest

## Process

1. **Project Planning:** Reading the project brief and discussing ideas.
2. **UI/UX Design:** Played CrazyEights to sketch out quick ideas for app visuals. 
3. **Backend Development**: Implemented the server using Python and Flask to handle user requests and interact with the APIs. Created databases using PostgreSQL to storage and manage data, in addition to Amazon Cloud Storage Service. Used Docker to containerise the app.
4. **Frontend Development:** Developed the user interface using HTML, CSS and Javascript, React and Three.js and integrated with the backend APIs.
5. **Testing:** Performed unit testing with Vitest and Pytest to identify and fix issues. Implemented Github Actions for testing deployment. 
6. **Deployment**: Deployed the application using Netlify for the frontend and Render for the backend.

## Features

### Explore Environments
Dive into a world of possibilities with our Explore page, featuring Environment Maps of various room types, including kitchens, bedrooms, living rooms, and more. Each Environment Map offers a vivid, immersive experience that lets you step into your dream space.

### Like, Comment and Save
Love what you see? Now you can like and save your favorite designs right in your user profile. Easily revisit and draw inspiration from the designs that captivate you the most.

### Designer Contact
In the Explore page, discover the work of talented interior designers. Want to learn more about their creative process or discuss your own project? A simple tap provides you with direct access to the designer's contact information.

### Panoramic View
Immerse yourself in your designs like never before with our panoramic view feature. Get a 360-degree perspective of your dream space and make sure every detail aligns perfectly with your vision.

### User Signup and Login
Our robust login and registration system ensures that only legitimate users have access to the platform. Your information is protected, and you can confidently engage with others in the community.

## Wins and Challenges

### Wins
- Successfully implemented a user-friendly and visually appealing interface
- Integrated authentication features like login and sign up using JWT tokens


### Challenges
- Working with Github Actions
- Vitest and Pytest setup


# Contributors
-Barbara Fajardo
-Chelsea Mogwo
-Emre Duzgun
-Francesca Callard
-Sam McGinnes
-Valentin Abrutin

