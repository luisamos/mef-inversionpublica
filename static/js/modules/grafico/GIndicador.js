import {globalConst} from '../globalConst.js'

export function createIndicador(value,i){

    let title= "#id-title" + i;
    $(title).html(value.ct);


    let icon= "#icon-ind" + i;
    $(icon).html('<img src = "'+globalConst.PATH_IMG+'descentralizacion/'+value.icon+'" style="mix-blend-mode: multiply; width:40px;"/>' );

    let desc= "#ind-desc" + i;
    $(desc).html(value.title);

    let color_b='';

    if(value.per<50)
        color_b='#EB726F';
    else if(value.per<75)
        color_b='#EBC533';
    else
        color_b='#62B58F';

    let barra= "#ind-barra" + i;
    $(barra).html(`
    <div style="  min-width:100%;
    min-height:20px;
    background-color:#E1E1E1;">
    <div style="  width:${value.per}%;
    min-height:20px;
    background-color:${color_b};">
</div>
</div>

`);


}