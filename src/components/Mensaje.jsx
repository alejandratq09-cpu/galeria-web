export default function Mensaje({ tipo, texto, alReintentar }) {
  if (tipo === 'error') {
    return (
      <div role="alert" className="mensaje-error">
        <p>{texto}</p>
        {alReintentar && (
          <button onClick={alReintentar} className="btn-reintentar">
            Reintentar
          </button>
        )}
      </div>
    )
  }
  return (
    <div role="status" className="mensaje-carga">
      {texto}
    </div>
  )
}