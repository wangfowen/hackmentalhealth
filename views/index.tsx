import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Card, CardHeader, CardTitle} from 'react-mdc-web/lib';


class App extends React.Component<{}, {}> {
  render() {
    return (
       <Card style={{width: '100%'}}>
          <CardHeader>
            <CardTitle>
              Hello world!
            </CardTitle>
          </CardHeader>
        </Card>
    )
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