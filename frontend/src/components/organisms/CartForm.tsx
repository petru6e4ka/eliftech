import React from "react";
import { Box, TextField } from "../atoms";

export const CartForm = () => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mb: 2 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField id="outlined-basic" label="Name" variant="outlined" required />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        required
      />
      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        required
      />
      <TextField
        id="outlined-basic"
        label="Adress"
        variant="outlined"
        required
      />
    </Box>
  );
};

export default CartForm;
