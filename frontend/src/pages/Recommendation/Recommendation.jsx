import RecommendationForm from "./RecommendationForm";
import { useSetRecommendations } from "../../hooks/useSetRecommendations";
import NoRecommendations from "./NoRecommendations";

const Recommendation = () => {
  const recommendationHook = useSetRecommendations();
  console.log("Recommendations:", recommendationHook.recommendations);
  return (
    <section
      className="min-h-dvh bg-rmlk-dark pl-[60px] pr-[60px]"
      id="Recommendation"
    >
      <div className="pt-[45px]">
        <RecommendationForm />
        {recommendationHook.recommendations?.length > 0 ? (
          <div className="grid grid-cols-4">
            {recommendationHook.recommendations.Manufacturer}
          </div>
        ) : (
          <>
            {" "}
            <NoRecommendations />
          </>
        )}
      </div>
    </section>
  );
};

export default Recommendation;
