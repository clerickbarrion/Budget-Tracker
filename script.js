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
        incomeItem = new Budget(desc,amount)
        incomeItem.addIncome()
    }
})

// adds expense item and updates total and budget
addExpenseBtn.addEventListener('click', () => {
    desc = document.getElementById('expense-description').value
    amount = document.getElementById('expense-number').value
    if (desc && amount) {
        expenseItem = new Budget(desc,amount)
        expenseItem.addExpense()
    }
})

// budget object handling budget logic
class Budget {
    constructor(desc, amount) {
        this.desc = desc
        this.amount = amount
        this.budget = budget
    }
    // adds income item to screen
    addIncome(){
        let incomeContent = document.createElement('p')
        incomeContent.textContent = `${this.desc}: $${this.amount}`
        // deletes income item if clicked
        incomeContent.addEventListener('click', () => {
            this.subtractIncome()
            incomeContent.style.transform = 'translate(-900px, 0px)'
            incomeContent.style.position = 'absolute'
            // incomeContent.remove()
        })
        incomeContainer.appendChild(incomeContent)

        income += Number(this.amount)
        incomeTotal.textContent = income
        this.updateBudget(Number(this.amount))
    }
    // adds expense item to screen
    addExpense(){
        let expenseContent = document.createElement('p')
        expenseContent.textContent = `${this.desc}: $${this.amount}`
        // deletes expense item if clicked
        expenseContent.addEventListener('click', () => {
            this.subtractExpense()
            expenseContent.style.transform = 'translate(900px, 0px)'
            expenseContent.style.position = 'absolute'
            // expenseContent.remove()
        })
        expenseContainer.appendChild(expenseContent)

        expense += Number(this.amount)
        expenseTotal.textContent = expense
        this.updateBudget(-1*Number(this.amount))
    }
    // updates budget number
    updateBudget(amount){
        budget += amount
        budgetTotal.textContent = budget
        budget > 0 ? budgetTotal.style.color = '#2ecc71' : budgetTotal.style.color = '#e74c3c'
    }
    // subtracts from income and updates budget
    subtractIncome() {
        income -= Number(this.amount)
        incomeTotal.textContent = income
        this.updateBudget(-1*Number(this.amount))
    }
    // subtracts from expense and updates budget
    subtractExpense(){
        expense -= Number(this.amount)
        expenseTotal.textContent = expense
        this.updateBudget(Number(this.amount))
    }
}
