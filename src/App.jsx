import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import PageNotFound from "./lib/PageNotFound";
import Assessment from "./pages/Assessment";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Assessment />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
