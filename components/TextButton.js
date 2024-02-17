import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const TextButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} className="py-3 bg-accent rounded-xl">
            <Text className="text-xl font-bold text-center text-primary">{title}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;
