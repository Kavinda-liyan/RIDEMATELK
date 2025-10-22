import PageWrapper from "../../../../components/Assets/PageWrapper";

import AddBodyTypesForm from "./AddBodyTypesForm";
import AddManufacturerForm from "./AddManufacturerForm";
import AddVehiclesForm from "./AddVehiclesForm";

import BreadCrumb from "../../../../components/BreadCrumb";

const AddVehicles = () => {
  return (
    <PageWrapper>
      <BreadCrumb
        links={[
          { label: "Vehicles", to: "/admin/allvehicles" },
          { label: "Add Vehicles", to: "/admin/addvehicle" },
        ]}
      />

      <div className="grid grid-cols-12 gap-[20px]">
        <div className="col-span-4">
          <div className="grid grid-rows-12 gap-[20px]">
            <AddBodyTypesForm />
            <AddManufacturerForm />
          </div>
        </div>
        <div className="col-span-8 h-fit">
          <AddVehiclesForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddVehicles;
