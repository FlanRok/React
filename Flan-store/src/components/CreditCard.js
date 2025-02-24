import React from "react";
import "./../Styles/CreditCard.css";

const formatCardNumber = (number) => {
  const formatted = number.replace(/\D/g, "").slice(0, 16);
  return formatted
    .padEnd(16, "#")
    .match(/.{1,4}/g)
    .join(" ");
};

const CreditCard = ({ cardNumber, name, expiry, cvc, focus }) => {
  return (
    <div className={`credit-card ${focus === "cvc" ? "flipped" : ""}`}>
      <div className="card-inner">
        <div className="card-front">
          <div className="card-chip"></div>
          <div className="card-number">{formatCardNumber(cardNumber || "")}</div>
          <div className="card-bottom">
            <div className="card-holder">
              <span>Имя Фамилия</span>
              <p>{name || "Иван Иванов"}</p>
            </div>
            <div className="card-expiry">
              <span>Срок</span>
              <p>{expiry}</p>
            </div>
          </div>
        </div>

        <div className="card-back">
          <div className="card-stripe"></div>
          <div className="card-cvc">
            <span>CVV</span>
            <p>{cvc || "•••"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
