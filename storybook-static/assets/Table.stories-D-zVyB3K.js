import{T as d}from"./Table-CoGSrExB.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-D9FVE3zw.js";import"./preload-helper-PPVm8Dsz.js";const e=[{key:"id",header:"ID"},{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"status",header:"Status"}],c=[{id:"1",name:"John Doe",email:"john@example.com",status:"Active"},{id:"2",name:"Jane Smith",email:"jane@example.com",status:"Inactive"},{id:"3",name:"Bob Johnson",email:"bob@example.com",status:"Active"},{id:"4",name:"Alice Brown",email:"alice@example.com",status:"Active"},{id:"5",name:"Charlie Wilson",email:"charlie@example.com",status:"Inactive"}],y={title:"Components/Table",component:d,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{loading:{control:"boolean",description:"Whether the table is in loading state"},error:{control:"text",description:"Error message to display"},emptyMessage:{control:"text",description:"Message to display when data is empty"}}},a={args:{columns:e,data:c}},s={args:{columns:e,data:[],loading:!0}},r={args:{columns:e,data:[],emptyMessage:"No customers found"}},t={args:{columns:e,data:[],error:"Unable to load customers. Please try again."}},o={args:{columns:e,data:[],emptyMessage:"No customers match your search. Try different keywords."}},n={args:{columns:[{key:"id",header:"ID"},{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"status",header:"Status",render:m=>`${m==="Active"?"🟢":"🔴"} ${m}`}],data:c}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    columns: sampleColumns,
    data: sampleData
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    columns: sampleColumns,
    data: [],
    loading: true
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'No customers found'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    columns: sampleColumns,
    data: [],
    error: 'Unable to load customers. Please try again.'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'No customers match your search. Try different keywords.'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    columns: [{
      key: 'id',
      header: 'ID'
    }, {
      key: 'name',
      header: 'Name'
    }, {
      key: 'email',
      header: 'Email'
    }, {
      key: 'status',
      header: 'Status',
      render: value => {
        const isActive = value === 'Active';
        return \`\${isActive ? '🟢' : '🔴'} \${value}\`;
      }
    }],
    data: sampleData
  }
}`,...n.parameters?.docs?.source}}};const h=["Default","Loading","Empty","Error","CustomEmptyMessage","WithCustomRenderer"];export{o as CustomEmptyMessage,a as Default,r as Empty,t as Error,s as Loading,n as WithCustomRenderer,h as __namedExportsOrder,y as default};
