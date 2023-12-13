// > Є масив з посадами ['investor', 'manager', 'assistant', 'worker']
//
// 1. Для кожної посади створити файл в форматі .json, який заповнити рандомними даними
// 2. Зробити запит на масив з посадами і для кожної посади зробити запит на створений файл. (наприклад - manager -> manager.json)
// 3. Дані з файлів вивести в таблицю на UI
// 4. Зробити так, щоб запити були в строгій послідовності - всі посади від investor до worker (Щоб investor завжди виводився першим, worker - останнім)

const tableBody = document.querySelector('tbody');

function getAccountInfoRequest(position, callbackFn = null) {
    const connection = new XMLHttpRequest();

    connection.responseType = 'json';
    connection.open('GET', `./external_sources/${position}.json`)
    connection.send();

    connection.addEventListener('load', () => {
        const tableRow = document.createElement('tr');

        Object.values(connection.response).forEach((value) => {
            const tableData = document.createElement('td');

            tableData.textContent = String(value);
            tableRow.appendChild(tableData);
        });
        tableBody.appendChild(tableRow);

        if (callbackFn) callbackFn();
    });
}

function callbackWorker() {
    getAccountInfoRequest('worker')
}

function callbackAssistant() {
    getAccountInfoRequest('assistant', callbackWorker)
}

function callbackManager() {
    getAccountInfoRequest('manager', callbackAssistant)
}

function getPositions() {
    getAccountInfoRequest('investor', callbackManager);
}

getPositions();