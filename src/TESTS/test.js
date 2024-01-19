import React from "react";
import { render, screen } from "@testing-library/react";
// import Card from "./Card";
import Apiks from "../Pages/Api";
test("renders learn react text", () => {
  render(<Apiks />);
  const Element = screen.getByText(/your tasks/);
  expect(Element).toBeInTheDocument();
});