import React from 'react';

const FormField = ({ label, name, register, required, pattern, errorMessage }) => (
  <div>
    <label>{label}:</label>
    <input {...register(name, { required, pattern })} placeholder={`Digite seu ${label.toLowerCase()}`} />
    {errorMessage && <p>{errorMessage}</p>}
  </div>
);

export default FormField;

