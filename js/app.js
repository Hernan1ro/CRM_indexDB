(function () {
  let DB;
  document.addEventListener("DOMContentLoaded", () => {
    crearDB();
  });
  //Crear base de datos IndexedDB
  function crearDB() {
    const crearDB = window.indexedDB.open(["crm"], 1);
    crearDB.onerror = function () {
      console.log("Hubo un error");
    };
    crearDB.onsuccess = function () {
      DB = crearDB.result;
      console.log("base de datos creada");
    };

    //Crear el schema de la DB
    crearDB.onupgradeneeded = function (e) {
      const db = e.target.result;
      const objectStorage = db.createObjectStore("crm", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStorage.createIndex("nombre", "nombre", { unique: false });
      objectStorage.createIndex("email", "email", { unique: true });
      objectStorage.createIndex("telefono", "telefono", { unique: false });
      objectStorage.createIndex("empresa", "empresa", { unique: false });
      objectStorage.createIndex("id", "id", { unique: true });
      console.log("Lista creada");
    };
  }
})();
