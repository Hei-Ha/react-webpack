import React from 'react'

import LastTest from './lastTest.js'

class Temperature extends React.Component {
    constructor(props) {
        super(props);
    }

    // handlerUpdateTemperature = (e) => {
    //     this.props.onTemperatureChange(e.target.value)
    // }
    render() {
        // const temperature = this.props.temperature
        return (
            <div>
                <LastTest />
                {/*<fieldset>*/}
                {/*    <legend>你好</legend>*/}
                {/*    <input value={temperature} onChange={this.handlerUpdateTemperature}/>*/}
                {/*</fieldset>*/}
            </div>
        )
    }
}

export default Temperature