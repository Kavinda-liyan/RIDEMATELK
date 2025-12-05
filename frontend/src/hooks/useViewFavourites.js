import { useNavigate } from "react-router-dom";
import { useGetFavoritesQuery } from "../app/api/favoriteApiSlice";

export const useViewFavourites = () => {
  const {
    data: favouriteData = [],
    isLoading: favouriteLoading,
    isError: favouriteError,
    isFetching: favouriteFetch,
  } = useGetFavoritesQuery(undefined, { refetchOnMountOrArgChange: true });

  const navigate = useNavigate();

  return {
    favouriteData,
    favouriteLoading,
    favouriteError,
    favouriteFetch,
    navigate,
  };
};
