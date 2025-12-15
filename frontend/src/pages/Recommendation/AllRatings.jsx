import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRatings } from "../../hooks/useSetRatings";
import { faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import imgPlaceholder from "../../assets/userPlaceholder.svg";

const AllRatings = ({ vehicleId }) => {
  const ratingHook = useSetRatings(vehicleId);

  const {
    allRatingData,
    allRatingsLoading,
    allRatingsError,
    usersData,
    counts,
  } = ratingHook;

  return (
    <div>
      {allRatingsLoading ? (
        <p className="text-sm text-white mt-2">Loading ratings...</p>
      ) : allRatingsError ? (
        <p className="text-sm text-white mt-2">Error loading ratings.</p>
      ) : (
        allRatingData?.length > 0 && (
          <div className="h-[200px] p-[16px] border border-rmlk-dark-lighter rounded-md overflow-y-auto">
            {allRatingData.map((rating) => {
              const matchedUser = usersData?.find(
                (u) => u._id === rating.userId._id
              );
              const words = matchedUser?.username
                ? matchedUser.username.split(" ")
                : [];
              const firstLetter =
                words.length > 0 ? words[0].charAt(0).toUpperCase() : "";
              const secondLetter =
                words.length > 1 ? words[1].charAt(0).toUpperCase() : "";
              const initials = firstLetter + secondLetter;

              return (
                <div
                  key={rating._id}
                  className=" p-[8px] rounded-md font-rmlk-secondary"
                >
                  <div className="flex gap-[16px] items-center mb-[4px]">
                    <div className="flex items-center justify-center  rounded-full text-[10px] font-rmlk-secondary font-semibold bg-blue-500 w-[35px] h-[35px]">
                      <img
                        src={
                          matchedUser?.profilePicture
                            ? matchedUser.profilePicture
                            : imgPlaceholder
                        }
                        alt="profile"
                        className="w-[35px] h-[35px] rounded-full object-cover"
                      />
                    </div>
                    <span className="text-white font-semibold text-[14px]">
                      {matchedUser?.username || "Unknown User"}
                    </span>
                    {matchedUser?.isTrustedBatch && (
                      <span className="text-white  text-[8px] bg-blue-600 px-[8px] py-[4px] rounded-full">
                        <span className=""><FontAwesomeIcon icon={faMedal} /></span> Trusted User
                      </span>
                    )}
                  </div>
                  <div className="ml-[52px]">
                    <p className="text-white text-[12px] mb-[4px]">
                      {rating.review}
                    </p>
                    <div className="w-full flex gap-[8px] jsustify-start items-center">
                      {counts.map((count) => (
                        <span
                          key={count}
                          className={`text-[12px] duration-200 transition-all ${
                            count <= Math.round(rating.rating)
                              ? "text-yellow-400"
                              : "text-gray-500"
                          }`}
                        >
                          <FontAwesomeIcon icon={faStar} />
                        </span>
                      ))}
                      <span className="text-yellow-400 font-semibold text-[10px]">
                        ( {rating.rating} / 5)
                      </span>
                    </div>
                    <p className="text-[10px] mt-[4px] text-white/50">
                      {isNaN(new Date(rating.updatedAt).getTime())
                        ? "N/A"
                        : new Date(rating.updatedAt)
                            .toISOString()
                            .split("T")[0]}
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-rmlk-dark-lighter my-[16px]"></div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default AllRatings;
