// create-react-app uses App.js as the root component
// start each component by importing the necessary libraries and files
import React, { Component } from 'react'
import Rebase from 're-base'
import TaskShow from './TaskShow'
import TaskAdd from './TaskAdd'
import TaskList from './TaskList'
import './App.css'


const base = Rebase.createClass({
  apiKey: "AIzaSyCz-ryRD2FU0ZuWhTrZMsL0PAT01KEdB88",
  authDomain: "react-todo-378a2.firebaseapp.com",
  databaseURL: "https://react-todo-378a2.firebaseio.com",
  projectId: "react-todo-378a2",
  storageBucket: "react-todo-378a2.appspot.com",
  messagingSenderId: "64121003357"
}, 'react-todo-378a2');

// Keep all your state in App.js
// because it uses more than just plain HTML and props,
// the App component must be a smart component
// (i.e. a class the extends Component)
class App extends Component {
  // every class must have a constructor and start with `super()`
  constructor () {
    super()
    // this app has two main subdivisions within its state: show & tasks
    // for production purposes, we would want to leave show as it is below
    // but we would want to start the actual tasks with a blank object
    // (i.e. instead of `tasks: { 0: { key: "0"}}` etc, we'd just want
    //       `task: {},`)
    this.state = {
      show: {
        todo: true,
        done: true,
      },
      tasks: {
         0: {
           key: "0",
           title: "Rock the casba",
           description: "dance the night away",
           completed_at: "Fri Apr 28 2017 22:35:59 GMT-0600 (MDT)",
         },
         1: {
           key: "1",
           title: "Rock React",
           description: "finish react build-a-blog",
         },
         2: {
           key: "2",
           title: "Rock remaining assignnments",
           description: "finish any lingering assignments",
         },
         42: {
           key: "42",
           title: "Rock a brew",
           description: "enjoy the beverage of your choice with your colleagues at an Iron Pints",
         },
         11: {
           key: "11",
           title: "Spellcheck",
           description: "check the spelling of 'casba'",
         },
       },
    }
  }

  componentDidMount(){
    base.syncState(`todoList`, {
      context: this,
      state: 'tasks',
    });
    base.syncState(`showOptions`, {
      context: this,
      state: 'show',
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  // addTask, completeTask, toggleView, and filterTasks are all functions that
  // will modify the application's state and/or props
  // several of these functions will be passed down to lower-level components
  // as props, which can be used to pass actions back up, and thus change state
  //
  // addTask takes the current tasks from state,
  // gives the newTask a key value,
  // adds the newTask to the current tasks
  // and updates the application state with the revised tasks
  // NOTE: This makes each task an object within this.state.tasks
  //       this is better from a Firebase perspective, but makes some operations
  //       more challenging in vanilla JS.  This example app does not use any
  //       libraries to ease this.  If you want to use objects, I recommend
  //       trying out lodash (which is actually included in create-react-app).
  //       If you want to use arrays instead, it will slightly change your
  //       Firebase connection settings and _many_ of the methods in this
  //       example app (but it may be easier to reason about)
  addTask (newTask) {
    const revisedTasks = {...this.state.tasks}
    const key = "t" + Date.now()
    newTask.key = key
    revisedTasks[key] = newTask
    this.setState({tasks: revisedTasks})
  }

  // completeTask takes the key of the given task and sets the completed_at
  // value to the current date-time, then updates this.state.tasks
  // NOTE: Firebase can only take strings!  Therefore, we convert our new Date
  //       to a string, and later when we use it, we convert it back to a Date
  completeTask (key) {
    let revisedTasks = this.state.tasks
    const completed_at = (new Date()).toString()
    revisedTasks[key].completed_at = completed_at
    this.setState({tasks: revisedTasks})
  }

  // toggleView takes the event data from a sub-component's onClick and uses
  // the `event.target` data to update this.state.show filtering options
  toggleView (event) {
    const showState = this.state.show // current show state
    const type = event.target.name    // todo OR done
    const val = event.target.checked  // true OR false
    showState[type] = val             // change the sub-property, locally
    // if the current toggle would result in both options being false
    // then _also_ toggle the other options
    // thus ensuring at least one set is shown
    if (showState.todo === false && showState.done === false) {
      const altType = type === 'todo' ? 'done' : 'todo'
      showState[altType] = true
    }
    this.setState({show: showState})  // update this.state.show
  }

  // filteTasks evaluates the this.state.show filter options to determine what
  // tasks will eventually be sent down to the TaskList component as props
  filterTasks () {
    // if both this.state.show options are true, show all tasks
    if (this.state.show.todo === true && this.state.show.done === true) {
      return this.state.tasks
    }
    // otherwise, get the array of keys for tasks to show
    // NOTE: we can't `filter` on an object
    //       (we could if using a library like lodash)
    //       so first we get the keys for each task as an array
    //       (i.e. `Object.keys(this.state.tasks)`) and then map over those to
    //       determine which of the `keys` of the tasks to show
    const keys = Object.keys(this.state.tasks).filter( currentKey => {
      const task = this.state.tasks[currentKey]
      const isDone = this.state.show.done
      return (!!task.completed_at === isDone)
    })
    //        then we map over the `keys` array to create an array of tasks to
    //        show and finally we return the new array of tasks to show
    //        Using an array or lodash would make this a bit easier.
    return keys.map( currentKey => {
      return (this.state.tasks)[currentKey]
    })
  }

  // render will actually create the root node
  // We're using `<header />`, `<main />`, & `<footer />` to structure our page.
  // We're then calling the `<TaskShow />`, `<TaskList />`, & `<TaskAdd />`
  // components.  With each call, we're passing down the data that component
  // needs (e.g. `show={this.state.show}`).  The value to the left of the '='
  // will be the props key when the sub-component gets the data, while the
  // value to the right of the '=' is the data itself.
  // NOTE: when passing down functions, we have bound them to this context
  render() {
    return (
      <div id="task-app">
        <header>
          <TaskShow show={this.state.show}
                    toggleView={this.toggleView.bind(this)}/>
        </header>
        <main>
          <TaskList tasks={this.filterTasks()}
                    completeTask={this.completeTask.bind(this)} />
        </main>
        <footer>
          <TaskAdd createNewTask={this.addTask.bind(this)}/>
        </footer>
      </div>
    );
  }
}

// finally we export the component itself
export default App;
