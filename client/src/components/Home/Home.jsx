import React, { useRef } from 'react'
import io from 'socket.io-client'

import styles from './Home.module.css'

export default function Join({ setSocket, setChatVisibility }) {

    const usernameRef = useRef()

    const handlerSubmit = async () => {
        const username = usernameRef.current.value
        if (!username.trim()) return
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Chat</h1>
            <input className={styles.name} type="text" ref={usernameRef} placeholder='nome do usuario' />
            <button className={styles.enter} onClick={() => handlerSubmit()}>Entrar</button>
        </div>
    )
}