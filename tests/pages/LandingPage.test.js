import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LandingPage from "../../pages/LandingPage";

// Mocking useNavigation hook
jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
}));

const mockNavigation = () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock });
    return navigateMock;
};

const mockPage = () => {
    return (
        <NavigationContainer>
            <LandingPage/>
        </NavigationContainer>
    );
};

describe("Landing Page", () => {
    beforeEach(() => {
        // Reset the mock implementation before each test
        useNavigation.mockReset();
    });

    test("renders without crashing", () => {
        const { getByTestId } = render(mockPage());

        // Assert that the landing page is rendered
        const landingPage = getByTestId("landing-page");
        expect(landingPage).toBeDefined();
    });

    test("navigates to 'CreateAccount' screen when 'Create Account' button is pressed", () => {
        const navigateMock = mockNavigation();
        const { getByText } = render(mockPage());

        // Simulate press event on 'Create Account' button
        fireEvent.press(getByText("Create Account"));

        // Assert that the navigate function was called with the expected screen name
        expect(navigateMock).toHaveBeenCalledWith("CreateAccount");
    });

    test("navigates to 'Login' screen when 'Login' link is pressed", () => {
        const navigateMock = mockNavigation();
        const { getByText } = render(mockPage());

        // Simulate press event on 'Login' link
        fireEvent.press(getByText("Login"));

        // Assert that the navigate function was called with the expected screen name
        expect(navigateMock).toHaveBeenCalledWith("Login");
    });
});
