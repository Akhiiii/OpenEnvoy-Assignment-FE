import{j as y}from"./jsx-runtime-u17CrQMm.js";import"./iframe-D9FVE3zw.js";import"./preload-helper-PPVm8Dsz.js";const h="Button-module__button___2ZuB7",_="Button-module__primary___s1sM6",b="Button-module__disabled___Tl9fh",g="Button-module__secondary___R0waJ",v="Button-module__ghost___1KINV",n={button:h,primary:_,disabled:b,secondary:g,ghost:v},d=({variant:c="primary",children:l,className:u,disabled:i,...m})=>{const p=[n.button,n[c],i?n.disabled:"",u||""].filter(Boolean).join(" ");return y.jsx("button",{className:p,disabled:i,...m,children:l})};d.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'ghost'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'ghost'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{fn:B}=__STORYBOOK_MODULE_TEST__,T={title:"Components/Button",component:d,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost"],description:"The visual style variant of the button"},disabled:{control:"boolean",description:"Whether the button is disabled"},children:{control:"text",description:"The content of the button"}},args:{onClick:B()}},r={args:{variant:"primary",children:"Primary Button"}},e={args:{variant:"secondary",children:"Secondary Button"}},a={args:{variant:"ghost",children:"Ghost Button"}},t={args:{variant:"primary",children:"Disabled Primary",disabled:!0}},s={args:{variant:"secondary",children:"Disabled Secondary",disabled:!0}},o={args:{variant:"ghost",children:"Disabled Ghost",disabled:!0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Disabled Primary',
    disabled: true
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Disabled Secondary',
    disabled: true
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Disabled Ghost',
    disabled: true
  }
}`,...o.parameters?.docs?.source}}};const G=["Primary","Secondary","Ghost","PrimaryDisabled","SecondaryDisabled","GhostDisabled"];export{a as Ghost,o as GhostDisabled,r as Primary,t as PrimaryDisabled,e as Secondary,s as SecondaryDisabled,G as __namedExportsOrder,T as default};
