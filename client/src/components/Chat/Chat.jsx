import React, { useRef, useState, useEffect } from 'react'
import styles from './Chat.module.css'

import { Button, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Chat({ socket }) {

    const bottomRef = useRef()
    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.on('receive_message', data => {
            setMessageList((current) => [...current, data])
        })

        return () => socket.off('receive_message')
    }, [socket])

    useEffect(() => {
        scrollDown()
    }, [messageList])


    const handleSubmit = () => {
        const message = messageRef.current.value
        if (!message.trim()) return
        socket.emit('message', message)
        clearInput()
        focusInput()

    }

    const clearInput = () => {
        messageRef.current.value = ''
    }

    const getEnterKey = (e) => {
        if (e.key === 'Enter')
            handleSubmit()
    }

    const focusInput = () => {
        messageRef.current.focus()
    }

    const scrollDown = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={styles.chat}>
            {
                messageList.map((message, index) => (

                    <div className={`${styles.message} ${message.authorId === socket.id && styles.my_message}`} key={index}>
                        <div className="message-author"><strong>{message.author}</strong></div>
                        <div className="message-text">{message.text}</div>
                    </div>

                ))
            }
            <div ref={bottomRef} />

            <div className={styles.send_message}>
                <Input
                    style={{
                        width: '338px',
                        height: '50px'
                    }}
                    inputRef={messageRef}
                    placeholder='Mensagem'
                    onKeyDown={(e) => getEnterKey(e)}
                />
                <Button style={{
                    borderRadius: 35,
                    backgroundColor: "#698DF5",
                    fontSize: "18px"
                }}
                    onClick={() => handleSubmit()}
                    variant="contained"
                    endIcon={<SendIcon />}
                    back >
                </Button>
            </div>
        </div >
    )
}