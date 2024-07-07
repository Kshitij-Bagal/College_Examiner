// airtableApi.js
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'patmR9viVXmX3PJAw.71eebdadd0da2fb125650748e7e07b574b6d1a90643cb2f0baade97c33cf4c86' }).base('appmyBUPyd7QLQcwp');

export const login = async (email, password) => {
    try {
      const records = await base('Users').select({
        filterByFormula: `AND({UserMail} = '${email}', {UserPass} = '${password}')`,
      }).firstPage();
  
      if (records.length > 0) {
        const user = records[0].fields;
        return { username: user.UserName, email: user.UserMail, role: user.UserRole };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw new Error('Error logging in: ' + error.message);
    }
  };
  
  // Function to handle user signup
  export const signup = async (name, email, phone, password) => {
    try {
      const newRecord = await base('Users').create({
        UserName: name,
        UserMail: email,
        UserPhone: phone,
        UserPass: password,
        UserRole: '', // Initially blank, to be set later by admin
      });
  
      return { username: newRecord.fields.UserName, email: newRecord.fields.UserMail };
    } catch (error) {
      throw new Error('Error signing up: ' + error.message);
    }
  };