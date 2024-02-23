import React from 'react';
import { render } from '@testing-library/react-native';
import HomePage from '../../pages/HomePage';

describe('HomePage component', () => {
    test('renders without crashing', () => {
        const { getByTestId } = render(<HomePage />);
        const homePage = getByTestId('home-page');
        expect(homePage).toBeDefined();
    });
});
