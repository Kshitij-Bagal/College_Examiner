// src/components/DropboxOAuth.js
import React from 'react';
import { DropboxAuth } from 'dropbox';

const DropboxOAuth = ({ onAuth }) => {
  const handleDropboxAuth = async () => {
    const dbxAuth = new DropboxAuth({
      clientId: 'nkflbe800kdcgo8',
      fetch: window.fetch,
    });

    try {
      const authUrl = await dbxAuth.getAuthenticationUrl(
        'http://localhost:3000/Callback',
      );
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error constructing auth URL:', error);
    }
  };

  React.useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get('access_token');
    if (accessToken) {
      onAuth(accessToken);
    }
  }, [onAuth]);

  return (
    <div>
      <button onClick={handleDropboxAuth}>Authenticate with Dropbox</button>
    </div>
  );
};

export default DropboxOAuth;


