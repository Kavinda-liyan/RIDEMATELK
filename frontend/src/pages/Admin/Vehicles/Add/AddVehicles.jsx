import PageWrapper from "../../../../components/Assets/PageWrapper";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import BodyTypes from "./BodyTypes";
import Manufacturer from "./Manufacturer";
import AddVehiclesForm from "./AddVehiclesForm";
import { Link } from "react-router-dom";
import LinkTree from "../../../../components/Assets/LinkTree";

const AddVehicles = () => {
  return (
    <PageWrapper>
      <LinkTree>
        <Link className="px-[2px]" to={"/admin/allvehicles"}>
          Vehicles
        </Link>
        <span className="px-[4px]">/</span>
        <Link className="px-[2px]" to={"/admin/addvehicle"}>
          Add vehicles
        </Link>
      </LinkTree>

      <div className="grid grid-cols-12 gap-[20px]">
        <div className="col-span-4">
          <div className="grid grid-rows-12 gap-[20px]">
            <BodyTypes />
            <Manufacturer />
          </div>
        </div>
        <div className="col-span-8">
          <AddVehiclesForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddVehicles;
