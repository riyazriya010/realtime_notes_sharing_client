import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface UserState {
    _id: string;
    username: string;
    email: string;
}


const initialState: UserState = {
    _id: '',
    username: '',
    email: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state._id = action.payload._id
            state.username = action.payload.username
            state.email = action.payload.email
        },

        logoutUser(state) {
            state._id = ''
            state.username = ''
            state.email = ''
        }
    }
})

export const {setUser, logoutUser} = userSlice.actions
export default userSlice.reducer

