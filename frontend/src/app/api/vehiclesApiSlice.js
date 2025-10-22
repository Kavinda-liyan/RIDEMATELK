import { apiSlice } from "../slices/apiSlice";
import { VEHICLES_URL } from "../constants";

export const vehiclesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: ({
        page = 1,
        limit = 50,
        Manufacturer,
        Model,
        fuelType,
        bodyType,
        seatingCapacity,
      }) => {
        const params = new URLSearchParams({ page, limit });

        if (Manufacturer) params.append("Manufacturer", Manufacturer);
        if (Model) params.append("Model", Model);
        if (fuelType) params.append("fuelType", fuelType);
        if (bodyType) params.append("bodyType", bodyType);
        if (seatingCapacity) params.append("seatingCapacity", seatingCapacity);

        return {
          url: `${VEHICLES_URL}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Vehicle"],
      keepUnusedDataFor: 5,
    }),
    addVehicles: builder.mutation({
      query: (data) => ({
        url: `${VEHICLES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vehicle"],
    }),
  }),
});

export const { useGetVehiclesQuery, useAddVehiclesMutation } = vehiclesApiSlice;
