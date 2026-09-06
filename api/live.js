import {encodeUid} from './_token.js'
import {initializeApp,getApps} from 'firebase/app'
import {getAuth,signInAnonymously} from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyA67N3HcTbJT1f-I3gGelYuwhSxSa85M38',
  authDomain: 'dinodominion-289b0.firebaseapp.com',
  projectId: 'dinodominion-289b0',
  storageBucket: 'dinodominion-289b0.firebasestorage.app',
  messagingSenderId: '143942581338',
  appId: '1:143942581338:android:cdf4c0bb076c21550e2c63',
}

let session=null
async function token(){
 session ??= (async()=>{const app=getApps().length?getApps()[0]:initializeApp(firebaseConfig);return (await signInAnonymously(getAuth(app))).user})().catch(e=>{session=null;throw e})
 return (await session).getIdToken()
}
function avatarId(raw,seed){
 const n=Number(typeof raw==='string'?raw.replace(/\D+/g,''):raw)
 if(Number.isInteger(n)&&n>=1&&n<=10)return n
 let hash=0;for(const c of seed)hash=(hash*31+c.charCodeAt(0))>>>0
 return hash%10+1
}
export function publicSnapshot(data){
 const row=({id,avatar,...rest})=>({...rest,token:encodeUid(id),avatar:avatarId(avatar,id)})
 return {...data,ranks:Object.fromEntries(Object.entries(data.ranks).map(([key,rows])=>[key,rows.map(row)])),arena:data.arena.map(row),teamArena:data.teamArena.map(row)}
}
export function createLiveHandler(request=fetch,getToken=token){
 return async(req,res)=>{
  res.setHeader('Cache-Control','no-store')
  if(req.method!=='GET')return res.status(405).json({error:'method_not_allowed'})
  try{
   const response=await request('https://europe-west1-dinodominion-289b0.cloudfunctions.net/websiteLive',{headers:{Authorization:'Bearer '+await getToken()},signal:AbortSignal.timeout(25000)})
   if(!response.ok)throw Error('live_unavailable')
   const data=publicSnapshot(await response.json())
   res.setHeader('Cache-Control','public, s-maxage=1200, stale-while-revalidate=600')
   return res.status(200).json(data)
  }catch{return res.status(503).json({error:'live_unavailable'})}
 }
}
export default createLiveHandler()
