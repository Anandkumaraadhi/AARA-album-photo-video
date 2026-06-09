import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Albums from "./pages/Albums";
import AlbumMedia from "./pages/AlbumMedia";
import UploadMedia from "./pages/UploadMedia";
import Scanner from "./pages/Scanner";
import CreateAlbum from "./pages/CreateAlbum";
import LoginPage from "./components/LoginPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/albums"
          element={<Albums />}
        />

        <Route
          path="/albums/:id"
          element={<AlbumMedia />}
        />

        <Route
          path="/upload"
          element={<UploadMedia />}
        />

        <Route
          path="/scanner"
          element={<Scanner />}
        />
        <Route
          path="/create-album"
          element={<CreateAlbum />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;