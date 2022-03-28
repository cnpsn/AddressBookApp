import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Appbar } from 'react-native-paper';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Button from '../Components/Button';
import Geolocation from '@react-native-community/geolocation';

export default function MapSc(props) {
    const { AddLocation } = props.route.params
    const [pin, setpin] = useState(null)
    const [targetPin, settargetPin] = useState(null)

    const goBack = () => props.navigation.goBack()

    const ButtonPress = () => {
        AddLocation(targetPin)
        goBack()
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            const { latitude, longitude } = info.coords
            setpin({ latitude, longitude, latitudeDelta: 0.15, longitudeDelta: 0.15 })
        })
    }, [])

    return (
        <View style={[styles.container]} >
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Konumunu seç" subtitle="Arkadaşının konumunu seç" />
            </Appbar.Header>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={pin}
                onPress={e => settargetPin(e.nativeEvent.coordinate)}
                style={{ flex: 1 }}
            >
                <Marker draggable
                    coordinate={pin}
                />
                {targetPin &&
                    <Marker draggable
                        pinColor="blue"
                        coordinate={targetPin}
                    />
                }
            </MapView>
            <SafeAreaView>
                <Button onPress={ButtonPress} disable={!targetPin} label="Bu Adresi Kullan" />
            </SafeAreaView>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})