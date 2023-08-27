import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <h1>Title</h1>
      <Outlet />
    </>
  );
}
