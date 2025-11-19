import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} from "../app/api/favoriteApiSlice";
import { toast } from "react-toastify";

export const useAllRecommendations = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [displayedVehicle, setDisplayedVehicle] = useState([]);
  const [displayedIds, setDisplayedIds] = useState(new Set());
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = userInfo?.isAdmin ? 6 : 8;

  const { recommendations = [] } = location.state || {};

  // Favorites
  const { data: favoritesData = [], refetch } = useGetFavoritesQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      skip: !userInfo,
    }
  );
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const favoriteIds = favoritesData.map(
    (fav) => fav.vehicleId._id || fav.vehicleId
  );
  const favoritsUserIds = favoritesData.map((fav) => fav.userId);
  console.log("Favorite User Ids:", favoritsUserIds);

  // Load next batch of vehicles
  const loadMoreVehicles = () => {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const nextBatch = recommendations
      .slice(start, end)
      .filter((v) => !displayedIds.has(v.id));

    if (nextBatch.length > 0) {
      setDisplayedVehicle((prev) => [...prev, ...nextBatch]);
      setDisplayedIds((prev) => {
        const newSet = new Set(prev);
        nextBatch.forEach((v) => newSet.add(v.id));
        return newSet;
      });
      setPageNumber((prev) => prev + 1);
    }
  };

  // Reset on recommendations change
  useEffect(() => {
    if (recommendations.length > 0) {
      const initialBatch = recommendations.slice(0, itemsPerPage);
      setDisplayedVehicle(initialBatch);
      setDisplayedIds(new Set(initialBatch.map((v) => v.id)));
      setPageNumber(2);
    }
  }, [recommendations]);

  // Scroll event for infinite scroll
  useEffect(() => {
    const scrollContainer = document.getElementById("vehicleContainer");
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 50
      ) {
        loadMoreVehicles();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [displayedIds, recommendations]);

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [userInfo?._id]);

  // Favorites handlers
  const handleAddFavorite = async (vehicleId) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    try {
      await addFavorite({ vehicleId }).unwrap();
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add to favorites.");
    }
  };

  const handleRemoveFavorite = async (vehicleId) => {
    try {
      await removeFavorite(vehicleId).unwrap();
      toast.success("Removed from favorites!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to remove from favorites.");
    }
  };

  return {
    userInfo,
    displayedVehicle,
    recommendations,
    favoriteIds,
    handleAddFavorite,
    handleRemoveFavorite,
    favoritsUserIds,
  };
};
