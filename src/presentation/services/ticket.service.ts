import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";


export class TicketService{

    public _tickets: Ticket [] = [
        { id: UuidAdapter.v4(), number:1, createdAt: new Date, done: false },
        { id: UuidAdapter.v4(), number:2, createdAt: new Date, done: false },
        { id: UuidAdapter.v4(), number:3, createdAt: new Date, done: false },
        { id: UuidAdapter.v4(), number:4, createdAt: new Date, done: false },
        { id: UuidAdapter.v4(), number:5, createdAt: new Date, done: false },
        { id: UuidAdapter.v4(), number:6, createdAt: new Date, done: false },
    ];

    private _workingOnTickets: Ticket [] = [];

    public getTickets():Ticket[]{
        return this._tickets
    }

    public getLastTicketNumber():number{
        return this._tickets.at(-1)?.number ?? 0 ;
    }

    public getPendingTickets():Ticket[]{
        return this._tickets.filter(f=> !f.handleAt);
    }

    public getWorkingOnTickets():Ticket[]{        
        return this._workingOnTickets.slice(0, 4);
    }

    public createTicket():Ticket{

        const newTicket: Ticket = {
                            number:  this.getLastTicketNumber() + 1,
                            id: UuidAdapter.v4(),
                            done: false,
                            createdAt: new Date
                           };

        this._tickets.push(newTicket);
        //TODO: call ws

        return newTicket;
    }

    public drawTicket(deskId: string): Ticket | null{
        const ticket = this._tickets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .find(f => !f.done && !f.handleAt);

        if (ticket) {
            ticket.handleAtDesk = deskId;
            ticket.handleAt = new Date;

            //TODO: CALL WS
            this._workingOnTickets.unshift({...ticket});
            return ticket;
        }

        return null;
    }

    public doneTicket(ticketId: string):boolean{
        const ticket = this._tickets.find(t => t.id === ticketId);
        if (ticket) {
            ticket.doneAt = new Date;
            ticket.done = true;
            return true;
        }

        return false;
    }

}