import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Appbar } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Button from '../Components/Button';
import Geolocation from '@react-native-community/geolocation';

export default function RoadMapSc(props) {
    const { friendLocation } = props.route.params
    const [pin, setpin] = useState(null)
    const [targetPin, settargetPin] = useState(friendLocation)

    const goBack = () => props.navigation.goBack()

    const ButtonPress = () => {
        
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            const { latitude, longitude } = info.coords
            setpin({ latitude, longitude, latitudeDelta: 0.15, longitudeDelta: 0.15 })
        })
        settargetPin(settargetPin)
    }, [])

    return (
        <View style={[styles.container]} >
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Konumunu seç" subtitle="Arkadaşının konumunu seç" />
            </Appbar.Header>
            <MapView
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
                <Button onPress={ButtonPress} disable={!targetPin} label="Rota Oluştur" />
            </SafeAreaView>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})