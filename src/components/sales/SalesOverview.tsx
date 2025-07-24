import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
  UsersIcon,
  ShoppingBagIcon,
} from "lucide-react";

interface SalesMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  progress?: number;
}

interface SalesOverviewProps {
  metrics?: SalesMetric[];
}

const SalesOverview = ({ metrics = defaultMetrics }: SalesOverviewProps) => {
  return (
    <div className="w-full bg-background p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-full">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center mt-1">
                {metric.trend === "up" && (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                )}
                {metric.trend === "down" && (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm ${metric.trend === "up" ? "text-green-500" : metric.trend === "down" ? "text-red-500" : "text-muted-foreground"}`}
                >
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs last month
                </span>
              </div>
              {metric.progress !== undefined && (
                <div className="mt-3">
                  <Progress value={metric.progress} className="h-1" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {metric.progress}% of target
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const defaultMetrics: SalesMetric[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    trend: "up",
    progress: 72,
    icon: <DollarSignIcon className="h-4 w-4 text-primary" />,
  },
  {
    title: "New Customers",
    value: "1,205",
    change: 10.5,
    trend: "up",
    progress: 64,
    icon: <UsersIcon className="h-4 w-4 text-primary" />,
  },
  {
    title: "Total Sales",
    value: "2,845",
    change: -3.2,
    trend: "down",
    progress: 53,
    icon: <ShoppingBagIcon className="h-4 w-4 text-primary" />,
  },
  {
    title: "Growth Rate",
    value: "12.5%",
    change: 8.4,
    trend: "up",
    icon: <TrendingUpIcon className="h-4 w-4 text-primary" />,
  },
];

export default SalesOverview;
