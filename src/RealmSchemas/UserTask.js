export const UserSchema = {
  name: "User",
  primaryKey: "_id",
  properties: {
    _id: "uuid",
    name: "string",
    lastname: "string",
    address: "string",
    location: "Location",
  },
};
export const LocationSchema = {
  name: "Location",
  embedded: true,
  properties: {
    latitude: "float",
    longitude: "float",
  },
};
