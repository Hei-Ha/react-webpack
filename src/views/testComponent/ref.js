import React from 'react'

const TestRef = React.forwardRef((prop, ref) => {
    const refClick = (a) => {
        console.log(a)
    }

    return (
        <button ref={ref} onClick={refClick(ref)}>
            {prop.children}你好
        </button>
    )
})


export default TestRef