import { useState, useEffect, useRef } from "react";
import { useSetRecommendations } from "../../hooks/useSetRecommendations";
import { vehicleUtils } from "../../utils/vehicleUtils";
import { recommendationUtils } from "../../utils/recommendationUtils";
import gsap from "gsap";
import { useSelector } from "react-redux";
import AdminDashboardButton from "../../components/Assets/AdminDashboardButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Recommendation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const recommendationHook = useSetRecommendations();
  const { seatingCapacityArr, purposeArr } = vehicleUtils();
  const { roadConditionList, trafficConditionList, fuelTypeList } =
    recommendationUtils();

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allStep2FieldsSelected =
    recommendationHook.seatingCapacity &&
    recommendationHook.roadCondition &&
    recommendationHook.trafficCondition &&
    recommendationHook.fuelType;

  const descriptionRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const purposeNextBtnRef = useRef(null);

  useEffect(() => {
    if (recommendationHook.bodyTypeDescription) {
      const tl = gsap.timeline();

      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          nextBtnRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "bounce.in" }
        )
        .fromTo(
          prevBtnRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "bounce.in" }
        );
    }

    if (recommendationHook.purpose) {
      const t1 = gsap.timeline();
      t1.fromTo(
        purposeNextBtnRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "sine" }
      );
    }
  }, [recommendationHook.bodyTypeDescription, recommendationHook.purpose]);

  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminDashboardButton />}
      <section
        className="h-dvh bg-rmlk-dark pl-[60px] pr-[60px] pt-[50px]"
        id="Recommendation"
      >
        <div className="h-full w-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className={`${
              userInfo && userInfo.isAdmin ? "w-[40%]" : "w-[40%]"
            }  bg-rmlk-dark-light rounded-sm shadow-md p-[16px]`}
          >
            <div className="text-white text-[18px] font-semibold my-[16px] text-center">
              Find your vehicle here
            </div>
            <div className="w-full h-[2px] bg-rmlk-red mb-[16px]"></div>

            <form
              onSubmit={recommendationHook.handleSubmit}
              className="my-[16px]  overflow-y-scroll font-rmlk-secondary"
            >
              {step === 1 && (
                <div>
                  <div className="p-[8px] text-[12px] w-full ">
                    <label
                      className="block mb-[8px] text-[14px]"
                      htmlFor="purpose"
                    >
                      What is the primary purpose of the vehicle?
                    </label>

                    <select
                      id="purpose"
                      className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                        recommendationHook.purpose === ""
                          ? "border border-rmlk-red"
                          : "border border-green-600"
                      }`}
                      value={recommendationHook.purpose}
                      onChange={(e) =>
                        recommendationHook.setPurpose(e.target.value)
                      }
                    >
                      <option disabled value="">
                        Select Purpose
                      </option>
                      {purposeArr.map((purpose) => (
                        <option
                          className="p-[8px]"
                          key={purpose}
                          value={purpose}
                        >
                          {purpose}
                        </option>
                      ))}
                    </select>

                    {recommendationHook.purpose && (
                      <button
                        ref={purposeNextBtnRef}
                        type="button"
                        onClick={nextStep}
                        className="mt-[8px] bg-rmlk-red cursor-pointer hover:bg-rmlk-red-light duration-200 text-white px-[8px] py-[4px] rounded-md w-full h-[30px]"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="px-[8px] text-[12px] text-rmlk-red">
                    <p className="flex items-center">
                      {recommendationHook.purpose}{" "}
                      <FontAwesomeIcon icon={faCaretRight} />
                    </p>
                  </div>
                  <div className="p-[8px] text-[12px] w-full ">
                    <label
                      className="block mb-[8px] text-[14px]"
                      htmlFor="bodyType"
                    >
                      What body type do you prefer?
                    </label>
                    {recommendationHook.loadingBodyType ? (
                      <p>Loading body types...</p>
                    ) : recommendationHook.errorBodyType ? (
                      <p>Error loading body types</p>
                    ) : (
                      <select
                        id="bodyType"
                        className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                          recommendationHook.bodyType === ""
                            ? "border border-rmlk-red"
                            : "border border-green-600"
                        }`}
                        value={recommendationHook.bodyType}
                        onChange={(e) =>
                          recommendationHook.setBodyType(e.target.value)
                        }
                      >
                        <option disabled value="">
                          Select Body Type
                        </option>
                        {recommendationHook.bodyTypesList.map((bodyType) => (
                          <option
                            className="p-[8px]"
                            key={bodyType._id}
                            value={bodyType.bodytype}
                          >
                            {bodyType.bodytype}
                          </option>
                        ))}
                      </select>
                    )}

                    {recommendationHook.bodyTypeDescription && (
                      <div
                        ref={descriptionRef}
                        className="rounded-sm border border-green-600 my-[16px] p-[16px]"
                      >
                        <img
                          src={`http://localhost:5000${recommendationHook.icon}`}
                          alt={recommendationHook.bodyType}
                          className="w-[100px] h-auto mx-auto mb-[8px]"
                        />
                        <div className="max-h-[100px] overflow-y-auto p-[8px]">
                          <p className=" text-gray-300 text-center text-[14px]">
                            {recommendationHook.bodyTypeDescription}
                          </p>
                        </div>
                      </div>
                    )}

                    {recommendationHook.bodyType && (
                      <div className="flex items-center w-full gap-[16px] justify-between">
                        <button
                          ref={prevBtnRef}
                          type="button"
                          onClick={prevStep}
                          className="mt-[8px] bg-gray-600 cursor-pointer hover:bg-gray-500 duration-200 text-white px-[32px] py-[4px] rounded-md w-fit h-[30px]"
                        >
                          Back
                        </button>
                        <button
                          ref={nextBtnRef}
                          type="button"
                          onClick={nextStep}
                          className="mt-[8px] bg-rmlk-red cursor-pointer hover:bg-rmlk-red-light duration-200 text-white px-[32px] py-[4px] rounded-md w-fit h-[30px]"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="px-[8px] text-[12px] text-rmlk-red flex">
                    <p className="flex items-center">
                      {recommendationHook.purpose}{" "}
                      <FontAwesomeIcon icon={faCaretRight} />
                    </p>
                    <p className="flex items-center">
                      {recommendationHook.bodyType}{" "}
                      <FontAwesomeIcon icon={faCaretRight} />
                    </p>
                  </div>
                  <div>
                    <div className="p-[8px] text-[12px] w-full mb-[16px]">
                      <label
                        className="block mb-[8px]"
                        htmlFor="seatingCapacity"
                      >
                        What seating capacity do you need?
                      </label>
                      <select
                        id="seatingCapacity"
                        className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                          recommendationHook.seatingCapacity === ""
                            ? "border border-rmlk-red"
                            : "border border-green-600"
                        }`}
                        value={recommendationHook.seatingCapacity}
                        onChange={(e) =>
                          recommendationHook.setSeatingCapacity(e.target.value)
                        }
                      >
                        <option disabled value="">
                          Select Seating Capacity
                        </option>
                        {seatingCapacityArr.map((seat) => (
                          <option key={seat} value={seat}>
                            {seat}
                          </option>
                        ))}
                      </select>
                      {recommendationHook.seatingCapacity && (
                        <div
                          ref={descriptionRef}
                          className="rounded-sm border border-green-600 my-[16px] p-[16px] flex items-center flex-col gap-[16px]"
                        >
                          <h3 className="text-[24px] ">
                            {recommendationHook.seatingCapacity}
                          </h3>
                          <p className=" text-gray-300 text-center text-[14px]">
                            You selected a seating capacity of{" "}
                            {recommendationHook.seatingCapacity} seats with the
                            driving seat
                          </p>
                        </div>
                      )}

                      {recommendationHook.seatingCapacity && (
                        <div className="flex items-center w-full gap-[16px] justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="mt-[8px] bg-gray-600 cursor-pointer hover:bg-gray-500 duration-200 text-white px-[32px] py-[4px] rounded-md w-fit h-[30px]"
                          >
                            Back
                          </button>
                          <button
                            ref={nextBtnRef}
                            type="button"
                            onClick={nextStep}
                            className="mt-[8px] bg-rmlk-red cursor-pointer hover:bg-rmlk-red-light duration-200 text-white px-[32px] py-[4px] rounded-md w-fit h-[30px]"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <>
                  <div>
                    <div className="px-[8px] text-[12px] text-rmlk-red flex">
                      <p className="flex items-center">
                        {recommendationHook.purpose}{" "}
                        <FontAwesomeIcon icon={faCaretRight} />
                      </p>
                      <p className="flex items-center">
                        {recommendationHook.bodyType}{" "}
                        <FontAwesomeIcon icon={faCaretRight} />
                      </p>
                      <p className="flex items-center">
                        {recommendationHook.seatingCapacity} seats
                        <FontAwesomeIcon icon={faCaretRight} />
                      </p>
                    </div>
                    <div className="p-[8px] text-[12px] w-full mb-[16px]">
                      <label className="block mb-[8px]" htmlFor="roadCondition">
                        What road conditions do you usually travel on?
                      </label>
                      <select
                        id="roadCondition"
                        className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                          recommendationHook.roadCondition === ""
                            ? "border border-rmlk-red"
                            : "border border-green-600"
                        }`}
                        value={recommendationHook.roadCondition}
                        onChange={(e) =>
                          recommendationHook.setRoadCondition(e.target.value)
                        }
                      >
                        <option disabled value="">
                          Select Road Condition
                        </option>
                        {roadConditionList.map(({ answer, value }, index) => (
                          <option key={index} value={value}>
                            {answer}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Traffic Condition */}
                    <div className="p-[8px] text-[12px] w-full mb-[16px]">
                      <label
                        className="block mb-[8px]"
                        htmlFor="trafficCondition"
                      >
                        What traffic conditions do you usually drive in?
                      </label>
                      <select
                        id="trafficCondition"
                        className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                          recommendationHook.trafficCondition === ""
                            ? "border border-rmlk-red"
                            : "border border-green-600"
                        }`}
                        value={recommendationHook.trafficCondition}
                        onChange={(e) =>
                          recommendationHook.setTrafficCondition(e.target.value)
                        }
                      >
                        <option disabled value="">
                          Select Traffic Condition
                        </option>
                        {trafficConditionList.map(
                          ({ answer, value }, index) => (
                            <option key={index} value={value}>
                              {answer}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* Fuel Type */}
                    <div className="p-[8px] text-[12px] w-full mb-[16px]">
                      <label className="block mb-[8px]" htmlFor="fuelType">
                        What fuel type do you prefer?
                      </label>
                      <select
                        id="fuelType"
                        className={`w-full p-[8px] rounded-md bg-rmlk-dark-lighter text-white ${
                          recommendationHook.fuelType === ""
                            ? "border border-rmlk-red"
                            : "border border-green-600"
                        }`}
                        value={recommendationHook.fuelType}
                        onChange={(e) =>
                          recommendationHook.setFuelType(e.target.value)
                        }
                      >
                        <option disabled value="">
                          Select Fuel Type
                        </option>
                        {fuelTypeList.map(({ answer, value }, index) => (
                          <option key={index} value={value}>
                            {answer}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Back & Submit Buttons */}
                    <div className="flex gap-[8px] font-rmlk-secondary text-[12px] justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-600 text-white  cursor-pointer hover:bg-gray-500 transition duration-200 px-[32px] py-[4px] rounded-md w-fit h-[30px]"
                      >
                        <FontAwesomeIcon icon={faCaretLeft} />
                        Back
                      </button>
                      <button
                        type="submit"
                        className={`bg-rmlk-red text-white cursor-pointer hover:bg-rmlk-red-light transition duration-200 px-[32px] py-[4px] rounded-md w-fit h-[30px] ${
                          allStep2FieldsSelected
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!allStep2FieldsSelected}
                      >
                        Get Recommendations
                        <FontAwesomeIcon icon={faCaretRight} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Recommendation;
