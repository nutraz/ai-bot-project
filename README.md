# Icp_hub

A modern, multichain GitHub-like platform for Web3 development, built on the Internet Computer and supporting multiple blockchain networks.

---

## 🚀 Quick Start: Run Locally (Backend + Frontend)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [DFINITY SDK (dfx)](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 1️⃣ Start the Internet Computer Local Replica (Backend)

```bash
# In the project root (Icp_hub/):
dfx start --background
```

This will start the local Internet Computer replica on `http://localhost:4943`.

---

## 2️⃣ Deploy Canisters (Backend API)

```bash
# In the project root (Icp_hub/):
dfx deploy
```

This will deploy your backend canisters (including `main.mo`) and the asset canister for the frontend.

---

## 3️⃣ Configure Environment Variables (Frontend)

The frontend uses Vite and expects the following environment variables (see `vite.config.js`):
- `VITE_DFX_NETWORK` (default: `local`)
- `VITE_BACKEND_CANISTER_ID` (from `dfx canister id Icp_hub_backend`)
- `VITE_INTERNET_IDENTITY_CANISTER_ID` (from `dfx canister id internet_identity`)

You can set these in a `.env` file in `src/icp-hub-frontend/` or export them in your shell.

Example `.env`:
```
VITE_DFX_NETWORK=local
VITE_BACKEND_CANISTER_ID=your_backend_canister_id
VITE_INTERNET_IDENTITY_CANISTER_ID=your_internet_identity_canister_id
```

---

## 4️⃣ Start the Frontend (React App)

```bash
cd src/icp-hub-frontend
npm install # or yarn
npm run dev
```

This will start the Vite dev server at `http://localhost:3000`.

- The frontend will automatically proxy API requests to the local DFX replica.
- You can now access the full GitForWeb3 platform locally!

---

## 🛠️ Useful Commands

- **Stop the replica:**
  ```bash
  dfx stop
  ```
- **Check canister status:**
  ```bash
  dfx canister status Icp_hub_backend
  ```
- **Get canister IDs:**
  ```bash
  dfx canister id Icp_hub_backend
  dfx canister id Icp_hub_frontend
  ```
- **Redeploy after code changes:**
  ```bash
  dfx deploy
  ```

---

## 🧩 Troubleshooting
- If you see `fetchRootKey` errors, make sure `dfx start` is running and the network is set to `local`.
- If you change the backend interface, redeploy and restart the frontend.
- For wallet integration, install MetaMask, Plug, or Stoic wallet extensions in your browser.
- For environment variable issues, check your `.env` and `vite.config.js`.

---

## 📚 Learn More
- [Internet Computer Docs](https://internetcomputer.org/docs/current/developer-docs/)
- [Motoko Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

## 🤝 Contributing
Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
