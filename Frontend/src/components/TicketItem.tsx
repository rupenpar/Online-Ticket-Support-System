import type { Ticket } from "../App";

type TicketItemProps = {
  ticket: Ticket;
  onDeleteTicket: (ticketId: number) => void;
  onUpdateTicket: (updatedTicket: Ticket) => void;
};

function TicketItem({
  ticket,
  onDeleteTicket,
  onUpdateTicket,
}: TicketItemProps) {
  const toggleStatus = async () => {
    const newStatus = ticket.status === "Open" ? "Closed" : "Open";

    try {
      const response = await fetch(
        `http://localhost:8080/tickets/${ticket.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            status: newStatus,
            type: ticket.type,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }

      const updatedTicket: Ticket = await response.json();
      onUpdateTicket(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Unable to update ticket");
    }
  };

  return (
    <li className="ticket-item">
      <div className="ticket-item__body">
        <div className="ticket-item__header">
          <h3>{ticket.title}</h3>
          <span
            className={`ticket-item__status ticket-item__status--${ticket.status.toLowerCase()}`}
          >
            {ticket.status}
          </span>
        </div>
        <p className="ticket-item__description">{ticket.description}</p>
        <div className="ticket-item__meta">
          <span>Type: {ticket.type}</span>
        </div>
      </div>

      <div className="ticket-item__actions">
        <button type="button" className="ticket-item__toggle" onClick={toggleStatus}>
          {ticket.status === "Open" ? "Close Ticket" : "Reopen"}
        </button>

        <button
          type="button"
          className="ticket-item__delete"
          onClick={() => onDeleteTicket(ticket.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TicketItem;
