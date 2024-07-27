const imgtObase64 = async (image) => {
    if (!image) {
      console.error('No image provided');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      console.log('Base64 Image:', reader.result); // Log base64 image directly
    };
  
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };
  
    reader.readAsDataURL(image);
  
    const imgData = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
    return imgData;
  }
  