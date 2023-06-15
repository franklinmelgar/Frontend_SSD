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

  const [proveedores, setProveedores] = useState([]);

  const obtenerProveedores = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7220/api/Catalogo/Proveedores"
      );
      setProveedores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [tipoDoc, settipoDoc] = useState([]);
  const setTipoDoc = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7220/api/Catalogo/tipoDocumentos"
      );
      settipoDoc(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [terminoCred, setTerminoCred] = useState([]);
  const setTerminoCredito = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7220/api/Catalogo/terminoCredito"
      );
      setTerminoCred(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDocumentos();
    obtenerProveedores();
    setTipoDoc();
    setTerminoCredito();
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
        .put(
          url + "/" + documentoSeleccionado.codigoTipoDocumento,
          documentoSeleccionado
        )
        .then((response) => {
          var respuesta = response.data;
          var auxiliarData = data;
          auxiliarData.map((tipo) => {
            if (
              tipo.codigoTipoDocumento === documentoSeleccionado.numeroDocumento
            ) {
              tipo.descripcionTipoDocumento =
                respuesta.descripcionTipoDocumento;
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
        .delete(
          url + "/" + documentoSeleccionado.codigoTipoDocumento,
          documentoSeleccionado
        )
        .then((response) => {
          setData(
            data.filter((tipo) => tipo.codigoTipoDocumento !== response.data)
          );
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
              <button
                type="button"
                class="btn btn-sm btn-primary btn-lg"
                data-toggle="modal"
                data-target="#modal-tipo-insertar"
              >
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
          <div className="modal fade" id="modal-tipo-insertar">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Insertar Documento</h4>
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
                  <div className="row">
                    <div className="col-6">
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
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          codigo de Proveedor
                        </label>
                        <select
                          class="form-control"
                          id="codigoLibreta"
                          name="codigoLibreta"
                          onChange={handleChange}
                        >
                          {proveedores.map((n) => (
                            <option value={n.codigoLibreta}>
                              {n.nombreLibreta}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Tipo de documento
                        </label>
                        <select
                          class="form-control"
                          id="codigoTipoDocumento"
                          name="codigoTipoDocumento"
                          onChange={handleChange}
                        >
                          {tipoDoc.map((n) => (
                            <option value={n.codigoTipoDocumento}>
                              {n.descripcionTipoDocumento}
                            </option>
                          ))}

                        </select>
                      </div>
                    </div>

                    <div className="col-6">
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
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

                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Termino de credito
                        </label>
                        <select
                          class="form-control"
                          id="codigoTerminoCredito"
                          name="codigoTerminoCredito"
                          onChange={handleChange}
                        >
                          {terminoCred.map((n) => (
                            <option value={n.codigoTerminoCredito}>
                              {n.descripcionTerminoCredito}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Subtotal</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subtotal"
                          placeholder="Ingrese el subtotal"
                          name="subtotal"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">ISV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="montoISV"
                          placeholder="Ingrese el ISV"
                          name="montoISV"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Total</label>
                        <input
                          type="text"
                          className="form-control"
                          id="montoTotal"
                          placeholder="Ingrese el total"
                          name="montoTotal"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Estado de documento
                        </label>
                        <select
                          class="form-control"
                          id="estadoDocumento"
                          name="estadoDocumento"
                          onChange={handleChange}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Pagado">Pagado</option>
                        </select>
                      </div>
                    </div>
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
        </div>
      </section>
    </div>
  );
}
