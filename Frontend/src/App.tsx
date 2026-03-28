import { useEffect, useMemo, useState } from 'react'

import './App.css'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import FilterBar from './components/FilterBar'
import Analytics from './components/Analytics'
import Pagination from './components/Pagination'

const API_BASE = 'http://localhost:8080'
const PAGE_SIZE = 4

export type TicketStatus = 'Open' | 'Closed'
export type TicketType = 'Bug' | 'Feature'

export type Ticket = {
  id: number
  title: string
  description: string
  status: TicketStatus
  type: TicketType
}

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filter, setFilter] = useState<'All' | TicketStatus>('All')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API_BASE}/tickets`)
        if (!response.ok) {
          throw new Error('Failed to fetch tickets')
        }
        const data: Ticket[] = await response.json()
        setTickets(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching tickets:', error)
        setErrorMessage('Unable to load tickets. Please try again later.')
      }
    }

    fetchTickets()
  }, [])

  const filteredTickets = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase()
    return tickets.filter((ticket) => {
      const matchesStatus = filter === 'All' || ticket.status === filter
      const matchesQuery =
        !normalizedQuery ||
        ticket.title.toLowerCase().includes(normalizedQuery) ||
        ticket.description.toLowerCase().includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [tickets, filter, search])

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE))
  const pagedTickets = filteredTickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handleCreateTicket = (newTicket: Ticket) => {
    setTickets((prevTickets) => [newTicket, ...prevTickets])
    setErrorMessage('')
    setCurrentPage(1)
  }

  const handleDeleteTicket = async (ticketId: number) => {
    try {
      const response = await fetch(`${API_BASE}/tickets/${ticketId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete ticket')
      }
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId),
      )
    } catch (error) {
      console.error('Error deleting ticket:', error)
      setErrorMessage('Unable to delete ticket. Please try again.')
    }
  }

  const handleUpdateTicket = (updatedTicket: Ticket) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket,
      ),
    )
  }

  const handleFilterChange = (value: 'All' | TicketStatus) => {
    setFilter(value)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">Online Ticket Support System</p>
        <h1 className="app__title">Support requests made simple.</h1>
        <p className="app__subtitle">
          Create, track, and close customer tickets in one clean workspace.
        </p>
      </header>

      <main className="app__main">
        <section className="app__panel">
          <TicketForm onCreateTicket={handleCreateTicket} />
        </section>

        <section className="app__panel">
          <div className="app__panel-header">
            <h2>Ticket overview</h2>
            <FilterBar
              filter={filter}
              search={search}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
          </div>
          {errorMessage ? (
            <div className="app__error">{errorMessage}</div>
          ) : null}
          <TicketList
            tickets={pagedTickets}
            onDeleteTicket={handleDeleteTicket}
            onUpdateTicket={handleUpdateTicket}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>

        <section className="app__panel">
          <Analytics tickets={tickets} />
        </section>
      </main>
    </div>
  )
}

export default App
