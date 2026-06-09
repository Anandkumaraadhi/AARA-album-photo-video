import { Box } from "@mui/material";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        padding: 2,
        gap: 3,
        background: "#f8fafc",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileOpen(!mobileOpen);
            } else {
              setCollapsed(!collapsed);
            }
          }}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: {
              xs: 2,
              md: 4,
            },
            overflowY: "auto",
          }}
        >
          {children}

        </Box>
        <Footer />
      </Box>
    </Box>
  );
}