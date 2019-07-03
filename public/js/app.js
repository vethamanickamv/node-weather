const weatherForm = document.querySelector('form');
const serach = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = serach.value;

    messageOne.textContent = '';
    messageTwo.textContent = '';
    
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageTwo.textContent = data.error;
                return;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;            
        });
    });
});