import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data?: SalesData[];
  title?: string;
  description?: string;
}

interface SalesData {
  date: string;
  amount: number;
  orders: number;
  customers: number;
}

const SalesChart = ({
  data = mockData,
  title = "Sales Trends",
  description = "View your sales performance over time",
}: SalesChartProps) => {
  const [chartType, setChartType] = useState("line");
  const [timeRange, setTimeRange] = useState("monthly");

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    // In a real app, this would filter based on the timeRange
    return data;
  }, [data, timeRange]);

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="line"
          value={chartType}
          onValueChange={setChartType}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
          </TabsList>

          <div className="h-[350px] w-full">
            <TabsContent value="line" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Sales ($)"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="bar" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" name="Sales ($)" />
                  <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="area" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name="Sales ($)"
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name="Orders"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Mock data for development
const mockData: SalesData[] = [
  { date: "Jan", amount: 4000, orders: 240, customers: 100 },
  { date: "Feb", amount: 3000, orders: 198, customers: 120 },
  { date: "Mar", amount: 2000, orders: 180, customers: 110 },
  { date: "Apr", amount: 2780, orders: 190, customers: 130 },
  { date: "May", amount: 1890, orders: 170, customers: 120 },
  { date: "Jun", amount: 2390, orders: 210, customers: 140 },
  { date: "Jul", amount: 3490, orders: 250, customers: 160 },
  { date: "Aug", amount: 4000, orders: 280, customers: 170 },
  { date: "Sep", amount: 3200, orders: 230, customers: 150 },
  { date: "Oct", amount: 2800, orders: 200, customers: 140 },
  { date: "Nov", amount: 3500, orders: 260, customers: 180 },
  { date: "Dec", amount: 4100, orders: 290, customers: 200 },
];

export default SalesChart;
