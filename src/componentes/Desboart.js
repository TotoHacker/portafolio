import React, { useState, useEffect } from "react";

function Dashboard() {
  const apiUrl = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";

  const estadosMx = [
    { id: 1, name: "Aguascalientes", ciudades: [] },
    { id: 2, name: "Baja California", ciudades: [] },
    { id: 19, name: "Nuevo León", ciudades: [] },
    { id: 3, name: "Oaxaca", ciudades: [] },
    { id: 21, name: "Puebla", ciudades: [] },
    { id: 4, name: "Yucatan", ciudades: [] },
    { id: 37, name: "Zacatecas", ciudades: [] }
  ];

  const [datosDelTiempo, setDatosDelTiempo] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");

  const consultarTiempo = () => {
    if (estadoSeleccionado && ciudadSeleccionada) {
      const urlConParametros = `${apiUrl}?estado=${estadoSeleccionado}&ciudad=${ciudadSeleccionada}`;
      
      fetch(urlConParametros)
        .then((res) => res.json())
        .then((data) => {
          setDatosDelTiempo(data);
        })
        .catch((error) => {
          console.error("Error al consultar el estado del tiempo:", error);
          console.log("Error al consultar el estado del tiempo:", error);
        });
    }
  };

  useEffect(() => {
    // Cuando cambia el estado seleccionado, actualiza la lista de ciudades
    if (estadoSeleccionado) {
      const estado = estadosMx.find((estado) => estado.name === estadoSeleccionado);
      setCiudades(estado.ciudades);
    }
  }, [estadoSeleccionado]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Dashboard de Portafolio</h1>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <select
                    className="form-control"
                    onChange={(e) => setEstadoSeleccionado(e.target.value)}
                  >
                    <option value="">Selecciona un estado</option>
                    {estadosMx.map((opcion) => (
                      <option key={opcion.id} value={opcion.name}>
                        {opcion.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <select
                    className="form-control"
                    onChange={(e) => setCiudadSeleccionada(e.target.value)}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {ciudades.map((ciudad, index) => (
                      <option key={index} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <button
                    className="btn btn-primary"
                    onClick={consultarTiempo}
                  >
                    Consultar Estado del Tiempo
                  </button>
                </div>
              </div>
              {datosDelTiempo && (
                <div>
                  <h2 className="card-subtitle mt-4">
                    Estado del Tiempo para {ciudadSeleccionada}, {estadoSeleccionado}
                  </h2>
                  <p>Temperatura: {datosDelTiempo.temperatura} °C</p>
                  <p>Descripción: {datosDelTiempo.descripcion}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
