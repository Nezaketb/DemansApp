import axios from 'axios';


const apiBaseUrl = 'http://172.20.10.2:5023/api/'; 

export const LoginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}Users/Login`,
      {
        email: email,
        password: password,
      },
    );

    console.log('Giriş başarılı:', response.data);

    return response.data;
  } catch (error) {
    console.error('Giriş başarısız:', error.message);
    throw error;
  }
};

export const loginCompanion = async (email, password) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}Companions/Login`,
      {
        email: email,
        password: password,
      },
    );

    console.log('Giriş başarılı:', response.data);

    return response.data;
  } catch (error) {
    console.error('Giriş başarısız:', error.message);
    throw error;
  }
};

export const RegisterUser = async (email,userName,surname,phone, password) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}Users/Register`,
      {
        email: email,
        userName:userName,
        surname:surname,
        phone:phone,
        password: password,
      },
    );

    console.log('Kayıt başarılı:', response.data);
    return true;
  } catch (error) {
    console.error('Kayıt başarısız:', error.message);
    throw error;
  }
};

export const addCompanion = async (adress,email,name,surname,phone, password,userId) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}Companions/addCompanion`,
      {
        adress:adress,
        email: email,
        name:name,
        surname:surname,
        phone:phone,
        password: password,
        userId:userId
      },
    );
    console.error('Kayıt başarılı:', response.data);
    return true;
  }
  catch (error) {
    console.error('Kayıt başarısız:', error.message);
    throw error;
  }
};


export const addLocation = async (lat,lng,userId) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}LocationInformations/addLocation`,
      {
        lat:lat,
        lng:lng,
        userId:userId
      },
    );
    console.log('Konum kaydedildi:', response);
    return true;
  }
  catch (error) {
    console.error('Kayıt başarısız:', error.message);
    throw error;
  }
};

export const addPictures = async (text, url, userId) => {
  try {
    const formData = new FormData();

    formData.append('file', {
      uri: url,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    formData.append('text', text);
    formData.append('userId', userId.toString()); 

    const response = await axios.post(`${apiBaseUrl}Pictures/addPictures`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Kayıt başarılı:', response.data);
    return true;
  } catch (error) {
    console.error('Kayıt başarısız:', error.message);
    throw error;
  }
};

export const addCommands = async (userId) => {
  try {
    const response = await axios.post(`${apiBaseUrl}Commands/addCommand/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Add command error:', error.message);
    throw error;
  }
};


export const addMedicines = async ( name,  usageDuration, usagePurpose,startDate,  endDate, afternoon, evening, moon, moonTime,  afternoonTime, eveningTime,night, nightTime, userId) => {
      try {
        const response = await axios.post(
          `${apiBaseUrl}Medicines/addMedicine`,
          {
            name:name,
            usageDuration:usageDuration,
            usagePurpose:usagePurpose,
            startDate:startDate,
            endDate,
            moon:moon,
            moonTime:moonTime,
            afternoon:afternoon,
            afternoonTime:afternoonTime,
            eveningTime:eveningTime,
            evening:evening,
            night:night,
            nightTime:nightTime,
            userId:userId
          },
        );
    console.log('Kayıt başarılı:', response.data);
    return true;
  } catch (error) {
    console.error('Kayıt başarısız:', error.message);
    throw error;
  }
};

export const getSentences = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}MotivationSentences/getAllSentences`);
    //console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getTraceOfLoves = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}TraceOfLoves/getTraceOfLoves`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const get3TraceOfLoves = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}TraceOfLoves/get3TraceOfLoves`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getAllUsers= async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}Users/getAllUsers`);
    //console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const getMedicines = async (userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}Medicines/getMedicines/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Get medicines error:', error.message);
    throw error;
  }
};

export const getLocation = async (userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}LocationInformations/getLocation/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Get medicines error:', error.message);
    throw error;
  }
};


export const getPictures = async (userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}Pictures/getPictures/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Get medicines error:', error.message);
    throw error;
  }
};