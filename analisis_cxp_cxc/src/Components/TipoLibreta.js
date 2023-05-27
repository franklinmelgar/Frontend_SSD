import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TipoLibreta() {

  const url = "https://localhost:7220/api/TipoLibreta";

  const [modalInsertar, setModalInsertar] = useState(false);
  const abrirModalInsertar = () =>{
    setModalInsertar(!modalInsertar);
  }

  const [tipoSeleccionado, setTipoSeleccionado] = useState({
    codigoTipo: 0,
    descripcionTipo: ''
  })

  const handleChange = e => {
    const {name, value} = e.target;
    setTipoSeleccionado({
      ...tipoSeleccionado, 
      [name]: value
    });
  }


// obtener el listado completo

const [data, setData] = useState([]);

  const obtenerTipoLibreta = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerTipoLibreta();
  }, []);


  // Insertar
  const insertarTipoLibreta = async () => {    
      if (tipoSeleccionado.descripcionTipo != ""){
        try {
          delete tipoSeleccionado.codigoTipo;
          const response = await axios.post(url, tipoSeleccionado)
          .then( response => {
            setData(data.concat(response.data));
          })      
        } catch (error) {
          console.log(error);
        }
      }

  };


  const seleccionarTipo = (tipo) => {   
      setTipoSeleccionado(tipo);   
  }

  //Modificar
  const modificarTipoLibreta = async () => {         
        try {          
          const response = await axios.put(url + "/" + tipoSeleccionado.codigoTipo, tipoSeleccionado)
          .then( response => {
            var respuesta = response.data;
            var auxiliarData = data;
            auxiliarData.map(tipo => {
              if (tipo.codigoTipo === tipoSeleccionado.codigoTipo){
                tipo.descripcionTipo = respuesta.descripcionTipo;
              }
            setData(auxiliarData);
            })
          })      
        } catch (error) {
          console.log(error);
        }
  };


  //Eliminar
  const eliminarTipoLibreta = async () => {         
    try {          
      const response = await axios.delete(url + "/" + tipoSeleccionado.codigoTipo, tipoSeleccionado)
      .then( response => {
        setData(data.filter(tipo => tipo.codigoTipo !== response.data))
      })      
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
                <li className="breadcrumb-item active">Tipos de libretas</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      {/* Tabla */}

      <section className="content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-3">
              <button type="button" class="btn btn-sm btn-primary btn-lg" data-toggle="modal" data-target="#modal-tipo-insertar">Insertar nuevo tipo</button>  
            </div>            
          </div>

          <br></br>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Listado de tipos de libreta</h3>
                </div>

                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Descripcion Tipo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((n) => (
                        <tr>
                          <td key={n.codigoTipo}>{n.codigoTipo}</td>
                          <td>{n.descripcionTipo}</td>
                          <td>
                            <div>
                              <button style={{ width: 60 }} className="btn btn-sm bg-success" onClick={()=> seleccionarTipo(n)} data-toggle="modal" data-target="#modal-tipo-modificar">
                                  <i className="fas fa-edit" />
                              </button>

                              <button style={{ width: 60 }} className="btn btn-sm bg-danger" onClick={()=> seleccionarTipo(n)} data-toggle="modal" data-target="#modal-tipo-eliminar">
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
          <div className="modal fade" id="modal-tipo-insertar" isopen={modalInsertar}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Insertar Tipo de Libreta</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">               
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Descripcion tipo de libreta</label>
                      <input type="text" className="form-control" id="descripcionTipo" placeholder="Ingrese un tipo" name="descripcionTipo" onChange={handleChange} />
                    </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => abrirModalInsertar()}>Cerrar</button>
                  <button type="button" className="btn btn-primary" onClick={() => insertarTipoLibreta()}>Agregar</button>
                </div>
              </div>              
            </div>
          </div>

          {/* Ventana modal modificar */}
          <div className="modal fade" id="modal-tipo-modificar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Modificar Tipo de Libreta</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                    
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Codigo Tipo</label>
                      <input type="text" className="form-control" id="codigoTipo" name="codigoTipo" readOnly value={tipoSeleccionado && tipoSeleccionado.codigoTipo} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Descripcion tipo de libreta</label>
                      <input type="text" className="form-control" id="descripcionTipo" placeholder="Ingrese un tipo" name="descripcionTipo" onChange={handleChange} value={tipoSeleccionado && tipoSeleccionado.descripcionTipo} />
                    </div>

                </div>
                <div className="modal-footer justify-content-between">
                  <button type="button" className="btn btn-default" data-dismiss="modal" >Cerrar</button>
                  <button type="button" className="btn btn-primary" onClick={() => modificarTipoLibreta()}>Modificar</button>
                </div>
              </div>              
            </div>
          </div>

          {/* Eliminar */}
          <div className="modal fade" id="modal-tipo-eliminar">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Eliminar Tipo de Libreta</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                    
                    <p>
                      Esta seguro de eliminar el tipo: {tipoSeleccionado && tipoSeleccionado.descripcionTipo}?
                    </p>

                </div>
                <div className="modal-footer justify-content-between">
                  <button type="button" className="btn btn-default" data-dismiss="modal" >Cerrar</button>
                  <button type="button" className="btn btn-primary" onClick={() => eliminarTipoLibreta()}>Eliminar</button>
                </div>
              </div>              
            </div>
          </div>


        </div>
      </section>
    </div>
  );
}
