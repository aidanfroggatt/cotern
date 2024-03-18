import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const TextButton = ({ onPress, title, testID }) => {

    return (
        <TouchableOpacity onPress={onPress} className="py-3 bg-accent rounded-xl" testID={testID}>
            <Text className="text-xl font-bold text-center text-primary">{title}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;
