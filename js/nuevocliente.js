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
      subirDatosDB(cliente);
    }
  }

  //Subir los datos del usuario a la base de datos
  function subirDatosDB(cliente) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.add(cliente);
    transaction.oncomplete = function () {
      imprimirAlerta("Cliente añadido correctamente");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 2000);
    };
    transaction.onerror = function () {
      imprimirAlerta("Ha habido un error", "error");
    };
  }
})();
