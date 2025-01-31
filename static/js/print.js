const svgElements = $("#a3").find(".svg-icon");
const mainElement = document.querySelector("#a3");

function swithcLoaderPrint(_sw) {
    $loaderPrint = document.querySelector('.loader__print');
    console.log(_sw);
    if (_sw) $loaderPrint.classList.add('displayBlock');
    else $loaderPrint.classList.remove('displayBlock');
}
$("#pdf").click(function() {
    swithcLoaderPrint(true);

    formatSvgThenScreenShot(svgElements, mainElement).then(
        screenshot => {
            imageToPdf(screenshot).save(
                `Reporte inversión pública.pdf`
            );
            swithcLoaderPrint(false);
        }
    );
});


$("#print").click(function() {
    //$(document).scrollBot($(document).height());

    //var scrollPosition = $(document).scrollTop();
    //console.log('demo');
    window.print();
});


function imageToPdf(imgDataUri, outputName, page = "a3", margin = "0.5") {
    let options = {
        page: page,
        margin: margin
    }
    let pdf = new jsPDF("p", "cm", options.page, true)

    pdf.addImage(
        imgDataUri,
        'PNG',
        -0.95,
        0,
        pdf.internal.pageSize.getWidth() ,
        pdf.internal.pageSize.getHeight() ,
        '',
        'FAST'
    )

    return pdf //.save(`${outputName}.pdf`)
}

function formatSvgThenScreenShot(SVG_ELEM, SCREENSHOT_ELEMENT) {


    return new Promise((resolve, reject) => {
        let nodesToRecover = [];
        let nodesToRemove = [];



        let reportPDF = html2canvas(SCREENSHOT_ELEMENT, {
            scale: 1.5,
            allowTaint: false,
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY,
            onclone: function(clonedDoc) {
                let ele = clonedDoc.getElementById("a3");

                
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

        resolve(reportPDF)
    })
}