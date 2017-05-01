import React, {Component} from 'react'
import './TaskAdd.css';

// In addition to using event data passed back up through props, we can
// explicitly set `ref` values on an element.  If we do so, then we also need
// to use a smart component.
// See https://facebook.github.io/react/docs/refs-and-the-dom.html for more info
class AddTask extends Component {
  // standard class constructor
  constructor () {
    super()
    // bind addNewTask to the correct scope
    this.addNewTask = this.addNewTask.bind(this)
  }

  addNewTask (event) {
    // if neither a title or description is provided, don't proceed
    if (!this.refs.title.value && !this.refs.description.value) {
      return
    }
    // create the newTask object based on the event's ref values
    const newTask = {
      // if a title or description isn't provided,
      // the other is used for both
      title: this.refs.title.value || this.refs.description.value,
      description: this.refs.description.value || this.refs.title.value
    }
    // 'cause it's a form
    event.preventDefault()
    // pass the newTask action up
    this.props.createNewTask(newTask)
    // reset new task values
    document.querySelector('#new-title').value = ""
    document.querySelector('#new-description').value = ""
  }

  render () {
    return (
      <form id="new-task" onSubmit={this.addNewTask}>
        <button type="submit" id="add-task-button">+</button>
        <div className="new-task-detail">
            <input id="new-title" ref="title" type="text"
                   placeholder="enter new task title" />
            <textarea id="new-description" ref="description" rows="3"
                      placeholder="enter new task description" />
        </div>
      </form>
    )
  }
}

export default AddTask
