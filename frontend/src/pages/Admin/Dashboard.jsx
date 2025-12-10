import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import PageWrapper from "../../components/Assets/PageWrapper";
import BreadCrumb from "../../components/BreadCrumb";
import { useDashboardComponents } from "../../hooks/useDashboardComponents";
import DashboardPillers from "../../components/Assets/DashboardPillers";
import { useEffect, useMemo, useState } from "react";
import Loader from "../../components/Routes/Loader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  faCarAlt,
  faMedal,
  faStar,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const useDashBoardHook = useDashboardComponents();
  const fuelTypePieData = useDashBoardHook.fuelTypePieData;
  const barData = useDashBoardHook.manufacturerBarData;
  const bodyTypeBarData = useDashBoardHook.bodyTypePieData;

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

  const fuelTypePieChartMemo = useMemo(
    () => (
      <ResponsiveContainer width="100%" height="250">
        <PieChart>
          <Pie
            fontSize={"14px"}
            data={fuelTypePieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {fuelTypePieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: "12px",
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "8px",
              color: "#000",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    ),
    [fuelTypePieData]
  );

  const barChartMemo = useMemo(
    () => (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#ccc" }} />
          <YAxis tick={{ fontSize: 14, fill: "#ccc" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#149777" />
        </BarChart>
      </ResponsiveContainer>
    ),
    [barData]
  );
  const bodyTypebarChartMemo = useMemo(
    () => (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bodyTypeBarData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#ccc" }} />
          <YAxis tick={{ fontSize: 14, fill: "#ccc" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#36A2EB" />
        </BarChart>
      </ResponsiveContainer>
    ),
    [bodyTypeBarData]
  );

  const [pageLoading, setPageLoading] = useState(true);

  const [value, onChange] = useState(new Date());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (pageLoading) {
    return (
      <div className=" flex justify-center items-center h-dvh inset-1 w-full">
        <Loader />
      </div>
    );
  }

  return (
    <PageWrapper>
      <BreadCrumb links={[{ label: "Dashboard", to: "/admin/dashboard" }]} />
      <div className="grid grid-cols-4 gap-[16px] font-rmlk-secondary my-[16px]">
        <DashboardPillers
          phillerName={"Registered Users "}
          phillerData={
            useDashBoardHook.loadingUser
              ? "Loading Users..."
              : useDashBoardHook.errorUser
              ? "Error!"
              : useDashBoardHook.AllUsers
          }
          icon={faUserAlt}
        />

        <DashboardPillers
          phillerName={"Trusted Users "}
          phillerData={
            useDashBoardHook.loadingUser
              ? "Loading..."
              : useDashBoardHook.errorUser
              ? "Error!"
              : useDashBoardHook.AllVerifiedUsers
          }
          icon={faMedal}
        />
        <DashboardPillers
          phillerName={"Vehicle Count "}
          phillerData={
            useDashBoardHook.loadingVehicle
              ? "Loading..."
              : useDashBoardHook.errorVehicle
              ? "Error!"
              : useDashBoardHook.AllVehicles
          }
          icon={faCarAlt}
        />
        <DashboardPillers
          phillerName={"Raring Count "}
          phillerData={
            useDashBoardHook.loadingRating
              ? "Loading..."
              : useDashBoardHook.errorRating
              ? "Error!"
              : useDashBoardHook.AllRatings
          }
          icon={faStar}
        />
      </div>
      <div className="grid grid-cols-3 gap-[16px] my-[16px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-rmlk-dark-light rounded-md p-[8px] shadow-md col-span-1"
        >
          <h3 className="text-[14px] text-center  text-white/90 font-rmlk-secondary">
            Fuel Type Distribution For {useDashBoardHook.AllVehicles} Vehicles
            in database
          </h3>
          <div className="flex justify-center items-center">
            {fuelTypePieChartMemo}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-rmlk-dark-light rounded-md p-[8px] shadow-md col-span-2"
        >
          <h3 className="text-[14px] text-center text-white/90 font-rmlk-secondary mb-2">
            Body Type Distribution For {useDashBoardHook.AllVehicles} Vehicles
            in database
          </h3>
          <div className="flex justify-center items-center">
            {bodyTypebarChartMemo}
          </div>
        </motion.div>
      </div>
      <div className="grid grid-cols-12 my-[16px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-rmlk-dark-light rounded-md p-[8px] shadow-md col-span-12"
        >
          <h3 className="text-[14px] text-center text-white/90 font-rmlk-secondary mb-2">
            Vehicle Count by Manufacturer
          </h3>
          <div className="flex justify-center items-center">{barChartMemo}</div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
