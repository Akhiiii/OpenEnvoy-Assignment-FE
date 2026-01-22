import{P as m}from"./Pagination-DIRC-tNL.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-D9FVE3zw.js";import"./preload-helper-PPVm8Dsz.js";const{fn:i}=__STORYBOOK_MODULE_TEST__,d={title:"Components/Pagination",component:m,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{currentPage:{control:{type:"number",min:1},description:"The currently active page"},totalPages:{control:{type:"number",min:1},description:"Total number of pages"},maxVisiblePages:{control:{type:"number",min:3},description:"Maximum number of page buttons to show"}},args:{onPageChange:i()}},e={args:{currentPage:1,totalPages:10}},a={args:{currentPage:5,totalPages:10}},r={args:{currentPage:10,totalPages:10}},s={args:{currentPage:2,totalPages:3}},t={args:{currentPage:15,totalPages:40}},o={args:{currentPage:1,totalPages:1}},n={args:{currentPage:10,totalPages:20,maxVisiblePages:5}},c={args:{currentPage:2,totalPages:20,maxVisiblePages:5}},g={args:{currentPage:19,totalPages:20,maxVisiblePages:5}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalPages: 10
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 5,
    totalPages: 10
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 10,
    totalPages: 10
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 2,
    totalPages: 3
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 15,
    totalPages: 40
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalPages: 1
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 10,
    totalPages: 20,
    maxVisiblePages: 5
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 2,
    totalPages: 20,
    maxVisiblePages: 5
  }
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 19,
    totalPages: 20,
    maxVisiblePages: 5
  }
}`,...g.parameters?.docs?.source}}};const S=["Default","MiddlePage","LastPage","FewPages","ManyPages","SinglePage","WithEllipsis","NearStart","NearEnd"];export{e as Default,s as FewPages,r as LastPage,t as ManyPages,a as MiddlePage,g as NearEnd,c as NearStart,o as SinglePage,n as WithEllipsis,S as __namedExportsOrder,d as default};
