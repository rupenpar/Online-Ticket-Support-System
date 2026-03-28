import type { Ticket } from '../App'
import TicketItem from './TicketItem'

type TicketListProps = {
  tickets: Ticket[]
  onDeleteTicket: (ticketId: number) => void
  onUpdateTicket: (updatedTicket: Ticket) => void
}

function TicketList({ tickets, onDeleteTicket, onUpdateTicket }: TicketListProps) {
  if (!tickets.length) {
    return <p className="ticket-list__empty">No tickets found.</p>
  }

  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          onDeleteTicket={onDeleteTicket}
          onUpdateTicket={onUpdateTicket}
        />
      ))}
    </ul>
  )
}

export default TicketList
