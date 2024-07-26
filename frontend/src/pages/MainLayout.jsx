import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Searchbar from "../components/Searchbar/Searchbar";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import { Outlet, useNavigation } from "react-router-dom";

const MainLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <main className="main-layout">
      <header>
        <Navbar />
        <Searchbar />
      </header>

      <section>
        {isPageLoading ? (
          <div className="text-center section-container">
            <div className="loader"></div>
            Wird geladen...
          </div>
        ) : (
          <Outlet />
        )}
      </section>
      <ScrollToTopBtn />
      <Footer />
    </main>
  );
};
export default MainLayout;