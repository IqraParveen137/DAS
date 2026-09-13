import React from 'react';

const inputForm = ({
  label,
  inputType,
  value,
  setValue,
  disabled,
  placeholder,
}) => {
  return (
    <div className='mb-3'>
      <label htmlFor=' ' className='form-label'>
        {label}
      </label>
      <input
        type={inputType || 'text'}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className='form-control'
        disabled={disabled}
      />
    </div>
  );
};

export default inputForm;
