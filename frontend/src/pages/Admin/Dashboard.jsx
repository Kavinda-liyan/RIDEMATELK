import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import PageWrapper from "../../components/Assets/PageWrapper";
import BreadCrumb from "../../components/BreadCrumb";
import { useDashboardComponents } from "../../hooks/useDashboardComponents";

const Dashboard = () => {
  const useDashBoardHook = useDashboardComponents();
  const pieData = [
    { name: "Petrol", value: useDashBoardHook.petrolVehicles },
    { name: "Diesel", value: useDashBoardHook.dieselVehicles },
    { name: "Electric", value: useDashBoardHook.hybridVehicles },
    { name: "Hybrid", value: useDashBoardHook.electricVehicles },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

  return (
    <PageWrapper>
      <BreadCrumb links={[{ label: "Dashboard", to: "/admin/dashboard" }]} />
      <div className="grid grid-cols-3 gap-[16px]">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-rmlk-dark-light rounded-md p-[8px] shadow-lg"
          >
            <h3 className="text-[14px] text-center  text-white/90 font-rmlk-secondary">
              Fuel Type Distribution For {useDashBoardHook.AllVehicles} Vehicles in database
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
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
