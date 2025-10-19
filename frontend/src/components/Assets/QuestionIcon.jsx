import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionIcon = () => {
  return (
    <>
      <FontAwesomeIcon
        className="text-[60px] mb-[16px] text-blue-500 text-shadow"
        icon={faQuestionCircle}
      />
    </>
  );
};

export default QuestionIcon;
