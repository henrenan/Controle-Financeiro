const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

let dummyTransactions = [
    {id: 1, name: 'Bolo de brigadeiro', amount: -20},
    {id: 2, name: 'Salario', amount: 300},
    {id: 3, name: 'Torta', amount: -10},
    {id: 4, name: 'Violão', amount: 150}
]

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount <0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')//utilizado para criar um novo elemento HTML

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name}<span>${operator} R$ ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
    </button>
    `
    
    transactionsUl.append(li)
 
}
 
const updateBalanceValues = () => {
    const transactionsAmount = dummyTransactions
        .map(transaction => transaction.amount)
    const total = transactionsAmount
        .reduce((accumulator,transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmount
        .filter(value => value > 0)
        .reduce((accumulator,value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmount.filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
    
}

const init = () => {
    transactionsUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

    const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionsAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionsAmount === ''){
        alert('Por favor preencha nome e valor da transação')
        return
    }
    const transaction = {
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionsAmount)
    }

    dummyTransactions.push(transaction)
    init()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})

//53:44