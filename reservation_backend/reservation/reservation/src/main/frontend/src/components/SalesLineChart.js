import React from 'react';
import { ResponsiveLine } from '@nivo/line'

function SalesLineChart(props) {
    const data = [
        {
            "id": "japan",
            "color": "#000",
            "data": [
                {
                  "x": "2014",
                  "y": 10
                },
                {
                  "x": "2015",
                  "y": 23
                },
                {
                  "x": "2016",
                  "y": 45
                },
                {
                  "x": "2017",
                  "y": 77
                },
                {
                  "x": "2018",
                  "y": 139
                },
                {
                  "x": "2019",
                  "y": 210
                },
                {
                  "x": "2020",
                  "y": 242
                },
                {
                  "x": "2021",
                  "y": 293
                },
            ]
        }
    ]
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 20, bottom: 100, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat="d"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '년도',
                legendOffset: 40,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '매출액',
                legendOffset: -50,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'category10' }}
            pointSize={10}
            pointColor={{ from: 'color', modifiers: [] }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
        />
    );
}

export default SalesLineChart;