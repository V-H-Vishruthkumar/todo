import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Header } from "./components/Header";

import { Existing } from "./pages/Extisting";
import { Create } from "./pages/Create";
import Front from "./components/Front";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pages/Existing" element={<Existing />} />
          <Route path="/pages/Create" element={<Create />} />
          <Route path="/components/main/:tripId" element={<Front />} />
        </Routes>
      </div>
    </Router>
  );
}
function Login() {
  return (
    <div>
      <Header />
      <div className="logincon">
        <h2>Search/Create</h2>
        <Link to="/pages/Existing">
          <button>Exisitng Trip</button>
        </Link>
        <Link to={"/pages/Create"}>
          <button>Create Trip</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
