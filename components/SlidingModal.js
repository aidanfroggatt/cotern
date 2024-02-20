// SlidingModal.js
import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";

const SlidingModal = ({ modalVisible, setModalVisible }) => {
    const [backgroundAnimation] = useState(new Animated.Value(0));
    const [contentAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        if (modalVisible) {
            Animated.parallel([
                Animated.timing(backgroundAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(contentAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(backgroundAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(contentAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [modalVisible]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const backgroundOpacity = backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
    });

    const screenHeight = Dimensions.get('window').height;
    const contentHeight = screenHeight * 0.3; // Minimum 30% of screen height

    const contentTranslateY = contentAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [contentHeight, 0],
    });

    return (
        <Modal
            transparent
            visible={modalVisible}
            onRequestClose={toggleModal}
        >
            <Animated.View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    opacity: backgroundOpacity,
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={toggleModal}
                />
            </Animated.View>

            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: contentHeight,
                    transform: [{ translateY: contentTranslateY }],
                }}
            >
                <View style={{ alignItems: 'center', paddingVertical: 16 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
                        Modal Content
                    </Text>
                </View>
            </Animated.View>
        </Modal>
    );
}

export default SlidingModal;
