import React, { ReactElement } from "react";
import {
  Box,
  BoxProps,
  Container,
  Grid,
  Link,
  styled,
  Typography,
} from "@mui/material";
import { isValidHttpUrl } from "../../utils/TermUtils";

interface DefinitionWrapperProps {
  definition?: string | null;
  source?: string | null;
  illustration: ReactElement;
}

const defaultProps = {
  minHeight: 144,
  px: 3,
  py: 2,
  border: 2,
  borderRadius: "16px",
};

const IllustrationWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Wrapper = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginBottom: "36px",
  },
}));

const DefinitionWrapper: React.FC<DefinitionWrapperProps & BoxProps> = (
  props
) => {
  return (
    <Wrapper>
      <Box px={2} mt={4}>
        <Grid container>
          <Grid item sm={10} xs={12}>
            <Box
              {...defaultProps}
              sx={{ borderColor: "primary.main" }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box mb={props.source ? 2 : 0}>
                <Typography variant="h6">{props.definition}</Typography>
              </Box>
              <DefinitionSource definitionSource={props.source} />
            </Box>
          </Grid>
          <IllustrationWrapper item sm={2}>
            {props.illustration}
          </IllustrationWrapper>
        </Grid>
      </Box>
    </Wrapper>
  );
};

interface DefinitionSourceProps {
  definitionSource?: string | null;
}

const DefinitionSource: React.FC<DefinitionSourceProps> = ({
  definitionSource,
}) => {
  if (!definitionSource) return null;
  const content = isValidHttpUrl(definitionSource) ? (
    <Link
      target="_blank"
      rel="noopener"
      href={definitionSource}
      color="text.disabled"
    >
      {definitionSource}
    </Link>
  ) : (
    <Typography variant="body1" color="text.disabled">
      {definitionSource}
    </Typography>
  );
  return (
    <Box fontStyle="italic" style={{ wordWrap: "break-word" }}>
      {content}
    </Box>
  );
};

export default DefinitionWrapper;
