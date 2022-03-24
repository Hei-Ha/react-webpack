import React from 'react'
class TestGaoJie extends React.Component {
    constructor(props) {
        super()
        this.state = {
            testContent: 1
        }
    }

    testaaa = () => {
        this.setState({
            testContent: 4
        })
    }
    render() {
        return (
            <div onClick={this.testaaa}>
                {this.state.testContent}
            </div>
        )
    }
}



function logProps(WrappedComponent) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }

        render() {
            const { forwardedRef, ...rest } = this.props
            return <WrappedComponent ref={forwardedRef} {...rest}  />;
        }

    }

    return React.forwardRef((props, ref) => {
        return <LogProps forwardedRef={ref} {...props} />
    })
}

export default logProps(TestGaoJie)