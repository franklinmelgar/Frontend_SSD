import React from "react";
import { Link } from "react-router-dom";

export default function Asside({ enviarMensaje }) {

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        {/* <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        /> */}
        <span className="brand-text font-weight-light"></span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Usuario Final
            </a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline"></div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link className="nav-link" to="/" >
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard AP</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="DashboardAR" >
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard AR</p>
                  </Link>
                </li>
              </ul>
            </li>
            <div>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p> Matenimientos <i className="fas fa-angle-left right" /> </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Libreta de direcciones</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" >
                      <i className="far fa-circle nav-icon" />
                      <p>Terminos de creditos</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="CategoriaLibreta" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Categorias de libreta</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="TipoLibreta" className="nav-link" >
                      <i className="far fa-circle nav-icon" />
                      <p>Tipos</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" >
                      <i className="far fa-circle nav-icon" />
                      <p>Productos</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" >
                      <i className="far fa-circle nav-icon" />
                      <p>Documentos</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" >
                      <i className="far fa-circle nav-icon" />
                      <p>Tipo de documentos</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p> Cargas Masivas
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="CargaMasiva" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Carga Masiva - Compras</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="CargaMasivaVentas" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Carga Masiva - Ventas</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
