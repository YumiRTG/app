import test from 'node:test'
import assert from 'node:assert/strict'
import {createLiveHandler,publicSnapshot} from '../api/live.js'
import {decodeToken} from '../api/_token.js'
const fixture=()=>({generatedAt:1,pulse:{commanders:2},ranks:{power:[{id:'emulator-player',name:'Example',avatar:'icon2',value:42}]},arena:[{id:'emulator-arena',avatar:3}],teamArena:[],alliances:[]})
function response(){return {headers:{},setHeader(k,v){this.headers[k]=v},status(s){this.statusCode=s;return this},json(v){this.body=v;return this}}}
test('public snapshot preserves standings and strips every player account id',()=>{
 process.env.PROFILE_TOKEN_SECRET='test-only-secret-at-least-thirty-two-characters'
 const data=publicSnapshot(fixture())
 assert.equal(data.ranks.power[0].value,42)
 assert.equal(decodeToken(data.ranks.power[0].token),'emulator-player')
 assert.equal(data.ranks.power[0].avatar,2)
 assert.ok(!JSON.stringify(data).includes('emulator-'))
})
test('live proxy uses verified backend projection and caches only success',async()=>{
 const res=response();let called=0
 await createLiveHandler(async(url,options)=>{called++;assert.match(url,/websiteLive$/);assert.equal(options.headers.Authorization,'Bearer test');return {ok:true,json:async()=>fixture()}},async()=>'test')({method:'GET'},res)
 assert.equal(called,1);assert.equal(res.statusCode,200);assert.match(res.headers['Cache-Control'],/s-maxage=1200/)
})
test('transient upstream errors do not poison the CDN with a 200 error for twenty minutes',async()=>{
 const res=response()
 await createLiveHandler(async()=>({ok:false}),async()=>'test')({method:'GET'},res)
 assert.equal(res.statusCode,503);assert.equal(res.headers['Cache-Control'],'no-store')
})
