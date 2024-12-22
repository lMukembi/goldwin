import React, { useState } from "react";
import "../styles/dropdown.css";

export const InvestDropdown = () => {
  const [value, setValue] = useState("");

  const investOptions = [
    { period: "1 Day", value: 1 },
    { period: "2 Days", value: 2 },
    { period: "3 Days", value: 3 },
    { period: "4 Days", value: 4 },
  ];

  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  console.log(value);

  return (
    <div className="dropdown">
      <select onChange={handleSelect}>
        {investOptions.map((investOption, index) => (
          <>
            <option value="0">Choose Period</option>
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="4">4 Days</option>
            <option value="5">5 Days</option>
          </>
        ))}
      </select>
    </div>
  );
};

export const WalletDropdown = () => {
  const [value, setValue] = useState(1);

  const walletOptions = [
    { wallet: "Whatsapp", value: 1 },
    { wallet: "Investment", value: 2 },
    { wallet: "Academic", value: 3 },
    { wallet: "Spinning", value: 4 },
  ];

  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  console.log(value);

  return (
    <div className="dropdown">
      <select onChange={handleSelect}>
        {walletOptions.map((walletOption, index) => (
          <option value={walletOption.value} key={index}>
            {walletOption.wallet} Money
          </option>
        ))}
      </select>
    </div>
  );
};

export const TransferDropdown = () => {
  const [value, setValue] = useState(1);

  const transferOptions = [
    { account: "Account Balance", value: 1 },
    { account: "Mpesa", value: 2 },
  ];

  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  console.log(value);

  return (
    <div className="dropdown">
      <select onChange={handleSelect}>
        {transferOptions.map((transferOption, index) => (
          <option value={transferOption.value} key={index}>
            {transferOption.account}
          </option>
        ))}
      </select>
    </div>
  );
};
