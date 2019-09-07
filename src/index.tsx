import React from 'react'
import ReactDOM from 'react-dom'
import { AppComp } from './AppComp'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<AppComp />, document.getElementById('root'))

serviceWorker.register()
