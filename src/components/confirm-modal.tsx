import React, { useContext, useState } from 'react';
import { Alert, View } from 'react-native';
import { Layout, Modal, Text, useTheme } from '@ui-kitten/components';
import Button from './button';
import LocalizationContext from '../contexts/localization-context';

interface ConfirmModalProps {
    buttonText: string,
    modalText: string,
    onSuccess: CallableFunction,
    buttonProps?: any,
    onCancel?: CallableFunction,
    onBackdropPress?: CallableFunction
}

const ConfirmModal = ({ buttonText, modalText, buttonProps = { onPress: () => { } }, onSuccess, onCancel = () => { }, onBackdropPress = () => { } }: ConfirmModalProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    const theme = useTheme();
    const { currentLanguage } = useContext(LocalizationContext);

    return (
        <View>
            <Button onPressIn={() => {
                setVisible(true);
                if (buttonProps.onPress) {
                    buttonProps.onPress();
                }
            }}  {...buttonProps} >{buttonText}</Button>

            <Modal backdropStyle={{ backgroundColor: theme.backdropColor, }}
                visible={visible}
                onBackdropPress={() => { onBackdropPress(setVisible); setVisible(false); }}>
                <Layout style={{ padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>{modalText}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 3, marginTop: 60 }}>
                        <Button appearance={'outline'} style={{ flex: 1 }} onPress={() => { onCancel(setVisible); setVisible(false); }}>{currentLanguage.close}</Button>
                        <View style={{ flex: 1 }} />
                        <Button style={{ flex: 1 }} onPress={() => { onSuccess(setVisible); }}>{currentLanguage.ok}</Button>
                    </View>
                </Layout>
            </Modal>
        </View>
    )
}

export default ConfirmModal;