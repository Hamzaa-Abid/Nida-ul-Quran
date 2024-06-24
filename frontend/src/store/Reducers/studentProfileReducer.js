import * as types from "../Actions/Types";

const initialState = {
  firstName: "Update",
  lastName: "Profile",
  photo:
    "https://emeraldpsychiatry.com/wp-content/uploads/2018/05/dummy_players.png",
  email: "",
  dob: null,
  about: "",
  address: "",
  gender: "",
  cellNumber: "",
  country: "",
  timeZone: "",
  languages: [],
  subjects: [],
  province: "",
  city: "",
  id: "",
  userRole: "",
  profileId: "",
  imageId: "",
  userId: "",
  socketData: {},
};

const studentProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ID":
      return {
        ...state,
        userId: action.payload ? action.payload : state.userId,
      };
    case types.UPDATE_FNAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case types.UPDATE_LNAME:
      return {
        ...state,
        lastName: action.payload,
      };
    case types.UPDATE_PHOTO:
      console.log("photo payload ", action.payload);
      return {
        ...state,
        photo: action.payload !== "undefined" ? action.payload : state.photo,
      };
    case "UPDATE_ID":
      return {
        ...state,
        userID: action.payload,
      };
    case types.SOCKET_INIT:
      console.log("REDUCER:: !!!, ", action.payload);
      return {
        ...state,
        socketData: action.payload ? action.payload : state.socketData,
      };
    case "UPDATE_INFO":
      console.log("ACTION PAYLOAD", action.payload);
      const info = action.payload;
      const {
        email,
        _id,
        imageId,
        profileId,
        skils,
        username,
        languages,
        subjects,
        firstName,
        lastName,
        dob,
        gender,
        cellNumber,
        address,
        country,
        province,
        timeZone,
        city,
        profileImage,
        about,
        userRole,
        userId,
      } = info;
      return {
        ...state,
        id: _id || state.id,
        profileId: profileId || state.profileId,
        imageId: imageId || state.imageId,
        email: email ? email : state.email,
        firstName: firstName || state.firstName,
        lastName: lastName || state.lastName,
        userId: userId || state.userId,
        dob: dob || state.dob,
        about: about || state.about,
        address: address || state.address,
        gender: gender || state.gender,
        cellNumber: cellNumber || state.cellNumber,
        country: country || state.country,
        timeZone: timeZone || state.timeZone,
        languages: languages || state.languages,
        subjects: subjects || state.subjects,
        province: province || state.province,
        city: city || state.city,
        userName: username || state.userName,
        userRole: userRole || state.userRole,
        photo: profileImage || state.photo,
      };
    default:
      return state;
  }
};

export default studentProfileReducer;
