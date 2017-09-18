import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './assets/App.css';

import {connect, Provider} from 'react-redux';
import {createStore} from 'redux';
import {map} from 'lodash';

/* REACT COMPONENT */
      // Generally you would spilt this up into logical components
      // and pass props around correctly etc but we are keeping it as simply as possible
      class ListTable extends Component {
        constructor (props, context) {
          // We use the constructor to make sure our eventHandlers know of `this`
          // Otherwise they will inherit the normal event arguments
          super(props, context);
          this.addItem = this.addItem.bind(this);
          this.removeItem = this.removeItem.bind(this);
          this.editItem = this.editItem.bind(this);
        }
        /* EVENT HANDLERS */
        // They are responsible for calling `dispatch` which will send events to redux
        addItem () {
          this.props.dispatch(addItemAction())
        }
        removeItem (index) {
          this.props.dispatch(removeItemAction(index))
        }
        editItem (index, event)  {
          this.props.dispatch(editItemAction(index, event.target.value))
        }
        render () {
          // ES6 desconstruct some constants from our props
          // Short hand syntax for saying `const items = this.props.items`
          const {items, addItem} = this.props;
          // Here we essentially just want to loop over our `items` and render the appropiate html
          // Not too much going on, just take note of the `onChange` and `onClick` which
          // call the handlers above
          return (<div>
            <table>
              <tbody>
                {map(items, (item, index) => {
                  return (<tr key={index}>
                    <td><input onChange={this.editItem.bind(null, index)} type="text" value={item} /></td>
                    <td>
                      <button onClick={this.removeItem.bind(null, index)} className="delete">
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>);
                })}
              </tbody>
            </table>
            <button onClick={this.addItem} className="add">
              <i className="fa fa-plus"></i>
            </button>
            <InfoBox />
          </div>);
        }
      }
      /* IGNORE THIS */
      // Just the information that appears below the demo
      class InfoBox extends Component {
        render () {
          return (<div>
            <p className="spiel">
              Install Redux <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=en">DevTools</a> Chrome Extension to see under the hood
            </p>
          </div>);
        }
      }
      /* MAP STATE TO PROPS */
      // Probably the most important method of the demo which handles the React/Redux integration.
      // When state changes, this method is called, which then you can use to customly
      // map the state into props that your React component can use
      const mapStateToProps = (state) => {
        return {
          items: state.items,
        }
      }
      /* ACTION CREATORS */
      // Action creators allow you to communicate with the redux store
      // You always send an object with at minimum a property called `type` aka event name
      // Then send an arbitrary data alongside it
      const addItemAction = () => {
        return {
          type: 'ADD_ITEM'
        }
      }
      const removeItemAction = (index) => {
        return {
          type: 'REMOVE_ITEM',
          index: index // Index is the list item row index
        }
      }
      const editItemAction = (index, newValue) => {
        return {
          type: 'EDIT_ITEM',
          data: {
            index: index, // Index is the list item row index
            value: newValue, // Send the new value after keyboard input
          }
        }
      }

//REDUCER {removed}

//STORE {removed}



      // We want to use Redux connect to attach our mapStateToProps to our ListTable (React Component)
      const App = connect(
        mapStateToProps
      )(ListTable)


export default App;
