import{g as l,r as f,j as a}from"./index-BLmrEFjO.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=l("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);function m({inputRef:o,disabled:r,label:s,hint:g,onFiles:i}){const[p,t]=f.useState(!1);return a.jsxs("label",{className:`image-upload-zone ${p?"is-dragging":""}`,"aria-disabled":r,onDragOver:e=>{e.preventDefault(),r||t(!0)},onDragLeave:()=>t(!1),onDrop:e=>{e.preventDefault(),t(!1),r||i(Array.from(e.dataTransfer.files))},children:[a.jsx(c,{size:24,"aria-hidden":"true"}),a.jsx("strong",{className:"kgs-type-body",children:s}),a.jsx("span",{className:"kgs-type-caption",children:g}),a.jsx("input",{ref:o,type:"file",accept:"image/png,image/jpeg,image/webp",multiple:!0,disabled:r,"aria-label":s,onChange:e=>{const n=Array.from(e.target.files??[]);e.target.value="",n.length&&i(n)}})]})}export{m as ImageUploadZone};
