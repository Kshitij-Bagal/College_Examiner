// FormUploader.js
import React, { useState, useEffect } from 'react';
import base from './airtableConfig';


const FormUploader = ({ setFormData }) => {
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const records = await base('Forms').select({
        filterByFormula: '{Publish} = TRUE()',
      }).all();

      const formattedForms = records.map(record => ({
        id: record.id,
        formName: record.fields.FormName,
        formData:  record.fields.FormData
      }));

      setFormList(formattedForms);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleSelectForm = (formData) => {

    setFormData({
      ...formData,
      formData:  formData.FormData
    });    console.log('Selected form data:', formData);
    console.log('Selected form data.formData:', formData.formData);
  };

  return (
    <div>
      <h2>Available Forms:</h2>
      {formList.length === 0 ? (
        <p>No forms available</p>
      ) : (
        <div className="form-list">
          {formList.map(form => (
            <div key={form.id} className="form-item" onClick={() => handleSelectForm(form)}>
              {form.formName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormUploader;
