import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Divider, Badge, Stack } from "../atoms";
import { useOrderSelector } from "../../store/order";

export const Nav = () => {
  const { products } = useOrderSelector();
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ width: "fit-content" }}
      component={"nav"}
    >
      <NavLink to="/">
        <Button variant="text">Shop</Button>
      </NavLink>
      <Divider orientation="vertical" variant="middle" flexItem />
      <NavLink to="/shopping-cart">
        {products.length > 0 ? (
          <Badge
            color="primary"
            badgeContent={products.reduce(
              (prev, cur) => prev + (cur.quantity || 1),
              0
            )}
          >
            <Button variant="text">Shopping Cart</Button>
          </Badge>
        ) : (
          <Button variant="text">Shopping Cart</Button>
        )}
      </NavLink>
    </Stack>
  );
};

export default Nav;
