import React from "react";
import Todo from "./pages/Todo";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import StripePayment from "./components/StripePayment";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import BuyPremiumPage from "./components/BuyPremiumPage";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* <Todo /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/buy-premium" element={<BuyPremiumPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
