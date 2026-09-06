"use strict";
const {onRequest} = require("firebase-functions/v2/https");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore,AggregateField} = require("firebase-admin/firestore");
const db=getFirestore();
const buildSnapshot=require("./website-live-data").createLiveSnapshot(db,AggregateField);
let cache=null,pending=null;
// Public leaderboard projection only. No player private subcollections, caller
// filters or write operations. Raw ids travel server-to-server for profile tokens.
exports.websiteLive=onRequest({region:"europe-west1",memory:"256MiB",timeoutSeconds:30,maxInstances:2},async(req,res)=>{
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="GET" || Object.keys(req.query||{}).length) return res.status(400).json({error:"invalid_request"});
  try { const match=/^Bearer (\S+)$/.exec(req.get("Authorization")||""); if(!match) throw Error(); await getAuth().verifyIdToken(match[1]); }
  catch { return res.status(401).json({error:"invalid_token"}); }
  try {
    if(!cache || Date.now()-cache.generatedAt>=1200000) {
      pending ??= buildSnapshot().then(value=>{cache=value;return value;}).finally(()=>{pending=null;});
      await pending;
    }
    return res.status(200).json(cache);
  } catch { return res.status(503).json({error:"live_unavailable"}); }
});
