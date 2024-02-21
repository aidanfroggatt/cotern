import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UtilityCard from '../../components/UtilityCard';

describe('<UtilityCard />', () => {
    test('renders correctly with provided icon and title', () => {
        const onPressMock = jest.fn();
        const icon = '🔧';
        const title = 'Settings';

        const { getByText } = render(
            <UtilityCard icon={icon} title={title} onPress={onPressMock} />
        );

        const cardIcon = getByText(icon);
        const cardTitle = getByText(title);

        expect(cardIcon).toBeDefined();
        expect(cardTitle).toBeDefined();
    });

    test('calls onPress function when card is pressed', () => {
        const onPressMock = jest.fn();
        const icon = '🔧';
        const title = 'Settings';

        const { getByText } = render(
            <UtilityCard icon={icon} title={title} onPress={onPressMock} />
        );

        const card = getByText(title); // Assuming the title is the part users will click
        fireEvent.press(card);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

});
