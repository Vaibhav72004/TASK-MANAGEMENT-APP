import authReducer, { logout } from '../src/redux/slices/authSlice.js';

test('logout clears token and user', () => {
  const state = authReducer({ token: 't', user: { id: 1 } }, logout());
  expect(state.token).toBe(null);
  expect(state.user).toBe(null);
});
