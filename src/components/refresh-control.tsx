import React from 'react';
import {
  RefreshControl as NativeRefreshControl,
  RefreshControlProps,
} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../contexts/theme-context';
import {themes} from '../themes/themes';

const RefreshControl = (props: RefreshControlProps) => {
  const {theme} = useContext(ThemeContext);
  return (
    <NativeRefreshControl
      {...props}
      colors={[
        theme['color-success-500'],
        theme['color-danger-500'],
        theme['color-info-500'],
        theme['color-warning-500'],
      ]}
      progressBackgroundColor={
        theme === themes.light
          ? theme['color-basic-100']
          : theme['color-basic-800']
      }
    />
  );
};

export default RefreshControl;
