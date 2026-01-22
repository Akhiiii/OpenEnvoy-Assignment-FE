import{r as t}from"./iframe-D9FVE3zw.js";import{S as i}from"./StatsCard-DnKMY_Yk.js";import"./preload-helper-PPVm8Dsz.js";import"./jsx-runtime-u17CrQMm.js";const e=t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:32,height:32,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},[t.createElement("path",{key:"1",d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),t.createElement("circle",{key:"2",cx:9,cy:7,r:4}),t.createElement("path",{key:"3",d:"M23 21v-2a4 4 0 0 0-3-3.87"}),t.createElement("path",{key:"4",d:"M16 3.13a4 4 0 0 1 0 7.75"})]),u={title:"Components/StatsCard",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{title:{control:"text",description:"The title of the stats card"},value:{control:"number",description:"The numeric value to display"},trend:{control:"number",description:"The trend percentage (positive or negative)"},avatars:{control:"object",description:"Array of avatar URLs to display"}}},r={args:{title:"Total Customers",value:5423,icon:e}},a={args:{title:"Total Customers",value:5423,trend:16,icon:e}},s={args:{title:"Members",value:1893,trend:-1,icon:e}},o={args:{title:"Active Now",value:189,icon:e,avatars:["https://i.pravatar.cc/150?img=1","https://i.pravatar.cc/150?img=2","https://i.pravatar.cc/150?img=3","https://i.pravatar.cc/150?img=4","https://i.pravatar.cc/150?img=5"]}},n={args:{title:"Inactive Users",value:234,trend:0,icon:e}},c={args:{title:"Total Revenue",value:1234567,trend:8,icon:e}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Total Customers',
    value: 5423,
    icon: UsersIcon
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Total Customers',
    value: 5423,
    trend: 16,
    icon: UsersIcon
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Members',
    value: 1893,
    trend: -1,
    icon: UsersIcon
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Active Now',
    value: 189,
    icon: UsersIcon,
    avatars: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2', 'https://i.pravatar.cc/150?img=3', 'https://i.pravatar.cc/150?img=4', 'https://i.pravatar.cc/150?img=5']
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Inactive Users',
    value: 234,
    trend: 0,
    icon: UsersIcon
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Total Revenue',
    value: 1234567,
    trend: 8,
    icon: UsersIcon
  }
}`,...c.parameters?.docs?.source}}};const v=["Default","WithPositiveTrend","WithNegativeTrend","WithAvatars","ZeroTrend","LargeValue"];export{r as Default,c as LargeValue,o as WithAvatars,s as WithNegativeTrend,a as WithPositiveTrend,n as ZeroTrend,v as __namedExportsOrder,u as default};
