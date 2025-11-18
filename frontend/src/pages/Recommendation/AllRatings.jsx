import { useSelector } from "react-redux";
import { useSetRatings } from "../../hooks/useSetRatings";

const AllRatings = (vehicleId) => {
  const { userInfo } = useSelector((state) => state.auth);
  const ratingHook = useSetRatings(vehicleId);
  const userId = userInfo?._id;

  const { allRatingData, allRatingsLoading, allRatingsError } = ratingHook;

  return (
    <div>
      {allRatingsLoading ? (
        <p className="text-sm text-white mt-2">Loading ratings...</p>
      ) : allRatingsError ? (
        <p className="text-sm text-white mt-2">Error loading ratings.</p>
      ) : (
        allRatingData &&
        allRatingData?.length > 0 && (
          <div className="h-[200px] p-[16px] border border-rmlk-dark-lighter rounded-md overflow-y-auto"></div>
        )
      )}
    </div>
  );
};

export default AllRatings;
