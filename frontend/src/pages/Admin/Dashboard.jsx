import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const pieData = [
    { name: "Petrol", value: 400 },
    { name: "Diesel", value: 300 },
    { name: "Electric", value: 300 },
    { name: "Hybrid", value: 200 },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

  return (
    <div className="min-h-dvh bg-rmlk-dark pl-[60px] pr-[60px] pt-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-rmlk-dark-lighter rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-white/90 mb-4">
          Fuel Type Distribution
        </h3>
        <div className="flex justify-center items-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
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
                  backgroundColor: "#1e1e1e",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ color: "#ddd" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
