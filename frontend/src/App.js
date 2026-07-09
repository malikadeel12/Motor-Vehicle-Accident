import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HandleEverything from "@/components/landing/HandleEverything";
import AccidentTypes from "@/components/landing/AccidentTypes";
import Results from "@/components/landing/Results";
import Damages from "@/components/landing/Damages";
import EstimateBanner from "@/components/landing/EstimateBanner";
import Journey from "@/components/landing/Journey";
import Testimonials from "@/components/landing/Testimonials";
import FinalPush from "@/components/landing/FinalPush";
import Footer from "@/components/landing/Footer";
import Estimate from "@/pages/Estimate";

const Landing = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <HandleEverything />
      <AccidentTypes />
      <Results />
      <Damages />
      <EstimateBanner />
      <Journey />
      <Testimonials />
      <FinalPush />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="App bg-[#161314] text-[#f5ebe1] overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/estimate" element={<Estimate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
