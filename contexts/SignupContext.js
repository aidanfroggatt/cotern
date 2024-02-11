// SignupContext.js
import React, { createContext, useState } from 'react';

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SignupContext.Provider value={{ name, setName, email, setEmail, password, setPassword }}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupContext;
