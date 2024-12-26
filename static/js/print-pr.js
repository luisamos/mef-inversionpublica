const svgElements = $("#page1").find(".svg-icon");
const mainElement = document.querySelector("#page1");


const svgElements2 = $("#page2").find(".svg-icon");
const mainElement2 = document.querySelector("#page2");


function swithcLoaderPrint(_sw) {
    $loaderPrint = document.querySelector('.loader__print');
    if (_sw) $loaderPrint.classList.add('displayBlock');
    else $loaderPrint.classList.remove('displayBlock');
}


$("#pdf").click(function() {
    swithcLoaderPrint(true);
    let img1;
    let img2;
    
    // formatSvgThenScreenShot("page1", mainElement).then(
    //     screenshot1 => { img1=screenshot1;}
    // );
    // formatSvgThenScreenShot("page2", mainElement2).then(
    //     screenshot1 => { img2=screenshot1;}
    // );

    const obtenerData = async () => {
        const d1 = await formatSvgThenScreenShot("page1", mainElement).then(
            screenshot1 => { img1=screenshot1;}
        );
        const d2 = await formatSvgThenScreenShot("page2", mainElement2).then(
            screenshot1 => { img2=screenshot1;}
        );
 
       imageToPdf(img1,img2).save(
        `Reporte inversión pública.pdf`
        );
        swithcLoaderPrint(false);
    }
    obtenerData();
  


});


$("#print").click(function() {
    $(document).scrollBot($(document).height());
    console.log('demo');
});


function imageToPdf(imgDataUri,imgDataUri2, outputName, page = "a3", margin = "0.5") {

    let options = {
        page: page,
        margin: margin
    }
    let pdf = new jsPDF("p", "cm", options.page, true)

 
    pdf.addImage(
        imgDataUri,
        'PNG',
        -0.8,
        0,
        pdf.internal.pageSize.getWidth() ,
        pdf.internal.pageSize.getHeight() ,
        '',
        'FAST'
    );
    pdf.addPage();
    pdf.addImage(
        imgDataUri2,
        'PNG',
        -0.8,


        0,
        pdf.internal.pageSize.getWidth() ,
        pdf.internal.pageSize.getHeight() ,
        '',
        'FAST'
    );
    
    return pdf //.save(`${outputName}.pdf`)
}

function formatSvgThenScreenShot(SVG_ELEM, SCREENSHOT_ELEMENT) {


    return new Promise((resolve, reject) => {
        let nodesToRecover = [];
        let nodesToRemove = [];

        let reportPDF1 = html2canvas(SCREENSHOT_ELEMENT, {
            scale: 1.5,
            allowTaint: false,
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY,
            onclone: function(clonedDoc) {
                let ele = clonedDoc.getElementById(SVG_ELEM);

                $(ele).css("transform", "scale(1)");
                ele.style.transform = "scale(1)";
            }
        }).then(canvas => {
            let ctx = canvas.getContext("2d");

            canvas.toBlob(function(blob) {
                nodesToRemove.forEach(function(pair) {
                    pair.parent.removeChild(pair.child);
                });

                nodesToRecover.forEach(function(pair) {
                    pair.parent.appendChild(pair.child);
                });
                //saveAs(blob, 'screenshot_'+ moment().format('YYYYMMDD_HHmmss')+'.png');
            });
            return canvas.toDataURL("image/jpeg", 2.0);
        })

      


      resolve(reportPDF1);
  
    })
}