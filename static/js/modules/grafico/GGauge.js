import {numeroComas} from '../extension-pr.js'

function createGauge(data,i){



    let stitle0 = "#stitle-t" + i;
    let stitle1 = "#stitle-c" + i;
    let value1 = "#value-c" + i;
    let stitle2 = "#stitle-d" + i;
    let value2 = "#value-d" + i;
    let stitle3 = "#stitle-s" + i;
    let value3 = "#value-s" + i;

    $('#chart-container'+i).html('');

    $(stitle0).html('');
    $(stitle1).html('');
    $(value1).html('');
    $(stitle2).html('');
    $(value2).html('');
    $(stitle3).html('');
    $(value3).html('');
  
    $(stitle0).html(data.stitle0);
    $(stitle1).html(data.stitle1);
    $(value1).html(numeroComas(data.value1));
    $(stitle2).html(data.stitle2);
    $(value2).html(numeroComas(data.value2));
    $(stitle3).html(data.stitle3);
    $(value3).html(numeroComas(data.value3));
   

    const dataSource = {
        chart: {
          lowerlimit: "0",
          upperlimit: "100",
          showvalue: "1",
          numbersuffix: "%",
          theme: "fusion",
          showtooltip: "0",
         bgColor: "#EBF3FF"
        
        },
        colorrange: {
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#F2726F"
            },
            {
              minvalue: "50",
              maxvalue: "75",
              code: "#FFC533"
            },
            {
              minvalue: "75",
              maxvalue: "100",
              code: "#62B58F"
            }
          ]
        },
        dials: {
          dial: [
            {
              value: data.vgauge
            }
          ]
        }
      };
      
      FusionCharts.ready(function() {
        new FusionCharts({
          type: "angulargauge",
          renderAt: "chart-container"+i,
          
          width: "280",
          height: "210",
          dataFormat: "json",
          dataSource
        }).render();
      });
          
}

export{createGauge}