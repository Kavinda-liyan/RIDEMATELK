import { useGetManufacturerQuery } from "../../../../app/api/manufacturerSlice";
import { useGetBodyTypesQuery } from "../../../../app/api/bodyTypesApiSlice";

const AddVehiclesForm = () => {
  const {
    data: manufacturersData,
    isLoading: loadingManufacturersData,
    isError: errorManufacturersData,
    refetch: refetchManufacturersData,
  } = useGetManufacturerQuery();

  const {
    data: bodyTypesData,
    isLoading: loadingBodytypesData,
    isError: errorBodyTypesData,
  } = useGetBodyTypesQuery();

  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

  return (
    <div className="bg-rmlk-dark-light h-full rounded-md shadow-md">
      <div className="p-[8px] font-rmlk-secondary text-white text-[12px]">
        <form>
          <div className="flex w-full flex-row border border-rmlk-dark-lighter rounded-md mb-[16px] p-[8px]">
            <div className="p-[8px] w-[50%]">
              <label htmlFor="manufacturer" className="mb-[2px] pb-[4px]">
                Manufacturer:
              </label>

              {loadingManufacturersData ? (
                <>Loading...</>
              ) : errorManufacturersData ? (
                <>Error...</>
              ) : (
                <select
                  id="manufacturer"
                  name="manufacturer"
                  className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                >
                  {manufacturersData?.map((manufact) => (
                    <option key={manufact._id} value={manufact.manufacturer}>
                      {manufact.manufacturer}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="p-[8px] flex flex-col w-[50%]">
              <label htmlFor="manufacturer">Model:</label>
              <input
                type="text"
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
          </div>
          <div className="mt-[8px] flex w-full flex-row border border-rmlk-dark-lighter rounded-md mb-[16px] p-[8px]">
            <div className="p-[8px] w-[50%]">
              <label htmlFor="bodytype" className="mb-[2px] pb-[4px]">
                Body Type:
              </label>

              {loadingBodytypesData ? (
                <>Loading...</>
              ) : errorBodyTypesData ? (
                <>Error...</>
              ) : (
                <select
                  id="bodytype"
                  name="bodytype"
                  className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                >
                  {bodyTypesData?.map((bt) => (
                    <option key={bt._id} value={bt.bodytype}>
                      {bt.bodytype}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="p-[8px] flex flex-col w-[50%]">
              <label htmlFor="seating">Seating Capacity:</label>
              <input
                id="seating"
                name="seating"
                type="number"
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
            <div className="p-[8px] flex flex-col w-[50%]">
              <label htmlFor="ground">Ground Clearance:</label>
              <input
                id="ground"
                name="ground"
                type="number"
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
          </div>
          <div className="mt-[8px] flex w-full flex-row border border-rmlk-dark-lighter rounded-md mb-[16px] p-[8px]">
            <div className="p-[8px] w-[50%]">
              <label htmlFor="fueltype" className="mb-[2px] pb-[4px]">
                Fuel Type:
              </label>

              <select
                id="fueltype"
                name="fueltype"
                className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
              >
                {fuelTypes?.map((ft) => (
                  <option key={ft} value={ft}>
                    {ft}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-[8px] flex flex-col w-[50%]">
              <label htmlFor="fueleff">Fuel Efficiency:</label>
              <input
                id="fueleff"
                name="fueleff"
                type="number"
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehiclesForm;
