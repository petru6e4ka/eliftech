import React from "react";
import { Nav } from "../molecules";
import { Paper, Container } from "../atoms";

export const Header = () => {
  return (
    <Paper square component={"header"} sx={{ padding: "10px 0" }}>
      <Container maxWidth="xl">
        <Nav />
      </Container>
    </Paper>
  );
};

export default Header;
