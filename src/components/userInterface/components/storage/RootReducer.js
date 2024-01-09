var initialState={
    myCart:{},
    user:{}
}

export default function RootReducer(state=initialState,action){
    switch(action.type){
        case "ADD_PRODUCT":
            state.myCart[action.payload[0]] = action.payload[1]
            return {myCart:state.myCart,user:state.user}

        case "EDIT_PRODUCT":
            state.myCart[action.payload[0]] = action.payload[1]
            return {myCart:state.myCart,user:state.user}
        case "DELETE_PRODUCT":
            delete state.myCart[action.payload[0]]
            return {myCart:state.myCart,user:state.user}
        case "ADD_USER":
            state.user[action.payload[0]] = action.payload[1]
            return {myCart:state.myCart,user:state.user}


        default:
            return {myCart:state.myCart,user:state.user}
    }
}