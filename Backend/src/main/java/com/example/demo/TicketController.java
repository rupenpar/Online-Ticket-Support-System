package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private List<Ticket> tickets = new ArrayList<>();
    private Long idCounter = 1L;
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {

        if (ticket.getTitle() == null || ticket.getDescription() == null) {
            throw new RuntimeException("Invalid input");
        }
        ticket.setId(idCounter++);
        tickets.add(ticket);
        return ticket;
    }
    @GetMapping
    public List<Ticket> getAllTickets() {
        return tickets;
    }
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {
        tickets.removeIf(t -> t.getId().equals(id));
    }
    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket updatedTicket) {

        for (Ticket t : tickets) {
            if (t.getId().equals(id)) {
                t.setStatus(updatedTicket.getStatus());
                return t;
            }
        }
        throw new RuntimeException("Ticket not found");
    }
}