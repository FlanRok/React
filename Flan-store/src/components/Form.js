import React, { useState } from 'react';
import '../Styles/Form.css';

const Form = () => {

  const handleSubmit = (e) => {
    alert(`Сообщение отправлено`);
  };

  return (
    <div className="form-container">

      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Свяжитесь с нами</h2> 
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Сообщение</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Form;
