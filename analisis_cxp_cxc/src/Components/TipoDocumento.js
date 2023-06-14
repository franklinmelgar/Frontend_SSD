import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TipoLibreta() {
  const url = "https://localhost:7220/api/TipoDocumento";

  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const [tipoSeleccionado, setTipoSeleccionado] = useState({
    codigoTipoDocumento: 0,
    descripcionTipoDocumento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTipoSeleccionado({
      ...tipoSeleccionado,
      [name]: value,
    });
  };

  // obtener el listado completo

  const [data, setData] = useState([]);

  const obtenerTipoDocumento = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerTipoDocumento();
  }, []);

  // Insertar
  const insertarTipoDocumento = async () => {
    if (tipoSeleccionado.descripcionTipoDocumento !== "") {
      try {
        delete tipoSeleccionado.codigoTipoDocumento;
        const response = await axios
          .post(url, tipoSeleccionado)
          .then((response) => {
            setData(data.concat(response.data));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const seleccionarTipo = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  //Modificar
  const modificarTipoDocumento = async () => {
    try {
      const response = await axios
        .put(url + "/" + tipoSeleccionado.codigoTipoDocumento, tipoSeleccionado)
        .then((response) => {
          var respuesta = response.data;
          var auxiliarData = data;
          auxiliarData.map((tipo) => {
            if (tipo.codigoTipoDocumento === tipoSeleccionado.codigoTipoDocumento) {
              tipo.descripcionTipoDocumento = respuesta.descripcionTipoDocumento;
            }
            setData(auxiliarData);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar
  const eliminarTipoDocumento = async () => {
    try {
      const response = await axios
        .delete(url + "/" + tipoSeleccionado.codigoTipoDocumento, tipoSeleccionado)
        .then((response) => {
          setData(data.filter((tipo) => tipo.codigoTipoDocumento !== response.data));
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
              <h1>Tipos de Documentos</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a>Matenimientos</a>
                </li>
                <li className="breadcrumb-item active">Tipos de documentos</li>
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
                data-target="#modal-tipo-insertar" >
                Insertar nuevo tipo documento
              </button>
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Listado de tipos de documentos</h3>
                </div>

                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Descripcion Tipo de Documento</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((n) => (
                        <tr>
                          <td key={n.codigoTipoDocumento}>{n.codigoTipoDocumento}</td>
                          <td>{n.descripcionTipoDocumento}</td>
                          <td>
                            <div>
                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-success"
                                onClick={() => seleccionarTipo(n)}
                                data-toggle="modal"
                                data-target="#modal-tipo-modificar"
                              >
                                <i className="fas fa-edit" />
                              </button>

                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-danger"
                                onClick={() => seleccionarTipo(n)}
                                data-toggle="modal"
                                data-target="#modal-tipo-eliminar"
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
            id="modal-tipo-insertar"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Insertar Tipo de Documento</h4>
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
                      Descripcion tipo de documento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcionTipo"
                      placeholder="Ingrese un tipo"
                      name="descripcionTipo"
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
                    onClick={() => insertarTipoDocumento()}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ventana modal modificar */}
          <div className="modal fade" id="modal-tipo-modificar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Modificar Tipo de Documento</h4>
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
                    <label htmlFor="exampleInputEmail1">Codigo Tipo Documento</label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigoTipoDocumento"
                      name="codigoTipoDocumento"
                      readOnly
                      value={tipoSeleccionado && tipoSeleccionado.codigoTipoDocumento}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Descripcion tipo de Documento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcionTipoDocumento"
                      placeholder="Ingrese un tipo de documento"
                      name="descripcionTipoDocumento"
                      onChange={handleChange}
                      value={
                        tipoSeleccionado && tipoSeleccionado.descripcionTipoDocumento
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
                    onClick={() => modificarTipoDocumento()}
                  >
                    Modificar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Eliminar */}
          <div className="modal fade" id="modal-tipo-eliminar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Eliminar Tipo de Documento</h4>
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
                    Esta seguro de eliminar el tipo:{" "}
                    {tipoSeleccionado && tipoSeleccionado.descripcionTipoDocumento}?
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
                    onClick={() => eliminarTipoDocumento()}
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
