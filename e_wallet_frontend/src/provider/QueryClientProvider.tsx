import { QueryClient, QueryClientProvider } from "react-query";
import { FC } from "react";
import { QueryProviderProps } from "../interfaces/QueryClientProvider/QueryProviderProps";

const queryClient = new QueryClient();
const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
