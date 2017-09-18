import { createStore } from 'redux';
import { appReducer } from '../reducers'


/* REDUX STORE */
// Create store initializes our Redux store and only has to be called once
// The first argument is our `appReducer` defined above, it is almost like a listener
// The second is just our initial state which is just a Javascript object
// The third is usually where enhancers/middleware goes
// In this example it just loads Redux DevTools so everyone can play around
let store = createStore(appReducer, {
  items: [
    'React',
    'iten02'
  ]
}, window.devToolsExtension ? window.devToolsExtension() : undefined)

//export
export { store };
