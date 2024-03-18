import React from 'react';
import {Text, TouchableOpacity} from "react-native";

const TextLink = ({ onPress, title, testID }) => {

    return (
        <TouchableOpacity onPress={onPress} testID={testID}>
            <Text className="text-accent font-semibold">{title}</Text>
        </TouchableOpacity>
    );
}

export default TextLink;
