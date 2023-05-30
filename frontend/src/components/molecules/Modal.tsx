import { FC } from "react";
import { Backdrop, UIModal, Fade, Box } from "../atoms";

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <UIModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </UIModal>
  );
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default Modal;
