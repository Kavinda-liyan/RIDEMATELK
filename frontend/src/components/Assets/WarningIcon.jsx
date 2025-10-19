import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const WarningIcon = () => {
  return (
    <>
      <FontAwesomeIcon
        className="text-[60px] mb-[16px] text-amber-500 text-shadow"
        icon={faExclamationTriangle}
      />
    </>
  );
};

export default WarningIcon;
