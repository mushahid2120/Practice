import {createStore} from 'redux'

const initialState={
    post: 0,
    name: 'Md',
    age: 30
}

const INCREMENT='post/increment'
const DECREMENT='post/decrement'
const INCREASE_BY='post/increaseBy'
const DECREASE_BY='post/decreaseBy'

function reducer(state=initialState,action){
    switch(action.type){
        case INCREMENT:
            return {...state,post: state.post+1}
        case DECREMENT: 
            return {...state,post: state.post-1}
        case INCREASE_BY:
            return {...state,post:state.post+action.payload}
        case DECREASE_BY:
            return {...state,post: state.post - action.payload}
        default: 
            return state
    }
    
}

const store=createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__?.())

const unsubscribe=store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch({type:INCREMENT})
store.dispatch({type:INCREASE_BY,payload:30})
store.dispatch({type:DECREMENT})
store.dispatch({type:DECREASE_BY,payload:11})

unsubscribe()

store.dispatch({type:INCREMENT})