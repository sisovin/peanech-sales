import React, { useState } from "react";
import { Search, Filter, ChevronDown, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface SalesDataTableProps {
  data?: SalesRecord[];
  isLoading?: boolean;
  onFilterChange?: (filters: SalesFilters) => void;
  onExport?: () => void;
  onRefresh?: () => void;
}

interface SalesRecord {
  id: string;
  date: string;
  customer: string;
  product: string;
  category: string;
  region: string;
  representative: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
}

interface SalesFilters {
  search: string;
  dateRange: { from?: Date; to?: Date };
  category: string;
  region: string;
  representative: string;
}

const SalesDataTable: React.FC<SalesDataTableProps> = ({
  data = mockSalesData,
  isLoading = false,
  onFilterChange = () => {},
  onExport = () => {},
  onRefresh = () => {},
}) => {
  const [filters, setFilters] = useState<SalesFilters>({
    search: "",
    dateRange: {},
    category: "all",
    region: "all",
    representative: "all",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<{ from?: Date; to?: Date }>({});

  const handleFilterChange = (key: keyof SalesFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateSelect = (selectedDate: { from?: Date; to?: Date }) => {
    setDate(selectedDate);
    handleFilterChange("dateRange", selectedDate);
  };

  const categories = Array.from(
    new Set(mockSalesData.map((item) => item.category)),
  );
  const regions = Array.from(new Set(mockSalesData.map((item) => item.region)));
  const representatives = Array.from(
    new Set(mockSalesData.map((item) => item.representative)),
  );

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl font-bold">
            Sales Transactions
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {date.from ? (
                    date.to ? (
                      <span>
                        {format(date.from, "MMM d, yyyy")} -{" "}
                        {format(date.to, "MMM d, yyyy")}
                      </span>
                    ) : (
                      format(date.from, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Date Range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={date.from ? (date as { from: Date; to?: Date }) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.region}
              onValueChange={(value) => handleFilterChange("region", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.representative}
              onValueChange={(value) =>
                handleFilterChange("representative", value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sales Rep" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Representatives</SelectItem>
                {representatives.map((rep) => (
                  <SelectItem key={rep} value={rep}>
                    {rep}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Representative</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {record.id}
                        </TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.customer}</TableCell>
                        <TableCell>{record.product}</TableCell>
                        <TableCell>{record.category}</TableCell>
                        <TableCell>{record.region}</TableCell>
                        <TableCell>{record.representative}</TableCell>
                        <TableCell className="text-right">
                          $
                          {record.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : record.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.status.charAt(0).toUpperCase() +
                              record.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {[...Array(Math.ceil(data.length / 10))]
                    .slice(0, 5)
                    .map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, Math.ceil(data.length / 10)),
                        )
                      }
                      className={
                        currentPage === Math.ceil(data.length / 10)
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Mock data for demonstration
const mockSalesData: SalesRecord[] = [
  {
    id: "INV-001",
    date: "2023-05-01",
    customer: "Acme Corp",
    product: "Premium Widget",
    category: "Electronics",
    region: "North America",
    representative: "John Smith",
    amount: 1299.99,
    status: "completed",
  },
  {
    id: "INV-002",
    date: "2023-05-02",
    customer: "TechGiant Inc",
    product: "Enterprise Solution",
    category: "Software",
    region: "Europe",
    representative: "Emma Johnson",
    amount: 4599.99,
    status: "completed",
  },
  {
    id: "INV-003",
    date: "2023-05-03",
    customer: "Global Services",
    product: "Consulting Package",
    category: "Services",
    region: "Asia",
    representative: "Michael Chen",
    amount: 2899.5,
    status: "pending",
  },
  {
    id: "INV-004",
    date: "2023-05-04",
    customer: "Retail Chain Ltd",
    product: "POS System",
    category: "Hardware",
    region: "North America",
    representative: "John Smith",
    amount: 3499.99,
    status: "completed",
  },
  {
    id: "INV-005",
    date: "2023-05-05",
    customer: "Healthcare Plus",
    product: "Medical Software",
    category: "Software",
    region: "Europe",
    representative: "Emma Johnson",
    amount: 5999.99,
    status: "cancelled",
  },
  {
    id: "INV-006",
    date: "2023-05-06",
    customer: "Education First",
    product: "Learning Platform",
    category: "Software",
    region: "Asia",
    representative: "Michael Chen",
    amount: 1899.99,
    status: "completed",
  },
  {
    id: "INV-007",
    date: "2023-05-07",
    customer: "Manufacturing Pro",
    product: "Industrial Equipment",
    category: "Hardware",
    region: "North America",
    representative: "Sarah Williams",
    amount: 12499.99,
    status: "pending",
  },
  {
    id: "INV-008",
    date: "2023-05-08",
    customer: "Logistics Co",
    product: "Fleet Management",
    category: "Services",
    region: "Europe",
    representative: "Emma Johnson",
    amount: 3299.99,
    status: "completed",
  },
  {
    id: "INV-009",
    date: "2023-05-09",
    customer: "Startup Innovate",
    product: "Cloud Services",
    category: "Software",
    region: "Asia",
    representative: "Michael Chen",
    amount: 899.99,
    status: "completed",
  },
  {
    id: "INV-010",
    date: "2023-05-10",
    customer: "Government Agency",
    product: "Security System",
    category: "Hardware",
    region: "North America",
    representative: "John Smith",
    amount: 8999.99,
    status: "pending",
  },
  {
    id: "INV-011",
    date: "2023-05-11",
    customer: "Finance Group",
    product: "Analytics Platform",
    category: "Software",
    region: "Europe",
    representative: "Sarah Williams",
    amount: 4299.99,
    status: "completed",
  },
  {
    id: "INV-012",
    date: "2023-05-12",
    customer: "Media Corp",
    product: "Content Management",
    category: "Software",
    region: "Asia",
    representative: "Michael Chen",
    amount: 2199.99,
    status: "cancelled",
  },
  {
    id: "INV-013",
    date: "2023-05-13",
    customer: "Retail Chain Ltd",
    product: "Inventory System",
    category: "Software",
    region: "North America",
    representative: "John Smith",
    amount: 3799.99,
    status: "completed",
  },
  {
    id: "INV-014",
    date: "2023-05-14",
    customer: "TechGiant Inc",
    product: "Server Hardware",
    category: "Hardware",
    region: "Europe",
    representative: "Emma Johnson",
    amount: 9499.99,
    status: "pending",
  },
  {
    id: "INV-015",
    date: "2023-05-15",
    customer: "Healthcare Plus",
    product: "Patient Portal",
    category: "Software",
    region: "Asia",
    representative: "Sarah Williams",
    amount: 4999.99,
    status: "completed",
  },
];

export default SalesDataTable;
