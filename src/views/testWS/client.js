import {useEffect, useState} from "react";
// import WebSocket from "@types/ws";

export function Client () {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(new WebSocket('ws://localhost:9000'))
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.onopen = () => {
            socket.send('Message From Client')
        }
        socket.onerror = (error) => {
            console.log(`WebSocket error: ${error}`)
        }
        socket.onmessage = (e) => {
            console.log(e.data)
            console.log('1231231')
        }
    }, [socket])

    const clientSendMsg = () => {
        socket.send('hello')
    }


    return <>
        <div>1212</div>
        <button onClick={() => { clientSendMsg() }}>click</button>
    </>
}