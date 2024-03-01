import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { walletTransfer } from "../../api/WalletApi";
import { useAppState } from "../../provider/AppContext";
import { useEffect } from "react";
import { getUsers } from "../../api/UserApi";
import ButtonTransfer from "../atoms/ButtonTransfer";

const TransferWalletModal = () => {
  const {
    userLogin,
    showTransferModal,
    setShowTransferModal,
    setUsers,
    users,
    renderTable,
    setRenderTable,
  } = useAppState();

  useEffect(() => {
    if (showTransferModal === true) {
      const fetchUsers = async () => {
        try {
          const userList = await getUsers(userLogin);
          setUsers(userList?.data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };
      fetchUsers();
    }
  }, [showTransferModal]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isLoading } = useMutation(walletTransfer, {
    onSuccess: () => {
      setShowTransferModal(false);
      setRenderTable(!renderTable);
      alert("Transfer Succeed");
      reset();
    },
    onError: (error) => {
      console.error("Error during wallet transfer:", error);
    },
  });

  const onSubmit = (data: any) => {
    mutate({
      fromUserId: userLogin,
      toUserId: data.nama_user.id,
      amount: data.amount,
    });
  };

  const handleClose = () => {
    setShowTransferModal(false);
    reset();
  };

  if (!showTransferModal) {
    return null;
  }

  return (
    <>
      <Dialog
        open={showTransferModal}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Transfer Funds
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="nama_user"
              control={control}
              rules={{ required: "Nama User is required." }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  options={users}
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  onChange={(_, data) => field.onChange(data || null)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="User"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              )}
            />
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
            <ButtonTransfer
              onClick={handleClose}
              color="primary"
              label={"Cancel"}
              type={"button"}
            />
            <ButtonTransfer
              type={"submit"}
              color={"primary"}
              disabled={isLoading}
              label={isLoading ? "Processing..." : "Transfer"}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TransferWalletModal;
