import React from 'react';
import ReactEchartWrapper from './ReactEchartWrapper';
import data from './CommonFunctions';


const PercentVsCategory = () => {
    const map = {};
    function groupByCategory(data) {
        data.forEach((item) => {
            let key = item.category;
            const collection = map[key];
            if (!collection) {
                map[key] = item;

            } else {
                const mergedObj = {
                    "user": collection.user + ', ' + item.user,
                    "value": collection.value + item.value, "category": item.category

                }
                map[key] = mergedObj;
                
            }

        });

        const xAxisData = Object.keys(map);
        const seriesData = [];
        xAxisData.forEach((key) => {
            seriesData.push(map[key].value);
        })

        return { xAxisData, seriesData, map };


    }

    const prepareChartData = () => {
        const obj = groupByCategory(data);
       let  option = {
            tooltip: {
                trigger: 'axis',
               
                formatter: (params) => {
                    const param = params[0];
                    const axisValue = param.axisValue;
                    const user = obj.map[axisValue].user;
                    console.log("param ", param);
                    return `<div>
                                <div>Xaxis :  ${axisValue}</div>
                                <b> <div> User and Category Value </div> </b>
                                <span> ${user} </span> : ${param.data}
                                </div> `
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: obj.xAxisData
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                }

            },
            dataZoom: [
                {
                    show: true,
                    type: 'slider',
                    bottom: '3%'
                }
            ],
            series: [
                {
                    name: 'Sample',
                    type: 'line',
                    data: obj.seriesData,

                    markLine: {
                        data: [
                            { type: 'average', name: 'Sample' }
                            
                        ],
                        lineStyle: {width:2, type: "solid"}
                    }
                }

            ]
        };

        return option;
    }
    return (
        <>
        <h1 style={{"padding-left": "40%"}}> Percent Value vs Category </h1>
            <ReactEchartWrapper
                options={prepareChartData()}
                height="300px"
            >
            </ReactEchartWrapper>
        </>
    );
}

export default PercentVsCategory;