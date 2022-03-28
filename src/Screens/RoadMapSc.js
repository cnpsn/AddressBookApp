import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Button from '../Components/Button';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import CreatingRouteModal from '../Components/CreatingRouteModal';

export default function RoadMapSc(props) {
    const { friendLocation } = props.route.params
    const [pin, setpin] = useState(null)
    const [targetPin, settargetPin] = useState(friendLocation)
    const [locations, setlocations] = useState()
    const [loading, setloading] = useState(false)

    const { colors } = useTheme()

    const goBack = () => props.navigation.goBack()

    const GetLocations = async () => {
        const url = `https://router.project-osrm.org/route/v1/driving/${pin.longitude},${pin.latitude};${targetPin.longitude},${targetPin.latitude}?overview=simplified&geometries=geojson`
        return fetch(url)
            .then(result => result.json())
            .then(data => data)
    }

    const ConvertData = (Result) => {
        const HelperArray = []
        const DATA = Result.routes[0].geometry.coordinates
        DATA.forEach(element => {
            HelperArray.push({ longitude: element[0], latitude: element[1] })
        });
        return HelperArray
    }

    const ButtonPress = async () => {
        setloading(true)
        try {
            const Result = await GetLocations()
            if (Result.code == "Ok") {
                const Locations = ConvertData(Result)
                setlocations(Locations)
                setloading(false)
            }
        } catch (error) {
            setloading(false)
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            const { latitude, longitude } = info.coords
            setpin({ latitude, longitude, latitudeDelta: 0.15, longitudeDelta: 0.15 })
        })
        settargetPin(friendLocation)
    }, [])

    return (
        <View style={[styles.container]}>
            {loading&&<CreatingRouteModal/>}
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Konumunu seç" subtitle="Arkadaşının konumunu seç" />
            </Appbar.Header>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={pin}
                style={{ flex: 1 }}
            >
                {locations &&
                    <Polyline
                        coordinates={locations}
                        strokeColor={colors.primary}
                        strokeWidth={4}
                    />}
                <MapViewDirections
                    origin={pin}
                    destination={targetPin}
                />
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