export class AuthClient {
  static async create() {
    return new AuthClient();
  }
  async login() {}
  async logout() {}
  async isAuthenticated() { return true; }
  async getIdentity() {
    return {
      getPrincipal: () => ({ toText: () => 'mock-principal' })
    };
  }
}
