function fillForm(name, email, phone, company) {
  return it("Fill the form", function () {
    cy.get('[id="nombre"]').type(name);
    cy.get('[id="email"]').type(email);
    cy.get('[id="telefono"]').type(phone);
    cy.get('[id="empresa"]').type(company);

    cy.get('[data-cy="btn-submit"]').click();
  });
}
function editForm(name, phone, company) {
  cy.get('[id="nombre"]').clear().type(name);
  cy.get('[id="telefono"]').clear().type(phone);
  cy.get('[id="empresa"]').clear().type(company);
  cy.get('[data-cy="btn-submit"]').click();
}

describe("It makes a test to the whole app CRM", function () {
  it("Visit the web app", function () {
    cy.visit("/index.html");
  });
  it("Move to the form section", function () {
    cy.get("[data-cy='nuevo-cliente']").click();
  });
  // Llena el formulario con la información de 3 usuarios
  fillForm(
    "Hernán David Mercado Fernández",
    "hernandmf@gmail.com",
    "234235235",
    "Professional Freelance"
  );
  it("Move to the form section", function () {
    cy.get("[data-cy='nuevo-cliente']").click();
  });
  fillForm("Elon Musk", "elonmusk@spacex.com", "4563456", "Spacex");
  it("Move to the form section", function () {
    cy.get("[data-cy='nuevo-cliente']").click();
  });
  fillForm("Jeff Bezos", "jeffbezos@blueorigin.com", "346534", "Blue Origin");

  it("Edit the client information", () => {
    setTimeout(() => {
      cy.get("[data-cy='editar']").first().click();
      cy.get('[id="nombre"]').clear().type("Hernán Mercado");
      editForm("Hernán Mercado", "12341234", "Looking for a company");
    }, 5000);
  });
});
