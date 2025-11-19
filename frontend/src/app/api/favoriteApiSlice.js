import { apiSlice } from "../slices/apiSlice";
import { FAVOURITES_URL } from "../constants";

export const favouriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => ({
        url: `${FAVOURITES_URL}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((fav) => ({ type: "Favorite", id: fav.vehicleId })),
              { type: "Favorite", id: "LIST" },
            ]
          : [{ type: "Favorite", id: "LIST" }],
    }),
    addFavorite: builder.mutation({
      query: (data) => ({
        url: `${FAVOURITES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Favorite", id: "LIST" }],
    }),
    removeFavorite: builder.mutation({
      query: (vehicleId) => ({
        url: `${FAVOURITES_URL}/${vehicleId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favorite", id: "LIST" }],
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} = favouriteApiSlice;
