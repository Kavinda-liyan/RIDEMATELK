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
import CountUp from "react-countup";
import DashboardPillers from "../../components/Assets/DashboardPillers";

const Dashboard = () => {
  const useDashBoardHook = useDashboardComponents();
  const pieData = useDashBoardHook.fuelTypePieData;
  const barData = useDashBoardHook.manufacturerBarData;

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

  return (
    <PageWrapper>
      <BreadCrumb links={[{ label: "Dashboard", to: "/admin/dashboard" }]} />
      <div className="grid grid-cols-4 gap-[16px] font-rmlk-secondary my-[16px]">
        <DashboardPillers
          phillerName={"Vehicle Count :"}
          phillerData={useDashBoardHook.AllVehicles}
        />
        <DashboardPillers
          phillerName={"Registered Users :"}
          phillerData={useDashBoardHook.AllUsers}
        />
      </div>
      <div className="grid grid-cols-3 gap-[16px]">
        <div className="">
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
              <ResponsiveContainer width="100%" height="200">
                <PieChart>
                  <Pie
                    fontSize={"12px"}
                    data={pieData}
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
                    {pieData.map((entry, index) => (
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
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-rmlk-dark-light rounded-md p-[8px] shadow-md col-span-2"
        >
          <h3 className="text-[14px] text-center text-white/90 font-rmlk-secondary mb-2">
            Vehicle Count by Manufacturer
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#ccc" }} />
              <YAxis tick={{ fontSize: 12, fill: "#ccc" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#36A2EB" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      <div className="grid grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-rmlk-dark-light rounded-md p-[8px] shadow-md col-span-12"
        >
          <h3 className="text-[14px] text-center text-white/90 font-rmlk-secondary mb-2">
            Vehicle Count by Manufacturer
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#ccc" }} />
              <YAxis tick={{ fontSize: 12, fill: "#ccc" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#36A2EB" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
