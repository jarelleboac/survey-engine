(this["webpackJsonpsurvey-engine"]=this["webpackJsonpsurvey-engine"]||[]).push([[0],{132:function(e,t,n){"use strict";n.r(t);var a=n(73),r=n(1),i=n.n(r),o=n(61),c=n.n(o),s=(n(81),n(11)),l=n(12),u=n(14),p=n(13),m=n(15),d=n(72),f=n(17);function v(e){return function(e,t){var n=e-t;return n<2e4?"just now":n<6e4?"less than 1 min ago":n<36e5?Math.round(n/6e4)+" min ago":n<864e5?Math.round(n/36e5)+" h ago":n<2592e6?Math.round(n/864e5)+" days ago":n<31536e6?Math.round(n/2592e6)+" mo ago":Math.round(n/31536e6)+" years ago"}((new Date).getTime(),new Date(e).getTime())}var h=n(19),b=n(18),g=n.n(b);function k(){var e=Object(f.a)(["\n  mutation VoteMutation($linkId: ID!) {\n    vote(linkId: $linkId) {\n      id\n      link {\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"]);return k=function(){return e},e}var y=g()(k()),E=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=localStorage.getItem("auth-token");return i.a.createElement("div",{className:"flex mt2 items-start"},i.a.createElement("div",{className:"flex items-center"},i.a.createElement("span",{className:"gray"},this.props.index+1,"."),t&&i.a.createElement(h.Mutation,{mutation:y,variables:{linkId:this.props.link.id},update:function(t,n){var a=n.data.vote;return e.props.updateStoreAfterVote(t,a,e.props.link.id)}},(function(e){return i.a.createElement("div",{className:"ml1 gray f11",onClick:e},"\u25b2")}))),i.a.createElement("div",{className:"ml1"},i.a.createElement("div",null,this.props.link.description," (",this.props.link.url,")"),i.a.createElement("div",{className:"f6 lh-copy gray"},this.props.link.votes.length," votes | by"," ",this.props.link.postedBy?this.props.link.postedBy.name:"Unknown"," ",v(this.props.link.createdAt))))}}]),t}(r.Component);function w(){var e=Object(f.a)(["\n  subscription {\n    newVote {\n      id\n      link {\n        id\n        url\n        description\n        createdAt\n        postedBy {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"]);return w=function(){return e},e}function O(){var e=Object(f.a)(["\n  subscription {\n    newLink {\n      id\n      url\n      description\n      createdAt\n      postedBy {\n        id\n        name\n      }\n      votes {\n        id\n        user {\n          id\n        }\n      }\n    }\n  }\n"]);return O=function(){return e},e}function j(){var e=Object(f.a)(["\n  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {\n    feed(first: $first, skip: $skip, orderBy: $orderBy) {\n      links {\n        id\n        createdAt\n        url\n        description\n        postedBy {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      count\n    }\n  }\n"]);return j=function(){return e},e}var x=g()(j()),N=g()(O()),S=g()(w()),C=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r))))._updateCacheAfterVote=function(e,t,a){var r=n.props.location.pathname.includes("new"),i=parseInt(n.props.match.params.page,10),o=r?5*(i-1):0,c=r?5:100,s=r?"createdAt_DESC":null,l=e.readQuery({query:x,variables:{first:c,skip:o,orderBy:s}});l.feed.links.find((function(e){return e.id===a})).votes=t.link.votes,e.writeQuery({query:x,data:l})},n._subscribeToNewLinks=function(e){e({document:N,updateQuery:function(e,t){var n=t.subscriptionData;if(!n.data)return e;var a=n.data.newLink;return e.feed.links.find((function(e){return e.id===a.id}))?e:Object.assign({},e,{feed:{links:[a].concat(Object(d.a)(e.feed.links)),count:e.feed.links.length+1,__typename:e.feed.__typename}})}})},n._subscribeToNewVotes=function(e){e({document:S})},n._getQueryVariables=function(){var e=n.props.location.pathname.includes("new"),t=parseInt(n.props.match.params.page,10);return{first:e?5:100,skip:e?5*(t-1):0,orderBy:e?"createdAt_DESC":null}},n._getLinksToRender=function(e){if(n.props.location.pathname.includes("new"))return e.feed.links;var t=e.feed.links.slice();return t.sort((function(e,t){return t.votes.length-e.votes.length})),t},n._nextPage=function(e){var t=parseInt(n.props.match.params.page,10);if(t<=e.feed.count/5){var a=t+1;n.props.history.push("/new/".concat(a))}},n._previousPage=function(){var e=parseInt(n.props.match.params.page,10);if(e>1){var t=e-1;n.props.history.push("/new/".concat(t))}},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(h.Query,{query:x,variables:this._getQueryVariables()},(function(t){var n=t.loading,a=t.error,o=t.data,c=t.subscribeToMore;if(n)return i.a.createElement("div",null,"Fetching");if(a)return i.a.createElement("div",null,"Error");e._subscribeToNewLinks(c),e._subscribeToNewVotes(c);var s=e._getLinksToRender(o),l=e.props.location.pathname.includes("new"),u=e.props.match.params.page?5*(e.props.match.params.page-1):0;return i.a.createElement(r.Fragment,null,s.map((function(t,n){return i.a.createElement(E,{key:t.id,link:t,index:n+u,updateStoreAfterVote:e._updateCacheAfterVote})})),l&&i.a.createElement("div",{className:"flex ml4 mv3 gray"},i.a.createElement("div",{className:"pointer mr2",onClick:e._previousPage},"Previous"),i.a.createElement("div",{className:"pointer",onClick:function(){return e._nextPage(o)}},"Next")))}))}}]),t}(r.Component);function _(){var e=Object(f.a)(["\n  mutation PostMutation($description: String!, $url: String!) {\n    post(description: $description, url: $url) {\n      id\n      createdAt\n      url\n      description\n    }\n  }\n"]);return _=function(){return e},e}var $=g()(_()),A=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={description:"",url:""},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.description,a=t.url;return i.a.createElement("div",null,i.a.createElement("div",{className:"flex flex-column mt3"},i.a.createElement("input",{className:"mb2",value:n,onChange:function(t){return e.setState({description:t.target.value})},type:"text",placeholder:"A description for the link"}),i.a.createElement("input",{className:"mb2",value:a,onChange:function(t){return e.setState({url:t.target.value})},type:"text",placeholder:"The URL for the link"})),i.a.createElement(h.Mutation,{mutation:$,variables:{description:n,url:a},onCompleted:function(){return e.props.history.push("/new/1")},update:function(e,t){var n=t.data.post,a=e.readQuery({query:x,variables:{first:5,skip:0,orderBy:"createdAt_DESC"}});a.feed.links.unshift(n),e.writeQuery({query:x,data:a,variables:{first:5,skip:0,orderBy:"createdAt_DESC"}})}},(function(e){return i.a.createElement("button",{onClick:e},"Submit")})))}}]),t}(r.Component),I=n(9),B=n(69),M=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=localStorage.getItem("auth-token");return i.a.createElement("div",{className:"flex pa1 justify-between nowrap orange"},i.a.createElement("div",{className:"flex flex-fixed black"},i.a.createElement("div",{className:"fw7 mr1"},"Hacker News"),i.a.createElement(I.b,{to:"/",className:"ml1 no-underline black"},"new"),i.a.createElement("div",{className:"ml1"},"|"),i.a.createElement(I.b,{to:"/top",className:"ml1 no-underline black"},"top"),i.a.createElement("div",{className:"ml1"},"|"),i.a.createElement(I.b,{to:"/search",className:"ml1 no-underline black"},"search"),t&&i.a.createElement("div",{className:"flex"},i.a.createElement("div",{className:"ml1"},"|"),i.a.createElement(I.b,{to:"/create",className:"ml1 no-underline black"},"submit"))),i.a.createElement("div",{className:"flex flex-fixed"},t?i.a.createElement("div",{className:"ml1 pointer black",onClick:function(){localStorage.removeItem("auth-token"),e.props.history.push("/")}},"logout"):i.a.createElement(I.b,{to:"/login",className:"ml1 no-underline black"},"login")))}}]),t}(r.Component),D=Object(B.a)(M),T=n(25),q=n.n(T),L=n(36);function Q(){var e=Object(f.a)(["\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n"]);return Q=function(){return e},e}function V(){var e=Object(f.a)(["\n  mutation SignupMutation($email: String!, $password: String!, $name: String!) {\n    signup(email: $email, password: $password, name: $name) {\n      token\n    }\n  }\n"]);return V=function(){return e},e}var P=g()(V()),U=g()(Q()),F=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={login:!0,email:"",password:"",name:""},n._confirm=function(){var e=Object(L.a)(q.a.mark((function e(t){var a,r;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.state.login?t.login:t.signup,r=a.token,n._saveUserData(r),n.props.history.push("/");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._saveUserData=function(e){localStorage.setItem("auth-token",e)},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.login,a=t.email,r=t.password,o=t.name;return i.a.createElement("div",null,i.a.createElement("h4",{className:"mv3"},n?"Login":"Sign Up"),i.a.createElement("div",{className:"flex flex-column"},!n&&i.a.createElement("input",{value:o,onChange:function(t){return e.setState({name:t.target.value})},type:"text",placeholder:"Your name"}),i.a.createElement("input",{value:a,onChange:function(t){return e.setState({email:t.target.value})},type:"text",placeholder:"Your email address"}),i.a.createElement("input",{value:r,onChange:function(t){return e.setState({password:t.target.value})},type:"password",placeholder:"Choose a safe password"})),i.a.createElement("div",{className:"flex mt3"},i.a.createElement(h.Mutation,{mutation:n?U:P,variables:{email:a,password:r,name:o},onCompleted:function(t){return e._confirm(t)}},(function(e){return i.a.createElement("div",{className:"pointer mr2 button",onClick:e},n?"login":"create account")})),i.a.createElement("div",{className:"pointer button",onClick:function(){return e.setState({login:!n})}},n?"need to create an account?":"already have an account?")))}}]),t}(r.Component);function R(){var e=Object(f.a)(["\n  query FeedSearchQuery($filter: String!) {\n    feed(filter: $filter) {\n      links {\n        id\n        url\n        description\n        createdAt\n        postedBy {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n"]);return R=function(){return e},e}var J=g()(R()),W=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={links:[],filter:""},n._executeSearch=Object(L.a)(q.a.mark((function e(){var t,a,r;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state.filter,e.next=3,n.props.client.query({query:J,variables:{filter:t}});case 3:a=e.sent,r=a.data.feed.links,n.setState({links:r});case 6:case"end":return e.stop()}}),e)}))),n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",null,"Search",i.a.createElement("input",{type:"text",onChange:function(t){return e.setState({filter:t.target.value})}}),i.a.createElement("button",{onClick:function(){return e._executeSearch()}},"OK")),this.state.links.map((function(e,t){return i.a.createElement(E,{key:e.id,link:e,index:t})})))}}]),t}(r.Component),Y=Object(h.withApollo)(W),z=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"center w85"},i.a.createElement(D,null),i.a.createElement("div",{className:"ph3 pv1 background-gray"},i.a.createElement(I.e,null,i.a.createElement(I.d,{exact:!0,path:"/",render:function(){return i.a.createElement(I.c,{to:"/new/1"})}}),i.a.createElement(I.d,{exact:!0,path:"/create",component:A}),i.a.createElement(I.d,{exact:!0,path:"/login",component:F}),i.a.createElement(I.d,{exact:!0,path:"/search",component:Y}),i.a.createElement(I.d,{exact:!0,path:"/top",component:C}),i.a.createElement(I.d,{exact:!0,path:"/new/:page",component:C}))))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=n(47),K=n(75),G=n(71),X=n(70),Z=n(10),ee=n(74),te=n(3),ne=Object(K.a)({uri:"http://localhost:4000"}),ae=Object(X.a)((function(e,t){var n=t.headers,r=localStorage.getItem("auth-token");return{headers:Object(a.a)({},n,{authorization:r?"Bearer ".concat(r):""})}})),re=new ee.a({uri:"ws://localhost:4000",options:{reconnect:!0,connectionParams:{authToken:localStorage.getItem("auth-token")}}}),ie=Object(Z.d)((function(e){var t=e.query,n=Object(te.l)(t),a=n.kind,r=n.operation;return"OperationDefinition"===a&&"subscription"===r}),re,ae.concat(ne)),oe=new H.ApolloClient({link:ie,cache:new G.a});c.a.render(i.a.createElement(I.a,null,i.a.createElement(h.ApolloProvider,{client:oe},i.a.createElement(z,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},76:function(e,t,n){e.exports=n(132)},81:function(e,t,n){}},[[76,1,2]]]);
//# sourceMappingURL=main.a81b506f.chunk.js.map