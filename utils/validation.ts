// src/utils/validations.ts
export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) || 'Invalid email address';
  };
  
  export const validatePhoneNumber = (number: string) => {
    // A simple validation for a phone number (10+ digits)
    const re = /^\d{10,}$/;
    return re.test(number) || 'Invalid phone number';
  };
  