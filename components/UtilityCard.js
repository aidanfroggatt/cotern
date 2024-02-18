import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const UtilityCard = ({ icon, title, children, onPress, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View className="flex-row justify-between items-center bg-gray-100 p-4 my-0.5 text-secondary rounded-2xl">
                {icon}
                <Text className="">{title}</Text>
                {children}
            </View>
        </TouchableOpacity>
    );
}

export default UtilityCard;
