 let html='<span class="no-drag">Cesium实验室</span>'
html+=   '<div class="toolbar no-drag">'
 html+=    '<svg class="icon" aria-hidden="true" onclick="changeWindow(\'setting\')">'
 html+='<use xlink:href="#icon-setting"></use>'
 html+='</svg>'

 html+='<svg class="icon" aria-hidden="true" click="changeWindow(\'min\')">'
 html+='<use xlink:href="#icon-min"></use>'
 html+='</svg>'
 html+='<svg class="icon" aria-hidden="true" click="changeWindow(\'max\')">'
 html+='<use xlink:href="#icon-max"></use>'
 html+='</svg>'
 html+='<svg class="icon" aria-hidden="true" click="changeWindow(\'close\')">'
 html+='<use xlink:href="#icon-close"></use>'
 html+='</svg>'
 html+='</div>'

 $.template( "movieTemplate", html   );

 $.tmpl( "movieTemplate", {} )
     .appendTo( ".header" );
