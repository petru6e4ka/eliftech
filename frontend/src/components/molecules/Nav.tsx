import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Divider, Box } from "../atoms";

export const Nav = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "fit-content",
      }}
      component={"nav"}
    >
      <NavLink to="/">
        <Button variant="text">Shop</Button>
      </NavLink>
      <Divider orientation="vertical" variant="middle" flexItem />
      <NavLink to="/shopping-cart">
        <Button variant="text">Shopping Cart</Button>
      </NavLink>
    </Box>
  );
};

export default Nav;
