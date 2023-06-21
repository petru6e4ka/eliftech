import { FC } from "react";
import { Typography, Button, Stack } from "../atoms";

export const ProcessOrderModalContent: FC<Props> = ({
  onRemove,
  onProceed,
}) => {
  return (
    <>
      <Stack
        justifyContent="center"
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ mb: 4 }}>
          You have the unprocessed order in your cart from another shop. Do you
          want to process it?
        </Typography>

        <Stack justifyContent="center" direction="row">
          <Button variant="outlined" onClick={onRemove} sx={{ mx: 2 }}>
            Remove
          </Button>
          <Button variant="contained" onClick={onProceed} sx={{ mx: 2 }}>
            Proceed
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

interface Props {
  onRemove: () => void;
  onProceed: () => void;
}

export default ProcessOrderModalContent;
