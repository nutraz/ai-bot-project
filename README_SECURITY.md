# OpenKeyHub Security Checklist

- Use audited libraries only (OpenZeppelin, Motoko Base, etc.)
- Write and run unit/fuzz tests for all contracts
- Run static analysis (Slither, MythX, etc.)
- Never hardcode or commit private keys
- Use hardware wallets and multi-sig for admin
- Deploy to testnet/staging before mainnet
- Verify contracts on Etherscan/ICP explorer
- Serve frontend over HTTPS with strong headers
- Pin static files on IPFS/Arweave
- Monitor contracts and set up incident response
- Document governance, upgradeability, and compliance
