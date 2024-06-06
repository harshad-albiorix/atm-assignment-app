import { useMemo, useState } from "react";

export const ATMPage = () => {
  const [form, setForm] = useState({ amount: 0 });
  const [notes, setNotes] = useState([
    { price: 20, count: 0, amount: 0 },
    { price: 50, count: 0, amount: 0 },
    { price: 100, count: 0, amount: 0 },
  ]);

  const totalAmount = useMemo(
    () => notes.reduce((acc, item) => acc + item.amount, 0),
    [notes]
  );

  const handleOnChange = (e) => {
    e.preventDefault();
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const noteCount = (amount, note) => {
    let cAmount = 0;
    let count = 0;

    while (cAmount + note <= amount) {
      const newAmount = cAmount + note;

      if (amount - newAmount === 30 || amount - newAmount === 10) {
        break;
      }

      cAmount = newAmount;
      count++;
    }

    return {
      remainingAmount: amount - cAmount,
      count,
      price: note,
    };
  };

  const calculateNoOfNotesRequired = (amount) => {
    let remainingAmount = amount;
    const result = [100, 50, 20].map((note) => {
      const result = noteCount(remainingAmount, note);
      remainingAmount = result.remainingAmount;
      return result;
    });
    setNotes(
      result
        ?.map((x) => {
          return {
            price: x.price,
            count: x.count,
            amount: x.price * x.count,
          };
        })
        .reverse()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (form.amount) {
      if (+form.amount === 10 || +form.amount === 30) {
        alert("You must enter a value multiple of 10 ( except 10 and 30 )");
      } else {
        calculateNoOfNotesRequired(+form.amount);
      }
    }
  };

  return (
    <div className="h-full container">
      <h1>ATM Machine</h1>
      <form onSubmit={handleSubmit}>
        <div className="atm-container">
          <input
            placeholder="Enter amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleOnChange}
          />
          <button type="submit">Calculate</button>
        </div>
      </form>
      <p>Note: Please enter value in multiple of 10 (excluding 10 and 30).</p>
      <div className="case-container">
        {notes?.map((item, index) => (
          <div className="grid-3" key={index}>
            <span className="grid-3-item">{`No. of ${item?.price} notes: ${item?.count}`}</span>
            <span className="grid-3-item">{`${item?.price} * ${item?.count}`}</span>
            <span className="grid-3-item">{item?.amount}</span>
          </div>
        ))}
        <div className="grid-3">
          <span className="grid-3-item"></span>
          <span className="grid-3-item">Total</span>
          <span className="grid-3-item">{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};
