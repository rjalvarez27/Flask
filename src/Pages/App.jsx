import { useState } from "react"
import "../styles/App.css"
import axios from 'axios'

function App() {

  const [nuevaLibreria, setNuevaLibreria] = useState({
    "libros": "",
    "autores": "",
    "generos": "",
    "editoriales": "",
    "resenas_autores": ""
  })
  const [newid, setNewid] = useState("")
  const [get, setGet] = useState(false);
  const [post, setPost] = useState(false);
  const [delt, setDelt] = useState(false);
  const [data, setData] = useState(null)

  const getLibrerias = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get('http://127.0.0.1:7500/librerias')
      setGet(true)
      setData(response.data)
      setTimeout(() => {
        setGet(false)
      }, 2000);
    } catch (error) {
      console.log("Error", error)
    }
  }


  const createlibreria = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:7500/librerias', nuevaLibreria)
      console.log(response.data)
      setPost(true)
      setNuevaLibreria("")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("Error", error)
    }
  }

  const eliminarLibreria = async (e) => {
    e.preventDefault()
    try {
      let num = parseInt(newid)
      const response = await axios.delete(`http://127.0.0.1:7500/librerias/${num}`)
      console.log(response.data)
      setDelt(true)
      setNewid("")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <>
      <div className="all">
        <h1 className="title">Librerias</h1>
        <div className="card">
          <ul>
            {data?.map((libreria) => (<li key={libreria.id}>ID:{libreria.id} <br />
              Libros: {libreria.libros} <br /> Autor: {libreria.autores} <br /> Reseñas: {libreria.resenas_autores}
            </li>))}
          </ul>
        </div>
        <button onClick={getLibrerias} className="btn">Obtener Informacion de Librerias</button>
        {get && (<p className="info">Libreria Encontrada</p>)}
        <h1 className="title">Agregar Libreria</h1>
        <form onSubmit={createlibreria} className="form">
          <label htmlFor="">Libro</label>
          <input type="text" name="" id="" placeholder="Numero de Libros" onChange={(e) => setNuevaLibreria({ ...nuevaLibreria, libros: e.target.value })} />
          <label htmlFor="">Autor</label>
          <input type="text"  placeholder="Autores" onChange={(e) => setNuevaLibreria({ ...nuevaLibreria, autores: e.target.value })} />
          <label htmlFor="">Genero</label>
          <input type="text"  placeholder="Generos" onChange={(e) => setNuevaLibreria({ ...nuevaLibreria, generos: e.target.value })} />
          <label htmlFor="">Editorial</label>
          <input type="text" placeholder="Editoreales" onChange={(e) => setNuevaLibreria({ ...nuevaLibreria, editoriales: e.target.value })} />
          <label htmlFor="">Resenas</label>
          <input type="text"  placeholder="Resenas" onChange={(e) => setNuevaLibreria({ ...nuevaLibreria, resenas_autores: e.target.value })} />
          <input type="submit" value="Crear Libreria"  className="btn"/>
          {post && (<p className="info">Libreria creada exitosamente</p>)}
          </form>
          
        
        <h1 className="title">Eliminar librerias</h1>
        <form onSubmit={eliminarLibreria}>
          <label>Introduzca el ID de la libreria que desea eliminar</label>
          <input type="text" name="" id="" onChange={(e) => setNewid(e.target.value)} />
          <input type="submit" value="Eliminar Libreria" className="btn" />
          {delt && (<p className="info">Libreria borrada exitosamente</p>)}
        </form>
        
      </div>
    </>
  )
}

export default App
