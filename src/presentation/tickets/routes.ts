import { Router } from 'express';
import { TicketController } from './controller';
import { TicketService } from '../services/ticket.service';

export class TicketRoutes {


  static get routes(): Router {

    const router = Router();
    const ticketService = new TicketService();
    const ticketController = new TicketController(ticketService);
    
    router.get('/', ticketController.getTickets );
    router.get('/last', ticketController.getLastTicket );
    router.get('/pending', ticketController.getPendingTickets );
    router.get('/working-on', ticketController.getWorkingOn );

    router.post('/', ticketController.createTicket );
    router.post('/draw/:desk', ticketController.drawTicket );

    router.put('/done/:ticketId', ticketController.doneTicket );



    return router;
  }


}

