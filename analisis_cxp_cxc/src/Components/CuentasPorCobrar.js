import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CuentasPorCobrar() {

  // obtener el listado completo

  const [facturaVencidas, setFacturasVencidas] = useState([]);

  const obtenerFacturasVencidas = async () => {
    try {
      const direccion = "https://localhost:7220/api/Catalogo/CuentasPorCobrar";
      const response = await axios.get(direccion);
      setFacturasVencidas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerFacturasVencidas();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Emcabezado de pagina */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Cuentas por cobrar</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a>Reportes</a>
                </li>
                <li className="breadcrumb-item active">Cuentas por cobrar</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla */}

      <section className="content">
        <div className="container-fluid">

             <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    Detalle de facturas Vencidas
                  </h3>
                  <div className="card-tools">
                    <a href="#" className="btn btn-tool btn-sm">
                      <i className="fas fa-download" />
                    </a>
                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-striped table-valign-middle">
                    <thead>
                      <tr>
                        <th># Factura</th>
                        <th>Proveedor</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Monto Total</th>
                      </tr>
                    </thead>
                    <tbody>                     
                        {facturaVencidas.map((n) => (
                          <tr>
                            <td key={n.numeroDocumento}>{n.numeroDocumento}</td>
                            <td>{n.nombreLibreta}</td>
                            <td>{n.fechaVencimiento}</td>
                            <td>{n.totalMonto}</td>
                          </tr>
                        ))}                 
                    </tbody>
                  </table>
                </div>
              </div>          
        </div>
      </section>
    </div>
  );
}
