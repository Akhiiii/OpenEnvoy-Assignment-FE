import{S as c}from"./SearchInput-Dpb6yiYW.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-D9FVE3zw.js";import"./preload-helper-PPVm8Dsz.js";const{fn:n}=__STORYBOOK_MODULE_TEST__,p={title:"Components/SearchInput",component:c,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{placeholder:{control:"text",description:"Placeholder text for the input"},debounceMs:{control:"number",description:"Debounce delay in milliseconds"},value:{control:"text",description:"Controlled value of the input"}},args:{onChange:n()}},e={args:{placeholder:"Search...",debounceMs:300}},r={args:{placeholder:"Search customers by name, email, or company...",debounceMs:300}},o={args:{value:"John Doe",placeholder:"Search...",debounceMs:300}},a={args:{placeholder:"Fast search (100ms debounce)...",debounceMs:100}},s={args:{placeholder:"Slow search (500ms debounce)...",debounceMs:500}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    debounceMs: 300
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search customers by name, email, or company...',
    debounceMs: 300
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'John Doe',
    placeholder: 'Search...',
    debounceMs: 300
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Fast search (100ms debounce)...',
    debounceMs: 100
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Slow search (500ms debounce)...',
    debounceMs: 500
  }
}`,...s.parameters?.docs?.source}}};const m=["Default","WithPlaceholder","WithValue","FastDebounce","SlowDebounce"];export{e as Default,a as FastDebounce,s as SlowDebounce,r as WithPlaceholder,o as WithValue,m as __namedExportsOrder,p as default};
