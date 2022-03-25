import React from 'react'
import MyContext from './mycontext.js'

class LastTest extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <MyContext.Consumer>
                {(value) => {
                    return (
                        <div>
                            {value}
                        </div>
                    )}}
            </MyContext.Consumer>
        )
    }
}

export default LastTest


