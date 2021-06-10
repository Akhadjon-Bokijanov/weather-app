import React from 'react';
//import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar, Line } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';

// We'll use some mock data from `@visx/mock-data` for this.
//const data = letterFrequency;



// Finally we'll embed it all in an SVG
const VXGraph = ({ data }) =>{

    if(!Array.isArray(data)){
        return <div>Loading...</div>
    }

    console.log(data);
    // Define the graph dimensions and margins
    const width = window.innerWidth-40;
    const height = 200;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    // Then we'll create some bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // We'll make some helpers to get at the data we want
    // We'll make some helpers to get at the data we want
    const x = d => d.day;
    const y = d => d.temp/100;

    // And then scale the graph by our data
    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(x),
        padding: 0.4,
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(y))],
    });

    // Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => data => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);

    
    return (
        <svg 
            width={width} 
            height={height}
        
        >
            <line class="visx-line" x1="20" y1="5" x2={width-50} y2="5" fill="transparent" shape-rendering="crispEdges" stroke="#e0e0e0" stroke-width="1" height="319"></line>
            <line class="visx-line" x1="20" y1={height-55} x2={width-50} y2={height-55} fill="transparent" shape-rendering="crispEdges" stroke="#e0e0e0" stroke-width="1" height="319"></line>
            {data.map((d, i) => {
                console.log(d)
                const barHeight = yMax - yPoint(d);
                return (
                    <Group key={`bar-${i}`}>
                        
                        <Bar
                            x={xPoint(d)}
                            y={yMax - barHeight}
                            height={barHeight-15}
                            width={xScale.bandwidth()}
                            fill="rgb(250, 247, 233)"
                        />
                        <text
                            textAnchor="middle"
                            fill="rgb(245, 129, 12)"
                            style={{fontWeight: 'bold'}}
                            x={xPoint(d)+16}
                            y={i%2?"60":"40"}
                            width={xScale.bandwidth()}
                            height="20"
                        >
                            {d.temp}
                        </text>
                        <text 
                            textAnchor="middle" 
                            x={xPoint(d)+16}
                            y="160"
                            >{d.day}
                            </text>
                    </Group>
                );
            })}
        </svg>
    );
}

export default VXGraph;
