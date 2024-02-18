import React, { useState } from 'react';
import { TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';

const SlidingModal = ({ visible, onClose, children }) => {
    const [backgroundAnimation] = useState(new Animated.Value(0));
    const [contentAnimation] = useState(new Animated.Value(0));

    const toggleModal = () => {
        if (visible) {
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
            ]).start(onClose);
        } else {
            Animated.parallel([
                Animated.timing(backgroundAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(contentAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start();
        }
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
            visible={visible}
            onRequestClose={onClose}
        >
            <Animated.View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    opacity: backgroundOpacity,
                }}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={toggleModal} />
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
                {children}
            </Animated.View>
        </Modal>
    );
};

export default SlidingModal;
