"use client";

import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode.react';

const App = () => {
  // Remplacez 'your-256-bit-secret' par votre clé secrète réelle
  const secretKey = 'your-256-bit-secret'; 

  // Le JWT initial doit être remplacé par votre JWT de départ.
  const initialToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkTnIiOiJWMDAyMzY0NzE2IiwiY29tSWQiOiIwYjJmNjI3MC0xNTA1LTRkN2QtOWE3My02ZWYzNzZjOWExYjQiLCJpYXQiOjE3MDI5NDE5OTUsImp0aSI6ImQ3NmM0MzQ4LTY5MjktNGZjMS05MTY1LWNiZjFhM2FlYjAzOSJ9.KyuKFIdxY8DL7JA1PuV0C09LZnnnwTW4V0lPApFaXX4';

  const [token, setToken] = useState(initialToken);

  const base64UrlEncode = (obj: any) => {
    const json = JSON.stringify(obj);
    const base64 = Buffer.from(json).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const updateTokenWithCurrentTime = () => {
    const parts = token.split('.');
    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());

    // Mettez à jour le payload avec l'heure actuelle.
    payload.iat = Math.floor(Date.now() / 1000);

    // Re-encode le header et payload sans signature
    const updatedToken = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.`;

    setToken(updatedToken);
  };

  return (
    <div className="container">
      <QRCode value={token} size={300}/>
      <button className="update-btn" onClick={updateTokenWithCurrentTime}>Mettre à jour le JWT</button>
    </div>
  );
};

export default App;
