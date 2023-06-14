import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TipoLibreta() {
  const url = "https://localhost:7220/api/Documentos";

  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const [documentoSeleccionado, setDocumentoSeleccionado] = useState({
    numeroDocumento: "",
    codigoLibreta: 0,
    codigoTipoDocumento: 0,
    fechaDocumento: "",
    fechaVencimiento: "",
    codigoTerminoCredito: 0,
    subtotal: 0,
    montoISV: 0,
    montoTotal: 0,
    estadoDocumento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumentoSeleccionado({
      ...documentoSeleccionado,
      [name]: value,
    });
  };

  // obtener el listado completo

  const [data, setData] = useState([]);

  const obtenerDocumentos = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDocumentos();
  }, []);

  // Insertar
  const insertarTipoDocumento = async () => {
    if (documentoSeleccionado.numeroDocumento !== "") {
      try {
        delete documentoSeleccionado.codigoTipoDocumento;
        const response = await axios
          .post(url, documentoSeleccionado)
          .then((response) => {
            setData(data.concat(response.data));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const seleccionarDocumento = (Documento) => {
    setDocumentoSeleccionado(Documento);
  };

  //Modificar
  const modificarTipoDocumento = async () => {
    try {
      const response = await axios
        .put(url + "/" + documentoSeleccionado.codigoTipoDocumento, documentoSeleccionado)
        .then((response) => {
          var respuesta = response.data;
          var auxiliarData = data;
          auxiliarData.map((tipo) => {
            if (tipo.codigoTipoDocumento === documentoSeleccionado.numeroDocumento) {
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
        .delete(url + "/" + documentoSeleccionado.codigoTipoDocumento, documentoSeleccionado)
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
              <h1>Documentos</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a>Matenimientos</a>
                </li>
                <li className="breadcrumb-item active">Documentos</li>
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
                Insertar nuevo documento
              </button>
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Listado de documentos</h3>
                </div>

                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Numero Documento</th>
                        <th>Proveedor</th>
                        <th>Tipo documento</th>
                        <th>Fecha documento</th>
                        <th>Fecha de vencimiento</th>
                        <th>Termino de credito</th>
                        <th>Subtotal</th>
                        <th>ISV</th>
                        <th>Total</th>
                        <th>Estado de documento</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((n) => (
                        <tr>
                          <td key={n.numeroDocumento}>{n.numeroDocumento}</td>
                          <td>{n.codigoLibreta}</td>
                          <td>{n.codigoTipoDocumento}</td>
                          <td>{n.fechaDocumento}</td>
                          <td>{n.fechaVencimiento}</td>
                          <td>{n.codigoTerminoCredito}</td>
                          <td>{n.subtotal}</td>
                          <td>{n.montoISV}</td>
                          <td>{n.montoTotal}</td>
                          <td>{n.estadoDocumento}</td>
                          <td>
                            <div>
                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-success"
                                onClick={() => seleccionarDocumento(n)}
                                data-toggle="modal"
                                data-target="#modal-tipo-modificar"
                              >
                                <i className="fas fa-edit" />
                              </button>

                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-danger"
                                onClick={() => seleccionarDocumento(n)}
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
                  <h4 className="modal-title">Insertar Documento</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" > 
                         <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Numero de documento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="numeroDocumento"
                      placeholder="Ingrese un numero de documento"
                      name="numeroDocumento"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      codigo de Proveedor
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigoLibreta"
                      placeholder="Ingrese codigo de proveedor"
                      name="codigoLibreta"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Tipo de documento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigoTipoDocumeto"
                      placeholder="Ingrese codigo tipo documento"
                      name="codigoTipoDocumeto"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Fecha del documento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fechaDocumento"
                      placeholder="Ingrese fecha de documento"
                      name="fechaDocumento"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Fecha de vencimiento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fechaVencimiento"
                      placeholder="Ingrese fecha de vencimiento"
                      name="fechaVencimiento"
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
                      value={documentoSeleccionado && documentoSeleccionado.numeroDocumento}
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
                        documentoSeleccionado && documentoSeleccionado.descripcionTipoDocumento
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
                    {documentoSeleccionado && documentoSeleccionado.numeroDocumento}?
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
