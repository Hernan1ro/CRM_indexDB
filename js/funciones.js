let DB;

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
