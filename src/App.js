import React, { Component } from 'react'
// import Clock from './views/clock.js'
// import TestRef from './views/testComponent/ref.js'
// const ref = React.createRef();
// import TestGaoJie from "./views/testComponent/gaoJie";
// import ShowNum from './views/testComponent/showNum.js'
import { TestXterm } from "./views/testComponent/testXterm";

class App extends Component {
    render() {
        const ref = React.createRef();
        return (
            <TestXterm />
        )
    }
}

export default App