describe("Log System UI", () => {
  it("loads the logs table", () => {
    cy.visit("/");
    cy.contains("System logs").should("exist");
  });

  it("can open Add Log modal", () => {
    cy.visit("/");

    // ✅ Wait until Add Log is enabled
    cy.contains("Add Log").should("not.be.disabled").click();

    cy.contains("Add New Log").should("exist");
  });

  it("can add a new log", () => {
    cy.visit("/");

    // ✅ Wait until Add Log is enabled
    cy.contains("Add Log").should("not.be.disabled").click();

    cy.get('input[placeholder="Owner name..."]').type("Test Owner");
    cy.get('textarea[placeholder="Log text..."]').type("This is a test log");

    cy.contains("Save").click();

    // ✅ Wait for row to appear
    cy.contains("Next").click();
    cy.contains("Next").click();
    cy.contains("td", "Test Owner", { timeout: 5000 }).should("exist");
    cy.contains("td", "This is a test log", { timeout: 5000 }).should("exist");
  });
});
