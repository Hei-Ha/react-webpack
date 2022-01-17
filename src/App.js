import React, { Component } from 'react'
import Clock from './views/clock.js'

import TestRef from './views/testComponent/ref.js'

import ShowNum from './views/testComponent/showNum.js'

class App extends Component {

    testTefClick = (a) => {
        console.log(1)
        console.log(a)
    }
    render() {
        const ref = React.createRef();
        return (
            <div>
                <p>hello </p>
                {/*<Clock date={new Date()} />*/}
                <ShowNum />
                <TestRef ref={ref} onClick={this.testTefClick(ref)}>click aaa</TestRef>
            </div>
        )
    }
}

export default App