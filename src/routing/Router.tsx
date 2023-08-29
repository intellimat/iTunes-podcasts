import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Layout from "./RootLayout";
import Podcast from "../pages/Podcast";
import Episode from "../pages/Episode/Episode";
import NoMatch from "../pages/NoMatch";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/podcast/:podcastId" element={<Podcast />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeTrackId"
          element={<Episode />}
        />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
