import { Box, Button } from "@mui/material";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppState } from "../../provider/AppContext";
import { useQuery } from "react-query";
import { getTransactions, getWalletBalance } from "../../api/WalletApi";
import dayjs from "dayjs";
import { moneyFormat } from "../../utils/moneyFormat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const WalletTable = () => {
  const { userLogin, setShowModal, setShowTransferModal, renderTable } =
    useAppState();
  const { isLoading, error, data, refetch } = useQuery(
    ["transactionsData", userLogin],
    () => getTransactions(userLogin),
    {
      enabled: !!userLogin,
    }
  );

  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    error: balanceError,
    refetch: refetchBalance,
  } = useQuery(
    ["walletBalance", userLogin],
    () => getWalletBalance(userLogin),
    {
      enabled: !!userLogin,
    }
  );

  const columns = [
    {
      field: "id",
      headerName: "id",
      flex: 0.1,
      width: 150,
      hideable: true,
    },
    {
      field: "user_fk",
      headerName: "User",
      flex: 0.1,
      width: 150,
      hideable: true,
    },
    {
      field: "transaction_description",
      headerName: "Transaksi",
      flex: 0.1,
      width: 150,
    },
    {
      field: "amount",
      headerName: "Jumlah",
      flex: 0.1,
      width: 150,
      renderCell: (params: any) => {
        return moneyFormat(params.row.amount);
      },
    },
    {
      field: "createdAt",
      headerName: "Tanggal Transaksi",
      flex: 0.1,
      width: 150,
      renderCell: (params: any) => {
        return dayjs(params.row.createdAt).format("DD/MM/YYYY");
      },
    },
  ];

  useEffect(() => {
    refetch();
    refetchBalance();
  }, [refetch, refetchBalance, renderTable]);

  const NoRowsOverlay = () => {
    return <GridOverlay>Belum Ada Transaksi</GridOverlay>;
  };
  return (
    <>
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: 300, width: "100%" }}>
          <Box sx={{ marginBottom: "1rem" }}>
            <Button
              sx={{
                fontSize: "0.75rem",
                backgroundColor: "#ADD8E6",
                color: "blue",
              }}
              variant="contained"
              onClick={() => setShowModal(true)}
            >
              <AddCircleOutlineIcon></AddCircleOutlineIcon>Top UP
            </Button>{" "}
            <Button
              sx={{
                marginLeft: "1rem",
                fontSize: "0.75rem",
                backgroundColor: "#ADD8E6",
                color: "blue",
              }}
              variant="contained"
              onClick={() => setShowTransferModal(true)}
            >
              <AddCircleOutlineIcon></AddCircleOutlineIcon>Transfer
            </Button>
          </Box>{" "}
          <Box sx={{ marginBottom: "1rem" }}>
            Wallet Balance:{" "}
            {isBalanceLoading ? "Loading..." : moneyFormat(balanceData?.data?.balance)}
          </Box>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <DataGrid
              columnVisibilityModel={{
                id: false,
              }}
              components={{
                NoRowsOverlay: NoRowsOverlay,
              }}
              pageSizeOptions={[5, 10, 25, 100]}
              rows={data?.data || []}
              columns={columns}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default WalletTable;
