import * as types from '../Actions/Types'

const initialState = {
    firstName: '',
    lastName: '',
    photo: 'https://emeraldpsychiatry.com/wp-content/uploads/2018/05/dummy_players.png',
    email: '',
    dob: null,
    about: '',
    address: '',
    gender: '',
    cellNumber: '',
    country: '',
    timeZone: '',
    subjects: [],
    province: '',
    city: '',
    id: '',
    userRole: '',
    profileId:'',
    imageId:'',
    skills: [],
    username: '',
}

const tutorProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DOB':
            return {
                ...state,
                dob: action.payload
            }
        case 'UPDATE_FNAME':
            return {
                ...state,
                firstName: action.payload
            }
        case 'UPDATE_LNAME':
            return {
                ...state,
                lastName: action.payload
            }
        case 'UPDATE_PHOTO':

            console.log("photo payload ",action.payload)
            return {
                ...state,
                photo: action.payload 
            }
        case 'UPDATE_ID':
            return {
                ...state,
                userID: action.payload
            }
        case 'UPDATE_INFO':        
        console.log("ACTION PAYLOAD", action.payload)
            const info = action.payload;
            const {
                firstName,
                lastName,
                cellNumber,
                userID,
                dob,
                about,
                address,
                gender,
                country,
                timeZone,
                languages,
                subjects,
                province,
                email,
                username,
                skills,
                city,
                _id,
                profileId,
                imageId,
                userRole
            } = info;
            return {
                ...state,
                id: _id ||  state.id,
                profileId: profileId ||  state.profileId,
                imageId: imageId ||  state.imageId,
                email: email ? email : state.email,
                firstName : firstName || state.firstName ,
                lastName: lastName || state.lastName,
                userID: userID || state.userID,
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
                skills: skills || state.skills
            }

        default:
            return state
    }
}


export default tutorProfileReducer;