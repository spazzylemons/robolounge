let wasm_bindgen;!function(){const n={};let t,e;t="undefined"==typeof document?location.href:new URL(document.currentScript.src,location.href).toString();const _=new Array(128).fill(void 0);function r(n){return _[n]}_.push(void 0,null,!0,!1);let o=_.length;function c(n){o===_.length&&_.push(_.length+1);const t=o;return o=_[t],_[t]=n,t}function i(n){const t=r(n);return function(n){n<132||(_[n]=o,o=n)}(n),t}let b=0,u=null;function a(){return null!==u&&0!==u.byteLength||(u=new Uint8Array(e.memory.buffer)),u}const f=new TextEncoder("utf-8"),g="function"==typeof f.encodeInto?function(n,t){return f.encodeInto(n,t)}:function(n,t){const e=f.encode(n);return t.set(e),{read:n.length,written:e.length}};function w(n,t,e){if(void 0===e){const e=f.encode(n),_=t(e.length);return a().subarray(_,_+e.length).set(e),b=e.length,_}let _=n.length,r=t(_);const o=a();let c=0;for(;c<_;c++){const t=n.charCodeAt(c);if(t>127)break;o[r+c]=t}if(c!==_){0!==c&&(n=n.slice(c)),r=e(r,_,_=c+3*n.length);const t=a().subarray(r+c,r+_);c+=g(n,t).written}return b=c,r}function s(n){return null==n}let l=null;function d(){return null!==l&&0!==l.byteLength||(l=new Int32Array(e.memory.buffer)),l}let m=null;const y=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});function h(n,t){return y.decode(a().subarray(n,n+t))}function p(n){const t=typeof n;if("number"==t||"boolean"==t||null==n)return`${n}`;if("string"==t)return`"${n}"`;if("symbol"==t){const t=n.description;return null==t?"Symbol":`Symbol(${t})`}if("function"==t){const t=n.name;return"string"==typeof t&&t.length>0?`Function(${t})`:"Function"}if(Array.isArray(n)){const t=n.length;let e="[";t>0&&(e+=p(n[0]));for(let _=1;_<t;_++)e+=", "+p(n[_]);return e+="]",e}const e=/\[object ([^\]]+)\]/.exec(toString.call(n));let _;if(!(e.length>1))return toString.call(n);if(_=e[1],"Object"==_)try{return"Object("+JSON.stringify(n)+")"}catch(n){return"Object"}return n instanceof Error?`${n.name}: ${n.message}\n${n.stack}`:_}function v(n,t,_,r){const o={a:n,b:t,cnt:1,dtor:_},c=(...n)=>{o.cnt++;try{return r(o.a,o.b,...n)}finally{0==--o.cnt&&(e.__wbindgen_export_2.get(o.dtor)(o.a,o.b),o.a=0)}};return c.original=o,c}function A(n,t,_){e._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h09a5866c50298f01(n,t,c(_))}function W(n,t){e._dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he59035713c104cad(n,t)}function R(n,t){e._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h86f4c198bd643d7c(n,t)}function x(n,t){try{return n.apply(this,t)}catch(n){e.__wbindgen_exn_store(c(n))}}function C(){const n={wbg:{}};return n.wbg.__wbg_document_950215a728589a2d=function(n){const t=r(n).document;return s(t)?0:c(t)},n.wbg.__wbg_instanceof_HtmlCanvasElement_f5f69dab93281ebe=function(n){let t;try{t=r(n)instanceof HTMLCanvasElement}catch{t=!1}return t},n.wbg.__wbg_setwidth_81c62bc806e0a727=function(n,t){r(n).width=t>>>0},n.wbg.__wbg_setheight_98cf0db22c40ef07=function(n,t){r(n).height=t>>>0},n.wbg.__wbg_getContext_3ae404b649cf9287=function(){return x((function(n,t,e){const _=r(n).getContext(h(t,e));return s(_)?0:c(_)}),arguments)},n.wbg.__wbg_instanceof_CanvasRenderingContext2d_3e95629461ed9f67=function(n){let t;try{t=r(n)instanceof CanvasRenderingContext2D}catch{t=!1}return t},n.wbg.__wbg_navigator_b18e629f7f0b75fa=function(n){return c(r(n).navigator)},n.wbg.__wbindgen_object_clone_ref=function(n){return c(r(n))},n.wbg.__wbg_performance_8629f414811abc46=function(n){const t=r(n).performance;return s(t)?0:c(t)},n.wbg.__wbindgen_object_drop_ref=function(n){i(n)},n.wbg.__wbg_now_c644db5194be8437=function(n){return r(n).now()},n.wbg.__wbg_preventDefault_16b2170b12f56317=function(n){r(n).preventDefault()},n.wbg.__wbg_touches_0014fdd3c869de3b=function(n){return c(r(n).touches)},n.wbg.__wbg_length_2c7ef1d09c0b4b3e=function(n){return r(n).length},n.wbg.__wbg_getBoundingClientRect_aaa701cbcb448965=function(n){return c(r(n).getBoundingClientRect())},n.wbg.__wbg_x_0938e87a3ff14a2e=function(n){return r(n).x},n.wbg.__wbg_y_b881176a43492948=function(n){return r(n).y},n.wbg.__wbg_width_f0cbf7dcbbe056da=function(n){return r(n).width},n.wbg.__wbg_height_e46975153da440ae=function(n){return r(n).height},n.wbg.__wbg_item_a04b92df1cf554e3=function(n,t){const e=r(n).item(t>>>0);return s(e)?0:c(e)},n.wbg.__wbg_clientX_8d9a4ab65b0a11ba=function(n){return r(n).clientX},n.wbg.__wbg_clientY_c3121337f79243c1=function(n){return r(n).clientY},n.wbg.__wbindgen_cb_drop=function(n){const t=i(n).original;if(1==t.cnt--)return t.a=0,!0;return!1},n.wbg.__wbg_requestAnimationFrame_afe426b568f84138=function(){return x((function(n,t){return r(n).requestAnimationFrame(r(t))}),arguments)},n.wbg.__wbg_getGamepads_4c461e89e0e20e75=function(){return x((function(n){return c(r(n).getGamepads())}),arguments)},n.wbg.__wbg_length_e498fbc24f9c1d4f=function(n){return r(n).length},n.wbg.__wbg_get_27fe3dac1c4d0224=function(n,t){return c(r(n)[t>>>0])},n.wbg.__wbg_instanceof_Gamepad_0698fd1eb36fffec=function(n){let t;try{t=r(n)instanceof Gamepad}catch{t=!1}return t},n.wbg.__wbg_mapping_6ef03dc7a02c4bef=function(n){return c(r(n).mapping)},n.wbg.__wbindgen_string_get=function(n,t){const _=r(t),o="string"==typeof _?_:void 0;var c=s(o)?0:w(o,e.__wbindgen_malloc,e.__wbindgen_realloc),i=b;d()[n/4+1]=i,d()[n/4+0]=c},n.wbg.__wbg_setAttribute_79c9562d32d05e66=function(){return x((function(n,t,e,_,o){r(n).setAttribute(h(t,e),h(_,o))}),arguments)},n.wbg.__wbg_axes_81f7594079c3e88c=function(n){return c(r(n).axes)},n.wbg.__wbg_at_155d8a5ce48004cd=function(n,t){return c(r(n).at(t))},n.wbg.__wbindgen_number_get=function(n,t){const _=r(t),o="number"==typeof _?_:void 0;(null!==m&&0!==m.byteLength||(m=new Float64Array(e.memory.buffer)),m)[n/8+1]=s(o)?0:o,d()[n/4+0]=!s(o)},n.wbg.__wbg_buttons_e33d9bb4a83e0700=function(n){return c(r(n).buttons)},n.wbg.__wbg_instanceof_GamepadButton_864adf3a175d234e=function(n){let t;try{t=r(n)instanceof GamepadButton}catch{t=!1}return t},n.wbg.__wbg_pressed_3b05e38d48c4c7ab=function(n){return r(n).pressed},n.wbg.__wbg_removeAttribute_ad7a5bf2eed30373=function(){return x((function(n,t,e){r(n).removeAttribute(h(t,e))}),arguments)},n.wbg.__wbindgen_string_new=function(n,t){return c(h(n,t))},n.wbg.__wbg_setfillStyle_b065cfad34a78974=function(n,t){r(n).fillStyle=r(t)},n.wbg.__wbg_fillRect_f63ba845233f000a=function(n,t,e,_,o){r(n).fillRect(t,e,_,o)},n.wbg.__wbg_setlineWidth_2b5a5da5c4bf4084=function(n,t){r(n).lineWidth=t},n.wbg.__wbg_setstrokeStyle_073fc10b086c1727=function(n,t){r(n).strokeStyle=r(t)},n.wbg.__wbg_beginPath_0948db80d0d23ce3=function(n){r(n).beginPath()},n.wbg.__wbg_moveTo_b0d9695c44d309f0=function(n,t,e){r(n).moveTo(t,e)},n.wbg.__wbg_lineTo_b902f35217ff96ab=function(n,t,e){r(n).lineTo(t,e)},n.wbg.__wbg_stroke_6e1b85c72caa53ea=function(n){r(n).stroke()},n.wbg.__wbg_new_abda76e883ba8a5f=function(){return c(new Error)},n.wbg.__wbg_stack_658279fe44541cf6=function(n,t){const _=w(r(t).stack,e.__wbindgen_malloc,e.__wbindgen_realloc),o=b;d()[n/4+1]=o,d()[n/4+0]=_},n.wbg.__wbg_error_f851667af71bcfc6=function(n,t){try{console.error(h(n,t))}finally{e.__wbindgen_free(n,t)}},n.wbg.__wbg_self_e7c1f827057f6584=function(){return x((function(){return c(self.self)}),arguments)},n.wbg.__wbg_window_a09ec664e14b1b81=function(){return x((function(){return c(window.window)}),arguments)},n.wbg.__wbg_globalThis_87cbb8506fecf3a9=function(){return x((function(){return c(globalThis.globalThis)}),arguments)},n.wbg.__wbg_global_c85a9259e621f3db=function(){return x((function(){return c(global.global)}),arguments)},n.wbg.__wbindgen_is_undefined=function(n){return void 0===r(n)},n.wbg.__wbg_newnoargs_2b8b6bd7753c76ba=function(n,t){return c(new Function(h(n,t)))},n.wbg.__wbg_call_95d1ea488d03e4e8=function(){return x((function(n,t){return c(r(n).call(r(t)))}),arguments)},n.wbg.__wbindgen_debug_string=function(n,t){const _=w(p(r(t)),e.__wbindgen_malloc,e.__wbindgen_realloc),o=b;d()[n/4+1]=o,d()[n/4+0]=_},n.wbg.__wbindgen_throw=function(n,t){throw new Error(h(n,t))},n.wbg.__wbg_getElementById_eb93a47327bb5585=function(n,t,e){const _=r(n).getElementById(h(t,e));return s(_)?0:c(_)},n.wbg.__wbg_instanceof_Window_e266f02eee43b570=function(n){let t;try{t=r(n)instanceof Window}catch{t=!1}return t},n.wbg.__wbg_width_a40e21a22129b197=function(n){return r(n).width},n.wbg.__wbg_height_98d51321254345a5=function(n){return r(n).height},n.wbg.__wbg_key_f0decac219aa904b=function(n,t){const _=w(r(t).key,e.__wbindgen_malloc,e.__wbindgen_realloc),o=b;d()[n/4+1]=o,d()[n/4+0]=_},n.wbg.__wbg_addEventListener_615d4590d38da1c9=function(){return x((function(n,t,e,_){r(n).addEventListener(h(t,e),r(_))}),arguments)},n.wbg.__wbindgen_closure_wrapper83=function(n,t,e){return c(v(n,t,10,A))},n.wbg.__wbindgen_closure_wrapper84=function(n,t,e){return c(v(n,t,10,W))},n.wbg.__wbindgen_closure_wrapper88=function(n,t,e){return c(v(n,t,10,A))},n.wbg.__wbindgen_closure_wrapper90=function(n,t,_){const r=function(n,t,_,r){const o={a:n,b:t,cnt:1,dtor:_},c=(...n)=>{o.cnt++;const t=o.a;o.a=0;try{return r(t,o.b,...n)}finally{0==--o.cnt?e.__wbindgen_export_2.get(o.dtor)(t,o.b):o.a=t}};return c.original=o,c}(n,t,10,R);return c(r)},n}function S(n,t){return e=n.exports,k.__wbindgen_wasm_module=t,m=null,l=null,u=null,e.__wbindgen_start(),e}async function k(n){void 0===n&&(n=t.replace(/\.js$/,"_bg.wasm"));const e=C();("string"==typeof n||"function"==typeof Request&&n instanceof Request||"function"==typeof URL&&n instanceof URL)&&(n=fetch(n));const{instance:_,module:r}=await async function(n,t){if("function"==typeof Response&&n instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(n,t)}catch(t){if("application/wasm"==n.headers.get("Content-Type"))throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}const e=await n.arrayBuffer();return await WebAssembly.instantiate(e,t)}{const e=await WebAssembly.instantiate(n,t);return e instanceof WebAssembly.Instance?{instance:e,module:n}:e}}(await n,e);return S(_,r)}y.decode(),n.main=function(){e.main()},wasm_bindgen=Object.assign(k,{initSync:function(n){const t=C();return n instanceof WebAssembly.Module||(n=new WebAssembly.Module(n)),S(new WebAssembly.Instance(n,t),n)}},n)}();
