const operate = require("../script.js");

describe("operate function", () => {
 
  it("adds", () => {
    expect(operate("+", 3, 2)).toBe(5);
    expect(operate("+", 0, 2)).toBe(2);
    expect(operate("+", 3, -2)).toBe(1);
  });



  it("subtracts", () => {
    expect(operate("-", 3, 2)).toBe(1);
    expect(operate("-", 2, 3)).toBe(-1);
    expect(operate("-", 0, 2)).toBe(-2);
    expect(operate("-", 4, 0)).toBe(4);
  });

  it("multiplies", () => {
    expect(operate("×", 3, 2)).toBe(6);
    expect(operate("×", 0, 2)).toBe(0);
    expect(operate("×", 2, 0)).toBe(0);
    expect(operate("×", 1.2, 2.8)).toBe(3.36);
  });

  it("divides", () => {
    expect(operate("÷", 6, 2)).toBe(3);
    expect(operate("÷", 4, 3)).toBe(1.3333);
    expect(operate("÷", 1, 0)).toBe('bruh');
    expect(operate("÷", 6, 1)).toBe(6);
  });
})