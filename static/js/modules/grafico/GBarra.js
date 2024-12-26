
export function createbarra(i,values,categories,color){
    console.log(values);
    Highcharts.chart(i, {
        chart: {
          type: 'bar',
          style: {
            fontFamily: 'Montserrat'
          }
        },
        credits: {
            enabled: false
        },
        title: {
          text: '',
          style: {
            color: '#333333',
            fontSize: '20px'
          }
        },
        subtitle: {
    
          text: '',
          style: {
            color: '#666666'
          }
        },
        xAxis: {
          categories: categories,
          labels: {
            style: {
              color: '#000000',
              fontSize: '12px'
            }
          }
        },
        yAxis: {
          title: {
            text: 'Propuesta',
            style: {
              color: '#333333',
              fontSize: '12px'
            }
          },
          labels: {
            style: {
              color: '#333333',
              fontSize: '12px'
            }
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'Propuestas',
          data: values,
          color: color
        }],
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              style: {
                color: '#ffffff',
                textOutline: 'none',
                fontSize: '12px'
              }
            }
          }
        }
      });

}