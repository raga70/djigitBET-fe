import {createGlobalState} from "react-hooks-global-state";
const initialSS = {toni: "toni"};

//const {initiator} = {AuthToken: "", AuthRole: "", User: {}};

const { useGlobalState, setGlobalState } = createGlobalState({AuthToken: "", AuthRole: "", User: {}});

const GlobalLogout = () => {
    setGlobalState('AuthToken', "");
    setGlobalState('AuthRole', "");
    setGlobalState('User', {});
}

export {useGlobalState,setGlobalState}
export {GlobalLogout}


// const {setGlobalAuthToken,useGlobalAuthToken} = createGlobalState("");
// const {setGlobalAuthRole,useGlobalAuthRole} = createGlobalState("");
// const {setGlobalUser,useGlobalUser} = createGlobalState({});


// export  {useGlobalStatei,setGlobalStatei};
// export {setGlobalAuthToken,useGlobalAuthToken};
// export {setGlobalAuthRole,useGlobalAuthRole};
// export {setGlobalUser,useGlobalUser};




