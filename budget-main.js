//income class 
class income{
    constructor(name, amount, recurring){
        this.name = name
        this.amount = amount
        this.recurring = recurring
    }
}

//expense class 
class expense{
    constructor(name, amount, recurring){
        this.name = name
        this.amount = amount
        this.recurring = recurring
    }
}



// array to store all income objects 
const allIncome = []
// array to store all expense objects 
const allExpense = []




// array of raw income data 
const incomeData = [['salary', 2000, true], ['birthday gift', 100, false],['Side hustle', 200, true], ['Return on investment', 500, true],['Interest on savings', 400, false] ]

// array of raw expense data 
const expenseData = [['rent', 200, true], ['car repairs', 80, false],['Phone bill', 40, true], ['electric bill', 50, true],['shopping', 100, true] ]



//creating 5 instances of income objects
incomeData.forEach((entry, indx) => {
    allIncome.push(new income(incomeData[indx][0], incomeData[indx][1], incomeData[indx][2]))
})

//creating 5 instances of expense objects
expenseData.forEach((entry, indx) => {
        allExpense.push(new income(expenseData[indx][0], expenseData[indx][1], expenseData[indx][2]))
})


// adding a new income
function addIncome(){
    // asking for income inputs 
    let incomeName = prompt('Name of income')
    let name = incomeName ? incomeName : 'no income'
    let incomeAmt = parseInt(prompt('Amount of income'))
    let amount = incomeAmt ? incomeAmt : 0
    let incomeState = prompt('Recurring income? true or false')
    let recurring = incomeState? incomeState : false
    // pushing the new income to income list
    allIncome.push(new income(name, amount, recurring))
}

//adding a new expense
function addExpense(){
   // asking for income inputs 
    let expenseName = prompt('Name of expense')
    let name = expenseName ? expenseName : 'no income'
    let expenseAmt = parseInt(prompt('Amount of expense'))
    let amount = expenseAmt ? expenseAmt : 0
    let expenseState = prompt('Recurring expense? true or false.')
    let recurring = expenseState? expenseState : false
    // pushing the new income to income list
    allExpense.push(new expense(name, amount, recurring))
}



// get total income
function totalIncome(){
    //variable to hold sum of all income amount
    let total = 0;
    // loop array of income object and add all amount value
    allIncome.forEach(income =>{
        total += income.amount
    })
    // return total variable
    return total
    
}

// get total expense
function totalExpense(){
    //variable to hold sum of all variable amount
    let total = 0;
    // loop array of expense object and add all amount value
    allExpense.forEach(expense =>{
        total += expense.amount
    })
    // return total variable
    return total
}

// get the disposal income
function disposalIncome(){
    // minus totalExpense from totalIncome 
    return totalIncome() - totalExpense()
}


// calculate the final income
function finalDisposalIncome(){
    let saving = amount? amount : 0
    return disposalIncome() - saving;
}


//output all income 
console.log('All income entries \n',allIncome)
// ask the user for another income entry
addIncome()


//output all expense
console.log('All expense entries \n',allExpense)
// ask the user for another income entry
addExpense()

//display disposal income after expenses
console.log(`Total amount of disposal income ${disposalIncome()}`)


// show amount of income left
alert(`Disposal Income after Expense: ${disposalIncome()}`)
// get amount to save
let amount = parseFloat(prompt('How much do you want to save after expenses.')) 

//display disposal income after expenses and savings
let finalIncome = finalDisposalIncome()
console.log(`Total amount of disposal income after saving ${finalIncome}`)

//create budget to store all information about budget
const budget = {}
budget.allExpense = allExpense
budget.allIncome = allIncome
budget.totalExpense = totalExpense()
budget.totalIncome = totalIncome()
budget.disposalIncome = disposalIncome()
budget.finalDisposalIncome = finalIncome

// storage: store budget object
sessionStorage.setItem('budget information', JSON.stringify(budget))

