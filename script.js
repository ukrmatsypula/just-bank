'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.12, 250.33, -300.16, 5000.434, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2021-01-22T12:17:346.255Z',
    '2022-04-12T18:33:11.041Z',
    '2020-06-10T11:43:01.014Z',
    '2020-06-10T11:43:01.014Z',
    '2020-06-10T11:43:01.014Z',
    '2022-04-12T18:33:11.041Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2021-01-22T12:17:346.255Z',
    '2022-04-12T18:33:11.041Z',
    '2020-06-10T11:43:01.014Z',
    '2020-06-10T11:43:01.014Z',
    '2020-06-10T11:43:01.014Z',
    '2022-04-12T18:33:11.041Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2021-01-22T12:17:346.255Z',
    '2022-04-12T18:33:11.041Z',
    '2020-06-10T11:43:01.014Z',
    '2020-06-10T11:43:01.014Z',
    '2020-06-10T11:43:01.014Z',
    '2022-04-12T18:33:11.041Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2021-01-22T12:17:346.255Z',
    '2022-04-12T18:33:11.041Z',
    '2020-06-10T11:43:01.014Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2021-01-22T12:17:346.255Z',
    '2022-04-12T18:33:11.041Z',
    '2020-06-10T11:43:01.014Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);

    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();

    const transDate = `${day}/${month}/${year}`;

    const transactionRow = `
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${trans.toFixed(2)}$</div>
        </div>`;

    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

const createNicknames = function (accounts) {
  accounts.forEach(acc => {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createNicknames(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => (acc += trans));
  account.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}$`;
};

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);

  const withdrawalsTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter(interest => interest >= 5)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumIn.textContent = `${depositesTotal.toFixed(2)}$`;
  labelSumOut.textContent = `${withdrawalsTotal.toFixed(2)}$`;
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}$`;
};

const updateUI = function (account) {
  displayTransactions(account);
  displayBalance(account);
  displayTotal(account);
};

let currentAccount;

// Always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;
// Always logged in

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value.toLowerCase()
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Рады, что вы снова с нами, ${
      currentAccount.userName.split(' ')[0]
    }!`;

    const now = new Date();
    // labelDate.textContent = now;
    const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();
    labelDate.textContent = `${day}/${month}/${year}`;

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);

    containerApp.style.opacity = 1;
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт';
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value.toLowerCase();
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );

  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount?.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.nickname &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';

  labelWelcome.textContent = 'Войдите в свой аккаунт';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    currentAccount.transactions.push(loanAmount);

    currentAccount.transactionsDates.push(new Date().toISOString());
    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

let transactionsSorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();

  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
