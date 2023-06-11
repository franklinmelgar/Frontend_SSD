import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TipoLibreta() {
  const url = "https://localhost:7220/api/CategoriaLibreta";

  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState({
    codigoCategoria: 0,
    descripcionCategoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriaSeleccionado({
      ...categoriaSeleccionado,
      [name]: value,
    });
  };

  // obtener el listado completo

  const [data, setData] = useState([]);

  const obtenerCategoriaLibreta = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategoriaLibreta();
  }, []);

  // Insertar
  const insertarCategoriaLibreta = async () => {
    if (categoriaSeleccionado.descripcionCategoria !== "") {
      try {
        delete categoriaSeleccionado.codigoCategoria;
        const response = await axios
          .post(url, categoriaSeleccionado)
          .then((response) => {
            setData(data.concat(response.data));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionado(categoria);
  };

  //Modificar
  const modificarCategoriaLibreta = async () => {
    try {
      const response = await axios
        .put(url + "/" + categoriaSeleccionado.codigoCategoria, categoriaSeleccionado)
        .then((response) => {
          var respuesta = response.data;
          var auxiliarData = data;
          auxiliarData.map((categoria) => {
            if (categoria.codigoCategirua === categoriaSeleccionado.codigoCategoria) {
              categoria.descripcionCategoria = respuesta.descripcionCategoria;
            }
            setData(auxiliarData);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar
  const eliminarCategoriaLibreta = async () => {
    try {
      const response = await axios
        .delete(url + "/" + categoriaSeleccionado.codigoCategoria, categoriaSeleccionado)
        .then((response) => {
          setData(data.filter((categoria) => categoria.codigoCategoria !== response.data));
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
              <h1>Categorias de Libreta</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a>Matenimientos</a>
                </li>
                <li className="breadcrumb-item active">Categorias de libretas</li>
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
                data-target="#modal-categoria-insertar" >
                Insertar nuevo categoria
              </button>
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Listado de categorias de libreta</h3>
                </div>

                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Descripcion Categoria</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((n) => (
                        <tr>
                          <td key={n.codigoCategoria}>{n.codigoCategoria}</td>
                          <td>{n.descripcionCategoria}</td>
                          <td>
                            <div>
                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-success"
                                onClick={() => seleccionarCategoria(n)}
                                data-toggle="modal"
                                data-target="#modal-categoria-modificar"
                              >
                                <i className="fas fa-edit" />
                              </button>

                              <button
                                style={{ width: 60 }}
                                className="btn btn-sm bg-danger"
                                onClick={() => seleccionarCategoria(n)}
                                data-toggle="modal"
                                data-target="#modal-categoria-eliminar"
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
            id="modal-categoria-insertar"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Insertar Categoria de Libreta</h4>
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
                      Descripcion categoria de libreta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcionCategoria"
                      placeholder="Ingrese una categoria"
                      name="descripcionCategoria"
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
                    onClick={() => insertarCategoriaLibreta()}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ventana modal modificar */}
          <div className="modal fade" id="modal-categoria-modificar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Modificar Categoria de Libreta</h4>
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
                    <label htmlFor="exampleInputEmail1">Codigo Categoria</label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigoCategoria"
                      name="codigoCategoria"
                      readOnly
                      value={categoriaSeleccionado && categoriaSeleccionado.codigoCategoria}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Descripcion categoria de libreta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcionCategoria"
                      placeholder="Ingrese una categoria"
                      name="descripcionCategoria"
                      onChange={handleChange}
                      value={
                        categoriaSeleccionado && categoriaSeleccionado.descripcionCategoria
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
                    onClick={() => modificarCategoriaLibreta()}
                  >
                    Modificar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Eliminar */}
          <div className="modal fade" id="modal-categoria-eliminar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Eliminar Categoria de Libreta</h4>
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
                    Esta seguro de eliminar la categoria:{" "}
                    {categoriaSeleccionado && categoriaSeleccionado.descripcionCategoria}?
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
                    onClick={() => eliminarCategoriaLibreta()}
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