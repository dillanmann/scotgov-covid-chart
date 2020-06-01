(this["webpackJsonpscotgov-covid-data"]=this["webpackJsonpscotgov-covid-data"]||[]).push([[0],{229:function(e,a,t){e.exports=t(418)},234:function(e,a,t){},418:function(e,a,t){"use strict";t.r(a);var n=t(1),s=t.n(n),r=t(32),l=t.n(r),c=(t(234),t(51)),i=t(118),o=t(172),d=t(173),h=t(195),u=t(196),m=t(35),C=t(17),g=t(458),y=new(t(194).a)({uri:"https://scotgovcovidweb.azurewebsites.net/"}),f=t(444),v=t(420),p=t(446),E=t(421),b=t(447),k=t(457),w=t(448),D=t(422),O=t(449),S=t(459),T=t(456),j=t(450),x=t(451),A=t(452),G=t(453),_=t(187),$=t.n(_),L=t(188),B=t(78);function I(){var e=Object(L.a)(["query GetDatasets($scrapedOrder: ScrapedDataSort!, $calculatedOrder: CalculatedDataSort!){\n  scrapedDatasets(order_by: $scrapedOrder)\n    {\n      nodes{\n        date,\n        totalTests,\n        totalDeaths,\n        positiveTests,\n        negativeTests,\n          ayrshireandarranCases,\n          bordersCases,\n          dumfriesandgallowayCases,\n          fifeCases,\n          forthvalleyCases,\n          grampianCases,\n          greaterglasgowandclydeCases,\n          highlandCases,\n          lanarkshireCases,\n          lothianCases,\n          orkneyCases,\n          shetlandCases,\n          taysideCases\n      }\n    }\n    calculatedDatasets(order_by: $calculatedOrder){\n      nodes{\n        date,\n        dailyDeaths\n      }\n    }\n    \n  }"]);return I=function(){return e},e}var W=t.n(B)()(I()),q={scrapedOrder:{date:"ASC"},calculatedOrder:{date:"ASC"}},F=["totalTests","totalDeaths","dailyDeaths","positiveTests","negativeTests","ayrshireandarranCases","bordersCases","dumfriesandgallowayCases","fifeCases","forthvalleyCases","grampianCases","greaterglasgowandclydeCases","highlandCases","lanarkshireCases","lothianCases","orkneyCases","shetlandCases","taysideCases"],H={totalTests:"Total Tests",totalDeaths:"Total Deaths",dailyDeaths:"Daily Deaths",positiveTests:"Positive Tests",negativeTests:"Negative Tests",ayrshireandarranCases:"Ayrshire and Arran Cases",bordersCases:"Borders Cases",dumfriesandgallowayCases:"Dumfries and Galloway Cases",fifeCases:"Fife Cases",forthvalleyCases:"Forth Valley Cases",grampianCases:"Grampian Cases",greaterglasgowandclydeCases:"Greater Glasgow and Clyde Cases",highlandCases:"Highland Cases",lanarkshireCases:"Lanarkshire Cases",lothianCases:"Lothian Cases",orkneyCases:"Orkney Cases",shetlandCases:"Shetland Cases",taysideCases:"Tayside Cases"},J=F.reduce((function(e,a){return e[a]=$()({luminosity:"light"}),e}),{}),K=function(e){Object(u.a)(t,e);var a=Object(h.a)(t);function t(e){var n;return Object(o.a)(this,t),(n=a.call(this,e)).handleCheckboxChange=function(e){n.setState(Object(i.a)({},n.state,Object(c.a)({},e.target.name,e.target.checked)))},n.setGraphScale=function(e){n.setState(Object(c.a)({},e.target.name,e.target.value))},n.state=F.reduce((function(e,a){return e[a+"_enabled"]=!1,e}),{}),n.state.graphScale="linear",n}return Object(d.a)(t,[{key:"selectAllChannels",value:function(e){this.setState(Object.keys(this.state).filter((function(e){return"graphScale"!==e})).reduce((function(a,t){return Object(i.a)({},a,Object(c.a)({},t,e))}),{}))}},{key:"transformChartData",value:function(e){var a=this,t=[];return e.scrapedDatasets.nodes.forEach((function(n,s){var r=F.reduce((function(e,a){return e[a]=n[a],e}),{}),l=n.date.split("T")[0];r.date=l;var c=e.calculatedDatasets.nodes.find((function(e){return e.date.split("T")[0]===l}));c&&(r.dailyDeaths=c.dailyDeaths);var i=Object.keys(a.state).filter((function(e){return e.endsWith("_enabled")&&!0===a.state[e]}));("linear"===a.state.graphScale||i.every((function(e){return 0!==r[e]})))&&t.push(r)})),t}},{key:"render",value:function(){var e=this;return s.a.createElement(C.a,{client:y},s.a.createElement(g.a,{query:W,variables:q},(function(a){var t=a.loading,n=a.data;a.refetch;return!t&&s.a.createElement(f.a,{container:!0},s.a.createElement(f.a,{item:!0,xs:12,style:{textAlign:"center",margin:5}},s.a.createElement(v.a,{variant:"h3"},"ScotGov COVID-19 Data")),s.a.createElement(f.a,{item:!0,xs:2},s.a.createElement(p.a,{style:{marginLeft:30}},s.a.createElement(v.a,{variant:"h6",style:{textAlign:"center",margin:5}},"Data Channels"),s.a.createElement(E.a,{style:{padding:5}},F.map((function(a){return s.a.createElement(b.a,{control:s.a.createElement(k.a,{checked:e.state[a+"_enabled"],onChange:e.handleCheckboxChange,name:a+"_enabled"}),label:s.a.createElement(v.a,{variant:"caption"},H[a]),key:a})})),s.a.createElement(w.a,{variant:"contained",color:"primary",style:{width:"100%"}},s.a.createElement(D.a,{onClick:function(){return e.selectAllChannels(!0)},style:{width:"100%"}},"Select all"),s.a.createElement(D.a,{onClick:function(){return e.selectAllChannels(!1)},style:{width:"100%"}},"Deselect all")),s.a.createElement(O.a,{row:!0,"aria-label":"graph-scale",name:"graphScale",value:e.state.graphScale,onChange:e.setGraphScale},s.a.createElement(S.a,{style:{display:"flex",alignItems:"center",justifyContent:"center",marginRight:20,marginLeft:10}},s.a.createElement(v.a,{variant:"button"},"Scale:")),s.a.createElement(b.a,{value:"log",control:s.a.createElement(T.a,null),label:"log"}),s.a.createElement(b.a,{value:"linear",control:s.a.createElement(T.a,null),label:"linear"}))))),s.a.createElement(f.a,{item:!0,xs:10},s.a.createElement(m.d,{width:"99%",height:"99%"},s.a.createElement(m.c,{data:e.transformChartData(n),margin:{top:5,right:50,bottom:5}},s.a.createElement(m.a,{stroke:"#ccc"}),s.a.createElement(m.e,{contentStyle:{background:"#424242"}}),s.a.createElement(m.f,{dataKey:"date"}),s.a.createElement(m.g,{scale:e.state.graphScale,domain:["1","auto"]}),F.filter((function(a){return!0===e.state[a+"_enabled"]})).map((function(e){return s.a.createElement(m.b,{type:"monotone",dataKey:e,name:H[e],stroke:J[e],key:e})}))))),s.a.createElement(f.a,{item:!0,xs:12},s.a.createElement(j.a,{style:{width:"100%",position:"fixed",bottom:0,maxHeight:45}},s.a.createElement(x.a,{icon:s.a.createElement(A.a,null),href:"https://github.com/dillanmann/scotgov-covid-chart"}),s.a.createElement(x.a,{icon:s.a.createElement(G.a,null),href:"https://twitter.com/dillanmann"}))))})))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var V=t(454),z=t(460),M=t(193),N=t(455),P=Object(z.a)(Object(M.a)({palette:{type:"dark"}}));l.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(V.a,{theme:P},s.a.createElement(N.a,null,s.a.createElement(K,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[229,1,2]]]);
//# sourceMappingURL=main.267b496e.chunk.js.map