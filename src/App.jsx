import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';

function App() {

  // definir la categoria y noticias
  const [categoria, guardarCategoria] = useState('');
  const [noticias, guardarNoticias] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {

      const API_KEY= '3eb11027e32e4d8b7229c1eb15a64d6c';
      const country= 'USA';
      const uri = 'https://gnews.io/api/v4/top-headlines?';
      const categorySelected = `topic=${categoria}`;
      const apiKey = `token=${API_KEY}`;
      const countrySelected = `country=${country}`;
      const url = `${uri}${categorySelected}&${countrySelected}&${apiKey}`;




      const respuesta = await fetch(url);
      const noticias = await respuesta.json();
     
      guardarNoticias(noticias.articles);
    }
    consultarAPI();
  }, [categoria]);

  return (
    <Fragment>
        <Header 
          titulo='Buscador de Noticias'
        />

        <div className="container white">
            <Formulario 
              guardarCategoria={guardarCategoria}
            />

            <ListadoNoticias 
              noticias={noticias}
            />
        </div>
    </Fragment>
  );
}

export default App;

