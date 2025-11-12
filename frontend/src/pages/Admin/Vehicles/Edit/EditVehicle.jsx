import PageWrapper from "../../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../../components/BreadCrumb";
import EditVehicleForm from "./EditVehicleForm";
import ViewVehicle from "./viewVehicle";

const EditVehicle = () => {
  return (
    <PageWrapper>
      <BreadCrumb
        links={[
          { label: "Vehicles", to: "/admin/allvehicles" },
          {
            label: "Edit vehicle",
            to: "admin/editvehicle/",
          },
        ]}
      />

      <div className="grid grid-cols-12 gap-[16px] ">
        <ViewVehicle />
        <EditVehicleForm />
      </div>
    </PageWrapper>
  );
};

export default EditVehicle;
