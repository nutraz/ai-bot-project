// Mock authService globally for all tests
jest.mock('./src/services/auth', () => ({
  getPrincipal: jest.fn(() => 'mock-principal-id'),
  init: jest.fn(() => Promise.resolve()),
  getIsAuthenticated: jest.fn(() => true),
  logout: jest.fn(() => Promise.resolve()),
  login: jest.fn(() => Promise.resolve()),
}));
import { TextEncoder, TextDecoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
// Mock @dfinity/auth-client for all tests
jest.mock('@dfinity/auth-client');