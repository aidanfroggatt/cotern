import React from 'react';
import { render } from '@testing-library/react-native';
import CommunitiesPage from "../../pages/CommunitiesPage";

describe('Communities Page', () => {
    test('renders without crashing', () => {
        const { getByTestId } = render(<CommunitiesPage />);
        const communitiesPage = getByTestId('communities-page');
        expect(communitiesPage).toBeDefined();
    });
});
