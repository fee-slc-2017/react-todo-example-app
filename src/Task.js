import React from 'react'
import './Task.css'

// Task is the main component of this file.  It uses Status as a sub-component,
// and Status uses Completed and NotCompleted as its sub-components.
// Any data that Completed and NotCompleted need, must be passed down through
// each intermediary component
//
// NotCompleted generates the status section of incomplete tasks.
// If for some reason you need to send data other than event data to a prop,
// then the component needs to be a smart component.  Your html event can then
// call a local method (e.g. `callCompleteTask`) which can then call the desired
// props method (e.g. `this.props.completeTask` and pass it the desired
// information (e.g. `this.props.task.key`)
class NotCompleted extends React.Component {
  constructor () {
    super()
    this.callCompleteTask = this.callCompleteTask.bind(this)
  }

  callCompleteTask = (event) => {
    this.props.completeTask(this.props.task.key)
  }

  render () {
    return (
      <div className="task-status task-todo"
           onClick={key => this.callCompleteTask(key)}>
        <p>⎕</p>
      </div>
    )
  }
}

// Completed looks complicated, but that's only because we're doing a lot of
// minor date manipulation to may a pretty completed_at date-time display
// If you're doing a lot of date-time manipulation, I recommend using moment.js
const Completed = (props) => {
  const completed_at = new Date(props.task.completed_at)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[completed_at.getMonth()]
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const date = completed_at.getDate()
  const day = days[completed_at.getDay()]
  const hourRaw = completed_at.getHours().toString()
  const hour = hourRaw.length < 2 ? '0' + hourRaw : hourRaw
  const minutesRaw = completed_at.getMinutes().toString()
  const minutes = minutesRaw.length < 2 ? '0' + minutesRaw : minutesRaw
  return (
    <div className="task-status task-completed">
      <p className="completed-time">{hour}:{minutes}</p>
      <p className="completed-date">{day}, {date} {month}</p>
    </div>
  )
}

// Status determines whether to use a <Completed /> or <NotCompleted />
// subcomponent, and passes the appropriate props.
const Status = (props) => {
  const task = props.task
  if (task.completed_at) return <Completed task={task} />
  return <NotCompleted task={task}
                       completeTask={props.completeTask} />
}

// Task is a fairly straightforward stateless component.
// Ideally we wouldn't determine the status both here and in the Status
// compenent, but that's a refactor for another day.
const Task = (props) => {
  const task = props.task
  const statusClassNames = task.completed_at ?
                           "task task-completed" :
                           "task task-todo"
  return (
    <div className={statusClassNames}>
      <Status key={task.key} task={task}
              completeTask={props.completeTask} />
      <div className="task-detail">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
    </div>
  )
}

export default Task
