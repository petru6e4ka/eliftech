import { FC } from "react";
import { Typography, Button, Box } from "../atoms";

export const ProcessOrderModalContent: FC<Props> = ({
  onRemove,
  onProceed,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ mb: 4 }}>
          You have the unprocessed order in your cart from another shop. Do you
          want to process it?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={onRemove} sx={{ mx: 2 }}>
            Remove
          </Button>
          <Button variant="contained" onClick={onProceed} sx={{ mx: 2 }}>
            Proceed
          </Button>
        </Box>
      </Box>
    </>
  );
};

interface Props {
  onRemove: () => void;
  onProceed: () => void;
}

export default ProcessOrderModalContent;
