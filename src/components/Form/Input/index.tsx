import React from 'react';
import theme from '../../../global/styles/theme';
import { Container } from './styles';

export const Input = ({ ...otherProps }) => {
  return (
    <Container placeholderTextColor={theme.colors.gray500} {...otherProps} />
  );
};
