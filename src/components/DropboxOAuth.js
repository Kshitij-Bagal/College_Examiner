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



// const DropboxOAuth = () => {
//   const handleDropboxAuth = async () => {
//     const dbxAuth = new DropboxAuth({ clientId: 'nkflbe800kdcgo8' });
//     try {
//       const authUrl = await dbxAuth.getAuthenticationUrl('http://localhost:3000/Callback');
//       window.location.href = authUrl;
//     } catch (error) {
//       console.error('Error constructing auth URL:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleDropboxAuth}>Authenticate with Dropbox</button>
//     </div>
//   );
// };

// export default DropboxOAuth;



// import React, { useEffect } from 'react';
// import { Dropbox } from 'dropbox';

// const DROPBOX_APP_KEY = 'nkflbe800kdcgo8';
// const REDIRECT_URI = 'http://localhost:3000/dropbox-auth-finish';

// const DropboxOAuth = () => {
//   useEffect(() => {
//     const finishDropboxAuth = async () => {
//       const dbx = new Dropbox({ clientId: DROPBOX_APP_KEY });
//       const accessToken = await dbx.auth.getAccessTokenFromCode(window.location.href);
//       localStorage.setItem('dropboxAccessToken', accessToken.result.access_token);
//       window.location.href = '/';
//     };

//     if (window.location.pathname === '/dropbox-auth-finish') {
//       finishDropboxAuth();
//     }
//   }, []);

//   const handleDropboxAuth = () => {
//     const dbx = new Dropbox({ clientId: DROPBOX_APP_KEY });
//     const authUrl = dbx.getAuthenticationUrl(REDIRECT_URI);
//     window.location.href = authUrl;
//   };

//   return (
//     <div>
//       <button onClick={handleDropboxAuth}>Connect to Dropbox</button>
//     </div>
//   );
// };

// export default DropboxOAuth;
