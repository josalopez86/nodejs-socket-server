
const lblNewTicket = document.querySelector("#lbl-new-ticket");
const btnNewTicket = document.querySelector("#btn-new-ticket");


function loadLastTicket() {
    fetch('http://localhost:3000/api/ticket/last')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error in the request');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta:', data);
        lblNewTicket.innerHTML= data;
    })
    .catch(error => {
        lblNewTicket.innerHTML= error;
        console.error('Error:', error);
    });
}

async function handleCreateNewTicket(){
    fetch('http://localhost:3000/api/ticket/',
        {
            method: 'POST'
        })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error in the request');
    }
    return response.json();
  })
  .then(data => {
    console.log('Respuesta:', data);
    lblNewTicket.innerHTML= data.number;
  })
  .catch(error => {
    lblNewTicket.innerHTML= error;
    console.error('Error:', error);
  });
}

btnNewTicket.addEventListener("click", handleCreateNewTicket);
loadLastTicket();