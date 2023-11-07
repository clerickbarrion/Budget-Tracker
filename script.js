// captures buttons and totals
addIncomeBtn = document.getElementById('add-income')
addExpenseBtn = document.getElementById('add-expense')
incomeContainer = document.getElementById('income-container')
expenseContainer = document.getElementById('expense-container')
incomeTotal = document.getElementById('income')
expenseTotal = document.getElementById('expenses')
budgetTotal = document.getElementById('budget')
let income = 0, expense = 0, budget = 0

// adds income item and updates total and budget
addIncomeBtn.addEventListener('click', () => {
    desc = document.getElementById('income-description').value
    amount = document.getElementById('income-number').value
    if (desc && amount) {
        incomeItem = new Income(desc,amount)
        incomeItem.add()
    }
})

// adds expense item and updates total and budget
addExpenseBtn.addEventListener('click', () => {
    desc = document.getElementById('expense-description').value
    amount = document.getElementById('expense-number').value
    if (desc && amount) {
        expenseItem = new Expense(desc,amount)
        expenseItem.add()
    }
})

// budget object handling budget logic
class Budget {
    constructor(desc, amount) {
        this.desc = desc
        this.amount = amount
        this.budget = budget
    }
    // updates budget number
    updateBudget(amount){
        budget += amount
        budgetTotal.textContent = budget
        budget > 0 ? budgetTotal.style.color = '#2ecc71' : budgetTotal.style.color = '#e74c3c'
    }
}

class Income extends Budget {
    constructor(desc, amount) {
        super()
        this.desc = desc
        this.amount = amount
    }
    add(){
        let incomeContent = document.createElement('p')
        incomeContent.textContent = `${this.desc}: $${this.amount}`
        // deletes income item if clicked
        incomeContent.addEventListener('click', () => {
            this.subtract()
            incomeContent.style.transform = 'translate(-900px, 0px)'
            setTimeout(() => {incomeContent.remove()}, 2000)
        })
        incomeContainer.appendChild(incomeContent)

        income += Number(this.amount)
        incomeTotal.textContent = income
        this.updateBudget(Number(this.amount))
    }
    subtract() {
        income -= Number(this.amount)
        incomeTotal.textContent = income
        this.updateBudget(-1*Number(this.amount))
    }
}

class Expense extends Budget {
    constructor(desc, amount) {
        super()
        this.desc = desc
        this.amount = amount
    }
    add(){
        let expenseContent = document.createElement('p')
        expenseContent.textContent = `${this.desc}: $${this.amount}`
        // deletes expense item if clicked
        expenseContent.addEventListener('click', () => {
            this.subtract()
            expenseContent.style.transform = 'translate(900px, 0px)'
            setTimeout(() => {expenseContent.remove()}, 2000)
        })
        expenseContainer.appendChild(expenseContent)

        expense += Number(this.amount)
        expenseTotal.textContent = expense
        this.updateBudget(-1*Number(this.amount))
    }
    subtract(){
        expense -= Number(this.amount)
        expenseTotal.textContent = expense
        this.updateBudget(Number(this.amount))
    }
}