// src/utils/AirtableUploader.js
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'patmR9viVXmX3PJAw.71eebdadd0da2fb125650748e7e07b574b6d1a90643cb2f0baade97c33cf4c86' }).base('appmyBUPyd7QLQcwp');

const uploadToAirtable = async (formName, createdBy, formData,batch , college) => {
  try {
    const record = await base('Forms').create({
      FormName: formName,
      CreatedBy: createdBy,
      FormData: JSON.stringify(formData),
      Batch: batch,
      College: college,

    });
    return record;
  } catch (error) {
    console.error('Error uploading data to Airtable:', error);
    throw error;
  }
};

export default uploadToAirtable;
