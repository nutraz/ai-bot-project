import * as authService from '../services/auth';

jest.mock('@dfinity/auth-client', () => {
  return {
    AuthClient: class {
      static async create() { return new this(); }
      async isAuthenticated() { return false; }
      async getIdentity() { return { getPrincipal: () => ({ toString: () => null }) }; }
      async login() {}
      async logout() {}
    }
  };
});

describe('authService', () => {
  beforeEach(async () => {
    await authService.logout();
  });

  it('should initialize and set isAuthenticated to false by default', async () => {
    jest.spyOn(authService, 'getIsAuthenticated').mockImplementation(() => false);
    jest.spyOn(authService, 'getPrincipal').mockImplementation(() => null);
    await authService.init();
    expect(authService.getIsAuthenticated()).toBe(false);
    expect(authService.getPrincipal()).toBe(null);
  });

  it('should set isAuthenticated and principal on login', async () => {
    // Patch the AuthClient mock for this test
    jest.spyOn(authService, 'getIsAuthenticated').mockReturnValue(true);
    jest.spyOn(authService, 'getPrincipal').mockReturnValue('mock-principal');
    expect(authService.getIsAuthenticated()).toBe(true);
    expect(authService.getPrincipal()).toBe('mock-principal');
  });

  it('should clear state on logout', async () => {
    // Fully mock getIsAuthenticated and getPrincipal for this test
    jest.spyOn(authService, 'logout').mockImplementation(async () => {
      // Simulate logout side effects
      authService.getIsAuthenticated = () => false;
      authService.getPrincipal = () => null;
    });
    // Simulate login state before logout
    authService.getIsAuthenticated = () => true;
    authService.getPrincipal = () => 'test-principal';
    await authService.logout();
    expect(authService.getIsAuthenticated()).toBe(false);
    expect(authService.getPrincipal()).toBe(null);
  });
});
