import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { topUpWallet } from "../../api/WalletApi";
import { useAppState } from "../../provider/AppContext";
import ButtonTopUp from "../atoms/ButtonTopUp";

const TopUpModal = () => {
  const { userLogin, showModal, setShowModal,renderTable, setRenderTable } = useAppState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isLoading } = useMutation(topUpWallet, {
    onSuccess: () => {
      reset();
      alert("Top UP Success");
      setRenderTable(!renderTable)
      setShowModal(false);
    },
    onError: (error) => {
      console.error("Error during top-up:", error);
    },
  });

  const onSubmit = (data: any) => {
    mutate({
      user_fk: userLogin,
      amount: data.amount,
    });
  };

  const handleClose = () => setShowModal(false);

  if (!showModal) {
    return null;
  }

  return (
    <>
      <Dialog open={showModal} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Top-Up Account
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              label="Amount"
              {...register("amount", { required: "Amount is required" })}
              fullWidth
              margin="normal"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={!!errors.amount}
              helperText={
                errors.amount && typeof errors.amount.message === "string"
                  ? errors.amount.message
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <ButtonTopUp
              onClick={() => setShowModal(false)}
              color={"primary"}
              label={"Cancel"}
              type={"button"}
            />
            <ButtonTopUp
              color={"primary"}
              label={isLoading ? "Processing..." : "Top Up"}
              type={"submit"}
              disabled={isLoading}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TopUpModal;
