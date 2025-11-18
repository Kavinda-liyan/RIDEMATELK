import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSetRatings } from "../../hooks/useSetRatings";
import AllRatings from "./AllRatings";

const Rating = ({ vehicleId }) => {
  const ratingHook = useSetRatings(vehicleId);
  const {
    counts,
    setHover,
    hover,
    setRating,
    setReview,
    handleSubmit,
    rating,
    review,
    ratingData
  } = ratingHook;
  console.log("Rating Data:", ratingData);

  return (
    <div className="mt-[16px]">
      <div className="flex gap-[8px] mb-[16px]">
        {counts.map((count) => (
          <span
            key={count}
            onMouseEnter={() => setHover(count)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              setRating(count);
            }}
            className={`cursor-pointer text-[18px] duration-200 transition-all ${
              count <= (hover || rating) ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faStar} />
          </span>
        ))}
      </div>
      <textarea
        className="w-full p-[16px] rounded-md bg-rmlk-dark-lighter text-white mb-[8px]"
        placeholder="Write a review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        maxLength={500}
      />
      <button
        onClick={() => handleSubmit()}
        className=" text-[12px] bg-blue-600 cursor-pointer px-[8px] py-[2px] h-[30px] flex items-center rounded-md shadow-md 
      hover:bg-blue-500 duration-200"
      >
        Submit Review
      </button>
      <div className="h-[1px] w-full bg-rmlk-dark-lighter my-[16px]"></div>
      <AllRatings vehicleId={vehicleId}/>
      <p className="text-sm text-white mt-2">
        Average: {ratingData?.averageRating?.toFixed(1) || 0} ({ratingData?.ratingCount || 0} ratings)
      </p>
    </div>
  );
};

export default Rating;
