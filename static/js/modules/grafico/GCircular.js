import {numeroComas} from '../extension-pr.js'

export function createCircular(value,i){

    let x = []
    x.push({
        name: "Presupuesto",
        data: [
            {
                color: "#FE6255",
                radius: "110%",
                innerRadius: "90%",
                y: parseFloat( 100 ),
                x: numeroComas(value.m_pim),
                events: {
                    mouseOver: () => {
                        $(".label-value:not(.label-pim)").css("opacity", "0.2");
                    },
                    mouseOut: () => {
                        $(".label-value").css("opacity", "1");
                     
                    }
                }
            }]
    },
        {
            name: "Certificado",
            data: [
                {
                    color: "#4E6D0A",
                    radius: "80%",
                    innerRadius: "70%",
                    y: parseFloat(value.p_cer),
                    x: numeroComas(value.m_cer),
                    events: {
                        mouseOver: () => {
                            $(".label-value:not(.label-cer)").css("opacity", "0.2");
                        },
                        mouseOut: () => {
                            $(".label-value").css("opacity", "1");
                         
                        }
                    }
                }]
        },
        {
            name: "Devengado",
            data: [
                {
                    color: "#90BD31",
                    radius: "60%",
                    innerRadius: "50%",
                    y: parseFloat(value.p_dev),
                    x: numeroComas(value.m_dev),
                    events: {
                        mouseOver: () => {
                            $(".label-value:not(.label-dev)").css("opacity", "0.2");
                        },
                        mouseOut: () => {
                            $(".label-value").css("opacity", "1");
                         
                        }
                    }
                }]
        });


    let sdev = "#p-dev" + i;
    let scer= "#p-cer" + i;
   


    $(sdev).html(value.p_dev);
    $(scer).html(value.p_cer);


        let categories=[{
        outerRadius: "110%",
        innerRadius: "90%",
        backgroundColor: "#d1c8bd",
        borderColor: null,
        borderWidth: 0
      },
      {
        // Track for Move
        outerRadius: "80%",
        innerRadius: "70%",
        backgroundColor: "#d1c8bd",
        borderColor: null,
        borderWidth: 8
      },
      {
        // Track for Exercise
        outerRadius: "60%",
        innerRadius: "50%",
        backgroundColor: "#d1c8bd",
        borderColor: null,
        borderWidth: 8
      }]



    Highcharts.chart({
        credits: false,
        chart: {
          renderTo: "grafico-circular-" + i,
          type: "solidgauge",
          margin: 0,
          padding: 0,
          backgroundColor: false
        },
        data: {
          dataRefreshRate: 1
        },
        title: false,

        tooltip: {
          borderWidth: 0,
          backgroundColor: "none",
          shadow: false,
          style: {
            fontSize: "10px",
            fontWeight: "bold",
            textAlign: "center"
          },
          useHTML: true,
          pointFormat: `<div style="text-align:center;width:100%;
          height:100%;text-shadow:-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;">
            {series.name}<br>
            <div style="text-align:center; color: {point.color}; font-weight: bold;">
              <span>{point.x}</span>
            </div>
           </div>`,
          positioner: function(labelWidth) {
            return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: this.chart.plotHeight / 2.6
            };
          }
        },

        pane: {
          startAngle: 360,
          endAngle: 0,
          background: categories
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: false
            },
            linecap: "round",
            stickyTracking: false,
            rounded: false
          }
        },
        series: x
      });

}