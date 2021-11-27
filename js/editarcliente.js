(function () {
  let idCliente;
  let DB;
  const formulario = document.querySelector("#formulario");
  //Selectores de los inputs
  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");

  //Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener("submit", handleSubmit);
    //Conectarse a la base de datos
    conectarDB();
    // verificar el Id de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    idCliente = parametrosURL.get("id");
    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });

  // Actializar el cliente
  function handleSubmit(e) {
    e.preventDefault();
    if (
      nombreInput.value === "" ||
      empresaInput.value === "" ||
      emailInput.value === "" ||
      telefonoInput.value === ""
    ) {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    // Actualizar cliente en DB
    const clienteActualizado = {
      nombre: nombreInput.value,
      empresa: empresaInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      id: Number(idCliente),
    };

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.put(clienteActualizado);
    transaction.oncomplete = function () {
      imprimirAlerta("Editado correctamente");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 500);
    };
    transaction.onerror = function () {
      imprimirAlerta("Hubo un error", "error");
    };
  }
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
