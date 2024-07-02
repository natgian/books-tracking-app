import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Searchbar from "../components/Searchbar/Searchbar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <main className="main-layout">
      <header>
        <Navbar />
        <Searchbar />
      </header>
      <section className="container">
        <Outlet />
      </section>

      <Footer />
    </main>
  );
};
export default Homepage;
