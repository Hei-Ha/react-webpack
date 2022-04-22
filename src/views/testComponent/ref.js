import React from 'react'

const TestRef = React.forwardRef((prop, ref) => {

    return (
        <button ref={ref}>
            {prop.children}你好
        </button>
    )
})


function logProps(WrappedComponent) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log(12)
            // console.log('old props:', prevProps);
            // console.log('new props:', this.props);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return LogProps;
}

export default logProps(TestRef)

// nhaha