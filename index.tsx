import * as React from 'react'
import * as ReactDOM from 'react-dom'

class App extends React.Component<{}, {}> {
  render() {
    return <div>
      Hello World!
    </div>
  }
}

let root: HTMLElement | null = null
function init() {
  root = document.createElement('div')
  document.body.appendChild(root)
  ReactDOM.render(<App />, root)
}

if ((module as any).hot) {
  (module as any).hot.dispose(() => {
    if (root) {
      document.body.removeChild(root)
    }
  })
}

init()