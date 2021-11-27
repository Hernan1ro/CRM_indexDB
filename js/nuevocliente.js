(function () {
  let DB;

  //Formulario //
  const formulario = document.querySelector("#formulario");
  // Event Listener
  document.addEventListener("DOMContentLoaded", function () {
    conectarDB();
    formulario.addEventListener("submit", handleSubmit);
  });

  //Funciones //

  //Al hacer submit en el formulario//
  function handleSubmit(e) {
    e.preventDefault();
    //Leer el valor de los inputs//
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    //Validar el formulario
    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("Todos los campos deben estar llenos", "error");
      return;
    } else {
      const cliente = {
        nombre,
        email,
        telefono,
        empresa,
      };
      cliente.id = Date.now();
      console.log(cliente);
      subirDatosDB(cliente);
    }
  }

  //Conectar la base de datos
  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      console.log("hubo un error");
    };
    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }
  //Subir los datos del usuario a la base de datos
  function subirDatosDB(cliente) {
    console.log(DB);
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.add(cliente);
    transaction.onsuccess = function () {
      imprimirAlerta("Cliente añadido correctamente");
    };
    transaction.onerror = function () {
      imprimirAlerta("Ha habido un error", "error");
    };
  }

  //Imprimir alerta en el DOM
  function imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add(
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "border"
    );
    const alert = document.querySelector(".alert");
    if (!alert) {
      divMensaje.textContent = mensaje;
      if (tipo === "error") {
        divMensaje.classList.add(
          "bg-red-100",
          "border-red-400",
          "text-red-700",
          "alert"
        );
      } else {
        divMensaje.classList.add(
          "bg-green-100",
          "border-red-400",
          "text-green-700",
          "alert",
          "border-green-500"
        );
      }
      formulario.appendChild(divMensaje);
      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    }
  }
})();
