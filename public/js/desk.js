const lblPending = document.querySelector("#lbl-pending");
const btnNextTicket = document.querySelector("#btn-next-ticket");
const lblDeskName = document.querySelector("#desk-name");
const alertNoMore = document.querySelector("#no-more");
const lblWorkingWith = document.querySelector("#working-with");
const btnDoneTicket = document.querySelector("#btn-done-ticket");
const inputTicketId = document.querySelector("#ticket-id");


const searchParams = new URLSearchParams(window.location.search);

if(searchParams.has("desk"))
{
    lblDeskName.innerHTML = searchParams.get("desk");
}

function checkTicketCount(ticketCount = 0){
    lblPending.innerHTML= ticketCount;

    if(ticketCount === 0)
    {
        alertNoMore.classList.remove("d-none");
        lblPending.classList.add("d-none");
        btnNextTicket.disabled = true;
        return;
    }

    alertNoMore.classList.add("d-none");
    lblPending.classList.remove("d-none");
    btnNextTicket.disabled = false;
}


function loadInitialCount() {
    fetch('http://localhost:3000/api/ticket/pending')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error in the request');
        }
        return response.json();
    })
    .then(data => {
         checkTicketCount(data.length || 0);
        
    })
    .catch(error => {
        lblPending.innerHTML= error;
    });
}

function handleNextTicket() {
    console.log("Next");
    btnDoneTicket.disabled = false;
    const url = `http://localhost:3000/api/ticket/draw/${lblDeskName.textContent}`;
    fetch(url, {method: "POST"})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error in the request');
        }
        return response.json();
    })
    .then(data => {
        if(!data){
            lblWorkingWith.innerHTML = "";
            inputTicketId.value ="";
            checkTicketCount(0);
            return;
        }
        lblWorkingWith.innerHTML = data.number;
        inputTicketId.value = data.id;
    })
    .catch(error => {
        lblPending.innerHTML= error;
        console.error('Error:', error);
    });
}

function handleDoneTicket() {
    console.log("Done");
    btnDoneTicket.disabled = true;
    const url = `http://localhost:3000/api/ticket/done/${inputTicketId.value}`;
    fetch(url, {method: "PUT"})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error in the request');
        }
        return response.json();
    })
    .then(data => {        
        if(data){
            lblWorkingWith.innerHTML = "";
        }
    })
    .catch(error => {
        lblPending.innerHTML= error;
        console.error('Error:', error);
    });
}

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    const {type, payload} = JSON.parse(event.data);
    if(type ==="on-ticket-count-changed")
    {
        checkTicketCount(payload);
    }
  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

//init
btnNextTicket.addEventListener("click", handleNextTicket);
btnDoneTicket.addEventListener("click", handleDoneTicket);
connectToWebSockets();
loadInitialCount();