import{r as f,u as m,a as h,b as p,c as g,d as x,j as e,F as y,e as i,B as r,f as C,s as D}from"./index.34bc4859.js";import{D as j,a as v,b,c as A}from"./DialogTitle.f373588f.js";function k(){const[o,c]=f.exports.useState(!0),a=m(),t=h(),l=p(),s=g(d=>x(d,a.id));return e(y,{children:i(j,{open:o,maxWidth:"lg",children:[e(v,{children:"Are you sure you want to delete this user"}),e(b,{children:i(A,{sx:{display:"flex",justifyContent:"flex-end"},children:[e(r,{type:"submit",variant:"contained",color:"error",onClick:u,children:"Confirm"}),e(r,{variant:"contained",color:"primary",onClick:n,children:"Cancel"})]})})]})});function u(){n(),t(C(a.id)),t(D({message:"Successfully delete "+(s==null?void 0:s.name),variant:"success"}))}function n(){l("../",{replace:!0}),c(!1)}}export{k as default};
