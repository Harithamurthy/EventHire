import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, TextField, Paper, Avatar, Divider, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { io } from 'socket.io-client';

// Replace with your backend URL
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:5000';

const ChatWidget = ({ open, onClose, user, recipient }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    socketRef.current = io(SOCKET_SERVER_URL, { query: { userId: user?._id } });

    // Fetch existing messages (optional, REST fallback)
    fetch(`/api/chat/${recipient._id}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data.messages || []);
        setLoading(false);
      });

    // Listen for incoming messages
    socketRef.current.on('chatMessage', msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [open, recipient._id, user?._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = {
      sender: user,
      recipient: recipient,
      text: input,
      createdAt: new Date().toISOString(),
    };
    socketRef.current.emit('chatMessage', msg);
    setMessages(prev => [...prev, msg]);
    setInput('');
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 340,
        maxHeight: 500,
        display: open ? 'flex' : 'none',
        flexDirection: 'column',
        zIndex: 1400,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#1976d2' }}>
        <Avatar src={recipient.avatar} sx={{ mr: 1 }}>{recipient.name?.[0]}</Avatar>
        <Typography variant="h6" color="white" sx={{ flexGrow: 1 }}>
          Chat with {recipient.name}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                flexDirection: msg.sender._id === user._id ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                mb: 1.2,
              }}
            >
              <Avatar src={msg.sender.avatar} sx={{ width: 28, height: 28, mx: 1 }}>
                {msg.sender.name?.[0]}
              </Avatar>
              <Box
                sx={{
                  bgcolor: msg.sender._id === user._id ? '#1976d2' : '#e0e0e0',
                  color: msg.sender._id === user._id ? 'white' : 'black',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: '65%',
                  fontSize: 15,
                  boxShadow: 1,
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5 }}>
        <TextField
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          size="small"
          sx={{ flex: 1, mr: 1 }}
        />
        <IconButton color="primary" onClick={sendMessage} disabled={!input.trim()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWidget;
