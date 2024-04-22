import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile/index.tsx";
import { Login } from "./pages/login";
import { DefaultLayout } from "./layouts/defaultLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
