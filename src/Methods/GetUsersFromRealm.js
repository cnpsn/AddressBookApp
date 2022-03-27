import { UserSchema,LocationSchema } from '../RealmSchemas/UserTask';
import Realm from "realm";

async function GetUsersFromRealm() {
    const realm = await Realm.open({schema: [UserSchema,LocationSchema]});
    const Users = realm.objects("User")
    return Users
}
export default GetUsersFromRealm;