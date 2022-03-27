import React,{useContext,useEffect} from 'react'
import { View, Text, StyleSheet,FlatList,TouchableOpacity } from 'react-native'
import { Appbar,useTheme,Avatar } from 'react-native-paper';
import { GlobalContext } from '../Contexts/GlobalContext';
import GetUsersFromRealm from '../Methods/GetUsersFromRealm';
// ICONS 
import UserPlus from '../Assets/SvgIconsComponents/UserPlus'
import ChevronRight from '../Assets/SvgIconsComponents/ChevronRight'

export default function PersonsSc(props) {
  const {UserList,setUserList} = useContext(GlobalContext)
  const {colors} = useTheme()

  const AddPerson = () => props.navigation.navigate("AddPersonSc")
  const GoEdit = (userID) => props.navigation.navigate("EditPersonSc",{userID})

  const GET = async() => {
    const Result = await GetUsersFromRealm()
    setUserList(Result)
  }


  useEffect(() => {GET()},[])

  return (
    <View style={[styles.container]}>
      <Appbar.Header>
        <Appbar.Content title="Arkadaşlar" subtitle="Mevcut arkadaş"/>
        <Appbar.Action icon={() => <UserPlus color={colors.surface}/>}  onPress={AddPerson}/>
      </Appbar.Header>
      <View style={[styles.body]}>
        <FlatList
        data={UserList}
        renderItem={({item}) => {
          const {name,lastname,address,_id} = item
          return(
            <TouchableOpacity onPress={() => GoEdit(_id)} style={[styles.cardContainer,{backgroundColor:colors.surface}]}>
              <View style={[styles.cardAvatarView]}>
                <Avatar.Text size={54} label={`${name[0]}${lastname[0]}`}/>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.title,{color:colors.black}]}>{`${name} ${lastname}`}</Text>
                <Text style={[styles.subTitle,{color:colors.gray}]}>{address}</Text>
              </View>
              <View style={[styles.cardChevronView]}>
                <ChevronRight width={28} height={28} color={colors.gray}/>
              </View>
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
    flex:1
  },
  cardContainer:{
    flexDirection:"row",
    margin:16,
    paddingVertical:16,
    paddingHorizontal:8,
    borderRadius:12
  },
  cardAvatarView:{

  },
  cardChevronView:{
    justifyContent:"center"
  },
  cardContentView:{
    flex:1,
    justifyContent:"center",
    paddingHorizontal:8
  },
  title:{
    fontWeight:"bold",
    fontSize:17
  },
  subTitle:{
    fontSize:15
  }
})