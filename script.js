// captures buttons and totals
addIncomeBtn = document.getElementById('add-income')
addExpenseBtn = document.getElementById('add-expense')
incomeContainer = document.getElementById('income-container')
expenseContainer = document.getElementById('expense-container')
incomeTotal = document.getElementById('income')
expenseTotal = document.getElementById('expenses')
budgetTotal = document.getElementById('budget')
var income = 0, expense = 0, budget = 0

// adds income item and updates total and budget
addIncomeBtn.addEventListener('click', () => {
    desc = document.getElementById('income-description').value
    amount = document.getElementById('income-number').value
    // validates if fields are empty
    if (desc && amount) {
        incomeItem = new Income(desc,amount)
        incomeItem.add()
    }
})

// adds expense item and updates total and budget
addExpenseBtn.addEventListener('click', () => {
    desc = document.getElementById('expense-description').value
    amount = document.getElementById('expense-number').value
    // validates if fields are empty
    if (desc && amount) {
        expenseItem = new Expense(desc,amount)
        expenseItem.add()
    }
})

// budget object handling budget logic
class Budget {
    constructor(desc, amount) {
        this.desc = desc
        this.amount = Number(amount)
    }
    // updates budget number
    updateBudget(amount){
        budget = this.animateNum(budget,budgetTotal,amount)
        // red if negative green if positive
        budget > 0 ? budgetTotal.style.color = '#2ecc71' : budgetTotal.style.color = '#e74c3c'
    }
    // creates income/expense item
    createItem(typeContainer,px){
        let content = document.createElement('p')
        content.textContent = `${this.desc}: $${this.amount}`
        // deletes item if clicked
        content.addEventListener('click', () => {
            this.subtract()
            content.style.transform = `translate(${px}px, 0px)`
            setTimeout(() => {content.remove()}, 2000)
        })
        typeContainer.appendChild(content)
    }
    // animates the numbers
    animateNum(type, typeTotal, amount){
        // original number
        let num = type
        // final number
        type += amount
        // animates numbers changing every 20ms until final amount reached
        let numUp = setInterval(() => {
            // formula for increasing
            if (type < num) {
                num -= Math.abs(type/100) + 10
                typeTotal.textContent =  Number(num.toFixed(2))
                // stops when final amount reached
                if (num <= type ){
                    clearInterval(numUp)
                    // fixes overflow
                    typeTotal.textContent = Number(type.toFixed(2))
                }
            // formula for decreasing
            } else if (type > num) {
                num += Math.abs(type/100) + 10
                typeTotal.textContent = Number(num.toFixed(2))
                // stops when final amount reached
                if (num >= type ){
                    clearInterval(numUp)
                    // fixes overflow
                    typeTotal.textContent = Number(type.toFixed(2))
                }
            }
        }, 20);
        // returns new income/expense/budget value
        return type
    }
}
// class for income
class Income extends Budget {
    constructor(desc, amount) {
        super()
        this.desc = desc
        this.amount = Number(amount)
    }
    // adds income and updates budget
    add(){
        this.createItem(incomeContainer,-900)
        income = this.animateNum(income,incomeTotal,this.amount)
        this.updateBudget(this.amount)
    }
    // subtracts income and updates budget
    subtract() {
        income = this.animateNum(income,incomeTotal,-1*this.amount)
        this.updateBudget(-1*this.amount)
    }
}
// class for expense
class Expense extends Budget {
    constructor(desc, amount) {
        super()
        this.desc = desc
        this.amount = Number(amount)
    }
    // adds expense and updates budget
    add(){
        this.createItem(expenseContainer,900)
        expense = this.animateNum(expense,expenseTotal,this.amount)
        this.updateBudget(-1*this.amount)
    }
    // subtracts expense and updates budget
    subtract(){
        expense = this.animateNum(expense,expenseTotal,-1*this.amount)
        this.updateBudget(this.amount)
    }
}