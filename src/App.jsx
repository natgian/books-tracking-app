import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import "./index.css";

function App() {
  return (
    <main className="main-layout">
      <Navbar />
      <Searchbar />
      <section></section>
      <Footer />
    </main>
  );
}

export default App;
