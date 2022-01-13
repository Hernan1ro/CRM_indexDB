function fillForm(name, email, phone, company) {
  return it("Fill the form", function () {
    cy.get('[id="nombre"]').type(name);
    cy.get('[id="email"]').type(email);
    cy.get('[id="telefono"]').type(phone);
    cy.get('[id="empresa"]').type(company);

    cy.get('[data-cy="btn-submit"]').click();
  });
}

describe("It makes a test the whole app CRM", function () {
  it("Visit the web app", function () {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("Move to the form section", function () {
    cy.get("[data-cy='nuevo-cliente']").click();
  });
  fillForm(
    "Hernán David Mercado Fernández",
    "hernandmf@gmail.com",
    "234235235",
    "C.I. Técnicas Baltime de Colombia S.A."
  );
  it("Move to the form section", function () {
    cy.get("[data-cy='nuevo-cliente']").click();
  });
  fillForm("Elon Musk", "elonmusk@spacex.com", "4563456", "Spacex");
  it("Move to the form section", function () {
    cy.get("[data-cy='nuevo-cliente']").click();
  });
  fillForm("Jeff Bezos", "jeffbezos@blueorigin.com", "346534", "Blue Origin");
});
