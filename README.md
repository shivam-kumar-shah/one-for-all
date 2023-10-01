# One-for-All RESTful API

![one-for-all](https://github.com/shivam-kumar-shah/one-for-all/assets/134827809/6bbe87a3-e186-4f0d-bb91-82afadb652fe)

## Description

One-for-All is a versatile RESTful API designed to serve as a common backend for all current and upcoming minor projects. Built entirely in TypeScript, it provides a solid foundation for various applications. The API leverages MongoDB Atlas for database storage, utilizing Mongoose as the Object-Document Mapper (ODM) for seamless interaction with the database. Authentication is handled through JSON Web Tokens (JWT) for secure access.

This project is built on the Express framework and hosted on Cyclic, ensuring reliable and consistent performance.

## Features

- RESTful architecture for easy integration with frontend applications.
- Utilizes MongoDB Atlas for efficient and scalable database storage.
- Written entirely in TypeScript for robustness and maintainability.
- Authentication powered by JSON Web Tokens for secure access control.

## Technologies Used

- TypeScript
- Express.js
- MongoDB Atlas
- Mongoose (ODM)
- JSON Web Tokens (JWT)

## Environment Variables

Ensure you have the following environment variables set up:

- `CONNECTION_URL`: The connection string for your MongoDB Atlas database.
- `JWT_SECRET`: A secret key for encoding and decoding JSON Web Tokens.
- `HASH_SECRET`: A numeric value for hashing sensitive information.

## Getting Started

1. Clone the repository from [One-for-All GitHub Repo](https://github.com/shivam-kumar-shah/one-for-all).
2. Install the required dependencies using `npm install`.
3. Set up your environment variables, including MongoDB Atlas connection string and JWT secret.
4. Start the server using `npm start`.

## Usage

1. Integrate the API with your frontend applications using the provided endpoints.
2. Utilize the JWT-based authentication for secure access to protected routes.

## Database

One-for-All uses MongoDB Atlas as the database. Ensure you have a valid connection string configured in your environment variables.

## Hosting

This project is hosted on Cyclic for reliable performance and availability.

## Contributing

Contributions are welcome! If you have any ideas, bug fixes, or improvements, please open an issue or submit a pull request.

## Contact

For any inquiries or feedback, feel free to contact us at shivam-kumar-shah@outlook.com.

---

*Happy Coding!* 🚀
