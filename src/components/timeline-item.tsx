import React, {useContext} from 'react';
import {View} from 'react-native';
import {ThemeContext} from '../contexts/theme-context';
import 'moment/min/locales.min';
import {Icon, Text} from '@ui-kitten/components';
import LocalizationContext from '../contexts/localization-context';
import moment from 'moment';

interface TimelineItemProps {
  date: string;
  label: string;
  hasPreviousItem?: boolean;
  hasNextItem?: boolean;
}

const getLocalizedDate = (date: string, locale: string = 'en') => {
  return moment(date).locale(locale).format('LLL');
};

const TimelineItem = ({
  date,
  label,
  hasNextItem = false,
  hasPreviousItem = false,
}: TimelineItemProps) => {
  const {theme} = useContext(ThemeContext);
  const {currentLanguage} = useContext(LocalizationContext);

  return (
    <>
      {hasPreviousItem && (
        <View style={{marginVertical: 5, alignItems: 'center'}}>
          <Icon
            name={'more-vertical-outline'}
            style={{
              height: 20,
              width: 20,
            }}
            fill={theme['color-primary-600']}
          />
        </View>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme['color-primary-transparent-200'],
          borderRadius: 10,
          padding: 10,
          marginVertical: 5,
        }}>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              // color: theme['color-primary-600'],
              fontSize: 14,
            }}>
            {label}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            name={'arrow-forward-outline'}
            style={{
              height: 15,
              width: 15,
              fill: theme['color-primary-500'],
            }}
            fill={theme['color-primary-500']}
          />
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={{textAlign: 'right', fontSize: 14}}>
            {getLocalizedDate(date, currentLanguage.locale)}
          </Text>
        </View>
      </View>
      {hasNextItem && (
        <View style={{marginVertical: 5, alignItems: 'center'}}>
          <Icon
            name={'more-vertical-outline'}
            style={{
              height: 20,
              width: 20,
            }}
            fill={theme['color-primary-600']}
          />
        </View>
      )}
    </>
  );
};

export default TimelineItem;
