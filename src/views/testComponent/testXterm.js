import { Button, Card } from 'antd'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach';
import 'xterm/css/xterm.css';
import {useEffect, useState} from "react";

export function TestXterm () {
    const [inputString, setInputString] = useState('')
    useEffect(() => {
        handleClick()
    }, [])
    const handleClick = () => {
        const term = new Terminal({
            rendererType: 'canvas',
            convertEol: true,
            scrollback: 10,
            disableStdin: false,
            // cursorStyle: 'underline',
            cursorBlink: true,
            theme: {
                foreground: 'yellow',
                background: '#060101',
                cursor: 'help',
                lineHeight: 20
            },
        })

        // 创建实例
        term.open(document.getElementById('terminal'))
        // 适配continue 元素
        const fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        term.writeln('\x1b[1;1;32mwellcom to web terminal!\x1b[0m')
        const prefix = 'admin $'
        term.write(prefix)

        // 处理按键
        let str = ''
        term.onKey((e) => {
            const { key, domEvent } = e
            term.write(key)
            str = str + key
            let totalOffsetLength = str.length + prefix.length   // 光标总偏移量
            const currentOffsetLength = term._core.buffer.x // 光标当前偏移量
            console.log(totalOffsetLength)
            console.log(currentOffsetLength)


        })
    }


        return (
        <div>
            <Button type={'primary'} onClick={() => { handleClick() }}>click</Button>
            <div id="terminal"/>
        </div>
    )
}