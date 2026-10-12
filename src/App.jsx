import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ListOfOrchids from "./components/ListOfOrchids.jsx";
import EditOrchid from "./components/EditOrchid.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<ListOfOrchids />} />
          <Route path="/orchids/:id/edit" element={<EditOrchid />} />
          <Route path="/orchids/new" element={<EditOrchid createMode />} />
          <Route path="*" element={<p className="alert alert-warning">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
