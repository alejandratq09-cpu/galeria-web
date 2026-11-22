export default function Tarjeta({ url }) {
  // La URL tiene este formato: .../breeds/RAZA/nombre.jpg
  // Hacemos split('/') y tomamos la posición 4
  const razaRaw = url.split('/')[4] || 'perro'
  
  // Reemplazamos el guion por un espacio para que se vea más bonito (ej. "afghan hound")
  const nombreRaza = razaRaw.replace('-', ' ')

  return (
    <div className="tarjeta">
      <img src={url} alt={`Perro de raza ${nombreRaza}`} loading="lazy" />
      <h3>{nombreRaza}</h3>
    </div>
  )
}