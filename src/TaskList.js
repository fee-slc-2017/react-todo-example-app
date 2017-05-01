import React from 'react'
import Task from './Task'

// The TaskList component simply loops over the tasks object that it receives
// and creates a new Task sub-component for each task
// Note: Again, because our this.state.tasks is an object, we need to use
//       `Object.keys(props.tasks)` to iterate over each task.  We could have
//       used an array instead or the lodash library.  See App.js for additional
//       comments on this topic.
// See TaskShow for additional comments on the stateless component and passing
// info as props.
const TaskList = (props) => {
  return (
    <div>
      {Object.keys(props.tasks).map(key => {
        return <Task key={key} task={props.tasks[key]}
                     completeTask={props.completeTask.bind(this)} />
      })}
    </div>
  )
}

export default TaskList
