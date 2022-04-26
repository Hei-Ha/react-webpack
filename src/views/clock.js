import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: props.date,
            res: false,
            num: 1
        }

        // this.btnClick = this.btnClick.bind(this)
    }
    // componentDidMount() 方法会在组件已经被挂载到 DOM 中后运行
    componentDidMount() {
        this.timeID = setInterval(() => {
            this.tick()
        }, 1000)

    }
    // componentWillUnmount 组件在DOM 中卸载之后与性能
    componentWillUnmount() {
        clearInterval(this.timeID)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    btnClick = () => {
        this.setState({
            res: !this.state.res
        })
        console.log(this.state.res)
    }


    render(props) {
        return (
            <div>
                <h1>Hello World</h1>
                <h2>It is {this.state.date.toLocaleString()}</h2>
                <button onClick={this.btnClick}>click</button>
            </div>
        )
    }
}
export default Clock
//1
//2