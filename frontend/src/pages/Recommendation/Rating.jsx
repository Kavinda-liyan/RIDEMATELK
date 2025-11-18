import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Rating = ({ rating = 0, maxRating = 5 }) => {
  counts = [1, 2, 3, 4, 5];
  const [hover, setHover] = useState(0);
  return (
    <div className="mt-[16px]">
      <div className="flex gap-[8px] mb-[16px]">
        {counts.map((count) => (
          <span key={count} onMouseEnter={() => {}}>
            <FontAwesomeIcon icon={faStar} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
