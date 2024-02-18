import React, { useState, useEffect } from 'react';
import { Modal, View, Text, PanResponder, Animated } from 'react-native';
import TextButton from "./TextButton";

const SlidingModal = ({ modalVisible, toggleModal }) => {
    const [slideAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (modalVisible) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            slideAnim.setValue(gestureState.dy / 300); // Adjust 300 as per your need
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 100) {
                toggleModal();
            } else {
                Animated.spring(slideAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    const translateY = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0], // Adjust 600 as per your need
    });

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                toggleModal();
            }}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
                <Animated.View
                    style={{
                        backgroundColor: '#fff',
                        minHeight: '25%',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 20,
                        transform: [{ translateY }],
                        ...panResponder.panHandlers,
                    }}
                >
                    <Text>Modal Content</Text>
                    <TextButton title="Close" onPress={toggleModal} />
                </Animated.View>
            </View>
        </Modal>
    );
};

export default SlidingModal;
