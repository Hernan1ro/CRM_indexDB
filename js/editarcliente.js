(function () {
  let DB;
  //Selectores de los inputs
  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");
  document.addEventListener("DOMContentLoaded", () => {
    //Conectarse a la base de datos
    conectarDB();
    // verificar el Id de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parametrosURL.get("id");
    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });

  //Obtener el cliente de la BD
  function obtenerCliente(id) {
    const transaction = DB.transaction(["crm"], "readonly");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value.id === Number(id)) {
          imprimirCliente(cursor.value);
        }
        cursor.continue();
      }
    };
  }
  function imprimirCliente({ nombre, telefono, email, empresa }) {
    //Llenar los inputs del form
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }

  //Conectar los datos con la base de datos
  function conectarDB(id) {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      console.log("Hubo un error");
    };
    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }
})();
