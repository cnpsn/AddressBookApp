import React from 'react'
import { View, Text } from 'react-native'
import { Appbar,useTheme } from 'react-native-paper';
import UserPlus from '../Assets/SvgIconsComponents/UserPlus'

export default function PersonsSc(props) {
  const {colors} = useTheme()

  const AddPerson = () => props.navigation.navigate("AddPersonSc")

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Arkadaşlar" subtitle="Mevcut arkadaş"/>
        <Appbar.Action icon={() => <UserPlus color={colors.surface}/>}  onPress={AddPerson}/>
      </Appbar.Header>
    </View>
  )
}