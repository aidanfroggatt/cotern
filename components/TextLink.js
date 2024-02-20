import React from 'react';
import {Text, TouchableOpacity} from "react-native";

const TextLink = ({ onPress, title }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <Text className="text-accent font-semibold">{title}</Text>
        </TouchableOpacity>
    );
}

export default TextLink;
