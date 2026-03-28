import type { TicketStatus } from '../App'

type FilterBarProps = {
  filter: 'All' | TicketStatus
  search: string
  onFilterChange: (value: 'All' | TicketStatus) => void
  onSearchChange: (value: string) => void
}

function FilterBar({ filter, search, onFilterChange, onSearchChange }: FilterBarProps) {
  return (
    <label className="filter-bar">
      <span className="filter-bar__label">Filter</span>
      <select
        value={filter}
        onChange={(event) => onFilterChange(event.target.value as 'All' | TicketStatus)}
      >
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  )
}

export default FilterBar
