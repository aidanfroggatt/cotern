import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextLink from '../../components/TextLink';

describe('<TextLink />', () => {
    test('renders correctly with provided title', () => {
        const onPressMock = jest.fn();
        const title = 'Click here';

        const { getByText } = render(<TextLink onPress={onPressMock} title={title} />);

        const link = getByText(title);
        expect(link).toBeDefined();
    });

    test('calls onPress function when link is pressed', () => {
        const onPressMock = jest.fn();
        const title = 'Click here';

        const { getByText } = render(<TextLink onPress={onPressMock} title={title} />);

        const link = getByText(title);
        fireEvent.press(link);

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
