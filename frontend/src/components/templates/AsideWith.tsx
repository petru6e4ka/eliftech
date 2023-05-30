import React, { FC, ReactNode } from "react";
import { Header } from "../organisms";
import { Box, Grid } from "../atoms";

export const AsideWith: FC<Props> = ({ children }) => {
  const [aside, ...content] = children;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} component="main">
          <Grid container item spacing={2}>
            <Grid item xs="auto" component="aside">
              <Box
                sx={{
                  px: 4,
                  pb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {aside}
              </Box>
            </Grid>
            <Grid item xs component="section">
              {content}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

interface Props {
  children: ReactNode[];
}

export default AsideWith;
