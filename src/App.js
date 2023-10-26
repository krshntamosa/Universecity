import React from "react";
<<<<<<< HEAD
import "./App.css";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
=======
import Splash from "./Splash/Splash";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return <div>{loading ? <Splash loading="loading" /> : <p>Helloww</p>}</div>;
};

>>>>>>> 829a5672931362b7274f3fe02ac3a064d5bee9fb
export default App;
