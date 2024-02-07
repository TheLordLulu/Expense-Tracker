import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:8080/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}incomes`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        try {
            console.log('Deleting income with ID:', id);
            const res = await axios.delete(`${BASE_URL}incomes/delete/${id}`);
            console.log('Income deleted successfully');
            getIncomes();
        } catch (error) {
            console.error('Error deleting income:', error);
            // Handle error (e.g., display error message to user)
        }
    }
    
    

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    const getIncomeByCategory = async (category) => {
        try {
          const response = await axios.get(`${BASE_URL}incomes/category?category=${category}`);
          setIncomes(response.data);
          console.log(response.data);
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    const updateIncome = async (id, incomeDetail) => {
        try {
          const response = await axios.put(`${BASE_URL}incomes/update/${id}`, incomeDetail);
          getIncomes();
          console.log(response.data);
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    //calculate expenses
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}expenses`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}expenses/delete/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })

        return totalExpense;
    }

    const getExpenseByCategory = async (category) => {
        try {
          const response = await axios.get(`${BASE_URL}expenses/category?category=${category}`);
          setExpenses(response.data);
          console.log(response.data);
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    const updateUser = (userData) => {
        setUser(userData);
      };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            updateIncome,
            getIncomeByCategory,
            getExpenseByCategory,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            user, 
            updateUser

        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
return useContext(GlobalContext)
};