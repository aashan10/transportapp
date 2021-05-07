import React from 'react';
import {useTheme} from '@ui-kitten/components';
import {StatusBar, StatusBarStyle} from 'react-native';

const CustomStatusBar = () => {
  const theme = useTheme();
  let barStyle: StatusBarStyle;

  if (theme['background-basic-color-1'] === '#FFFFFF') {
    barStyle = 'dark-content';
  } else {
    barStyle = 'light-content';
  }

  return (
    <StatusBar
      backgroundColor={theme['background-basic-color-1']}
      barStyle={barStyle}
    />
  );
};

export default CustomStatusBar;
