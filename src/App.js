import React, { useState, useEffect } from "react";

function Dashboard() {
  const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas"; // Reemplaza con la URL de tu API de tiempo
  const estadosMx = [
    { id: 1, name: "Aguascalientes", ciudades: ["Ciudad A", "Ciudad B", "Ciudad C"] },
    { id: 2, name: "Baja California", ciudades: ["Ciudad X", "Ciudad Y", "Ciudad Z"] },
    { id: 19, name: "Nuevo León", ciudades: ["Ciudad N1", "Ciudad N2", "Ciudad N3"] },
    { id: 2, name: "Oaxaca", ciudades: ["Ciudad O1", "Ciudad O2", "Ciudad O3"] },
    { id: 21, name: "Puebla", ciudades: ["Ciudad P1", "Ciudad P2", "Ciudad P3"] },
    { id: 1, name: "Yucatan", ciudades: ["Ciudad Y1", "Ciudad Y2", "Ciudad Y3"] },
    { id: 37, name: "Zacatecas", ciudades: ["Ciudad Z1", "Ciudad Z2", "Ciudad Z3"] }
  ];

  const [datosDelTiempo, setDatosDelTiempo] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");

  const consultarTiempo = () => {
    if (estadoSeleccionado && ciudadSeleccionada) {
      const urlConParametros = `${url}?estado=${estadoSeleccionado}&ciudad=${ciudadSeleccionada}`;
      
      fetch(urlConParametros)
        .then((res) => res.json())
        .then((data) => {
          setDatosDelTiempo(data);
        })
        .catch((error) => {
          console.error("Error al consultar el estado del tiempo:", error);
        });
    }
  };

  useEffect(() => {
    consultarTiempo();
  }, [estadoSeleccionado, ciudadSeleccionada]);

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
                    {estadoSeleccionado &&
                      estadosMx
                        .find((estado) => estado.name === estadoSeleccionado)
                        .ciudades.map((ciudad, index) => (
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
