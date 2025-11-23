// src/hooks/useLogin.test.jsx
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/slices/authSlice";
import { useLogin } from "./useLogin";
import { vi } from "vitest";

// --------------------
// Mock localStorage
// --------------------
beforeAll(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value.toString(); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; },
    };
  })();

  Object.defineProperty(global, "localStorage", { value: localStorageMock });
});

afterEach(() => {
  localStorage.clear();
});

// --------------------
// Mock react-toastify
// --------------------
vi.mock("react-toastify", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

// --------------------
// Mock RTK Query mutation properly
// --------------------
const mockLogin = vi.fn();

vi.mock("../app/api/usersApiSlice", () => ({
  useLoginMutation: () => {
    // Return a function that returns a Promise when unwrap() is called
    const mutationFn = (args) => ({
      unwrap: () => {
        mockLogin(args);
        return Promise.resolve({ user: { id: "1", name: "Test" } });
      },
    });
    return [mutationFn, { isLoading: false, isError: false, error: null }];
  },
}));

// --------------------
// Redux store wrapper
// --------------------
const createStore = () => configureStore({ reducer: { auth: authReducer } });

const wrapper = ({ children }) => (
  <Provider store={createStore()}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);

// --------------------
// Tests
// --------------------
describe("useLogin hook", () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  it("initializes with empty email and password", () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.error.emailError).toBe("");
    expect(result.current.error.passwordError).toBe("");
  });

  it("shows error if email or password is empty", async () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.error.emailError).toBe("Email required");
    expect(result.current.error.passwordError).toBe("Password required");
  });

  it("calls login mutation with correct email and password", async () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("123456");
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    // Now mockLogin should have been called
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "123456",
    });
  });
});
