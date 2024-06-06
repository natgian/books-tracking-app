import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import Book from "./components/Book/Book";
import "./index.css";

function App() {
  return (
    <main className="main-layout">
      <header>
        <Navbar />
        <Searchbar />
      </header>
      <section className="container">
        <Book />
      </section>
      <Footer />
    </main>
  );
}

export default App;
