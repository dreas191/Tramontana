import { muestraPisos, muestraCabañas, muestraServicios } from "./pisos.js";

const sacaPiso = async (reserva) => {

  let respuesta = await fetch(`http://localhost:3000/pisos/${reserva.idEstablecimiento}`);
  let piso = await respuesta.json();

  muestraPisos(piso, reserva);
};

const sacaCabanas = async (reserva) => {

  let respuesta = await fetch(`http://localhost:3000/cabanas/${reserva.idEstablecimiento}`);
  let cabana = await respuesta.json();

  muestraCabañas(cabana, reserva);
};

const sacaServicios = async (reserva) => {

  let respuesta = await fetch(`http://localhost:3000/servicios/${reserva.idEstablecimiento}`);
  let servicio = await respuesta.json();

  muestraServicios(servicio, reserva);
};

const cargaFooter = () => {
  fetch("../footer.html")
    .then((response) => response.text())
    .then((codigo) => {
      document.querySelector("#footer").innerHTML = codigo;
    });
};
cargaFooter();
const cargarMenu = () => {
  fetch("../menu.html")
    .then((response) => response.text())
    .then((codigo) => {
      document.querySelector("#menu").innerHTML = codigo;
    })
    .then(() => {
      if (sessionStorage.getItem('clave')) {

        document.querySelector("#btnLogin").style.display = "none";
        document.querySelector("#btnRegister").style.display = "none";
        document.querySelector("#misReservas").style.display = 'inline';
        document.querySelector("#LogOut").style.display = 'inline';
        document.querySelector("#LogOut").addEventListener("click", () => { sessionStorage.clear() })
      }
    })
}
cargarMenu();
const muestraReservas = (reservas) => {

  if (localStorage.nombre) {
    document.querySelector("#reserva-nombre").textContent = ' de ' + localStorage.getItem('nombre');
  }
  reservas.forEach((reserva) => {

    switch (reserva.tipoAlojamiento) {

      case 'pisos':

        sacaPiso(reserva)

        break;

      case 'cabana':


        sacaCabanas(reserva)

        break;


      case 'servicio':


        sacaServicios(reserva)
        break;


    }

  });
};

export const misReservas = () => {
  let clave = sessionStorage.getItem("clave");
  if (clave != null) {
    fetch(`http://localhost:3000/reservas/?usuarioId=${clave}`)
      .then((respuesta) => respuesta.json())
      .then((datos) => muestraReservas(datos))
      .catch((error) => {
        M.toast({ html: "No hay reservas.", classes: "red" });
      });
  } else {
    M.toast({ html: "No hay usuario registrado.", classes: "red" });
  }
};
