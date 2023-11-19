import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'

const Detail = () => {
  // /detail/:id/
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
          setLoading(false);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="character-card">
      <div className="back-face">
      <img src="https://rickandmortyapi.com/api/character/avatar/3.jpeg" alt="" />
  </div>
      <h2>{character.name}</h2>
      <h2>{character.status}</h2>
      <h2>{character.species}</h2>
      <h2>{character.gender}</h2>
      {character.origin.name && character.origin.name !== "unknown" && (
        <h2>{character.origin.name}</h2>
      )}
      <img src={character.image} alt={character.name} />
      <link rel="stylesheet" href="Detail.css" />
    </div>
  );
};

export default Detail;