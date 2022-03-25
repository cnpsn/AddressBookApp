import React from 'react'
import { View, Pressable, Dimensions, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import Settings from '../Assets/SvgIconsComponents/Settings'
import Users from '../Assets/SvgIconsComponents/Users'
import Search from '../Assets/SvgIconsComponents/Search'

const { width } = Dimensions.get('window')

export default function CustomizedTabbar({ state, descriptors, navigation }) {
  const { colors } = useTheme()

  const RenderIcon = ({isFocused,route}) => {
    const {colors} = useTheme()
    if(route=="PersonsSc"){
        return <Users color={isFocused?colors.surface:colors.LightGrey}/>
    }
    if(route=="FindMyFriendSc"){
        return <Search color={isFocused?colors.surface:colors.LightGrey}/>
    }
    if(route=="SettingsSc"){
        return <Settings color={isFocused?colors.surface:colors.LightGrey}/>
    }
  }

  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={[styles.mainItemContainer, { borderLeftWidth: label == "SettingsSc" ? 3 : 0 }]}>
            <Pressable
              onPress={onPress}
              style={{ backgroundColor: isFocused ? colors.primary : colors.primary2, borderRadius: 20, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 }}>
                <RenderIcon route={label} isFocused={isFocused} />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 14,
    backgroundColor: "#5E38BF",
    borderRadius: 25,
    marginHorizontal: width * 0.03
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: "#fff",
  },
})