// src/utils/UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import Airtable from 'airtable';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: '',
    userRole: '',
    college: '',
    batch: '',
  });

  useEffect(() => {
    const base = new Airtable({ apiKey: 'patmR9viVXmX3PJAw.71eebdadd0da2fb125650748e7e07b574b6d1a90643cb2f0baade97c33cf4c86' }).base('appmyBUPyd7QLQcwp');
    const username = localStorage.getItem('username');
    base('Users').select({
      filterByFormula: `{UserName} = '${username}'`,
    }).firstPage().then((records) => {
      if (records.length > 0) {
        const user = records[0].fields;
        setUserData({
          username: user.UserName,
          userRole: user.UserRole,
          college: user.College,
          batch: user.Batch,
          
        });
        console.log(user.UserName);
        console.log(user.UserRole);
        console.log(user.College);
        console.log(user.Batch);
      }
    }).catch(err => console.error('Error fetching user details:', err));
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
