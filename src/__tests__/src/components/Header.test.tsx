import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
	test("renders header element", () => {
		render(<Header />);
		const header = screen.getByRole("banner");
		expect(header).toBeInTheDocument();
	});

	test("renders logo image with correct alt text", () => {
		render(<Header />);
		const logo = screen.getByAltText("NHL Era Simulator Logo");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("src", "/LogoNoBG.png");
	});
});
