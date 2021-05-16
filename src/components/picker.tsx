import React from 'react';
import {
  Picker as NativePicker,
  PickerProps as NativePickerProps,
} from '@react-native-picker/picker';
const PickerItem = NativePicker.Item;

interface PickerProps extends NativePickerProps {
  children: Array<React.ReactNode>;
}

const Picker = (props: PickerProps) => {
  return (
    <NativePicker
      // mode={'dropdown'}
      dropdownIconColor={'white'}
      {...props}
      itemStyle={{backgroundColor: 'red', color: 'green'}}>
      {props.children}
    </NativePicker>
  );
};

export default Picker;
export {PickerItem};
