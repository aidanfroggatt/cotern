import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const UtilityCard = ({ icon, title, onPress, disabled }) => {

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View className="flex-row justify-between items-center bg-gray-100 p-4 my-0.5 text-secondary rounded-2xl">
                <Text className="">{icon}</Text>
                <Text className="">{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default UtilityCard;
