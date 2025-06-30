import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/ApolloClient";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "800px",
            padding: "16px 24px",
            backgroundColor: "#000",
            color: "white",
          },
        }}
      />
    </ApolloProvider>
  </StrictMode>
);
