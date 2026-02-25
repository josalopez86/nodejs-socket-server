import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";
import { Ticket } from '../../domain/interfaces/ticket';


export class TicketController{

    constructor(
        private readonly ticketService: TicketService
    ){

    }

    public getTickets =  async(req: Request, res: Response) =>{
        const tickets = this.ticketService.getTickets();
        res.json(tickets);
    }

    public getLastTicket = async(req: Request, res: Response)=>{
        const tickets = this.ticketService.getLastTicketNumber();
        res.json(tickets);
    }

    public getPendingTickets = async(req: Request, res: Response)=>{
        const tickets = this.ticketService.getPendingTickets();
        res.json(tickets);
    }

    public getWorkingOn = async(req: Request, res: Response)=>{
        const tickets = this.ticketService.getWorkingOnTickets();
        res.json(tickets);

    }

    public createTicket = async(req: Request, res: Response)=>{
        const ticket = this.ticketService.createTicket();
        res.json(ticket);
    }

    public drawTicket = async(req: Request, res: Response)=>{
        const {desk} = req.params
        const ticket = this.ticketService.drawTicket(desk);
        res.json(ticket);
    }

    public doneTicket = async(req: Request, res: Response)=>{
        const {ticketId} = req.params
        const ticket = this.ticketService.doneTicket(ticketId);
        res.json(ticket);
    }
}