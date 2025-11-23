import { useGetAllUsersQuery } from "../app/api/usersApiSlice";
export const useGetAllUsers = () => {
  const {
    data: allUserData,
    isLoading: allUserLoading,
    isError: allUserError,
  } = useGetAllUsersQuery();

  const UserTitle = ["ID", "Name", "Email", "Role", "Reviews"];

  return { allUserData, allUserLoading, allUserError, UserTitle };
};
