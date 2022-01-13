import React, { Component } from 'react'
import Clock from './views/clock.js'

import ShowNum from './views/testComponent/showNum.js'

class App extends Component {
    render() {
        return (
            <div>
                <p>hello </p>
                <Clock date={new Date()} />
                <ShowNum />
            </div>
        )
    }
}

export default App