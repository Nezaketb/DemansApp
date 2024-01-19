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

export const LoginCompanion = async (email, password) => {
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

    console.error('Kayıt başarılı:', response.data);
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
export const addPictures = async (text,url,status,userId) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}Pictures/addPictures`,
      {
        text:text,
        url:url,
        status:status,
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
    export const addMedicines = async ( name,  usageDuration,  status, usagePurpose,startDate,  endDate, afternoon, evening, moon, moonTime,  afternoonTime, eveningTime,night, nightTime, userId) => {
      try {
        const response = await axios.post(
          `${apiBaseUrl}Medicines/addMedicines`,
          {
            name:name,
            usageDuration:usageDuration,
            status:status,
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

    console.error('Kayıt başarılı:', response.data);
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


export const getCommands = async (userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}Commands/getCommand/${userId}`);
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