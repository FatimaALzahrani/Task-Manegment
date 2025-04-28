"use strict";(self["webpackChunkresearch_task_manager"]=self["webpackChunkresearch_task_manager"]||[]).push([[904],{5904:function(t,e,n){n.d(e,{XR:function(){return we},qk:function(){return Te},c7:function(){return Ee},KR:function(){return ve},bp:function(){return Re}});var s=n(9928),r=n(6743),o=n(5125);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const i="firebasestorage.googleapis.com",a="storageBucket",c=12e4,u=6e5,l=1e3;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class h extends r.g{constructor(t,e,n=0){super(p(t),`Firebase Storage: ${e} (${p(t)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,h.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return p(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var _,d;function p(t){return"storage/"+t}function f(){const t="An unknown error occurred, please check the error payload for server response.";return new h(_.UNKNOWN,t)}function g(t){return new h(_.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function m(t){return new h(_.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function b(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new h(_.UNAUTHENTICATED,t)}function R(){return new h(_.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function T(t){return new h(_.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function w(){return new h(_.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function v(){return new h(_.CANCELED,"User canceled the upload/download.")}function E(t){return new h(_.INVALID_URL,"Invalid URL '"+t+"'.")}function k(t){return new h(_.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function y(){return new h(_.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+a+"' property when initializing the app?")}function O(){return new h(_.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function U(){return new h(_.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function C(){return new h(_.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function A(t){return new h(_.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function N(t){return new h(_.INVALID_ARGUMENT,t)}function I(){return new h(_.APP_DELETED,"The Firebase app was deleted.")}function S(t){return new h(_.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function x(t,e){return new h(_.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function P(t){throw new h(_.INTERNAL_ERROR,"Internal error: "+t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(t){t["UNKNOWN"]="unknown",t["OBJECT_NOT_FOUND"]="object-not-found",t["BUCKET_NOT_FOUND"]="bucket-not-found",t["PROJECT_NOT_FOUND"]="project-not-found",t["QUOTA_EXCEEDED"]="quota-exceeded",t["UNAUTHENTICATED"]="unauthenticated",t["UNAUTHORIZED"]="unauthorized",t["UNAUTHORIZED_APP"]="unauthorized-app",t["RETRY_LIMIT_EXCEEDED"]="retry-limit-exceeded",t["INVALID_CHECKSUM"]="invalid-checksum",t["CANCELED"]="canceled",t["INVALID_EVENT_NAME"]="invalid-event-name",t["INVALID_URL"]="invalid-url",t["INVALID_DEFAULT_BUCKET"]="invalid-default-bucket",t["NO_DEFAULT_BUCKET"]="no-default-bucket",t["CANNOT_SLICE_BLOB"]="cannot-slice-blob",t["SERVER_FILE_WRONG_SIZE"]="server-file-wrong-size",t["NO_DOWNLOAD_URL"]="no-download-url",t["INVALID_ARGUMENT"]="invalid-argument",t["INVALID_ARGUMENT_COUNT"]="invalid-argument-count",t["APP_DELETED"]="app-deleted",t["INVALID_ROOT_OPERATION"]="invalid-root-operation",t["INVALID_FORMAT"]="invalid-format",t["INTERNAL_ERROR"]="internal-error",t["UNSUPPORTED_ENVIRONMENT"]="unsupported-environment"})(_||(_={}));class D{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=D.makeFromUrl(t,e)}catch(s){return new D(t,"")}if(""===n.path)return n;throw k(t)}static makeFromUrl(t,e){let n=null;const s="([A-Za-z0-9.\\-_]+)";function r(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function u(t){t.path_=decodeURIComponent(t.path)}const l="v[A-Za-z0-9_]+",h=e.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",d=new RegExp(`^https?://${h}/${l}/b/${s}/o${_}`,"i"),p={bucket:1,path:3},f=e===i?"(?:storage.googleapis.com|storage.cloud.google.com)":e,g="([^?#]*)",m=new RegExp(`^https?://${f}/${s}/${g}`,"i"),b={bucket:1,path:2},R=[{regex:a,indices:c,postModify:r},{regex:d,indices:p,postModify:u},{regex:m,indices:b,postModify:u}];for(let i=0;i<R.length;i++){const e=R[i],s=e.regex.exec(t);if(s){const t=s[e.indices.bucket];let r=s[e.indices.path];r||(r=""),n=new D(t,r),e.postModify(n);break}}if(null==n)throw E(t);return n}}class L{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(t,e,n){let s=1,r=null,o=null,i=!1,a=0;function c(){return 2===a}let u=!1;function l(...t){u||(u=!0,e.apply(null,t))}function h(e){r=setTimeout((()=>{r=null,t(d,c())}),e)}function _(){o&&clearTimeout(o)}function d(t,...e){if(u)return void _();if(t)return _(),void l.call(null,t,...e);const n=c()||i;if(n)return _(),void l.call(null,t,...e);let r;s<64&&(s*=2),1===a?(a=2,r=0):r=1e3*(s+Math.random()),h(r)}let p=!1;function f(t){p||(p=!0,_(),u||(null!==r?(t||(a=2),clearTimeout(r),h(0)):t||(a=1)))}return h(0),o=setTimeout((()=>{i=!0,f(!0)}),n),f}function M(t){t(!1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(t){return void 0!==t}function q(t){return"function"===typeof t}function z(t){return"object"===typeof t&&!Array.isArray(t)}function H(t){return"string"===typeof t||t instanceof String}function $(t){return j()&&t instanceof Blob}function j(){return"undefined"!==typeof Blob&&!(0,r.Ll)()}function V(t,e,n,s){if(s<e)throw N(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw N(`Invalid value for '${t}'. Expected ${n} or less.`)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(t,e,n){let s=e;return null==n&&(s=`https://${e}`),`${n}://${s}/v0${t}`}function X(t){const e=encodeURIComponent;let n="?";for(const s in t)if(t.hasOwnProperty(s)){const r=e(s)+"="+e(t[s]);n=n+r+"&"}return n=n.slice(0,-1),n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function K(t,e){const n=t>=500&&t<600,s=[408,429],r=-1!==s.indexOf(t),o=-1!==e.indexOf(t);return n||r||o}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(t){t[t["NO_ERROR"]=0]="NO_ERROR",t[t["NETWORK_ERROR"]=1]="NETWORK_ERROR",t[t["ABORT"]=2]="ABORT"})(d||(d={}));class W{constructor(t,e,n,s,r,o,i,a,c,u,l,h=!0){this.url_=t,this.method_=e,this.headers_=n,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=i,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=l,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()}))}start_(){const t=(t,e)=>{if(e)return void t(!1,new Z(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const s=t=>{const e=t.loaded,n=t.lengthComputable?t.total:-1;null!==this.progressCallback_&&this.progressCallback_(e,n)};null!==this.progressCallback_&&n.addUploadProgressListener(s),n.send(this.url_,this.method_,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(s),this.pendingConnection_=null;const e=n.getErrorCode()===d.NO_ERROR,r=n.getStatus();if(!e||K(r,this.additionalRetryCodes_)&&this.retry){const e=n.getErrorCode()===d.ABORT;return void t(!1,new Z(!1,null,e))}const o=-1!==this.successCodes_.indexOf(r);t(!0,new Z(o,n))}))},e=(t,e)=>{const n=this.resolve_,s=this.reject_,r=e.connection;if(e.wasSuccessCode)try{const t=this.callback_(r,r.getResponse());F(t)?n(t):n()}catch(o){s(o)}else if(null!==r){const t=f();t.serverResponse=r.getErrorText(),this.errorCallback_?s(this.errorCallback_(r,t)):s(t)}else if(e.canceled){const t=this.appDelete_?I():v();s(t)}else{const t=w();s(t)}};this.canceled_?e(!1,new Z(!1,null,!0)):this.backoffId_=B(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&M(this.backoffId_),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class Z{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function J(t,e){null!==e&&e.length>0&&(t["Authorization"]="Firebase "+e)}function Y(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(null!==e&&void 0!==e?e:"AppManager")}function Q(t,e){e&&(t["X-Firebase-GMPID"]=e)}function tt(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}function et(t,e,n,s,r,o,i=!0){const a=X(t.urlParams),c=t.url+a,u=Object.assign({},t.headers);return Q(u,e),J(u,n),Y(u,o),tt(u,s),new W(c,t.method,u,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function st(...t){const e=nt();if(void 0!==e){const n=new e;for(let e=0;e<t.length;e++)n.append(t[e]);return n.getBlob()}if(j())return new Blob(t);throw new h(_.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function rt(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(t){if("undefined"===typeof atob)throw A("base-64");return atob(t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class at{constructor(t,e){this.data=t,this.contentType=e||null}}function ct(t,e){switch(t){case it.RAW:return new at(ut(e));case it.BASE64:case it.BASE64URL:return new at(ht(t,e));case it.DATA_URL:return new at(dt(e),pt(e))}throw f()}function ut(t){const e=[];for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);if(s<=127)e.push(s);else if(s<=2047)e.push(192|s>>6,128|63&s);else if(55296===(64512&s)){const r=n<t.length-1&&56320===(64512&t.charCodeAt(n+1));if(r){const r=s,o=t.charCodeAt(++n);s=65536|(1023&r)<<10|1023&o,e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|63&s)}else e.push(239,191,189)}else 56320===(64512&s)?e.push(239,191,189):e.push(224|s>>12,128|s>>6&63,128|63&s)}return new Uint8Array(e)}function lt(t){let e;try{e=decodeURIComponent(t)}catch(n){throw x(it.DATA_URL,"Malformed data URL.")}return ut(e)}function ht(t,e){switch(t){case it.BASE64:{const n=-1!==e.indexOf("-"),s=-1!==e.indexOf("_");if(n||s){const e=n?"-":"_";throw x(t,"Invalid character '"+e+"' found: is it base64url encoded?")}break}case it.BASE64URL:{const n=-1!==e.indexOf("+"),s=-1!==e.indexOf("/");if(n||s){const e=n?"+":"/";throw x(t,"Invalid character '"+e+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=ot(e)}catch(r){if(r.message.includes("polyfill"))throw r;throw x(t,"Invalid character found")}const s=new Uint8Array(n.length);for(let o=0;o<n.length;o++)s[o]=n.charCodeAt(o);return s}class _t{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(null===e)throw x(it.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=e[1]||null;null!=n&&(this.base64=ft(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=t.substring(t.indexOf(",")+1)}}function dt(t){const e=new _t(t);return e.base64?ht(it.BASE64,e.rest):lt(e.rest)}function pt(t){const e=new _t(t);return e.contentType}function ft(t,e){const n=t.length>=e.length;return!!n&&t.substring(t.length-e.length)===e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t,e){let n=0,s="";$(t)?(this.data_=t,n=t.size,s=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),n=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),n=t.length),this.size_=n,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,e){if($(this.data_)){const n=this.data_,s=rt(n,t,e);return null===s?null:new gt(s)}{const n=new Uint8Array(this.data_.buffer,t,e-t);return new gt(n,!0)}}static getBlob(...t){if(j()){const e=t.map((t=>t instanceof gt?t.data_:t));return new gt(st.apply(null,e))}{const e=t.map((t=>H(t)?ct(it.RAW,t).data:t.data_));let n=0;e.forEach((t=>{n+=t.byteLength}));const s=new Uint8Array(n);let r=0;return e.forEach((t=>{for(let e=0;e<t.length;e++)s[r++]=t[e]})),new gt(s,!0)}}uploadData(){return this.data_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(t){let e;try{e=JSON.parse(t)}catch(n){return null}return z(e)?e:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(t){if(0===t.length)return null;const e=t.lastIndexOf("/");if(-1===e)return"";const n=t.slice(0,e);return n}function Rt(t,e){const n=e.split("/").filter((t=>t.length>0)).join("/");return 0===t.length?n:t+"/"+n}function Tt(t){const e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(t,e){return e}class vt{constructor(t,e,n,s){this.server=t,this.local=e||t,this.writable=!!n,this.xform=s||wt}}let Et=null;function kt(t){return!H(t)||t.length<2?t:Tt(t)}function yt(){if(Et)return Et;const t=[];function e(t,e){return kt(e)}t.push(new vt("bucket")),t.push(new vt("generation")),t.push(new vt("metageneration")),t.push(new vt("name","fullPath",!0));const n=new vt("name");function s(t,e){return void 0!==e?Number(e):e}n.xform=e,t.push(n);const r=new vt("size");return r.xform=s,t.push(r),t.push(new vt("timeCreated")),t.push(new vt("updated")),t.push(new vt("md5Hash",null,!0)),t.push(new vt("cacheControl",null,!0)),t.push(new vt("contentDisposition",null,!0)),t.push(new vt("contentEncoding",null,!0)),t.push(new vt("contentLanguage",null,!0)),t.push(new vt("contentType",null,!0)),t.push(new vt("metadata","customMetadata",!0)),Et=t,Et}function Ot(t,e){function n(){const n=t["bucket"],s=t["fullPath"],r=new D(n,s);return e._makeStorageReference(r)}Object.defineProperty(t,"ref",{get:n})}function Ut(t,e,n){const s={type:"file"},r=n.length;for(let o=0;o<r;o++){const t=n[o];s[t.local]=t.xform(s,e[t.server])}return Ot(s,t),s}function Ct(t,e,n){const s=mt(e);if(null===s)return null;const r=s;return Ut(t,r,n)}function At(t,e,n,s){const r=mt(e);if(null===r)return null;if(!H(r["downloadTokens"]))return null;const o=r["downloadTokens"];if(0===o.length)return null;const i=encodeURIComponent,a=o.split(","),c=a.map((e=>{const r=t["bucket"],o=t["fullPath"],a="/b/"+i(r)+"/o/"+i(o),c=G(a,n,s),u=X({alt:"media",token:e});return c+u}));return c[0]}function Nt(t,e){const n={},s=e.length;for(let r=0;r<s;r++){const s=e[r];s.writable&&(n[s.server]=t[s.local])}return JSON.stringify(n)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(t,e,n,s){this.url=t,this.method=e,this.handler=n,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(t){if(!t)throw f()}function xt(t,e){function n(n,s){const r=Ct(t,s,e);return St(null!==r),r}return n}function Pt(t,e){function n(n,s){const r=Ct(t,s,e);return St(null!==r),At(r,s,t.host,t._protocol)}return n}function Dt(t){function e(e,n){let s;return s=401===e.getStatus()?e.getErrorText().includes("Firebase App Check token is invalid")?R():b():402===e.getStatus()?m(t.bucket):403===e.getStatus()?T(t.path):n,s.status=e.getStatus(),s.serverResponse=n.serverResponse,s}return e}function Lt(t){const e=Dt(t);function n(n,s){let r=e(n,s);return 404===n.getStatus()&&(r=g(t.path)),r.serverResponse=s.serverResponse,r}return n}function Bt(t,e,n){const s=e.fullServerUrl(),r=G(s,t.host,t._protocol),o="GET",i=t.maxOperationRetryTime,a=new It(r,o,xt(t,n),i);return a.errorHandler=Lt(e),a}function Mt(t,e,n){const s=e.fullServerUrl(),r=G(s,t.host,t._protocol),o="GET",i=t.maxOperationRetryTime,a=new It(r,o,Pt(t,n),i);return a.errorHandler=Lt(e),a}function Ft(t,e){const n=e.fullServerUrl(),s=G(n,t.host,t._protocol),r="DELETE",o=t.maxOperationRetryTime;function i(t,e){}const a=new It(s,r,i,o);return a.successCodes=[200,204],a.errorHandler=Lt(e),a}function qt(t,e){return t&&t["contentType"]||e&&e.type()||"application/octet-stream"}function zt(t,e,n){const s=Object.assign({},n);return s["fullPath"]=t.path,s["size"]=e.size(),s["contentType"]||(s["contentType"]=qt(null,e)),s}function Ht(t,e,n,s,r){const o=e.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function a(){let t="";for(let e=0;e<2;e++)t+=Math.random().toString().slice(2);return t}const c=a();i["Content-Type"]="multipart/related; boundary="+c;const u=zt(e,s,r),l=Nt(u,n),h="--"+c+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+l+"\r\n--"+c+"\r\nContent-Type: "+u["contentType"]+"\r\n\r\n",_="\r\n--"+c+"--",d=gt.getBlob(h,s,_);if(null===d)throw O();const p={name:u["fullPath"]},f=G(o,t.host,t._protocol),g="POST",m=t.maxUploadRetryTime,b=new It(f,g,xt(t,n),m);return b.urlParams=p,b.headers=i,b.body=d.uploadData(),b.errorHandler=Dt(e),b}class $t{constructor(t,e,n,s){this.current=t,this.total=e,this.finalized=!!n,this.metadata=s||null}}function jt(t,e){let n=null;try{n=t.getResponseHeader("X-Goog-Upload-Status")}catch(r){St(!1)}const s=e||["active"];return St(!!n&&-1!==s.indexOf(n)),n}function Vt(t,e,n,s,r){const o=e.bucketOnlyServerUrl(),i=zt(e,s,r),a={name:i["fullPath"]},c=G(o,t.host,t._protocol),u="POST",l={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${s.size()}`,"X-Goog-Upload-Header-Content-Type":i["contentType"],"Content-Type":"application/json; charset=utf-8"},h=Nt(i,n),_=t.maxUploadRetryTime;function d(t){let e;jt(t);try{e=t.getResponseHeader("X-Goog-Upload-URL")}catch(n){St(!1)}return St(H(e)),e}const p=new It(c,u,d,_);return p.urlParams=a,p.headers=l,p.body=h,p.errorHandler=Dt(e),p}function Gt(t,e,n,s){const r={"X-Goog-Upload-Command":"query"};function o(t){const e=jt(t,["active","final"]);let n=null;try{n=t.getResponseHeader("X-Goog-Upload-Size-Received")}catch(o){St(!1)}n||St(!1);const r=Number(n);return St(!isNaN(r)),new $t(r,s.size(),"final"===e)}const i="POST",a=t.maxUploadRetryTime,c=new It(n,i,o,a);return c.headers=r,c.errorHandler=Dt(e),c}const Xt=262144;function Kt(t,e,n,s,r,o,i,a){const c=new $t(0,0);if(i?(c.current=i.current,c.total=i.total):(c.current=0,c.total=s.size()),s.size()!==c.total)throw U();const u=c.total-c.current;let l=u;r>0&&(l=Math.min(l,r));const h=c.current,_=h+l;let d="";d=0===l?"finalize":u===l?"upload, finalize":"upload";const p={"X-Goog-Upload-Command":d,"X-Goog-Upload-Offset":`${c.current}`},f=s.slice(h,_);if(null===f)throw O();function g(t,n){const r=jt(t,["active","final"]),i=c.current+l,a=s.size();let u;return u="final"===r?xt(e,o)(t,n):null,new $t(i,a,"final"===r,u)}const m="POST",b=e.maxUploadRetryTime,R=new It(n,m,g,b);return R.headers=p,R.body=f.uploadData(),R.progressCallback=a||null,R.errorHandler=Dt(t),R}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Zt(t){switch(t){case"running":case"pausing":case"canceling":return Wt.RUNNING;case"paused":return Wt.PAUSED;case"success":return Wt.SUCCESS;case"canceled":return Wt.CANCELED;case"error":return Wt.ERROR;default:return Wt.ERROR}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(t,e,n){const s=q(t)||null!=e||null!=n;if(s)this.next=t,this.error=null!==e&&void 0!==e?e:void 0,this.complete=null!==n&&void 0!==n?n:void 0;else{const e=t;this.next=e.next,this.error=e.error,this.complete=e.complete}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(t){return(...e)=>{Promise.resolve().then((()=>t(...e)))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qt=null;class te{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=d.NO_ERROR,this.sendPromise_=new Promise((t=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=d.ABORT,t()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=d.NETWORK_ERROR,t()})),this.xhr_.addEventListener("load",(()=>{t()}))}))}send(t,e,n,s){if(this.sent_)throw P("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==s)for(const r in s)s.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,s[r].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw P("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw P("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponse(){if(!this.sent_)throw P("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw P("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}class ee extends te{initXhr(){this.xhr_.responseType="text"}}function ne(){return Qt?Qt():new ee}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class se{constructor(t,e,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=t,this._blob=e,this._metadata=n,this._mappings=yt(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=t=>{if(this._request=void 0,this._chunkMultiplier=1,t._codeEquals(_.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const e=this.isExponentialBackoffExpired();if(K(t.status,[])){if(!e)return this.sleepTime=Math.max(2*this.sleepTime,l),this._needToFetchStatus=!0,void this.completeTransitions_();t=w()}this._error=t,this._transition("error")}},this._metadataErrorHandler=t=>{this._request=void 0,t._codeEquals(_.CANCELED)?this.completeTransitions_():(this._error=t,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise(((t,e)=>{this._resolve=t,this._reject=e,this._start()})),this._promise.then(null,(()=>{}))}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const t=this._transferred;return e=>this._updateProgress(t+e)}_shouldDoResumable(t){return t.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout((()=>{this.pendingTimeout=void 0,this._continueUpload()}),this.sleepTime):this._oneShotUpload())}_resolveToken(t){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then((([e,n])=>{switch(this._state){case"running":t(e,n);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}}))}_createResumable(){this._resolveToken(((t,e)=>{const n=Vt(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,ne,t,e);this._request=s,s.getPromise().then((t=>{this._request=void 0,this._uploadUrl=t,this._needToFetchStatus=!1,this.completeTransitions_()}),this._errorHandler)}))}_fetchStatus(){const t=this._uploadUrl;this._resolveToken(((e,n)=>{const s=Gt(this._ref.storage,this._ref._location,t,this._blob),r=this._ref.storage._makeRequest(s,ne,e,n);this._request=r,r.getPromise().then((t=>{this._request=void 0,this._updateProgress(t.current),this._needToFetchStatus=!1,t.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()}),this._errorHandler)}))}_continueUpload(){const t=Xt*this._chunkMultiplier,e=new $t(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken(((s,r)=>{let o;try{o=Kt(this._ref._location,this._ref.storage,n,this._blob,t,this._mappings,e,this._makeProgressCallback())}catch(a){return this._error=a,void this._transition("error")}const i=this._ref.storage._makeRequest(o,ne,s,r,!1);this._request=i,i.getPromise().then((t=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(t.current),t.finalized?(this._metadata=t.metadata,this._transition("success")):this.completeTransitions_()}),this._errorHandler)}))}_increaseMultiplier(){const t=Xt*this._chunkMultiplier;2*t<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken(((t,e)=>{const n=Bt(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(n,ne,t,e);this._request=s,s.getPromise().then((t=>{this._request=void 0,this._metadata=t,this._transition("success")}),this._metadataErrorHandler)}))}_oneShotUpload(){this._resolveToken(((t,e)=>{const n=Ht(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,ne,t,e);this._request=s,s.getPromise().then((t=>{this._request=void 0,this._metadata=t,this._updateProgress(this._blob.size()),this._transition("success")}),this._errorHandler)}))}_updateProgress(t){const e=this._transferred;this._transferred=t,this._transferred!==e&&this._notifyObservers()}_transition(t){if(this._state!==t)switch(t){case"canceling":case"pausing":this._state=t,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const e="paused"===this._state;this._state=t,e&&(this._notifyObservers(),this._start());break;case"paused":this._state=t,this._notifyObservers();break;case"canceled":this._error=v(),this._state=t,this._notifyObservers();break;case"error":this._state=t,this._notifyObservers();break;case"success":this._state=t,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const t=Zt(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:t,metadata:this._metadata,task:this,ref:this._ref}}on(t,e,n,s){const r=new Jt(e||void 0,n||void 0,s||void 0);return this._addObserver(r),()=>{this._removeObserver(r)}}then(t,e){return this._promise.then(t,e)}catch(t){return this.then(null,t)}_addObserver(t){this._observers.push(t),this._notifyObserver(t)}_removeObserver(t){const e=this._observers.indexOf(t);-1!==e&&this._observers.splice(e,1)}_notifyObservers(){this._finishPromise();const t=this._observers.slice();t.forEach((t=>{this._notifyObserver(t)}))}_finishPromise(){if(void 0!==this._resolve){let t=!0;switch(Zt(this._state)){case Wt.SUCCESS:Yt(this._resolve.bind(null,this.snapshot))();break;case Wt.CANCELED:case Wt.ERROR:const e=this._reject;Yt(e.bind(null,this._error))();break;default:t=!1;break}t&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(t){const e=Zt(this._state);switch(e){case Wt.RUNNING:case Wt.PAUSED:t.next&&Yt(t.next.bind(t,this.snapshot))();break;case Wt.SUCCESS:t.complete&&Yt(t.complete.bind(t))();break;case Wt.CANCELED:case Wt.ERROR:t.error&&Yt(t.error.bind(t,this._error))();break;default:t.error&&Yt(t.error.bind(t,this._error))()}}resume(){const t="paused"===this._state||"pausing"===this._state;return t&&this._transition("running"),t}pause(){const t="running"===this._state;return t&&this._transition("pausing"),t}cancel(){const t="running"===this._state||"pausing"===this._state;return t&&this._transition("canceling"),t}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(t,e){this._service=t,this._location=e instanceof D?e:D.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new re(t,e)}get root(){const t=new D(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Tt(this._location.path)}get storage(){return this._service}get parent(){const t=bt(this._location.path);if(null===t)return null;const e=new D(this._location.bucket,t);return new re(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw S(t)}}function oe(t,e,n){return t._throwIfRoot("uploadBytesResumable"),new se(t,new gt(e),n)}function ie(t){t._throwIfRoot("getDownloadURL");const e=Mt(t.storage,t._location,yt());return t.storage.makeRequestWithTokens(e,ne).then((t=>{if(null===t)throw C();return t}))}function ae(t){t._throwIfRoot("deleteObject");const e=Ft(t.storage,t._location);return t.storage.makeRequestWithTokens(e,ne)}function ce(t,e){const n=Rt(t._location.path,e),s=new D(t._location.bucket,n);return new re(t.storage,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(t){return/^[A-Za-z]+:\/\//.test(t)}function le(t,e){return new re(t,e)}function he(t,e){if(t instanceof fe){const n=t;if(null==n._bucket)throw y();const s=new re(n,n._bucket);return null!=e?he(s,e):s}return void 0!==e?ce(t,e):t}function _e(t,e){if(e&&ue(e)){if(t instanceof fe)return le(t,e);throw N("To use ref(service, url), the first argument must be a Storage instance.")}return he(t,e)}function de(t,e){const n=null===e||void 0===e?void 0:e[a];return null==n?null:D.makeFromBucketSpec(n,t)}function pe(t,e,n,s={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:o}=s;o&&(t._overrideAuthToken="string"===typeof o?o:(0,r.Fy)(o,t.app.options.projectId))}class fe{constructor(t,e,n,s,r){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._url=s,this._firebaseVersion=r,this._bucket=null,this._host=i,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=c,this._maxUploadRetryTime=u,this._requests=new Set,this._bucket=null!=s?D.makeFromBucketSpec(s,this._host):de(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=D.makeFromBucketSpec(this._url,t):this._bucket=de(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){V("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){V("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(null!==e)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();return e.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((t=>t.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new re(this,t)}_makeRequest(t,e,n,s,r=!0){if(this._deleted)return new L(I());{const o=et(t,this._appId,n,s,e,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then((()=>this._requests.delete(o)),(()=>this._requests.delete(o))),o}}async makeRequestWithTokens(t,e){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n,s).getPromise()}}const ge="@firebase/storage",me="0.11.2",be="storage";function Re(t,e,n){return t=(0,r.Ku)(t),oe(t,e,n)}function Te(t){return t=(0,r.Ku)(t),ie(t)}function we(t){return t=(0,r.Ku)(t),ae(t)}function ve(t,e){return t=(0,r.Ku)(t),_e(t,e)}function Ee(t=(0,s.Sx)(),e){t=(0,r.Ku)(t);const n=(0,s.j6)(t,be),o=n.getImmediate({identifier:e}),i=(0,r.yU)("storage");return i&&ke(o,...i),o}function ke(t,e,n,s={}){pe(t,e,n,s)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new fe(n,r,o,e,s.MF)}function Oe(){(0,s.om)(new o.uA(be,ye,"PUBLIC").setMultipleInstances(!0)),(0,s.KO)(ge,me,""),(0,s.KO)(ge,me,"esm2017")}Oe()}}]);
//# sourceMappingURL=904.4893f5a0.js.map