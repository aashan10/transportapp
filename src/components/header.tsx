import {Button, Icon, Text, TopNavigation} from '@ui-kitten/components';
import React, {useContext} from 'react';
import LocalizationContext from '../contexts/localization-context';

const Header = ({navigation, title, style, back}: any) => {
  const shouldGoBack = typeof navigation.openDrawer === 'undefined' || back;
  const {currentLanguage} = useContext(LocalizationContext);
  return (
    <TopNavigation
      alignment={'center'}
      title={() => (
        <Text style={{fontWeight: 'bold'}}>
          {title ?? currentLanguage.appName}
        </Text>
      )}
      style={[
        style,
        {marginTop: 33, borderBottomEndRadius: 10, borderRadius: 10},
      ]}
      accessoryLeft={() => {
        return (
          <Button
            appearance={'ghost'}
            onPress={() => {
              if (shouldGoBack) {
                navigation.goBack();
              } else {
                navigation.openDrawer();
              }
            }}
            accessoryLeft={props => (
              <Icon
                {...props}
                name={shouldGoBack ? 'arrow-back-outline' : 'menu'}
              />
            )}
          />
        );
      }}
    />
  );
};

export default Header;
