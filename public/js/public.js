const lblTickets = document.querySelectorAll(".ticket-number");
const lblDesks = document.querySelectorAll(".desk-name");


function getInitTickets() {    
    const url = `http://localhost:3000/api/ticket/working-on`;
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error in the request');
        }
        return response.json();
    })
    .then(data => {
        if(data){
            for (let i = 0; i < data.length; i++) {
                lblTickets[i].innerHTML = data[i].number;
                lblDesks[i].innerHTML = data[i].handleAtDesk;                
            }            
        }
    })
    .catch(error => {
        lblTickets[0].innerHTML= error;
        console.error('Error:', error);
    });
}

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    const {type, payload} = JSON.parse(event.data);
    if(type ==="on-ticket-count-changed")
    {
        getInitTickets();
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


getInitTickets();
connectToWebSockets();