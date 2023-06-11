import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function DashboardAP() {
  const url = "https://localhost:7220/api/Medidores";

  const [fechaInicial, setFechaInicial] = useState("2023-01-01");
  const [fechaFinal, setFechaFinal] = useState("2023-12-31");

  const establecerFechaInicial = (e) => {
    const { name, value } = e.target;
    setFechaInicial(value);
  };

  const establecerFechaFinal = (e) => {
    const { name, value } = e.target;
    setFechaFinal(value);
  };

  const [data, setData] = useState([]);

  const ObtenerTotalCompras = async () => {
    try {
      const direccion =
        url + "/" + fechaInicial + ", " + fechaFinal + ", TotalCompras";
      console.log(direccion);
      const response = await axios.get(direccion);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [porVencer, setPorVencer] = useState([]);

  const ObtenerTotalPorVencer = async () => {
    try {
      const direccion =
        url + "/" + fechaInicial + ", " + fechaFinal + ", TotalPorVencer";
      console.log(direccion);
      const response = await axios.get(direccion);
      setPorVencer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [vencido, setVencido] = useState([]);

  const ObtenerTotalVencido = async () => {
    try {
      const direccion =
        url + "/" + fechaInicial + ", " + fechaFinal + ", TotalVencido";
      console.log(direccion);
      const response = await axios.get(direccion);
      setVencido(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTodosLosDatos = async () => {
    ObtenerTotalCompras();
    ObtenerTotalPorVencer();
    ObtenerTotalVencido();
    ObtenerComprasAnuales();
    ObtenerComprasPorCategorias();
    obtenerFacturasVencidas();
    obtenerFacturasPorVencer();
  };

  const [comprasAnuales, setcomprasAnuales] = useState([]);

  const ObtenerComprasAnuales = async () => {
    try {
      const direccion = url + "/" + fechaInicial + ", " + fechaFinal + ", graficoComprasMensuales";
      console.log(direccion);
      const response = await axios.get(direccion);
      setcomprasAnuales(response.data);

      const meses = comprasAnuales.map((m) => {
        if (m.month === 1) {
          return "Enero";
        } else if (m.month === 2) {
          return "Febrero";
        } else if (m.month === 3) {
          return "Marzo";
        } else if (m.month === 4) {
          return "Abril";
        } else if (m.month === 5) {
          return "Mayo";
        } else if (m.month === 6) {
          return "Junio";
        } else if (m.month === 7) {
          return "Julio";
        } else if (m.month === 8) {
          return "Agosto";
        } else if (m.month === 9) {
          return "Septiembre";
        } else if (m.month === 10) {
          return "Octubre";
        } else if (m.month === 11) {
          return "Noviembre";
        } else if (m.month === 12) {
          return "Diciembre";
        }
      });
      const valores = comprasAnuales.map((m) => m.totalAmount);

      const barChartCanvas = document
        .getElementById("barChart")
        .getContext("2d");
      const barChartData = {
        labels: meses,
        datasets: [
          {
            label: "Compras",
            backgroundColor: "rgba(60,141,188,0.9)",
            borderColor: "rgba(60,141,188,0.8)",
            borderWidth: 1,
            data: valores,
          },
        ],
      };

      const barChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      new window.Chart(barChartCanvas, {
        type: "bar",
        data: barChartData,
        options: barChartOptions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [comprasPorCategorias, setComprasPorCategorias] = useState([]);

  const ObtenerComprasPorCategorias = async () => {
    try {
      const direccion =
        url +
        "/" +
        fechaInicial +
        ", " +
        fechaFinal +
        ", graficoVentasPorCategoria";
      console.log(direccion);
      const response = await axios.get(direccion);
      setComprasPorCategorias(response.data);

      const categorias = comprasPorCategorias.map(
        (m) => m.descripcionCategoria
      );
      const valores = comprasPorCategorias.map((m) => m.totalMonto);

      const donutChartCanvas = document
        .getElementById("donutChart")
        .getContext("2d");
      const donutData = {
        labels: categorias,
        datasets: [
          {
            backgroundColor: [
              "#f56954",
              "#00a65a",
              "#f39c12",
              "#00c0ef",
              "#3c8dbc",
              "#d2d6de",
            ],
            data: valores,
          },
        ],
      };

      const donutOptions = {
        maintainAspectRatio: false,
        responsive: true,
      };

      new window.Chart(donutChartCanvas, {
        type: "doughnut",
        data: donutData,
        options: donutOptions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [facturaVencidas, setFacturasVencidas] = useState([]);

  const obtenerFacturasVencidas = async () => {
    try {
      const direccion = url + "/" + fechaInicial + ", " + fechaFinal + ", DetalleFacturasVencidas";
      const response = await axios.get(direccion);
      setFacturasVencidas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [facturaPorVencer, setFacturasPorVencer] = useState([]);

  const obtenerFacturasPorVencer = async () => {
    try {
      const direccion = url + "/" + fechaInicial + ", " + fechaFinal + ", DetallePorVencer";
      const response = await axios.get(direccion);
      setFacturasPorVencer(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    obtenerTodosLosDatos();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Dashboard Cuentas Por Pagar</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Dashboard AP</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Filtros</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div class="col-4">
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="far fa-calendar-alt" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Fecha Inicial (YYYY-MM-DD)"
                        onChange={establecerFechaInicial}
                        data-mask
                      />
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="far fa-calendar-alt" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Fecha Final (YYYY-MM-DD)"
                        onChange={establecerFechaFinal}
                        data-mask
                      />
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div className="form-group">
                    <button
                      type="submit"
                      class="btn btn-info"
                      onClick={obtenerTodosLosDatos}
                    >
                      Refrescar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>

          <h5 className="mb-2 mt-4">Medidores Numericos</h5>
          <div className="row">
            <div className="col-lg-4 col-6">
              {/* small card */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{data}</h3>
                  <p>Total Lps. en compras</p>
                </div>
                <div className="icon">
                  <i className="fas fa-shopping-cart" />
                </div>
                <a href="#" className="small-box-footer">
                  <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-4 col-6">
              {/* small card */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3> {porVencer} </h3>
                  <p>Total Lps. por vencer</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="#" className="small-box-footer">
                  <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-4 col-6">
              {/* small card */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{vencido}</h3>
                  <p>Total Lps. vencidos</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user-plus" />
                </div>
                <a href="#" className="small-box-footer">
                  <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* BAR CHART */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Compras Mensuales</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart">
                    <canvas
                      id="barChart"
                      style={{
                        minHeight: 250,
                        height: 250,
                        maxHeight: 250,
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}     

              <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    Detalle de facturas proximas a vencer
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
                        {facturaPorVencer.map((n) => (
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

            <div className="col-md-6">

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

              {/* BAR CHART */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Compras por categorias</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <canvas
                    id="donutChart"
                    style={{
                      minHeight: 250,
                      height: 250,
                      maxHeight: 250,
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
