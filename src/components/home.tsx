import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesOverview from "./sales/SalesOverview";
import SalesChart from "./sales/SalesChart";
import SalesDataTable from "./sales/SalesDataTable";
import { MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Home = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Sales Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=sales-admin"
                      alt="User"
                    />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Your sales performance at a glance.
          </p>
        </div>

        <div className="space-y-8">
          {/* Sales Overview Section */}
          <section>
            <SalesOverview />
          </section>

          {/* Sales Chart Section */}
          <section>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Sales Trends</h3>
                <SalesChart />
              </CardContent>
            </Card>
          </section>

          {/* Sales Data Table Section */}
          <section>
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Sales Records</h3>
                    <TabsList>
                      <TabsTrigger value="all">All Sales</TabsTrigger>
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                      <TabsTrigger value="top">Top Performing</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="all">
                    <SalesDataTable />
                  </TabsContent>
                  <TabsContent value="recent">
                    <SalesDataTable filter="recent" />
                  </TabsContent>
                  <TabsContent value="top">
                    <SalesDataTable filter="top" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Sales Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
