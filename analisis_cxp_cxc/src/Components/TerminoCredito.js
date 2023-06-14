import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TipoLibreta() {
  const url = "https://localhost:7220/api/TerminoCredito";

  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const [terminoSeleccionado, setTerminoSeleccionado] = useState({
    codigoTerminoCredito: 0,
    descripcionTerminoCredito: "",
    cantidadDias: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTerminoSeleccionado({
      ...terminoSeleccionado,
      [name]: value,
    });
  };

  // obtener el listado completo

  const [data, setData] = useState([]);

  const obtenerTerminoCredito = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerTerminoCredito();
  }, []);

  // Insertar
  const insertarTerminoCredito = async () => {
    if (terminoSeleccionado.descripcionTerminoCredito !== "") {
      try {
        delete terminoSeleccionado.codigoTerminoCredito;
        const response = await axios
          .post(url, terminoSeleccionado)
          .then((response) => {
            setData(data.concat(response.data));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const seleccionarTermino = (termino) => {
    setTerminoSeleccionado(termino);
  };

  //Modificar
  const modificarTerminoCredito = async () => {
    try {
      const response = await axios
        .put(url + "/" + terminoSeleccionado.codigoTerminoCredito, terminoSeleccionado)
        .then((response) => {
          var respuesta = response.data;
          var auxiliarData = data;
          auxiliarData.map((termino) => {
            if (termino.codigoTerminoCredito === terminoSeleccionado.codigoTerminoCredito) {
              termino.descripcionTerminoCredito = respuesta.descripcionTerminoCredito;
            }
            setData(auxiliarData);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar
  const eliminarTerminoCredito = async () => {
    try {
      const response = await axios
        .delete(url + "/" + terminoSeleccionado.codigoTerminoCredito, terminoSeleccionado)
        .then((response) => {
          setData(data.filter((termino) => termino.codigoTerminoCredito !== response.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-wrapper">
      {/* Emcabezado de pagina */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Tipos de Libretas</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a>Matenimientos</a>
                </li>
                <li className="breadcrumb-item active">Terminos de credito</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla */}

      <section className="content">
        <div className="container-fluid">
          
          <div className="row">
            <div className="col-md-3">
              <button type="button"
                class="btn btn-sm btn-primary btn-lg"
                data-toggle="modal"
                data-target="#modal-termino-insertar" >
                Insertar nuevo termino credito
              </button>
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Listado de terminos de credito</h3>
                </div>

                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Descripcion Termino Credito</th>
                        <th>Termino de credito en dias</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((n) => (
                        <tr>
                          <td key={n.codigoTerminoCredito}>{n.codigoTerminoCredito}</td>
                          <td>{n.descripcionTerminoCredito}</td>
                          <td>{n.cantidadDias}</td>
                          <td>
                            <div>
                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-success"
                                onClick={() => seleccionarTermino(n)}
                                data-toggle="modal"
                                data-target="#modal-termino-modificar"
                              >
                                <i className="fas fa-edit" />
                              </button>

                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-danger"
                                onClick={() => seleccionarTermino(n)}
                                data-toggle="modal"
                                data-target="#modal-termino-eliminar"
                              >
                                <i className="fas fa-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ventana modal insertar */}
          <div
            className="modal fade"
            id="modal-termino-insertar"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Insertar termino de credito</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Descripcion termino de credito
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcionTerminoCredito"
                      placeholder="Ingrese un termino de credito"
                      name="descripcionTerminoCredito"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Cantidad de dias termino de credito
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cantidadDias"
                      placeholder="Ingrese un cantidad de dias "
                      name="cantidadDias"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={() => abrirModalInsertar()}
                  >
                    Cerrar
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => insertarTerminoCredito()}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ventana modal modificar */}
          <div className="modal fade" id="modal-termino-modificar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Modificar Termino Credito</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Codigo Termino Credito</label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigoTerminoCredito"
                      name="codigoTerminoCredito"
                      readOnly
                      value={terminoSeleccionado && terminoSeleccionado.codigoTerminoCredito}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Descripcion termino de credito
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcionTerminoCredito"
                      placeholder="Ingrese un termino de credito"
                      name="descripcionTerminoCredito"
                      onChange={handleChange}
                      value={
                        terminoSeleccionado && terminoSeleccionado.descripcionTerminoCredito
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      cantidad de dias termino de credito
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cantidadDias"
                      placeholder="Ingrese cantidad de dias"
                      name="cantidadDias"
                      onChange={handleChange}
                      value={
                        terminoSeleccionado && terminoSeleccionado.cantidadDias
                      }
                    />
                  </div>

                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => modificarTerminoCredito()}
                  >
                    Modificar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Eliminar */}
          <div className="modal fade" id="modal-termino-eliminar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Eliminar Termino de Credito</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Esta seguro de eliminar el termino de credito:{" "}
                    {terminoSeleccionado && terminoSeleccionado.descripcionTerminoCredito}?
                  </p>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => eliminarTerminoCredito()}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </section>
    </div>
  );
}
