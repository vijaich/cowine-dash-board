import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VacationCoverage = props => {
  const DataFormatter = number => {
    if (number > 10) {
      return `${(number / 10).toString()}k`
    }
    return number.toString()
  }

  const {list} = props

  return (
    <div className="chart-container">
      <h1 className="chart-head">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={list}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccine_date"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 5,
            }}
          />
          <Bar dataKey="dose_1" name="Boys" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose_2" name="Girls" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VacationCoverage
