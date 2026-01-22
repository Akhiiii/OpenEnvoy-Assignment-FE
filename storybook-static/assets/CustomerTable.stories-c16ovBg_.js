import{C as l}from"./CustomerTable-vOo6RUcX.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-D9FVE3zw.js";import"./preload-helper-PPVm8Dsz.js";import"./Table-CoGSrExB.js";import"./SearchInput-Dpb6yiYW.js";import"./Dropdown-BMcNZLoH.js";import"./Pagination-DIRC-tNL.js";import"./StatusBadge-B7Zz8miz.js";const m=p=>{const c=["Jane Cooper","Floyd Miles","Ronald Richards","Marvin McKinney","Jerome Bell","Kathryn Murphy","Jacob Jones","Kristin Watson","Eleanor Pena","Courtney Henry","Cameron Williamson","Theresa Webb","Darlene Robertson","Devon Lane","Bessie Cooper","Arlene McCoy"],i=["Microsoft","Yahoo","Google","Apple","Amazon","Meta","Netflix","Spotify","Adobe","Salesforce","Oracle","IBM"],d=["United States","Canada","United Kingdom","Germany","France","Australia","Japan","Brazil","India","Mexico"];return Array.from({length:p},(g,e)=>({id:`customer-${e+1}`,name:c[e%c.length],company:i[e%i.length],phone:`(+1) ${Math.floor(Math.random()*900+100)}-${Math.floor(Math.random()*900+100)}-${Math.floor(Math.random()*9e3+1e3)}`,email:`${c[e%c.length].toLowerCase().replace(" ",".")}@${i[e%i.length].toLowerCase()}.com`,country:d[e%d.length],status:Math.random()>.3?"Active":"Inactive",createdAt:new Date(2024,0,p-e)}))},u=m(50),A={title:"Components/CustomerTable",component:l,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{loading:{control:"boolean",description:"Whether the table is in loading state"},error:{control:"text",description:"Error message to display"},customers:{control:"object",description:"Array of customer data to display"}}},r={args:{customers:u}},a={args:{customers:[],loading:!0}},s={args:{customers:[]}},o={args:{customers:[],error:"Unable to load customers. Please try again."}},t={args:{customers:m(5)}},n={args:{customers:m(100)}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    customers: mockCustomers
  }
}`,...r.parameters?.docs?.source},description:{story:`Default state with mock customer data.
Shows the table with search, sort, and pagination functionality.`,...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    customers: [],
    loading: true
  }
}`,...a.parameters?.docs?.source},description:{story:`Loading state while fetching customer data.
Shows a spinner and loading message.`,...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    customers: []
  }
}`,...s.parameters?.docs?.source},description:{story:`Empty state when no customers exist or match search criteria.
Shows a helpful message to the user.`,...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    customers: [],
    error: 'Unable to load customers. Please try again.'
  }
}`,...o.parameters?.docs?.source},description:{story:`Error state when data fetching fails.
Shows an error message to the user.`,...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    customers: generateMockCustomers(5)
  }
}`,...t.parameters?.docs?.source},description:{story:`Table with a small dataset (single page).
Pagination shows only one page.`,...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    customers: generateMockCustomers(100)
  }
}`,...n.parameters?.docs?.source},description:{story:`Table with a large dataset (many pages).
Demonstrates pagination with ellipsis.`,...n.parameters?.docs?.description}}};const E=["Default","Loading","Empty","Error","SmallDataset","LargeDataset"];export{r as Default,s as Empty,o as Error,n as LargeDataset,a as Loading,t as SmallDataset,E as __namedExportsOrder,A as default};
