import React, { memo } from 'react'
import { Bar } from 'react-chartjs-2'

function Chart({data,options}) {
    return (
        <div>
            <Bar data={data} options={options} style={{ padding: 50 }} />
        </div>
    )
}

export default memo(Chart)
