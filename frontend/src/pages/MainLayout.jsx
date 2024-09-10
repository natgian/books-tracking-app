import { Outlet, useNavigation } from "react-router-dom";
import {
  Navbar,
  Footer,
  Searchbar,
  ScrollToTopBtn,
  Loading,
} from "../components";

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
    </main>
  );
};
export default MainLayout;
