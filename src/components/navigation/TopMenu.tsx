import BarChartIcon from "@mui/icons-material/BarChart";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../lib/playContext";
import CountDownTimer from "../counter/CountDownTimer";
import { AboutModal } from "../modals/AboutModal";
import { InfoModal } from "../modals/InfoModal";
import logo from "./logo.png";

type Props = {
  appContext: ApplicationContext;
  differentTopMessage?: string;
};

const TopMenu = ({ appContext, differentTopMessage }: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ backgroundColor: theme.wordle.topBarColor }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={logo} alt={"Logo"} />
            </IconButton>

            <CountDownTimer
              appContext={appContext}
              differentTopMessage={differentTopMessage}
            />
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  navigate("/mystats");
                }}
                color="inherit"
              >
                <EqualizerIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/history");
                    handleClose();
                  }}
                >
                  Předchozí slova + <BarChartIcon />
                </MenuItem>
                <Divider light />
                <MenuItem
                  onClick={() => {
                    setIsInfoModalOpen(true);
                    handleClose();
                  }}
                >
                  Pravidla hry
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/faq");
                    handleClose();
                  }}
                >
                  Časté otázky a odpovědi (FAQ)
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/settings");
                    handleClose();
                  }}
                >
                  Nastavení
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsAboutModalOpen(true);
                    handleClose();
                  }}
                >
                  O aplikaci..
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
};

export default TopMenu;
