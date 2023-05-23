import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect, useReducer } from "react";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import userReducer from "../features/user";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Navbar from "@/components/Navbar";
function LoadingSpinner() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    loading && (
      <div
        style={{ backgroundColor: "#000000" }}
        className="h-screen flex items-center justify-center"
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="secondary" />
        </Box>
      </div>
    )
  );
}
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname);
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  return router.pathname !== "/login" ? (
    <Provider store={store}>
      <>
        {router.pathname != "/messages/[id]" && <LoadingSpinner />}

        <div style={{ backgroundColor: "#000000" }} className="whole__wrapper ">
          <div className="pt-6 ">
            {router.pathname != "/messages/[id]" && <Navbar />}
          </div>
          <div className="lower flex sm:gap-2 lg:gap-36 ">
            <div className="wrapper__forflex">
              <div className="overflow-x-hidden fixed ">
                <Sidebar />
              </div>
            </div>
            <div className="posts w-full flex ml-32 flex-col gap-2">
              <Toaster position="bottom-center" />
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </>
    </Provider>
  ) : (
    <Provider store={store}>
      <>
        <Component {...pageProps} />
      </>
    </Provider>
  );
}
