import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { IconStyle } from '../styles/IconsStyle';

const ProfileIcon = ({color}) => ( <FontAwesome name="user" size={IconStyle.size} color={color}/> );
const HomeIcon = ({color}) => ( <FontAwesome name="home" size={IconStyle.size} color={color}/> );

const withIconColor = (IconComponent) => ({ color, ...props }) => (
    <IconComponent {...props} color={color} />
);

export const NavbarProfileIcon = withIconColor(ProfileIcon);
export const NavbarHomeIcon = withIconColor(HomeIcon);


