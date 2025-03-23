# Identity Hashers

A digital identity management system for creating and verifying digital identities using blockchain technology.

## About

Identity Hashers is a full-stack application that provides secure digital identity solutions using blockchain technology. The project consists of a React frontend and a Node.js backend with MongoDB for storage.

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Ethers.js
- Web3.js

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Smart Contracts (Solidity)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- MetaMask wallet
- Git

## Project Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/identity-hashers.git
cd identity-hashers
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Update .env with your backend API URL
npm start
```

The frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CONTRACT_ADDRESS=your_contract_address
```

## API Documentation

API documentation is available at `http://localhost:5000/api-docs` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/yourusername/identity-hashers](https://github.com/yourusername/identity-hashers)
