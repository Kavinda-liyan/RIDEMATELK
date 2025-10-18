import { apiSlice } from "../slices/apiSlice";
import { VEHICLES_URL } from "../constants";

export const vehiclesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: ({page=1,limit=50}) => ({
        url: `${VEHICLES_URL}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Vehicle"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetVehiclesQuery } = vehiclesApiSlice;
