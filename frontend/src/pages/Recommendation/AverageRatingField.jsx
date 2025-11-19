import { useSetRatings } from "../../hooks/useSetRatings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AverageRatingField = ({ vehicleId }) => {
  const {
    counts,
    hover,
    ratingData,
    averageRatingLoading,
    averageRatingError,
  } = useSetRatings(vehicleId);

  // Extract average safely
  const average = ratingData?.averageRating || 0;
  const ratingCount= ratingData?.ratingCount || 0;

  return (
    <div>
      {averageRatingLoading ? (
        <p className="text-sm text-white mt-2">Loading average rating...</p>
      ) : averageRatingError ? (
        <p className="text-sm text-white mt-2">Error loading average rating.</p>
      ) : (
        <div className="flex gap-[8px]">
          {counts.map((count) => (
            <span
              key={count}
              
              className={`text-[18px] duration-200 transition-all ${
                count <= (hover || Math.round(average))
                  ? "text-yellow-400"
                  : "text-gray-500"
              }`}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          ))}
          <span className="mx-[8px] text-white/50 flex items-center">{average}/5</span>
          <span className="mx-[4px] text-white/50 flex items-center">({ratingCount})</span>
        </div>
      )}
    </div>
  );
};

export default AverageRatingField;
