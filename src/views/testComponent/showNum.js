import React from 'react'

import MyContext from './mycontext.js'
import Temperature from './temperature.js'


class ShowNum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature1: '',
            temperature2: ''
        }
    }

    // handlerTemperatureChange1 = (val) => {
    //     this.setState({
    //         temperature1: val,
    //         temperature2: val + 1
    //     })
    // }
    // handlerTemperatureChange2 = (val) => {
    //     console.log(12)
    //     this.setState({
    //         temperature1: val - 1,
    //         temperature2: val
    //     })
    // }

    render() {
        return (
            <div>
                {/*<Temperature temperature={this.state.temperature1} onTemperatureChange={this.handlerTemperatureChange1} />*/}
                {/*<Temperature temperature={this.state.temperature2} onTemperatureChange={this.handlerTemperatureChange2} />*/}
                <MyContext.Provider value={'hahahm showNum'}>
                    <Temperature />
                </MyContext.Provider>
                <div>
                </div>
            </div>
        )
    }
}

export default ShowNum