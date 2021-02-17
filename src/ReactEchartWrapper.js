import React from 'react';
import ReactEcharts from 'echarts-for-react';
const ReactEchartWrapper = (props) => {

    return (
        <ReactEcharts
            option={props.options}
            notMerge={true}
            lazyUpdate={true}
            style={{ height: props.height }}
            onEvents={{ 'click': (params) =>  alert(" Work in progress") }}
        />
    )
}

export default ReactEchartWrapper;