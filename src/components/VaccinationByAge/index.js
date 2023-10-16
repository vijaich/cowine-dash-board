import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VacationByAge = props => {
  const {list} = props
  console.log(list)
  return (
    <div className="chart-container">
      <h1 className="chart-head">Vacation By Age</h1>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={list}
            startAngle={0}
            endAngle={360}
            dataKey="count"
          >
            <Cell name="Above 60" fill="#5a8dee" />
            <Cell name="18-44" fill="#64c2a6" />
            <Cell name="45-60" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VacationByAge
