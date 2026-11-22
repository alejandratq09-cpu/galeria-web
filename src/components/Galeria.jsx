import Tarjeta from './Tarjeta'

export default function Galeria({ imagenes }) {
  return (
    <div className="galeria-grid">
      {imagenes.map((url) => (
        <Tarjeta key={url} url={url} />
      ))}
    </div>
  )
}