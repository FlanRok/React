import React, { useState } from "react";
import CreditCard from "./CreditCard";
import MapPicker from "./MapPicker";
import "./../Styles/Order.css";

const validateCardNumber = (number) => {
  const regex = /^[0-9]{16}$/;
  return regex.test(number);
};

const validateCvc = (cvc) => {
  const regex = /^[0-9]{3}$/;
  return regex.test(cvc);
};
const validateName = (name) => {

  const regex = /^[A-Za-zА-Яа-яЁё\s]+$/;
  return regex.test(name);
};

const validateEmail = (email) => {

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};


const Order = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvcError, setCvcError] = useState("");
  
  const handleOrder = () => {
    if (!address.trim()) {
      alert("Введите адрес доставки.");
      return;
    }

    const orderData = `
    Заказ оформлен!
    
      Покупатель:
    - Имя: ${name}
    - Email: ${email}
  
      Данные карты:
    - Владелец: ${cardName}
    - Номер: ${cardNumber.replace(/\d{12}(\d{4})/, "**** **** **** $1")} 
    - Срок действия: ${expiryMonth}/${expiryYear}
    - CVV: ***
  
      Адрес доставки:
    - ${address}
    `;

    alert(orderData);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!validateName(name)) {
        alert("Имя должно содержать только буквы и пробелы.");
        return;
      }
      if (!validateEmail(email)) {
        alert("Введите корректный email.");
        return;
      }
    }

    if (step === 2) {
      if (!validateCardNumber(cardNumber)) {
        setCardNumberError("Неверный номер карты. Введите 16 цифр.");
        return;
      } else {
        setCardNumberError("");
      }

      if (!expiryMonth || !expiryYear) {
        setExpiryError("Выберите дату истечения карты.");
        return;
      } else {
        setExpiryError("");
      }

      if (!validateCvc(cvc)) {
        setCvcError("Неверный CVV. Введите 3 цифры.");
        return;
      } else {
        setCvcError("");
      }
    }

    if (step === 3 && !address.trim()) {
      alert("Введите адрес доставки.");
      return;
    }

    setStep(step + 1);
  };


  const prevStep = () => setStep(step - 1);

  const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
  const years = Array.from({ length: 5 }, (_, index) => (new Date().getFullYear() + index).toString());

  return (
    <div className="order-container">
      {step === 1 && (
        <div className="form-container">
          <h2>Шаг 1: Информация о покупателе</h2>
          <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocus("name")} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocus("email")} />
          <button onClick={nextStep}>Далее</button>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="credit-container">
            <div className="credit-card-container">
              <CreditCard cardNumber={cardNumber} name={cardName} expiry={`${expiryMonth}/${expiryYear}`} cvc={cvc} focus={focus} />
            </div>

            <div className="form-container">
              <h2>Шаг 2: Данные карты</h2>
              <input
                type="text"
                placeholder="Владелец карты"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                maxLength={24}
                onFocus={() => setFocus("name")}
              />
              <input
                type="text"
                placeholder="Номер карты"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                onFocus={() => setFocus("number")}
              />
              {cardNumberError && <p className="error">{cardNumberError}</p>}
              <div className="form-row">
                <select value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)} onFocus={() => setFocus("expiry")}>
                  <option value="">Месяц</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <select value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} onFocus={() => setFocus("expiry")}>
                  <option value="">Год</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {expiryError && <p className="error">{expiryError}</p>}

                <input
                  type="text"
                  placeholder="CVV"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength="3"
                  onFocus={() => setFocus("cvc")}
                />
                {cvcError && <p className="error">{cvcError}</p>}
              </div>
              <button onClick={prevStep}>Назад</button>
              <button onClick={nextStep}>Далее</button>
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="form-container">
          <h2>Шаг 3: Адрес доставки</h2>
          <input type="text" placeholder="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
          <MapPicker setAddress={setAddress} />
          <button onClick={prevStep}>Назад</button>
          <button onClick={handleOrder}>Оформить</button>
        </div>
      )}
    </div>
  );
};

export default Order;