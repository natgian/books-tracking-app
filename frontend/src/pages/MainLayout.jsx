import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Footer, Searchbar, ScrollToTopBtn, Loading } from "../components";
import CookieBanner from "../components/CookieBanner";

const MainLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <main className="main-layout">
      <header>
        <Navbar />
        <Searchbar />
      </header>

      <div>
        {isPageLoading ? (
          <div className="text-center section-container">
            <Loading />
            Wird geladen...
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <ScrollToTopBtn />
      <Footer />
      <CookieBanner />
    </main>
  );
};
export default MainLayout;
