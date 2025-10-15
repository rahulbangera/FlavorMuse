import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AuthGate from "./components/AuthGate.jsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Contact from "./pages/Contact.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";


export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-neutral-900">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route element={<AuthGate />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipe/:name" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

          </Route>
          <Route path="*" element={<div className="p-16 text-center">Not found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
