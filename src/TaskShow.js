import React from 'react'

// Since the ShowTask component is only using basic html and props, we can use
// a stateless function instead of a full-blown class.
// NOTE: We must pass `props` to the stateless component, and we will then
//       reference values from that parameter
//       (e.g. `props.show.todo` instead of `this.props.show.todo`)
// NOTE: To pass actions but up, we simply need to assign the appropriate event
//       (e.g. `onChange={props.methodFromParentComponent}`).  When this event
//       happens the event data itself will be sent as a parameter of the method
//       and will be available to the called method (e.g. the name of each input
//       field below is passed as part of the event data, as is the type, value
//       etc.).
//       See https://facebook.github.io/react/docs/events.html and
//       https://facebook.github.io/react/docs/handling-events.html
//       for more info
const ShowTask = (props) => {
    return (
      <span id="show-tasks">
        <p>Show:
          &nbsp;
          <label>
            <input type='checkbox' name='todo'
                   checked={props.show.todo}
                   onChange={props.toggleView} />
            TODOS
          </label>
          &nbsp;&nbsp;
          <label>
            <input type='checkbox' name='done'
                   checked={props.show.done}
                   onChange={props.toggleView} />
            DONE
          </label>
        </p>
      </span>
    )
  }

export default ShowTask
