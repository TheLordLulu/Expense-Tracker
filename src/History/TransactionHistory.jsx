import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { useState } from "react";
import Loader from '../components/Loader/FullPageLoader';
import {
  money,
  freelance,
  stocks,
  bitcoin,
  card,
  yt,
  piggy,
  book,
  food,
  medical,
  tv,
  takeaway,
  clothing,
  circle,
} from '../utils/Icons';

function TransactionHistory() {
    const { transactionHistory, getIncomes, getExpenses, getIncomeByCategory, getExpenseByCategory } = useGlobalContext();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [loading, setLoading] = useState(true);
  
    const history = transactionHistory();
  
    useEffect(() => {
     
      getIncomes();
      getExpenses();
      setLoading(false);
    }, []);
  
    const categoryIcon = (category) => {
      switch (category) {
        case 'salary':
          return money;
        case 'freelancing':
          return freelance;
        case 'investments':
          return stocks;
        case 'stocks':
          return stocks;
        case 'bitcoin':
          return bitcoin;
        case 'bank':
          return card;
        case 'youtube':
          return yt;
        case 'other':
          return piggy;
        default:
          return '';
      }
    };
  
    const expenseCatIcon = (category) => {
      switch (category) {
        case 'education':
          return book;
        case 'groceries':
          return food;
        case 'health':
          return medical;
        case 'subscriptions':
          return tv;
        case 'takeaways':
          return takeaway;
        case 'clothing':
          return clothing;
        case 'travelling':
          return freelance;
        case 'other':
          return circle;
        default:
          return '';
      }
    };
  
    const handleCategoryChange = (e) => {
      const category = e.target.value;
      setSelectedCategory(category);
      if (transactionType === 'income') {
        if (category === '') {
          getIncomes();
        } else {
          getIncomeByCategory(category);
        }
      } else if (transactionType === 'expense') {
        if (category === '') {
          getExpenses();
        } else {
          getExpenseByCategory(category);
        }
      }
    };
  
    const handleTransactionTypeChange = (e) => {
  const type = e.target.value;
  setTransactionType(type);
  setSelectedCategory('');
  
  if (type === 'income') {
    getIncomes();
  } else if (type === 'expense') {
    getExpenses();
  }
};
  
    if (loading) {
      return <Loader bg="white" />;
    }
  
    return (
      <HistoryStyled>
        <h2>Transaction History</h2>
        <div className="filters">
          <div className="transaction-type">
            <label>
              <input
                type="radio"
                name="transactionType"
                value="income"
                checked={transactionType === 'income'}
                onChange={handleTransactionTypeChange}
              />
              Income
            </label>
            <label>
              <input
                type="radio"
                name="transactionType"
                value="expense"
                checked={transactionType === 'expense'}
                onChange={handleTransactionTypeChange}
              />
              Expense
            </label>
          </div>
          <div className="category-dropdown">
            <label htmlFor="category">Category:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All</option>
              {transactionType === 'income' ? (
                <>
                  <option value="salary">Salary</option>
                  <option value="freelancing">Freelancing</option>
                  <option value="investments">Investments</option>
                  <option value="stocks">Stocks</option>
                  <option value="bitcoin">Bitcoin</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="youtube">Youtube</option>
                  <option value="other">Other</option>
                </>
              ) : (
                <>
                  <option value="education">Education</option>
                  <option value="groceries">Groceries</option>
                  <option value="health">Health</option>
                  <option value="subscriptions">Subscriptions</option>
                  <option value="takeaways">Takeaways</option>
                  <option value="clothing">Clothing</option>
                  <option value="travelling">Travelling</option>
                  <option value="other">Other</option>
                </>
              )}
            </select>
          </div>
        </div>
        <div className="history-items">
          {history.map((item) => {
            const { id, title, amount, type, category } = item;
            return (
              <div key={id} className={`history-item ${type}`}>
                <div className="icon">{type === 'income' ? categoryIcon(category) : expenseCatIcon(category)}</div>
                <div className="details">
                  <p>{title}</p>
                  <p>{type === 'income' ? `+${amount}` : `-${amount}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </HistoryStyled>
    );
  }
  
  const HistoryStyled = styled.div`
    text-align: center;
  
    .filters {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .transaction-type {
      margin-right: 2rem;
      input[type='radio'] {
        margin-right: 0.5rem;
      }
      label {
        padding: 4px;
      }
    }
  
    .category-dropdown {
      label {
        margin-right: 0.5rem;
      }
      select {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
        cursor: pointer;
      }
    }
  
    .history-items {
      display: grid;
      gap: 1rem;
      justify-content: center;
      .history-item {
        display: flex;
        align-items: center;
        background: #fcf6f9;
        padding: 1rem;
        border-radius: 20px;
        max-width: 400px;
        margin: 0 auto;
        &.income {
          border: 2px solid green;
        }
        &.expense {
          border: 2px solid red;
        }
        .icon {
          margin-right: 1rem;
        }
        .details {
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          p {
            margin: 0;
          }
        }
      }
    }
  `;
  
  export default TransactionHistory;
