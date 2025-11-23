import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/slices/authSlice";
import { useDashboardComponents } from "./useDashboardComponents";

vi.mock("../app/api/vehiclesApiSlice", () => ({
  useGetVehicleByFilterQuery: () => ({
    data: [
      { "Fuel Type": "Petrol", Manufacturer: "Toyota" },
      { "Fuel Type": "Diesel", Manufacturer: "Ford" },
      { "Fuel Type": "Petrol", Manufacturer: "Ford" },
    ],
    isLoading: false,
    isError: false,
  }),
}));

vi.mock("../app/api/usersApiSlice", () => ({
  useGetAllUsersQuery: () => ({
    data: [{ isAdmin: false }, { isAdmin: false }, { isAdmin: true }],
  }),
}));

const setupStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

const wrapper = ({ children }) => (
  <Provider store={setupStore()}>{children}</Provider>
);

describe("useDashboardComponents", () => {
  it("returns correct user and vehicle counts + chart data", () => {
    const { result } = renderHook(() => useDashboardComponents(), {
      wrapper,
    });

    expect(result.current.AllVehicles).toBe(3);

    expect(result.current.AllUsers).toBe(2);

    expect(result.current.fuelTypePieData).toEqual([
      { name: "Petrol", value: 2 },
      { name: "Diesel", value: 1 },
    ]);

    expect(result.current.manufacturerBarData).toEqual([
      { name: "Toyota", value: 1 },
      { name: "Ford", value: 2 },
    ]);
  });
});
