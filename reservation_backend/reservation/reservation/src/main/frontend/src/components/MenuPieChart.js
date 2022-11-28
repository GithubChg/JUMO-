import React from 'react';
import { ResponsivePie } from '@nivo/pie'

function MenuPieChart(props) {
    const data = [
        {
          "id": "메뉴1",
          "label": "메뉴1",
          "value": props.menuNumList["메뉴1"],
          "color": "hsl(240, 70%, 50%)"
        },
        {
          "id": "메뉴2",
          "label": "메뉴2",
          "value": props.menuNumList["메뉴2"],
          "color": "hsl(150, 70%, 50%)"
        },
        {
          "id": "메뉴3",
          "label": "메뉴3",
          "value": props.menuNumList["메뉴3"],
          "color": "hsl(30, 70%, 50%)"
        },
        {
          "id": "메뉴4",
          "label": "메뉴4",
          "value": props.menuNumList["메뉴4"],
          "color": "hsl(232, 70%, 50%)"
        },
        {
          "id": "메뉴5",
          "label": "메뉴5",
          "value": props.menuNumList["메뉴5"],
          "color": "hsl(359, 70%, 50%)"
        },
        {
          "id": "메뉴6",
          "label": "메뉴6",
          "value": props.menuNumList["메뉴6"],
          "color": "hsl(359, 70%, 50%)"
        },
        {
          "id": "메뉴7",
          "label": "메뉴7",
          "value": props.menuNumList["메뉴7"],
          "color": "hsl(121, 70%, 50%)"
        },
        {
          "id": "메뉴8",
          "label": "메뉴8",
          "value": props.menuNumList["메뉴8"],
          "color": "hsl(290, 70%, 50%)"
        },
    ];

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 0, right: 100, bottom: 120, left: 100 }}
            sortByValue={true}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'blues' }}
            borderWidth={0.6}
            borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.6
                  ]
              ]
          }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={1}
            arcLinkLabelsColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.6
                  ]
              ]
          }}
            arcLabelsSkipAngle={10}
            arcLinkLabelsDiagonalLength={15}
            arcLinkLabelsStraightLength={15}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        3
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 40,
                    itemsSpacing: 0,
                    itemWidth: 50,
                    itemHeight: 15,
                    itemTextColor: '#999',
                    itemDirection: 'top-to-bottom',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    );
}

export default MenuPieChart;