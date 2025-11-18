import { useState } from "react";
import {
  useAddOrUpdateRatingMutation,
  useGetVehicleAverageQuery,
  useGetVehicleRatingsQuery,
} from "../app/api/ratingsApiSlice";
import { toast } from "react-toastify";

export const useSetRatings = (vehicleId) => {
  const [addOrUpdateRating] = useAddOrUpdateRatingMutation();
  const {
    data: ratingData,
    isLoading: averageRatingLoading,
    isError: averageRatingError,
  } = useGetVehicleAverageQuery(vehicleId);

  const {
    data: allRatingData,
    isLoading: allRatingsLoading,
    isError: allRatingsError,
  } = useGetVehicleRatingsQuery(vehicleId);

  const counts = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    try {
      if (!rating) {
        toast.error("Please select a rating before submitting.");
        return;
      }
      await addOrUpdateRating({ vehicleId, rating, review }).unwrap();
      toast.success("Rating submitted successfully!");
      setReview("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit rating.");
    }
  };

  return {
    counts,
    hover,
    setHover,
    handleSubmit,
    setRating,
    setReview,
    rating,
    review,
    ratingData,
    averageRatingLoading,
    averageRatingError,
    allRatingData,
    allRatingsError,
    allRatingsLoading,
  };
};
