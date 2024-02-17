import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const ProfileIcon = ({color}) => ( <FontAwesome name="user" size={24} color={color}/> );
const HomeIcon = ({color}) => ( <FontAwesome name="home" size={24} color={color}/> );
const CommunitiesIcon = ({color}) => ( <FontAwesome name="group" size={24} color={color}/> );

const withIconColor = (IconComponent) => ({ color, ...props }) => (
    <IconComponent {...props} color={color} />
);

export const NavbarProfileIcon = withIconColor(ProfileIcon);
export const NavbarHomeIcon = withIconColor(HomeIcon);
export const NavbarCommunitiesIcon = withIconColor(CommunitiesIcon);
