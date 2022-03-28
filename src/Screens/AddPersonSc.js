import React,{useState,useContext} from 'react'
import { View, Text,StyleSheet,ScrollView,SafeAreaView,TouchableOpacity } from 'react-native'
import { Appbar,TextInput,useTheme } from 'react-native-paper';
import { UserSchema,LocationSchema } from '../RealmSchemas/UserTask';
import { GlobalContext } from '../Contexts/GlobalContext';
import Realm from "realm";
import Button from '../Components/Button';
import MapPin from '../Assets/SvgIconsComponents/MapPin'
const { UUID } = Realm.BSON;

export default function AddPersonSc(props) {
    const {colors} = useTheme()
    const [name, setname] = useState("")
    const [lastname, setlastname] = useState("")
    const [address, setaddress] = useState("")
    const [location, setlocation] = useState(null)
    const {setUserList} = useContext(GlobalContext)

    const goBack = () => props.navigation.goBack()
    const goMap = () => props.navigation.navigate("MapSc",{AddLocation})

    const Save = async() => {
        const realm = await Realm.open({schema: [UserSchema,LocationSchema]});
        realm.write(() => {
            realm.create("User",{lastname:lastname,location:location,address:address,name:name,_id:new UUID()})
        })
        const Users = realm.objects("User")
        setUserList(Users)
        goBack()
    }

    const AddLocation = (loc) => {
        setlocation(loc)
    }

    const ChooseLocationLabel = `${location?`${location.latitude},${location.longitude}`:"Konum Seç"}`
    const ButtonDisable = name==""||lastname==""||address==""||!location
    
    return (
        <View style={[styles.container]}>
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Arkadaş Ekle" subtitle="Arkadaş ekleme ekranı" />
            </Appbar.Header>
            <SafeAreaView style={{flex:1}}>
                <ScrollView style={[styles.body]}>
                    <TextInput
                    value={name}
                    onChangeText={t => setname(t)}
                    mode="outlined"
                    label="İsim"
                    style={[styles.textInput,{backgroundColor:colors.surface}]}
                    />
                    <TextInput
                    value={lastname}
                    onChangeText={t => setlastname(t)}
                    mode="outlined"
                    label="Soyisim"
                    style={[styles.textInput,{backgroundColor:colors.surface}]}
                    />
                    <TextInput
                    value={address}
                    onChangeText={t =>setaddress(t)}
                    mode="outlined"
                    label="Adres Başlığı"
                    multiline
                    style={[styles.textInput,{backgroundColor:colors.surface}]}
                    />
                    <TouchableOpacity onPress={goMap} style={[styles.ChooseLocationView,{backgroundColor:colors.surface,borderColor:colors.primary}]}>
                        <MapPin color={colors.primary}/>
                        <Text numberOfLines={1} maxFontSizeMultiplier={1} style={[styles.ChooseLocationLabel,{color:colors.primary}]}>{ChooseLocationLabel}</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View>
                    <Button disable={ButtonDisable} onPress={Save} label="Kaydet"/>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    body:{
        flex:1,
        padding:16
    },
    textInput:{
        marginVertical:12
    },
    button:{
        height:54,
        justifyContent:"center",
        borderRadius:12
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
    }
})