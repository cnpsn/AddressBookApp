import React, { useState } from 'react'
import { View,StyleSheet,SafeAreaView } from 'react-native'
import { Appbar } from 'react-native-paper';
import MapView,{Marker} from 'react-native-maps';
import Button from '../Components/Button';

export default function MapSc(props) {
    const {AddLocation} = props.route.params
    const [pin, setpin] = useState(null)

    const goBack = () => props.navigation.goBack()

    const ButtonPress = () => {
        AddLocation(pin)
        goBack()
    }

    return (
        <View style={[styles.container]} >
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Konumunu seç" subtitle="Arkadaşının konumunu seç" />
            </Appbar.Header>
            <MapView
                onPress={e => setpin(e.nativeEvent.coordinate)}
                style={{ flex: 1 }}
            >
                <Marker draggable
                    coordinate={pin}
                />
            </MapView>
            <SafeAreaView>
                <Button onPress={ButtonPress} disable={!pin} label="Bu Adresi Kullan"/>
            </SafeAreaView>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})