import { useGetAllUsersQuery } from "../app/api/usersApiSlice";
import { useGetAllRatingsQuery } from "../app/api/ratingsApiSlice";
export const useGetAllUsers = () => {
  const {
    data: allUserData,
    isLoading: allUserLoading,
    isError: allUserError,
  } = useGetAllUsersQuery();

  const {
    data: ratingData,
    isLoading: ratingLoading,
    error: ratingError,
  } = useGetAllRatingsQuery();

  const UserTitle = [
    "ID",
    "Name",
    "Email",
    "Role",
    "Reviews",
    "Reviewed Vehicles",
  ];

  return {
    allUserData,
    allUserLoading,
    allUserError,
    UserTitle,
    ratingData,
    ratingError,
    ratingLoading,
  };
};
