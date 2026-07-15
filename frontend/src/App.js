import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HandleEverything from "@/components/landing/HandleEverything";
import AccidentTypes from "@/components/landing/AccidentTypes";
import Results from "@/components/landing/Results";
import Damages from "@/components/landing/Damages";
import Journey from "@/components/landing/Journey";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { AdminAuthProvider } from "@/components/admin/AdminAuth";

function PublicLayout() {
  return (
    <div className="App bg-[#161314] text-[#f5ebe1] overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <HandleEverything />
        <AccidentTypes />
        <Results />
        <Damages />
        <Journey />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("admin_auth") === "true";
  return isAuth ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;