import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import type { Ticket } from '../App'

type AnalyticsProps = {
  tickets: Ticket[]
}

function Analytics({ tickets }: AnalyticsProps) {
  const total = tickets.length
  const open = tickets.filter((ticket) => ticket.status === 'Open').length
  const closed = tickets.filter((ticket) => ticket.status === 'Closed').length

  const data = [
    { name: 'Open', value: open },
    { name: 'Closed', value: closed }
  ]

  const COLORS = ['#2a6f6f', '#c93b3b']

  return (
    <div className="analytics">
      <h2>Analytics</h2>

      {/* 🔢 KEEP YOUR CARDS */}
      <div className="analytics__grid">
        <div className="analytics__card">
          <p>Total tickets</p>
          <strong>{total}</strong>
        </div>
        <div className="analytics__card">
          <p>Open tickets</p>
          <strong>{open}</strong>
        </div>
        <div className="analytics__card">
          <p>Closed tickets</p>
          <strong>{closed}</strong>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <PieChart width={350} height={350}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}

export default Analytics