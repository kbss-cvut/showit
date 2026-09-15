import { AppBar, Box, styled, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as NavIcon } from "./assets/navIcon.svg";
import SearchBar from "./components/search/SearchBar";
import RouteLink from "./components/RouteLink";
import theme from "./app/theme";

interface HeaderProps {
  showSearch?: boolean;
}

const RouteLinkWrapper = styled(RouteLink, {
  shouldForwardProp: (prop) => prop !== "homeButtonVisibility",
})<{ homeButtonVisibility?: boolean }>(({ theme, homeButtonVisibility }) => ({
  [theme.breakpoints.down("sm")]: {
    display: homeButtonVisibility ? "inline" : "none",
  },
}));

const SearchBarWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "homeButtonVisibility",
})<{ homeButtonVisibility?: boolean }>(({ theme, homeButtonVisibility }) => ({
  width: "300px",
  marginLeft: theme.spacing(10),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: homeButtonVisibility ? theme.spacing(1) : theme.spacing(0),
  },
}));

const Header: React.FC<HeaderProps> = (props) => {
  const [homeButtonVisible, setHomeButtonVisible] = useState(true);
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <RouteLinkWrapper
          to="/"
          variant="h6"
          color="textSecondary"
          underline="none"
          homeButtonVisibility={homeButtonVisible}
        >
          <Box display="flex" sx={{ color: theme.palette.text.primary }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <NavIcon display="block" />
            </Box>
            ShowIt
          </Box>
        </RouteLinkWrapper>
        {props.showSearch && (
          <SearchBarWrapper homeButtonVisibility={homeButtonVisible}>
            <SearchBar size="small" focusCallback={setHomeButtonVisible} />
          </SearchBarWrapper>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
