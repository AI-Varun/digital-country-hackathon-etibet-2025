<img width="932" alt="image" src="https://github.com/user-attachments/assets/b5554f68-f508-4cdb-8e48-5ccb03f5eef5" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/bc8e4b96-7983-4383-9901-66a8013532ee" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/5a31f1f6-ba58-44be-b5f0-e709c57528de" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/f0300291-c0bf-4b80-8c48-962cfaae9baf" />

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

## Testing MFA Verification

### Quick Test Setup
For development testing, use:
- Email: `abc@gmail.com`
- Any 6-digit OTP will work
- No actual email will be sent

### Test Flow
1. Enter `abc@gmail.com` as the email
2. System will generate a test OTP (visible in browser console)
3. Enter any 6 digits as OTP
4. System will auto-verify and redirect

### Console Output
When using test mode, you'll see:
```typescript
// On email submission
🔑 TEST MODE: {
  email: "abc@gmail.com",
  testOTP: "123456", // Random 6-digit number
  walletAddress: "0x..." // Current wallet address
}

// On verification
TEST MODE: Auto-verifying OTP
```

### Development Notes
- The test email bypass is only available in development
- Real email verification should be implemented for production
- Check browser console (F12) to see test OTP codes

### Additional Logging and Error Messages
These changes will:
1. Add more detailed logging for test mode
2. Make it clearer when test mode is active
3. Provide better error messages
4. Document the testing process in the README

Remember to check the server logs for the actual 500 error cause, as it might need configuration updates in [server/controllers/authController.js](server/controllers/authController.js).

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
