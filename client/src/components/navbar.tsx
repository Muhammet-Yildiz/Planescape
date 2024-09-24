import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";
import { RiPlaneFill } from "react-icons/ri"; 
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BiWorld } from "react-icons/bi";
import { AccountPopover } from "./account-popover";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarItem {
  icon: React.ElementType;
  title: string;
}

const items: NavbarItem[] = [
  {
    icon: BiSolidPurchaseTag,
    title: 'Deals',
  },
  {
    icon: BiWorld,
    title: 'Discover',
  },
];

export const Navbar: FC = () => {
  const navigate = useNavigate();
  return (
    <Toolbar
      disableGutters
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: 55,
        px: {xs:1, sm: 2, md: 4, lg: 10 },
        py: 1,
        '& svg.plane-icon': {
          rotate: '90deg',
          backgroundColor: '#4C0198',
          p: 0.5,
          borderRadius: '50%',
          color: 'white',
        },
        mb: 1,
      }}
    >
      <RiPlaneFill size={25} className="plane-icon" />
      <Typography
        variant="h6"
        sx={{
          ml: 1.3,
          fontSize: 16.5,
          fontWeight: 600,
          color: '#333433',
          cursor: 'pointer',
        }}
        onClick={() =>  navigate('/')}
      >
        PLANE SCAPE
      </Typography>

      <Divider
        flexItem
        orientation="vertical"
        sx={{
          borderColor: 'rgba(255,255,255,0.1)',
          mx: 3,
        }}
      />
      <Box sx={{ flexGrow: 1 }} />

      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 1,
            mr: 3,
            '& svg': {
              color: '#4B019B',
            },
          }}
        >
          <item.icon />

          <Typography
            variant="body2"
            sx={{
              fontSize: 14.5,
            }}
          >
            {item.title}
          </Typography>
        </Box>
      ))}

      <AccountPopover />
    </Toolbar>
  );
};