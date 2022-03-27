import React,{useContext,useEffect} from 'react'
import { View, StyleSheet,FlatList,TouchableOpacity,Text } from 'react-native'
import { Appbar,useTheme,Avatar } from 'react-native-paper';
import { GlobalContext } from '../Contexts/GlobalContext';
// ICONS
import MapPin from '../Assets/SvgIconsComponents/MapPin'

export default function FindMyFriendSc(props) {
  const {UserList,setUserList} = useContext(GlobalContext)
  const {colors} = useTheme()

  const goMap = (location) => props.navigation.navigate("RoadMapSc",{friendLocation:location})
  
  return (
    <View style={[styles.container]}>
      <Appbar.Header>
        <Appbar.Content title="Arkadaşımı bul" subtitle="Arkadaşına giden rotayı gör"/>
      </Appbar.Header>
      <View style={[styles.body]}>
        <FlatList
        data={UserList}
        renderItem={({item}) => {
          const {name,lastname,address,location} = item
          return(
            <TouchableOpacity onPress={() => goMap(location)} style={[styles.card,{backgroundColor:colors.surface}]}>
              <View style={[styles.cardAvatarView]}>
                <Avatar.Text size={60} label={`${name[0]}${lastname[0]}`}/>
              </View>
              <View style={[styles.cardBody]}>
                <Text style={[styles.title,{color:colors.black}]}>{`${name} ${lastname}`}</Text>
                <Text style={[styles.subTitle,{color:colors.gray}]}>{address}</Text>
              </View>
              <MapPin color={colors.primary}/>
            </TouchableOpacity>
          )
        }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  body:{
    flex:1,
    paddingBottom:100
  },
  card:{
    margin:16,
    borderRadius:12,
    paddingVertical:16,
    paddingHorizontal:8,
  },
  title:{
    fontWeight:"bold",
    fontSize:17,
    marginVertical:8
  },
  subTitle:{
    fontSize:15
  },
  cardAvatarView:{
    alignItems:"center"
  },
  cardBody:{
    alignItems:"center"
  }
})