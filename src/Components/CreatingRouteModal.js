import { View, Text,StyleSheet,ActivityIndicator } from 'react-native'
import { useTheme } from 'react-native-paper';
import React from 'react'
import Map from '../Assets/SvgIconsComponents/Map'

export default function CreatingRouteModal() {
  const {colors} = useTheme()
  return (
    <View style={[styles.container,{backgroundColor:colors.backdrop}]}> 
      <View style={[styles.modal,{backgroundColor:colors.primary}]}>
        <Map color={colors.surface} width={100} height={100}/>
        <ActivityIndicator color={colors.surface} size="large"/>
        <Text style={[styles.title,{color:colors.surface}]}>Rota oluşturuluyor...</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    position:"absolute",
    width:"100%",
    height:"100%",
    elevation:1,
    zIndex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  modal:{
    justifyContent:"center",
    alignItems:"center",
    padding:32,
    borderRadius:16
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
    marginVertical:16
  },
})