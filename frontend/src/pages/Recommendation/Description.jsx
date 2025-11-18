const Description = ({
  manufacturer,
  model,
  seats,
  bodytype,
  descriptionbt,
  groundclearance,
  descriptiongc,
}) => {
  return (
    <p className="text-white text-[14px] leading-relaxed text-justify">
      <span className="">{manufacturer}</span> -{" "}
      <span className="">{model}</span> is an ideal vehicle for{" "}
      <span className="">{seats}</span> passengers with driver.{" "}
      <span className="">{bodytype} {" "}</span>
      <span className="">{descriptionbt}</span>
      <span className="">
        {" "}
        {groundclearance} mm is {descriptiongc}
      </span>
    </p>
  );
};

export default Description;
