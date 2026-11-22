import { useState, useEffect } from 'react'
import Filtro from './components/Filtro'
import Galeria from './components/Galeria'
import Mensaje from './components/Mensaje'
import './App.css'

function App() {
  const [imagenes, setImagenes] = useState([])
  const [razas, setRazas] = useState([])
  const [razaElegida, setRazaElegida] = useState("")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // 1. Traer la lista de razas y subrazas al cargar la página
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          let listaRazas = []
          for (const [raza, subrazas] of Object.entries(data.message)) {
            if (subrazas.length > 0) {
              subrazas.forEach(sub => listaRazas.push(`${raza}/${sub}`))
            } else {
              listaRazas.push(raza)
            }
          }
          setRazas(listaRazas.sort())
        }
      })
      .catch(err => console.error("Error cargando razas:", err))
  }, [])

  // 2. Traer las 50 imágenes (inicial y al cambiar de raza)
  useEffect(() => {
    const cargarImagenes = async () => {
      setCargando(true)
      setError(null)
      
      let url = 'https://dog.ceo/api/breeds/image/random/50'
      if (razaElegida !== "") {
        url = `https://dog.ceo/api/breed/${razaElegida}/images/random/50`
      }

      try {
        const res = await fetch(url)
        const data = await res.json()
        
        if (!res.ok || data.status !== 'success') {
          throw new Error('No se pudieron cargar las imágenes.')
        }
        setImagenes(data.message)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarImagenes()
  }, [razaElegida])

  // 3. Función para el botón "Traer 5 imágenes" (Pedimos 10 para asegurar 5 nuevas)
  const traerCincoMas = async () => {
    setCargando(true)
    setError(null)
    
    // Pedimos 10 imágenes a la API
    let url = 'https://dog.ceo/api/breeds/image/random/10'
    if (razaElegida !== "") {
      url = `https://dog.ceo/api/breed/${razaElegida}/images/random/10`
    }

    try {
      const res = await fetch(url)
      const data = await res.json()
      
      if (!res.ok || data.status !== 'success') {
        throw new Error('No se pudieron traer más imágenes.')
      }
      
      setImagenes((prevImagenes) => {
        // Filtramos las que ya están en la lista
        const nuevasUnicas = data.message.filter(img => !prevImagenes.includes(img))
        // Tomamos exactamente las primeras 5 imágenes nuevas
        const exactamenteCinco = nuevasUnicas.slice(0, 5)
        
        return [...prevImagenes, ...exactamenteCinco]
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="app-container">
      <h1>Galería de perros</h1>
      
      <Filtro 
        razas={razas} 
        razaElegida={razaElegida} 
        alCambiarRaza={setRazaElegida} 
      />

      {/* Contador de imágenes */}
      <p className="contador">
        {imagenes.length} imágenes · raza: {razaElegida === "" ? "Todas" : razaElegida}
      </p>

      {/* Mensaje de error con botón de reintentar */}
      {error && (
        <Mensaje tipo="error" texto={error} alReintentar={() => setRazaElegida(razaElegida)} />
      )}

      {/* Pantalla de carga o Galería */}
      {cargando ? (
        <Mensaje tipo="cargando" texto="Cargando perritos..." />
      ) : (
        !error && (
          <>
            <Galeria imagenes={imagenes} />
            <button 
              className="btn-traer" 
              onClick={traerCincoMas} 
              disabled={cargando}
            >
              Traer 5 imágenes
            </button>
          </>
        )
      )}
    </div>
  )
}

export default App