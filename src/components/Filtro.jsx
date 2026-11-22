export default function Filtro({ razas, razaElegida, alCambiarRaza }) {
  return (
    <div className="filtro-container">
      <label htmlFor="selector-razas" className="filtro-label">
        Raza:
      </label>
      <select 
        id="selector-razas" 
        value={razaElegida} 
        onChange={(e) => alCambiarRaza(e.target.value)}
        className="filtro-select"
      >
        <option value="">Todas las razas</option>
        {razas.map((raza) => (
          <option key={raza} value={raza}>
            {/* Pone en mayúscula la primera letra y cambia guiones por espacios */}
            {raza.replace('-', ' ').charAt(0).toUpperCase() + raza.replace('-', ' ').slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}