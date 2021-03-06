const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
const reset = document.querySelector("reset")

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : [] 

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()
} 

const addTransactionIntoDOM =({ amount, name, id }) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount <0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')//utilizado para criar um novo elemento HTML

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${name}<span>${operator} R$ ${Math.abs(amount)}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>`
    
    transactionsUl.append(li)
 
}

const getExpenses = transactionsAmount => Math.abs(transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmount => transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator,value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmount => transactionsAmount
    .reduce((accumulator,transaction) => accumulator + transaction, 0)
    .toFixed(2)

 
const updateBalanceValues = () => {
    const transactionsAmount = transactions.map(({ amount })=> amount)
    const total = getTotal(transactionsAmount)
    const income = getIncome (transactionsAmount)
    const expense = getExpenses(transactionsAmount)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
    
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions)) 
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionsAmount) => {
    transactions.push({
        id: generateID(), 
            name: transactionName, 
            amount: Number(transactionsAmount)

    })
}

const cleanInuts = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
        event.preventDefault()
    
        const transactionName = inputTransactionName.value.trim()
        const transactionsAmount = inputTransactionAmount.value.trim()
        const isSomeInputEmpty = transactionName === '' || transactionsAmount === ''
    
        if (isSomeInputEmpty){
            alert('Por favor preencha nome e valor da transa????o')
            return
        }
        
        addToTransactionsArray(transactionName, transactionsAmount)
        init()
        updateLocalStorage()
        cleanInuts()
    
        
    }

form.addEventListener('submit', handleFormSubmit)