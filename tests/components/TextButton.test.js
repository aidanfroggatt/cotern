import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextButton from '../../components/TextButton';

describe('<TextButton />', () => {
    test('renders button with correct title', () => {
        const onPressMock = jest.fn();
        const title = 'Press me';

        const { getByText } = render(<TextButton onPress={onPressMock} title={title} />);

        const button = getByText(title);
        expect(button).toBeDefined();
    });

    test('calls onPress function when button is pressed', () => {
        const onPressMock = jest.fn();
        const title = 'Press me';

        const { getByText } = render(<TextButton onPress={onPressMock} title={title} />);

        const button = getByText(title);
        fireEvent.press(button);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
