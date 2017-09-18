/* REDUCERS */
// Reducers listen for actions that are dispatched and react depending on your logic
// All state in Redux is immutable(never changes) so we always have to return a new
// state object.
// We are going to copy the current state and return a new one based off the action creators above
export const appReducer = (state = {items: []}, action) => {
  let items = state.items.slice(); // Nice hack to truely clone an array without reference
  // This is quite a common way of deciding which event to process
  // Note: ALL events will be coming through this reducer
  console.log('Actions', action); // Open your console to see what actions look like
  // Even better, install Redux DevTools and your mind will be blown
  switch (action.type) {
    case 'ADD_ITEM':
      items.push('') // Add an extra element to items
      break;
    case 'REMOVE_ITEM':
      items.splice(action.index, 1); // Removes element at `index`
      break;
    case 'EDIT_ITEM':
      items[action.data.index] = action.data.value; // Change value of `index` to new value
      break;
  }
  // As above, we have to return a new state object each time (Redux store is immutable)
  // It makes sure we know our data can only be modified in one visible way
  // Also lets us time travel through our application state!
  const newState = {
    items: items,
  }
  console.log('Current State', newState);
  return newState;
}
