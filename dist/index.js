var DynamicMockups=function(e){"use strict";return e.initDynamicMockupsIframe=({iframeId:e,data:o,mode:t,callback:n})=>{const r=document.getElementById(e);if(!r)return void console.error(`Iframe with ID '${e}' not found.`);r.src=r.src;r.addEventListener("load",(()=>{r.contentWindow&&r.contentWindow.postMessage(o,r.src)})),window.addEventListener("message",(e=>{e.data.mockupsExport&&("download"===t?e.data.mockupsExport.forEach(((e,o)=>{const t=e.export_path,n=`Variation ${o+1}`;fetch(t).then((e=>{if(!e.ok)throw new Error(`Failed to fetch ${t}`);return e.blob()})).then((e=>{const o=document.createElement("a");o.href=window.URL.createObjectURL(e),o.download=n+".webp",o.click(),window.URL.revokeObjectURL(o.href)})).catch((e=>console.error("Error downloading the image:",e)))})):"custom"===t&&"function"==typeof n&&n(e.data))}))},e}({});
