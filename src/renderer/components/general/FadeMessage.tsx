import { Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import '../../Styles/FadeMessageStyle.css';
import { useEffect, useState } from 'react';

interface FadeMsgProp {
    message: string
}
export default function FadeMessage({ message }: FadeMsgProp) {    

    // make message box fade in and out after 5 sec ...

    return (
        <div id="message-container">
            <InfoIcon sx={{ fontSize: 19, mr: 1, color: '#a9a9a9' }} />
            <Typography variant='body2'>
                <strong>{message}</strong>
            </Typography>
        </div>
    );
}