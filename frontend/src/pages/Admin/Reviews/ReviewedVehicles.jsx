import PageWrapper from "../../../components/Assets/PageWrapper";
import imgPlaceholder from "../../../assets/placeholderimg.svg";
import BreadCrumb from "../../../components/BreadCrumb";
import { useGetAllRatings } from "../../../hooks/useGetAllRatings";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const ReviewedVehicles = () => {
  const {
    allRatingError,
    allRatingLoading,
    navigate,
    visibleItems,
    loaderRef,
  } = useGetAllRatings();

  return (
    <PageWrapper>
      <BreadCrumb links={[{ label: "Reviews", to: "/admin/reviews" }]} />
      <div className="pt-[16px] h-[420px] overflow-y-auto">
        <div className="px-[8px]">
          {allRatingLoading ? (
            <p>Loading...</p>
          ) : allRatingError ? (
            <p>Error loading ratings.</p>
          ) : visibleItems && visibleItems.length > 0 ? (
            <>
              {visibleItems.map((rating) => (
                <div
                  key={rating._id}
                  className="flex p-[16px] bg-rmlk-dark-light my-[8px] rounded-sm shadow-md items-center font-rmlk-secondary text-white text-[12px]"
                >
                  <div className="flex flex-col">
                    <div
                      onClick={() =>
                        navigate(
                          `/recommendation/result/vehicle/${rating.vehicleId?._id}`
                        )
                      }
                      className="mb-[8px] bg-rmlk-red w-fit px-[8px] py-[2px] rounded-full shadow-md cursor-pointer hover:bg-rmlk-red-light duration-200"
                    >
                      <p>
                        {rating?.vehicleId?.Manufacturer.toUpperCase()}{" "}
                        <span className="text-white/90">-</span>{" "}
                        <span className="text-white/90">
                          {rating?.vehicleId?.Model.toUpperCase()}
                        </span>
                      </p>
                    </div>

                    <div className="mb-[8px] pl-[4px]">
                      <p>{rating?.review}</p>
                      <span className="text-white/50">
                        Rating: {rating?.rating}/5
                      </span>
                    </div>

                    <div className="flex items-center gap-[8px] bg-rmlk-dark-lighter w-fit p-[4px] rounded-full shadow-md hover:bg-rmlk-dark-lighter/80 duration-200 cursor-pointer">
                      <img
                        src={
                          rating?.userId?.profilePicture
                            ? rating.userId.profilePicture
                            : imgPlaceholder
                        }
                        alt="Reviewed Vehicles"
                        className="w-[20px] h-[20px] object-cover rounded-full"
                      />
                      <p className="text-[10px] pr-[8px] flex items-center">
                        {rating?.userId?.isTrustedBatch && (
                          <FontAwesomeIcon
                            icon={faMedal}
                            className="text-[8px] mr-[4px] text-amber-500"
                          />
                        )}
                        {rating?.userId?.username}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div
                ref={loaderRef}
                className="h-[40px] flex justify-center items-center"
              >
                <p className="text-white/40 text-[10px]">Loading more...</p>
              </div>
            </>
          ) : (
            <p>No ratings found.</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReviewedVehicles;
