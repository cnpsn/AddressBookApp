import React,{useContext,useState,useEffect} from 'react'
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,SafeAreaView,Alert} from 'react-native'
import { Appbar, useTheme, Avatar,TextInput } from 'react-native-paper';
import { GlobalContext } from '../Contexts/GlobalContext';
import { UserSchema,LocationSchema } from '../RealmSchemas/UserTask';
import Button from '../Components/Button';
import Realm from "realm";
// ICONS 
import Edit from '../Assets/SvgIconsComponents/Edit'
import MapPin from '../Assets/SvgIconsComponents/MapPin'
import Trash from '../Assets/SvgIconsComponents/Trash'

const TextInputList = [
    {value:"name",label:"İsim"},
    {value:"lastname",label:"Soyisim"},
    {value:"address",label:"Adres Başlığı"},
]

export default function EditPersonSc(props) {
    const {UserList,setUserList} = useContext(GlobalContext)
    const {userID} = props.route.params
    const { colors } = useTheme()

    const CurrentUser = UserList.find(el => el._id.toString() == userID.toString())

    const [UserInformation, setUserInformation] = useState(CurrentUser)
    const [isEdit, setisEdit] = useState(false)
    const [buttonDisable, setbuttonDisable] = useState(false)

    const OnChangeTextInput = (text,index) => {
        const {value} = TextInputList[index]
        const _UserInformation = JSON.parse(JSON.stringify(UserInformation))
        const HelperObject = {..._UserInformation,[value]:text}
        setUserInformation(HelperObject)
    }

    const goBack = () => props.navigation.goBack()
    const goMap = () => props.navigation.navigate("MapSc",{AddLocation})

    const AddLocation = (loc) => {
        const _UserInformation = JSON.parse(JSON.stringify(UserInformation))
        const HelperObject = {..._UserInformation,location:loc}
        setUserInformation(HelperObject)
    }

    const EditPress = () => {
        if(!isEdit){
            setisEdit(true)
        }else{
            setisEdit(false)
            setUserInformation(CurrentUser)
        }
    }   

    const SavePress = async() => {
        const realm = await Realm.open({schema: [UserSchema,LocationSchema]});
        const User = realm.objectForPrimaryKey("User", userID)
        const {address,name,lastname,location} = UserInformation
        realm.write(() => {
            User.address = address
            User.name =  name
            User.lastname = lastname
            User.location = location
        })
        const UserList = realm.objects("User")
        setUserList(UserList)
        setisEdit(false)
    }
8
    const CheckDeletePerson = () => {
        Alert.alert("Biraz bekle.","Bu kişiyi silmek istediğinize emin misiniz ?",[
            {text:"Hayır, İptal",onPress:() => null},
            {text:"Evet, Sil",onPress:() => DeletePerson()},
        ])
    }
    const DeletePerson = async() => {
        goBack()
        const realm = await Realm.open({schema: [UserSchema,LocationSchema]});
        const User = realm.objectForPrimaryKey("User", userID)
        realm.write(() => {
            realm.delete(User);
        });
        const UserList = realm.objects("User")
        setUserList(UserList)
    }

    useEffect(() => {
        const ContextDATA = UserList.find(el => el._id.toString() == userID.toString())
        const isEqual = JSON.stringify(ContextDATA) == JSON.stringify(UserInformation)
        setbuttonDisable(isEqual)
    },[UserInformation])
    
    const ChooseLocationLabel = `${UserInformation?UserInformation.location.latitude:""},${UserInformation?UserInformation.location.longitude:""}`

    return (
        <View style={[styles.container]}>
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Düzenle" subtitle="Kullanıcı Düzenle" />
                <Appbar.Action icon={() => <Edit color={colors.surface}/>}  onPress={EditPress}/>
            </Appbar.Header>
            <ScrollView style={[styles.body]}>
                <View style={[styles.card,{backgroundColor:colors.surface}]}>
                    <View style={{alignItems:"center"}}>
                        <Avatar.Text size={90} label={`${UserInformation?UserInformation.name[0]:""}${UserInformation?UserInformation.lastname[0]:""}`}/>
                    </View>
                    {TextInputList.map((el,index) => {
                        const {label,value} = el
                        return(
                        <TextInput
                        onChangeText={text => OnChangeTextInput(text,index)}
                        editable={isEdit}
                        value={UserInformation?UserInformation[value]:""}
                        mode={isEdit?"outlined":"flat"}
                        label={label}
                        style={[styles.textInput,{backgroundColor:colors.surface}]}
                        />
                        )
                    })}
                    <TouchableOpacity disabled={!isEdit} onPress={goMap} style={[styles.ChooseLocationView,{backgroundColor:colors.surface,borderColor:isEdit?colors.primary:colors.disabled}]}>
                        <MapPin color={colors.primary}/>
                        <Text numberOfLines={1} maxFontSizeMultiplier={1} style={[styles.ChooseLocationLabel,{color:colors.primary}]}>{ChooseLocationLabel}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={CheckDeletePerson} style={[styles.deletePersonView]}>
                        <Trash width={22} height={22} color={colors.danger}/>
                        <Text style={[styles.title,{color:colors.danger}]}>Kişiyi Sil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <SafeAreaView>
                {isEdit&&<Button onPress={SavePress} disable={buttonDisable} label="Kaydet"/>}
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body:{
        flex:1,
        padding:16
    },
    card:{
        padding:8
    },
    textInput:{
        marginVertical:12
    },
    ChooseLocationView:{
        alignItems:"center",
        flexDirection:"row",
        marginVertical:16,
        borderRadius:6,
        borderWidth:1,
        paddingVertical:16,
        paddingHorizontal:8,
    },
    ChooseLocationLabel:{
        fontSize:17,
        fontWeight:"bold",
        marginHorizontal:8,
        flex:1
    },
    deletePersonView:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:8
    },
    title:{
        fontSize:15,
        fontWeight:"bold",
        marginHorizontal:6
    }
})