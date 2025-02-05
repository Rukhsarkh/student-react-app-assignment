import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { People, Logout, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../utils/auth";

export default function Nav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo/Brand with gradient */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(45deg, #00AB55 30%, #5BE584 90%)",
            boxShadow: "0 3px 5px 2px rgba(0, 171, 85, .3)",
          }}
        >
          <School />
        </Avatar>
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          Student Portal
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, px: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/dashboard/students")}
            sx={{
              borderRadius: 1,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText
              primary="Students"
              primaryTypographyProps={{
                variant: "body2",
                fontWeight: "medium",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Logout */}
      <Box sx={{ px: 2, pb: 3 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              variant: "body2",
              fontWeight: "medium",
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}
