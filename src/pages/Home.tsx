import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Extra from "../components/Steps";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";


function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

   if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Navbar/>
    <Hero/>
    <Extra/>
    <Footer/>
    </>
  );
}

export default Home;