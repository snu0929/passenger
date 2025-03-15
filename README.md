Passenger Management System
This is a full-stack web application built with React.js for the frontend and Node.js/Express with MongoDB for the backend. The application allows users to add multiple passengers, upload photos (PNG/JPEG) and ID cards (PDF), and display the passenger data in a table.

Features
Frontend (React.js)
Add Multiple Passengers:

Form with fields for Name, Age, Gender, Contact, Email, Photo (PNG/JPEG), and ID Card (PDF).

Dynamically add or remove passenger rows.

Display Passenger Data:

Table showing passenger details, including a thumbnail of the photo and a link to download the ID card.

Search Functionality:

Search passengers by name or email.

Delete Passenger:

Delete a passenger from the table.

Backend (Node.js/Express & MongoDB)
API Endpoints:

POST /api/add: Add multiple passengers with file uploads.

GET /api: Fetch all passengers.

DELETE /api/delete/:id: Delete a passenger by ID.

File Uploads:

Photos and ID cards are saved in the uploads directory.

Files are served as static assets.

Technologies Used
Frontend
React.js: Frontend library for building the user interface.

Axios: For making HTTP requests to the backend.

Styled Components: For styling the components.

Backend
Node.js: JavaScript runtime for the backend.

Express.js: Web framework for building the API.

MongoDB: Database for storing passenger data.

Multer: Middleware for handling file uploads.

Setup Instructions
Prerequisites
Node.js and npm installed on your machine.

MongoDB installed and running locally or a connection string for a remote MongoDB instance.

Backend Setup
Clone the repository:

```
git clone https://github.com/snu0929/passenger.git
cd backend
Install dependencies:
```
```
npm install
```
Create a .env file in the root directory and add your MongoDB connection string:

```
MONGO_URI=mongodb://localhost:27017/passenger-management
PORT=8080
```
Start the backend server:
```
npm start
```
The backend will run on http://localhost:8080.

Frontend Setup
Navigate to the frontend folder:

bash
Copy
cd frontend
Install dependencies:

```
yarn install
```
Start the frontend development server:

```
npm start
```
The frontend will run on http://localhost:3000.

API Endpoints
Add Passengers
URL: POST /api/add

Request Body:

json
Copy
{
  "passengers": [
    {
      "name": "John Doe",
      "age": 25,
      "gender": "Male",
      "contact": "1234567890",
      "email": "john@example.com",
      "photo": "<file>",
      "idCard": "<file>"
    }
  ]
}
Response:

json
Copy
{
  "msg": "Passengers added",
  "createdPassengers": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "John Doe",
      "age": 25,
      "gender": "Male",
      "contact": "1234567890",
      "email": "john@example.com",
      "photo": "1698765432100-photo.png",
      "idCard": "1698765432100-idcard.pdf"
    }
  ]
}
Fetch All Passengers
URL: GET /api

Response:

json
Copy
{
  "passengers": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "John Doe",
      "age": 25,
      "gender": "Male",
      "contact": "1234567890",
      "email": "john@example.com",
      "photo": "1698765432100-photo.png",
      "idCard": "1698765432100-idcard.pdf"
    }
  ]
}
Delete a Passenger
URL: DELETE /api/delete/:id

Response:

json
Copy
{
  "msg": "Passenger deleted successfully",
  "passenger": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "age": 25,
    "gender": "Male",
    "contact": "1234567890",
    "email": "john@example.com",
    "photo": "1698765432100-photo.png",
    "idCard": "1698765432100-idcard.pdf"
  }
}
Screenshots
Add Passengers Form
Add Passengers Form

Passenger Table
Passenger Table

Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

