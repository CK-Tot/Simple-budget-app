const addBtn = document.querySelector('.add-btn');
const descriptionEl = document.getElementById('desc');
const amountEl = document.getElementById('amount');
const expenseEl = document.querySelector('.expense');
const typeEl = document.getElementById('type');
const listContainer = document.querySelector('.transaction-container');
const currentBalanceEl = document.querySelector('#current-balance');
const incomeEl = document.querySelector('.income');
const data = [];


addBtn.addEventListener('click', () => {
    addTransaction();
})

const renderTransaction = () => {
    listContainer.innerHTML = '';

    data.forEach(transaction => {
        const {desc, amount, type}  = transaction;
        const transactionContainer = document.createElement('div');
        transactionContainer.className = 'transaction';

        
        

        const span = document.createElement('span');
        span.className = 'transaction-desc';

        span.textContent = desc

        const amountDiv = document.createElement('div');
        amountDiv.className = 'transaction-amount';



        const transactionAmountSpan = document.createElement('span');
        transactionAmountSpan.className = 'transaction-amount';
        ;

        if (type === 'income')
        {
            transactionAmountSpan.textContent = formatCurrency(amount);
            transactionAmountSpan.style.color = '#A8DADC';
        }else {
            transactionAmountSpan.style.color = '#e94560';
            transactionAmountSpan.textContent = formatCurrency(-amount);

        }

        const delBtn = document.createElement('button');
        delBtn.className = 'del-btn';
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        delBtn.addEventListener('click', () => {
            const index = data.indexOf(transaction);
            data.splice(index, 1);
            renderTransaction();

        })

        transactionContainer.append(span, amountDiv);
        amountDiv.append(transactionAmountSpan, delBtn);

        listContainer.appendChild(transactionContainer);
    });

    updateBalance();

}

// renderTransaction()

// Add transaction function
function addTransaction() {
    let amountInput = Number(amountEl.value);
    let descInput = descriptionEl.value;
    let type = typeEl.value;

    if (!amountInput || !descInput) return;

    descInput = descInput.charAt(0).toUpperCase() + descInput.slice(1);

    data.push({desc: descInput, amount: amountInput, type: type});
    renderTransaction();



    amountEl.value = '';
    descriptionEl.value = '';

}

function formatCurrency(amount) {
   return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

// Update Balance func
function updateBalance() {
    const totalIncome = data.reduce((acc, {amount, type}) => {
        return type === 'income' ? acc + amount : acc;
    }, 0);

    const totalExpense = data.reduce((acc, {amount, type}) => {
        return type === 'expense' ? acc + amount : acc;
    }, 0);

    const balance = totalIncome - totalExpense;
   
    // update DOM
    currentBalanceEl.textContent = formatCurrency(balance);
    incomeEl.textContent = formatCurrency(totalIncome)
    expenseEl.textContent = formatCurrency(totalExpense);
    
}

