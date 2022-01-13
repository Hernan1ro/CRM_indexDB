describe("It makes a test the whole app CRM", function () {
  it("Visit the web app", function () {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("Move to the form section", function () {
    cy.get("[data-cy='nuevo-cliente']").click();
  });
  it("Fill the form", function () {
    cy.get('[id="nombre"]').type("Hernán David Mercado Fernández");
    cy.get('[id="email"]').type("hernandmf@gmail.com");
    cy.get('[id="telefono"]').type("234235235");
    cy.get('[id="empresa"]').type("C.I. Técnicas Baltime de Colombia S.A.");

    cy.get('[data-cy="btn-submit"]').click();
  });
});
