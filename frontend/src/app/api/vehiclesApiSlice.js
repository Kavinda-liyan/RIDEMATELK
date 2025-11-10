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
      query: (formData) => ({
        url: `${VEHICLES_URL}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `${VEHICLES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicle"],
    }),
    getVehicleByFilter: builder.query({
      query: ({ fuelType, bodyType, Manufacturer }) => {
        const params = new URLSearchParams();
        if (fuelType) params.append("Fuel Type", fuelType);
        if (bodyType) params.append("Body Type", bodyType);
        if (Manufacturer) params.append("Manufacturer", Manufacturer);
        return {
          url: `${VEHICLES_URL}/filter?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Vehicle"],
    }),
    getVehicleById: builder.query({
      query: (id) => ({
        url: `${VEHICLES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Vehicle"],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useAddVehiclesMutation,
  useDeleteVehicleMutation,
  useGetVehicleByFilterQuery,
  useGetVehicleByIdQuery
} = vehiclesApiSlice;
