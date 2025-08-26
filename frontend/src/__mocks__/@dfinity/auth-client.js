// frontend/src/__mocks__/@dfinity/auth-client.js
import { vi } from 'vitest';

export const AuthClient = {
  create: vi.fn().mockResolvedValue({
    isAuthenticated: vi.fn().mockResolvedValue(false),
    getIdentity: vi.fn().mockReturnValue({
      getPrincipal: vi.fn().mockReturnValue({
        toString: vi.fn().mockReturnValue('2vxsx-fae'),
      }),
    }),
    login: vi.fn(),
    logout: vi.fn(),
  }),
};
