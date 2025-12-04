import { useState, useRef, useEffect } from "react";
import { useGetAllRatingsQuery } from "../app/api/ratingsApiSlice";
import { useNavigate } from "react-router-dom";

export const useGetAllRatings = () => {
  const {
    data: allRatingData,
    isLoading: allRatingLoading,
    isError: allRatingError,
    refetch: refetchRatings,
  } = useGetAllRatingsQuery();

  const [showReview, setShowReview] = useState(null);
  const navigate = useNavigate();
  const ITEM_PER_PAGE = 6;

  const [visibleItems, setVisibleItems] = useState([]);
  const [count, setCount] = useState(ITEM_PER_PAGE);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (allRatingData && allRatingData.length > 0) {
      setVisibleItems(allRatingData.slice(0, ITEM_PER_PAGE));
    }
  }, [allRatingData]);

  useEffect(() => {
    const handleObserver = new IntersectionObserver(
      (entries) => {
        const trigger = entries[0];

        if (trigger.isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      handleObserver.observe(loaderRef.current);
    }

    return () => handleObserver.disconnect();
  }, [visibleItems, allRatingData]);

  const loadMoreItems = () => {
    if (!allRatingData) return;

    const newCount = count + ITEM_PER_PAGE;
    const newItems = allRatingData.slice(0, newCount);
    setVisibleItems(newItems);
    setCount(newCount);
  };

  return {
    allRatingData,
    allRatingLoading,
    allRatingError,
    refetchRatings,
    showReview,
    setShowReview,
    navigate,
    visibleItems,
    loaderRef,
  };
};
