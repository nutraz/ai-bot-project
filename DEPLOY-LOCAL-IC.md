# Deploying OpenKeyHub Dapp on Internet Computer Local Replica (Testnet)

## 1. Install DFINITY SDK
```bash
sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
dfx --version
```
_If not installed, run the above commands._

## 2. Start Local Replica
```bash
dfx start --background
```
_Make sure no other dfx process is running. If port conflicts, stop previous dfx or use another port._

## 3. Prepare Project
```bash
cd ~/ai-bot-project
```
_Check your `dfx.json` and ensure canisters are defined. If not, run:_
```bash
dfx canister create <your_canister>
```

## 4. Build Canisters
```bash
dfx build
```
_If you see errors, check your Motoko/JS source and dependencies._

## 5. Deploy to Local Testnet
```bash
dfx deploy
```
_This deploys all canisters to your local replica (cost-free). To deploy a single canister:_
```bash
dfx deploy <canister_name>
```

## 6. Access Frontend Locally
Start your frontend (e.g., Vite/Next.js):
```bash
pnpm dev
# or
npm run dev
```
_Open your browser to the displayed local address (e.g., http://localhost:5173). If port is busy, check for other processes or change the port._

## 7. Test Interactions
- Interact with your canister through the frontend.
- For backend testing:
```bash
dfx canister call <canister_name> <method> <args>
```
_Create mock users/data as needed. Use dfx-generated identities for wallet simulation._

## 8. (Optional) Deploy to Official IC Testnet
- See: [IC Testnet Deployment Docs](https://internetcomputer.org/docs/current/developer-docs/deploy/deploy-testnet/)
- You may need a test identity and faucet ICP.

## 9. Clean Up
```bash
dfx stop
```
_Stop the local replica when finished. To reset state, delete the `.dfx` directory._

---

**For cost-free deployment, always use the local replica (`dfx start`). Official testnets may require ICP tokens.**
