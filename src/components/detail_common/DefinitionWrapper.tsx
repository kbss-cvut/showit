import React, { ReactElement } from "react";
import {
  Box,
  BoxProps,
  Container,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { isValidHttpUrl } from "../../utils/TermUtils";
import { Comment } from "@mui/icons-material";

interface DefinitionWrapperProps {
  definition?: string | null;
  scopeNote?: string | null;
  source?: string | null;
  illustration: ReactElement;
}

const defaultProps = {
  minHeight: 144,
  px: 3,
  py: 2,
  border: 2,
  borderRadius: "16px",
  color: "#000000",
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
              <Box mb={props.source || props.scopeNote ? 2 : 0}>
                <Typography variant="h6">{props.definition}</Typography>
              </Box>
              {props.scopeNote && (
                <Box mb={props.source ? 2 : 0}>
                  <Stack direction="row" gap={1}>
                    <Comment />
                    <Typography variant="body1" fontWeight={600}>
                      Pozn.:
                    </Typography>
                    <Typography variant="body1">{props.scopeNote}</Typography>
                  </Stack>
                </Box>
              )}
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
