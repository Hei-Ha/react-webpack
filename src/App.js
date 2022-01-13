import React, { Component } from 'react'
import Clock from './views/clock.js'

class App extends Component {
    render() {
        return (
            <div>
                <p>hello hahahahhahahahahha</p>
                <Clock date={new Date()} />
            </div>
        )
    }
}

export default App