import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFav } from "./redux/actions";
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Detail from "./views/Detail/Detail";
import Login from "./views/Login/Login";
import Favorites from "./views/Favorites/Favorites";

function App() {
  const [characters, setCharacters] = useState([]);
  const { pathname } = useLocation(); // "/endpoint"

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  // const EMAIL = "tomy_ramos1991@yahoo.com.ar";
  // const PASSWORD = "123456";

  const dispatch = useDispatch();

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      const {data} = await axios(URL + `?email=${email}&password=${password}`)
      const {access} = data
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
      window.alert(error.response.data.response)
    }
    // axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
    //    const { access } = data;
    //    setAccess(data);
    //    access && navigate('/home');
    // });
 }

//   function login(dataUser) {
//     if (dataUser.password === PASSWORD && dataUser.email === EMAIL) {
//        setAccess(true);
//        navigate('/home');
//     } else {
//       alert("Usuario o clave incorrectos");
//     }
//  }

useEffect(() => {
  !access && navigate("/");
}, [access, navigate]);


  async function onSearch(id) {
    try {
      const{data}= await axios(`http://localhost:3001/rickandmorty/character/${id}`)
      setCharacters((oldChars) => [...oldChars, data]);
    } catch (error) {
      window.alert(error.response.data.message)
    }
    // axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
    //   ({ data }) => {
    //     if (data.name) {
    //       setCharacters((oldChars) => [...oldChars, data]);
    //     } else {
    //       window.alert("¡No hay personajes con este ID!");
    //     }
    //   }
    // );
  }

  function onClose(id) {
    // [{id},{id},{id},{id},{id}]
    // fiterCharacters = [{id}, {id}, {id}]
    const fiterCharacters = characters.filter(
      (character) => character.id !== Number(id)
    );
    setCharacters(fiterCharacters);
    dispatch(removeFav(id))
  }

  return (
    <div className="App">
      {pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Login login={login}/>} />
        <Route
          path="/home"
          element={<Home characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites onClose={onClose} />} />
      </Routes>
    </div>
  );
}

export default App;
