import { render, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";
import App from "./App";

vi.mock("@web3-onboard/react", () => ({
  useConnectWallet: vi.fn().mockReturnValue([
    {
      wallet: {},
      connecting: true,
    },
    vi.fn(),
    vi.fn(),
  ]),
}));

describe("<App />", () => {
  it("should match snapshot", async () => {
    const { container } = await render(<App />);

    expect(container).toMatchSnapshot();
  });

  it("should correctly instantiate the provider", async () => {
    const { container } = await render(<App />);
    const useStateSpy = vi.spyOn(React, "useState");
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const swapWidget = container.querySelector(
      'div[class~="WidgetWrapper__StyledWidgetWrapper"]'
    );

    await waitFor(() => {
      expect(useStateSpy).toHaveBeenCalled();
    });
    expect(swapWidget).toBeDefined();
  });
});
