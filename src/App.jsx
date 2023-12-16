
import { useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { useState } from 'react';
import YouTube from 'react-youtube';
import IconVerMas from  './assets/info.svg'
import IconoCruz from  './assets/x.svg'
import IconoPlay from  './assets/play.svg'


function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  // endpoint para las imagenes
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  //const [selectedMovie, setSelectedMovie] = useState({})
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modal, setModal] = useState(false);



  // funcion para realizar la peticion get a la api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    //console.log('data',results);
    //setSelectedMovie(results[0])

    setMovies(results);
    setMovie(results[0]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const toggleModal = (selectedMovie) => {
    setSelectedMovie(selectedMovie);
    setModal(!modal);
  };
  
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (

    <div>
      {/* contenedor para mostrar los posters y las peliculas en la peticion a la api */}
      <form id='form' onChange={searchMovies} >
        <input
          type="text"
          placeholder="Buscar"
          onChange={(e) => setSearchKey(e.target.value)}
          className='search'
          id='search'
        />
        {/* <button className="btn btn-primary">Search</button> */}
      </form>

      <div className="container__main">
        <div className='titulo'>
          <h1 className='text-titulo'>Peliculas</h1>
        </div>
        <div className="container__app">


          <div className="row">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="card"
              // onClick={() => selectMovie(movie)}
              >
              <div className='icono-main'>
              <img src={IconVerMas} alt="" className='icono' onClick={() => toggleModal(movie)}/>
               {/* <img src={IconVerMas} alt="" className='icono' onClick={toggleModal}/> */}
              </div>
                <img
                  src={`${URL_IMAGE + movie.poster_path}`}
                  alt=""
                  height={600}
                  width="100%"
                />
                <div className="titulos">
                <h4 className="text-center">{movie.title}</h4>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content">
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${selectedMovie.backdrop_path}")`,
              }}
            >
              <div className="titulo-peli">
                  <h1 className="modal-text-title margenes">{selectedMovie.title}</h1>
                <button className="boton margenes">
                <img src={IconoPlay} className='icono-play' alt="" />
                Play trailer
                </button>
              </div>
            </div>
            <div className="">
               {/* <h1 className="text-white">{movie.title}</h1>  */}
               <p className='text-white2 margenes'>Fecha de estreno: {selectedMovie.release_date}</p>
               <p className='text-white2 margenes'>Popularidad: {selectedMovie.popularity}</p>
               {selectedMovie.overview ? (
                 <p className="text-white margenes">{selectedMovie.overview}</p>
                 ) : null}
            </div>
          </div>



          <div className="close-modal" onClick={toggleModal}>
            <img src={IconoCruz} alt="" />
          </div>
        </div>
      )} 


    </div>
  );
}

export default App;
