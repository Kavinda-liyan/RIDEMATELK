import VehicleCard from "../../components/VehicleCard";
import { useGetFavoritesQuery } from "../../app/api/favoriteApiSlice";
import { useSelector } from "react-redux";

const Favourites = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: favoritesData = [], refetch } = useGetFavoritesQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      skip: !userInfo,
    }
  );
  console.log("Favorites Data:", favoritesData);
  return (
    <div>
      <VehicleCard />
    </div>
  );
};

export default Favourites;
