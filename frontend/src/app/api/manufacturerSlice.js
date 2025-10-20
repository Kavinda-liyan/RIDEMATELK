import { apiSlice } from "../slices/apiSlice";
import { MANUFACTURER_URL } from "../constants";

export const manufacturerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getManufacturer: builder.query({
      query: () => ({
        url: `${MANUFACTURER_URL}`,
        method: "GET",
      }),
      providesTags: ["Manufacturer"],
      keepUnusedDataFor: 5,
    }),
    addManufacturer: builder.mutation({
      query: (data) => ({
        url: `${MANUFACTURER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Manufacturer"],
    }),
    deleteManufacturer: builder.mutation({
      query: (id) => ({
        url: `${MANUFACTURER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Manufacturer"],
    }),
  }),
});

export const {
  useAddManufacturerMutation,
  useGetManufacturerQuery,
  useDeleteManufacturerMutation,
} = manufacturerSlice;
