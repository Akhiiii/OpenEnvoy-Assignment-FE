import{D as n}from"./Dropdown-BMcNZLoH.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-D9FVE3zw.js";import"./preload-helper-PPVm8Dsz.js";const{fn:s}=__STORYBOOK_MODULE_TEST__,c={title:"Components/Dropdown",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:"text",description:"The currently selected value"},label:{control:"text",description:"Optional label displayed before the dropdown"},options:{control:"object",description:"Array of options with label and value"}},args:{onChange:s()}},e={args:{value:"newest",options:[{label:"Newest",value:"newest"},{label:"Name",value:"name"},{label:"Status",value:"status"}]}},a={args:{label:"Sort by:",value:"newest",options:[{label:"Newest",value:"newest"},{label:"Name",value:"name"},{label:"Status",value:"status"}]}},l={args:{label:"Status:",value:"all",options:[{label:"All",value:"all"},{label:"Active",value:"active"},{label:"Inactive",value:"inactive"}]}},t={args:{label:"Show:",value:"8",options:[{label:"8 per page",value:"8"},{label:"16 per page",value:"16"},{label:"32 per page",value:"32"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'newest',
    options: [{
      label: 'Newest',
      value: 'newest'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Status',
      value: 'status'
    }]
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Sort by:',
    value: 'newest',
    options: [{
      label: 'Newest',
      value: 'newest'
    }, {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Status',
      value: 'status'
    }]
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Status:',
    value: 'all',
    options: [{
      label: 'All',
      value: 'all'
    }, {
      label: 'Active',
      value: 'active'
    }, {
      label: 'Inactive',
      value: 'inactive'
    }]
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Show:',
    value: '8',
    options: [{
      label: '8 per page',
      value: '8'
    }, {
      label: '16 per page',
      value: '16'
    }, {
      label: '32 per page',
      value: '32'
    }]
  }
}`,...t.parameters?.docs?.source}}};const i=["Default","WithLabel","StatusFilter","PageSize"];export{e as Default,t as PageSize,l as StatusFilter,a as WithLabel,i as __namedExportsOrder,c as default};
