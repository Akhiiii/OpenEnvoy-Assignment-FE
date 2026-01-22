import{S as n}from"./Sidebar-uovL6-xT.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-D9FVE3zw.js";import"./preload-helper-PPVm8Dsz.js";const{fn:i}=__STORYBOOK_MODULE_TEST__,g={title:"Components/Sidebar",component:n,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{activeItem:{control:"select",options:["Dashboard","Product","Customers","Income","Promote","Help"],description:"The currently active navigation item"},user:{description:"User profile information displayed at the bottom"}},args:{onNavigate:i(),user:{name:"Evano",role:"Project Manager",avatar:"https://i.pravatar.cc/150?img=68"}}},e={args:{activeItem:"Customers"}},r={args:{activeItem:"Dashboard"}},a={args:{activeItem:"Product"}},t={args:{activeItem:"Customers"}},s={args:{activeItem:"Income"}},o={args:{activeItem:"Promote"}},c={args:{activeItem:"Help"}},m={args:{activeItem:"Customers",user:{name:"Jane Smith",role:"Administrator",avatar:"https://i.pravatar.cc/150?img=47"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Customers'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Dashboard'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Product'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Customers'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Income'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Promote'
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Help'
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    activeItem: 'Customers',
    user: {
      name: 'Jane Smith',
      role: 'Administrator',
      avatar: 'https://i.pravatar.cc/150?img=47'
    }
  }
}`,...m.parameters?.docs?.source}}};const l=["Default","DashboardActive","ProductActive","CustomersActive","IncomeActive","PromoteActive","HelpActive","DifferentUser"];export{t as CustomersActive,r as DashboardActive,e as Default,m as DifferentUser,c as HelpActive,s as IncomeActive,a as ProductActive,o as PromoteActive,l as __namedExportsOrder,g as default};
