
// Callback.js
import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import { useLocation } from 'react-router-dom';

const Callback = () => {
  const [fileNames, setFileNames] = useState([]);
  const location = useLocation();

  const getAccessTokenFromUrl = () => {
    const hashParams = new URLSearchParams(location.hash.slice(1));
    const accessToken = hashParams.get('access_token');
    console.log('Access Token:', accessToken);
    return accessToken;
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromUrl();
    if (accessToken) {
      const dbx = new Dropbox({ accessToken });
      dbx.filesListFolder({ path: '' })
        .then(response => {
          const files = response.result.entries.map(entry => entry.name);
          console.log('Files:', files);
          setFileNames(files);
        })
        .catch(error => {
          console.error('Error fetching file names:', error);
        });
    } else {
      console.error('No access token found');
    }
  }, [location]);

  return (
    <div>
      <h2>File Names in Dropbox:</h2>
      <ul>
        {fileNames.length > 0 ? (
          fileNames.map((fileName, index) => (
            <li key={index}>{fileName}</li>
          ))
        ) : (
          <li>No files found</li>
        )}
      </ul>
    </div>
  );
};

export default Callback;
