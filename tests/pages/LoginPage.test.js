import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LoginPage from "../../pages/LoginPage";
import {useAuth} from "../../contexts/AuthContext";

// Mocking useNavigation hook
jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
}));

// Mocking useAuth hook
jest.mock("../../contexts/AuthContext", () => ({
    useAuth: () => ({
        loginEmailAndPassword: jest.fn(),
    }),
}));

const mockNavigation = () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({ navigate: navigateMock });
    return navigateMock;
};

const mockPage = () => {
    return (
        <NavigationContainer>
            <LoginPage/>
        </NavigationContainer>
    );
};

describe("Login Page", () => {
    beforeEach(() => {
        useNavigation.mockReset();
    });

    test("renders without crashing", () => {
        const { getByTestId } = render(mockPage());

        const loginPage = getByTestId("login-page");
        expect(loginPage).toBeDefined();
    });

    test("input fields update correctly", () => {
        const { getByPlaceholderText } = render(mockPage());

        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Password");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "password123");

        expect(emailInput.props.value).toBe("test@example.com");
        expect(passwordInput.props.value).toBe("password123");
    });

    test("navigation to CreateAccount page", () => {
        const navigateMock = mockNavigation();
        const { getByTestId } = render(mockPage());

        const createAccountLink = getByTestId("no-account-link");
        fireEvent.press(createAccountLink);

        expect(navigateMock).toHaveBeenCalledWith("CreateAccount");
    });

    // Test the login button functionality
});
