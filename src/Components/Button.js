import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import React from 'react'

export default function Button({ onPress, label, style,disable }) {
    const { colors } = useTheme()

    return (
        <TouchableOpacity disabled={disable} style={[styles.container,{backgroundColor:disable?colors.disabled:colors.primary,...style}]} onPress={onPress}>
            <Text style={[styles.label,{color:colors.surface}]}>{label}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        height: 54,
        margin: 16
    },
    label:{
        fontSize:17,
        fontWeight:"bold",
    }
})