var DynamicMockups=function(o){"use strict";return o.initDynamicMockupsIframe=({iframeId:o,data:t,mode:e,callback:n})=>{const c=document.getElementById(o);if(!c)return void console.error(`Iframe with ID '${o}' not found.`);c.addEventListener("load",(()=>{c.contentWindow&&c.contentWindow.postMessage(t,"https://embed.dynamicmockups.com")})),window.addEventListener("message",(o=>{o.data.mockupsExport&&("download"===e?o.data.mockupsExport.forEach(((o,t)=>{const e=o.export_path,n=`Variation ${t+1}`;fetch(e).then((o=>{if(!o.ok)throw new Error(`Failed to fetch ${e}`);return o.blob()})).then((o=>{const t=document.createElement("a");t.href=window.URL.createObjectURL(o),t.download=n+".webp",t.click(),window.URL.revokeObjectURL(t.href)})).catch((o=>console.error("Error downloading the image:",o)))})):"custom"===e&&"function"==typeof n&&n({mockupsExport:o.data.mockupsExport,customFields:o.data?.customFields||void 0}))}))},o}({});
