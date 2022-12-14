import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import './styles.css'
import { rootReducer } from "./redux/rootReducer"
import { asyncIncrement, changeTheme, decrement, increment } from "./redux/actions"

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) {
//     return function(next) {
//         return function(actions) {
//             return next(actions)
//         }
//     }
// }

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
    )

addBtn.addEventListener('click', () => {
   store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

store.subscribe( () => {
    const state = store.getState()

    counter.textContent = state.counter
    document.body.className = state.theme.value
})

store.dispatch( {type: 'INIT_APLICATION'})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light'
    store.dispatch(changeTheme(newTheme))
    // document.body.classList.toggle('dark')
})


