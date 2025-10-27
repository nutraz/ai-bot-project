// frontend/src/__mocks__/@dfinity/auth-client.js
export const AuthClient = {
  create: jest.fn().mockResolvedValue({
    isAuthenticated: jest.fn().mockResolvedValue(false),
    getIdentity: jest.fn().mockReturnValue({
      getPrincipal: jest.fn().mockReturnValue({
        toString: jest.fn().mockReturnValue('2vxsx-fae'),
      }),
    }),
    login: jest.fn(),
    logout: jest.fn(),
  }),
};
