import { Box, Container, Grid, styled, Typography } from "@mui/material";
import { darken } from "@mui/material/styles";
import React from "react";
import { ReactComponent as Hero } from "../assets/hero.svg";
import SuggestedWords from "./SuggestedWords";
import SearchBar from "./search/SearchBar";
import RouteLink from "./RouteLink";
import theme from "../app/theme";

const HeroWrapper = styled(Grid)(({ theme }) => ({
  textAlign: "right",
  [theme.breakpoints.down("lg")]: {
    textAlign: "left",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const HeroSection: React.FC = () => {
  return (
    <Box bgcolor="primary.main" py={3} style={{ flex: 1 }}>
      <Container component="section" maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item md={5} xs={10}>
            <Typography variant="h1" color="textSecondary" gutterBottom>
              Hledat význam není těžké.
            </Typography>
            <Typography variant="h2" color="textSecondary">
              Stačí vědět, kde hledat.
            </Typography>
          </Grid>
          <HeroWrapper item md={4}>
            <Hero
              style={
                {
                  width: "80%",
                  maxHeight: 330,
                  color: theme.palette.primary.main,
                  "--secondary-accent-color": theme.palette.secondary.main,
                  "--secondary-accent-color-dark": darken(
                    theme.palette.secondary.main,
                    0.3
                  ),
                } as React.CSSProperties
              }
            />
          </HeroWrapper>
          <Grid item md={10} xs={12}>
            <SearchBar size="large" />
          </Grid>
          <Grid item md={10} xs={12}>
            <SuggestedWords />
            <Box display={"flex"} justifyContent={"center"} mt={1}>
              <Typography variant={"h6"} color="textSecondary">
                Nebo si prohlédněte dostupné{" "}
                <RouteLink to={`/slovniky`} color="textSecondary" variant="h6">
                  slovníky
                </RouteLink>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
