// src/utils/DropboxUploader.js
const uploadToDropbox = async (accessToken, formName, formData) => {
  const url = 'https://content.dropboxapi.com/2/files/upload';
  const fileName = `${formName}.json`;
  const fileContent = JSON.stringify(formData); // Ensure this is correctly set to formData
  const args = {
    path: `/${fileName}`,
    mode: 'overwrite',
    autorename: false,
    mute: false,
    strict_conflict: false
  };

  console.log('Access Token:', accessToken); // Log the access token
  console.log('File Content:', fileContent); // Log the file content
  console.log('Dropbox API Args:', args); // Log the Dropbox API arguments

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify(args),
        'Content-Type': 'application/octet-stream'
      },
      body: fileContent
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Dropbox:', errorText);
      throw new Error(`Error uploading file to Dropbox: ${errorText}`);
    }

    const data = await response.json();
    console.log('File uploaded successfully:', data); // Log successful upload data

    // Create shared link
    const sharedLinkResponse = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: data.path_lower,
        settings: {}
      })
    });

    if (!sharedLinkResponse.ok) {
      const errorDetails = await sharedLinkResponse.json();
      console.error('Error response from shared link creation:', errorDetails);
      throw new Error(`Error creating shared link: ${errorDetails.error_summary}`);
    }

    const sharedLinkData = await sharedLinkResponse.json();
    console.log('Shared link created successfully:', sharedLinkData); // Log successful shared link data
    return sharedLinkData.url;

  } catch (error) {
    console.error('Error uploading file to Dropbox:', error);
    throw error;
  }
};

export default uploadToDropbox;
