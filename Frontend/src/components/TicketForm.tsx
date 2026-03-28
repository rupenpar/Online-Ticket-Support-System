import { useState } from 'react'
import type { Ticket, TicketStatus, TicketType } from '../App'

const API_BASE = 'http://localhost:8080'

type TicketFormProps = {
  onCreateTicket: (ticket: Ticket) => void
}

function TicketForm({ onCreateTicket }: TicketFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TicketStatus>('Open')
  const [type, setType] = useState<TicketType>('Bug')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim() || !description.trim()) {
      alert('Title and description are required.')
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      status,
      type,
    }

    try {
      const response = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to create ticket')
      }

      const createdTicket: Ticket = await response.json()
      onCreateTicket(createdTicket)
      setTitle('')
      setDescription('')
      setStatus('Open')
      setType('Bug')
    } catch (error) {
      console.error('Error creating ticket:', error)
      alert('Unable to create ticket. Please try again.')
    }
  }

  return (
    <div className="ticket-form">
      <h2>Create a new ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form__fields">
        <label className="ticket-form__field">
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Short summary"
          />
        </label>
        <label className="ticket-form__field">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What do you need help with?"
            rows={4}
          />
        </label>
        <div className="ticket-form__row">
          <label className="ticket-form__field">
            <span>Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as TicketStatus)}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </label>
          <label className="ticket-form__field">
            <span>Type</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as TicketType)}
            >
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
            </select>
          </label>
        </div>
        <button type="submit" className="ticket-form__submit">
          Submit ticket
        </button>
      </form>
    </div>
  )
}

export default TicketForm
