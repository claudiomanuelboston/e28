(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dbe9218a"],{"0d6d":function(e,t,n){var r=n("d3f4"),a=n("67ab").onFreeze;n("5eda")("freeze",(function(e){return function(t){return e&&r(t)?e(a(t)):t}}))},6167:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return s}));n("0d6d");var r=Object.freeze({sEmail:"admin@admin.com",sPassword:"abcd@1234"}),a=Object.freeze({baseurl:"http://localhost:3000/"}),s=Object.freeze({InvalidCredential:"Please, Enter valid Credentials.",SaveSuccessfully:"Save Successfully",ErrorMessage:"Please, Try Again!!!",PostAddInFavorite:"Post added in favorites",PostRemoveFromFavorite:"Post removed from favorites"})},"6db4":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-4"},[n("b-row",{staticClass:"mb-3 mt-3 p-4 justify-content-md-center bg-white"},[n("b-col",[n("h1",[e._v("FAQs")])])],1),e._l(e.faqs,(function(t,r){return n("b-row",{key:"fruit-"+r,staticClass:"pt-3 justify-content-md-center bg-white"},[n("b-col",[n("h4",[e._v(e._s(r+1)+") "+e._s(t.sQuestion)+" :")]),n("p",{domProps:{innerHTML:e._s(t.sAnswer)}})])],1)}))],2)},a=[],s=n("d770"),o=n("6167"),i=n("a18c"),u={name:"FAQ",data:function(){return{faqs:[]}},created:function(){this.showService=new s["a"]},mounted:function(){var e=this,t=localStorage.getItem("Email"),n=localStorage.getItem("Password");t!=o["a"].sEmail&&n!=o["a"].sPassword?i["a"].push({name:"login"}):this.showService.getFaqs().then((function(t){e.faqs=t.data}))}},c=u,f=n("2877"),l=Object(f["a"])(c,r,a,!1,null,null,null);t["default"]=l.exports},d770:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=n("85f2"),s=n.n(a);function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),s()(e,r.key,r)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}var u=n("6167");n.d(t,"a",(function(){return f}));var c=u["c"].baseurl,f=function(){function e(){r(this,e)}return i(e,[{key:"getPosts",value:function(){return axios.get(c+"post")}},{key:"getGenre",value:function(){return axios.get(c+"genre")}},{key:"getPostByGenre",value:function(e){return 0==e?axios.get(c+"post"):axios.get(c+"post?nGenreId="+e)}},{key:"getPostById",value:function(e){return axios.get(c+"post?id="+e)}},{key:"getArtistById",value:function(e){return axios.get(c+"artist?nArtistId="+e)}},{key:"getArtistByGenre",value:function(e){return axios.get(c+"artist?nGenreId="+e)}},{key:"saveShow",value:function(e){return axios.post(c+"post",e)}},{key:"getFaqs",value:function(){return axios.get(c+"faq")}},{key:"getArtist",value:function(){return axios.get(c+"artist")}}]),e}()}}]);
//# sourceMappingURL=chunk-dbe9218a.b3badc5a.js.map