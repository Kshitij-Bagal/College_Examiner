import React from 'react';


const Home =  ({ username, onLogout }) => {
  // const handleLogout = async () => {
  //   try {
  //     localStorage.removeItem('loggedIn');
  //     localStorage.removeItem('username');      
  //     console.log('User logged out successfully');
  //     // Add any additional logout handling logic here, like redirecting the user.
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //     alert(error.message);
  //   }
  // };

  return (
    <div>
      <h2>Welcome Home <br /> {username}</h2> 
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
