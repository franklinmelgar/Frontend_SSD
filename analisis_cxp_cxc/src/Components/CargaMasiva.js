import React, { useState, useEffect } from "react";
import axios from "axios";
import {OutTable, ExcelRenderer} from 'react-excel-renderer'

export default function CargaMasiva() {

  const url = "https://localhost:7220/api/CargaMasiva";

  const [filas, setFilas] = useState([])

  const handleFile = (event) => {
    const file = event.target.files[0];
    ExcelRenderer(file, (err, response) => {
      if(err){
        console.log(err)
      }else{
        setFilas(response.rows)
      }        
    })
  }

  const [documento, setDocumento] = useState({
    numeroDocumento: "",
    codigoLibreta: 0,
    codigoTipoDocumento: 0,
    fechaDocumento: '2023-01-01',
    fechaVencimiento: '2023-01-01',
    codigoTermineCredito: 0,
    subTotal: 0,
    montoISV: 0,
    montoTOtal: 0,
    estadoDocumento: "Pendiente",

  });

  const insertarDocumentos = async () => {    
      
  };

  return (
    <div className="content-wrapper">
      {/* Emcabezado de pagina */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Carga masiva de facturas - Compras</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a>Cargas Masivas</a>
                </li>
                <li className="breadcrumb-item active">Carga Masivas</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

    <section className='content'>
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputFile">Seleccion un archivo de excel</label>
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="exampleInputFile" name='excel' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' onChange={handleFile} />
                        <label className="custom-file-label" htmlFor="exampleInputFile">Buscar Archivo</label>
                    </div>
                </div>
            </div>
        </form>
    </section>


      {/* Tabla */}

      <section className="content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-md-3">
              <button type="button" class="btn btn-sm btn-primary btn-lg" onClick={() => insertarDocumentos()} >Cargar datos en base de datos</button>
            </div>
          </div>
          <br></br>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Datos obtenidos</h3>
                </div>

                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                    {/* style={{ width: 10 }} */}
                      <tr>
                        <th>Numero Documento</th>
                        <th>Codigo Proveedor</th>
                        <th>Tipo de documento</th>
                        <th>Fecha de factura</th>
                        <th>Fecha Vencimiento</th>
                        <th>Termino de credito</th>
                        <th>Subtotal</th>
                        <th>Monto ISV</th>
                        <th>Monto Total</th>
                        <th>Estado</th>
                        <th>Codigo Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>                        
                      </tr>
                    </thead>
                    <tbody>
                      {filas.slice(1).map((col, i) => (
                        <tr key={i}>
                          {
                            col.map((c, i) => (
                              <td key={i}>{c}</td>
                            ))
                          }

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}
