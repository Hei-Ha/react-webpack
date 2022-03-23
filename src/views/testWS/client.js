import {useEffect, useState} from "react";
// import WebSocket from "@types/ws";

export function Client () {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        setSocket(new WebSocket('ws://localhost:9000'))
        return () => {
            socket.close();
            socket.dispose();
        };
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
            console.log('1231231')
            console.log(e.data)
        }
    }, [socket])

    const clientSendMsg = () => {
        socket.send('hello')
    }


    return <>
        <button onClick={() => { clientSendMsg() }}>click</button>
    </>
}