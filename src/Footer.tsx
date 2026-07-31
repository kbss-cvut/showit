import React from "react";
import {Box, Container, styled, Typography} from "@mui/material";
import {ReactComponent as FooterImage} from "./assets/footer_image.svg";

const Illustration = styled(FooterImage)(({ theme }) => ({
  position: "absolute",
  bottom: "-16px",
  right: "60px",
  maxHeight: 115,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

interface FooterProps {
  showImage?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <Box>
      {props.showImage && (
        <Container>
          <Box style={{ position: "relative", marginTop: 100 }}>
            <Illustration />
          </Box>
        </Container>
      )}
      <Box bgcolor="primary.main" py={1}>
        <Container maxWidth="lg">
          <Wrapper>
            <Typography variant="body2" color="textSecondary">
              <a
                  href="https://kbss.felk.cvut.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="KBSS FEL ČVUT v Praze"
              >
                &copy;&nbsp;KBSS FEL ČVUT v Praze, {new Date().getFullYear()}
              </a>
            </Typography>
          </Wrapper>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
