import {Button, Icon, Text, TopNavigation} from '@ui-kitten/components';
import React from 'react';

const Header = ({navigation, title}: any) => {
  const shouldGoBack = typeof navigation.openDrawer === 'undefined';

  return (
    <TopNavigation
      alignment={'center'}
      title={() => (
        <Text style={{fontWeight: 'bold'}}>
          {title ?? 'Nepal Transport Company'}
        </Text>
      )}
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
