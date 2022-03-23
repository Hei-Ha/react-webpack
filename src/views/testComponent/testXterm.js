import { Button, Card } from 'antd'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach';
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css';
import {useEffect, useState} from "react";


export function TestXterm () {
    const [terminal, setTerminal] = useState(null)
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        socketInit()
        terminalInit()
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
            terminal.write(e.data)
        }
        return () => {
            socket.close();
            socket.dispose();
        };
    }, [socket])

    const socketInit = () => {
        setSocket(new WebSocket('ws://localhost:9000'))
    }


    const prefix = 'admin:~$'
    const terminalInit = () => {
        const term = new Terminal({
            rendererType: 'canvas',
            convertEol: true,
            scrollback: 10,
            disableStdin: false,
            cursorBlink: true,
            theme: {
                foreground: 'yellow',
                background: '#060101',
                cursor: 'help',
                lineHeight: 20
            }
        })
        // 创建实例
        term.open(document.getElementById('terminal'))
        // 适配continue 元素
        const fitAddon = new FitAddon()
        // const attachAddon = new AttachAddon(socket)
        term.loadAddon(fitAddon)
        // term.loadAddon(attachAddon)
        // 初始化输出
        term.writeln('\x1b[1;1;32mwellcom to web terminal!\x1b[0m')
        term.write(prefix)
        setTerminal(term)
    }



    useEffect(() => {
        if (terminal) {
            handleOnKeyAction()
        }
    }, [terminal])

    /*
    *  terminal 的输入配置
    *
    * **/
    let str = ''
    const TERMINAL_INPUT_KEY = {
        BACK: 8, // 退格删除键
        ENTER: 13, // 回车键
        UP: 38, // 方向盘上键
        DOWN: 40, // 方向下键
        LEFT: 37, // 方向盘左键
        RIGHT: 39 // 方向盘右键
    }

    /**
     * 获取 偏移长度
     * */
    const getCursorOffsetLength = (offsetLength, subString) => {
        let cursorOffsetLength = ''
        for (let i = 0; i < offsetLength; i++) {
            cursorOffsetLength = cursorOffsetLength + subString
        }
        return cursorOffsetLength
    }

    // 按下回车处理方法
    let currentIndex = 0
    let inputTextList = []
    const preStrList = []
    const handleInputText = () => {
        socket.send(str.trim())
        preStrList.length = 0 // 清空上一个命令
        terminal.write(`\r\n${prefix}`)
    }

    /**
     * 自动换行
     * */
    const handleAutoWarp = () => {
        preStrList.push(str)
        terminal.write('\n')
        str = ''
    }

    // 添加键入事件
    const handleOnKeyAction = () => {
        terminal.onKey((e) => {
            const { key, domEvent } = e
            const { keyCode } = domEvent
            const totalOffsetLength = str.length + prefix.length // 总偏移量
            const currentOffsetLength = terminal._core.buffer.x // 当前 x 偏移量

            if (preStrList.length === 0) {
                switch(true) {
                    case totalOffsetLength >= terminal.cols - 1: // 总偏移量大于一行的宽度， TODO 需要换行
                        handleAutoWarp()
                        break
                    case keyCode === TERMINAL_INPUT_KEY.ENTER: // 按下回车， 需要执行命令
                        handleInputText()
                        str = ''
                        break
                    case keyCode === TERMINAL_INPUT_KEY.BACK: // 删除键
                        if (currentOffsetLength <= prefix.length) { break }
                        const currentCursorOffSetLength = getCursorOffsetLength(totalOffsetLength - currentOffsetLength, '\x1b[D') // 保留原来光标位置
                        terminal._core.buffer.x = currentOffsetLength - 1
                        terminal.write('\x1b[?K' + str.slice(currentOffsetLength - prefix.length))
                        terminal.write(currentCursorOffSetLength)
                        str = `${str.slice(0, currentOffsetLength - prefix.length - 1)}${str.slice(currentOffsetLength - prefix.length)}`
                        break
                    case keyCode === TERMINAL_INPUT_KEY.LEFT: // 左方向键
                        if (currentOffsetLength > prefix.length) {
                            terminal.write(key) // '\x1b[D'
                        }
                        break
                    case keyCode === TERMINAL_INPUT_KEY.RIGHT: // 右方向键
                        if (currentOffsetLength < totalOffsetLength) {
                            terminal.write(key) // '\x1b[C'
                        }
                        break
                    case [TERMINAL_INPUT_KEY.UP, TERMINAL_INPUT_KEY.DOWN].includes(keyCode): // 方向上键，下键
                        break
                    case currentOffsetLength < totalOffsetLength: // 无换行：当前光标位置 < 已输入内容长度之前
                        const cursorOffSetLength = getCursorOffsetLength(totalOffsetLength - currentOffsetLength, '\x1b[D') // 记录光标位置
                        terminal.write(`${key}${str.slice(-(totalOffsetLength - currentOffsetLength))}`)
                        terminal.write(cursorOffSetLength) // 将光标移动位置
                        str = str.slice(0, totalOffsetLength - currentOffsetLength - 1 ) + key + str.slice(totalOffsetLength - currentOffsetLength - 1)
                        break
                    case currentOffsetLength >= totalOffsetLength:  // 当前光标位置（x偏移量）>= 当前已经输入内容的总长度，则继续写入内容
                        // || preStrList.length > 0
                        terminal.write(key)
                        str = str + key
                        break
                }
            } else {
                switch (true) {
                    case totalOffsetLength > terminal.cols:
                        handleAutoWarp()
                        break
                    case keyCode === TERMINAL_INPUT_KEY.BACK: // 删除键
                        const currentCursorOffSetLength = getCursorOffsetLength(totalOffsetLength - currentOffsetLength, '\x1b[D') // 保留原来光标位置
                        terminal._core.buffer.x = currentOffsetLength - 1
                        terminal.write('\x1b[?K' + str.slice(currentOffsetLength - prefix.length))
                        terminal.write(currentCursorOffSetLength)
                        str = `${str.slice(0, currentOffsetLength - prefix.length - 1)}${str.slice(currentOffsetLength - prefix.length)}`
                        break
                    case keyCode === TERMINAL_INPUT_KEY.LEFT: // 左方向键
                        if (currentOffsetLength > 0) {
                            terminal.write(key) // '\x1b[D'
                        }
                        break
                    case keyCode === TERMINAL_INPUT_KEY.RIGHT: // 右方向键
                        if (currentOffsetLength < str.length) {
                            terminal.write(key) // '\x1b[C'
                        }
                        break
                    case [TERMINAL_INPUT_KEY.UP, TERMINAL_INPUT_KEY.DOWN].includes(keyCode): // 方向上键，下键
                        break
                    case preStrList.length > 0 && currentOffsetLength < str.length: // 有换行：当前光标位置 < 已输入内容长度之前
                        console.log(str)
                        const currentCursorOffSetLength3 = getCursorOffsetLength(str.length - currentOffsetLength, '\x1b[D')
                        terminal.write(`${key}${str.slice(-(str.length - currentOffsetLength))}`)
                        console.log(`${key}${str.slice(-(str.length - currentOffsetLength))}`)
                        terminal.write(currentCursorOffSetLength3) // 将光标移动位置
                        str = str.slice(0, str.length - currentOffsetLength - 1) + key + str.slice(-(str.length - currentCursorOffSetLength3))
                        break
                    default:
                        console.log(123)
                        terminal.write(key)
                        str = str + key
                        break
                }
            }

        })
    }




        return (
        <div>
            <Button type={'primary'} onClick={() => { handleClick() }}>click</Button>
            <div id="terminal"/>
        </div>
    )
}
