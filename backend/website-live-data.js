"use strict";
function createLiveSnapshot(db,AggregateField){
const fields=[{id:"power",field:"totalScore"},{id:"hero",field:"heroPowerBest",detail:"heroBestName"},{id:"townhall",field:"townHallLevel"},{id:"kills",field:"troopKills"}];
const num=v=>Number.isFinite(Number(v)) ? Number(v) : 0;
const str=v=>typeof v === "string" ? v.trim().slice(0,120) : "";
async function buildSnapshot() {
  const players=db.collection("players"),alliances=db.collection("alliances");
  const [count,kills,allianceCount,last,ranks,arena,teamArena,topAlliances]=await Promise.all([
    players.count().get(),players.aggregate({kills:AggregateField.sum("troopKills")}).get(),alliances.count().get(),
    players.orderBy("lastOnline","desc").limit(1).select("lastOnline").get(),
    Promise.all(fields.map(async f=>{
      const snapshot=await players.orderBy(f.field,"desc").limit(10).select("displayName","avatarIconId",f.field,...(f.detail?[f.detail]:[])).get();
      return snapshot.docs.filter(d=>num(d.get(f.field))>0).map(d=>({id:d.id,name:str(d.get("displayName"))||"Unnamed commander",value:num(d.get(f.field)),
        ...(f.detail?{detail:str(d.get(f.detail))}:{}),avatar:d.get("avatarIconId")||""}));
    })),
    ladder("arena",5),ladder("teamarena",4),alliances.orderBy("totalPower","desc").limit(6)
      .select("name","tag","totalPower","memberCount","level","allianceExp","territoryColor").get(),
  ]);
  const seen=last.docs[0]?.get("lastOnline")?.toMillis?.();
  return {generatedAt:Date.now(),pulse:{commanders:count.data().count,alliances:allianceCount.data().count,troopKills:num(kills.data().kills),
    topPower:ranks[0]?.[0]?.value||0,lastSeenMinutes:seen?Math.max(0,Math.round((Date.now()-seen)/60000)):null},
    ranks:Object.fromEntries(fields.map((f,i)=>[f.id,ranks[i]])),arena,teamArena,
    alliances:topAlliances.docs.map(d=>({id:d.id,name:str(d.get("name"))||"Unnamed",tag:str(d.get("tag"))||"???",power:num(d.get("totalPower")),
      members:num(d.get("memberCount")),level:Math.max(1,num(d.get("level"))),exp:num(d.get("allianceExp")),color:/^#[0-9a-f]{6}$/i.test(d.get("territoryColor"))?d.get("territoryColor"):"#f0c14d"})),
  };
}
async function ladder(collection,count) {
  const snapshot=await db.collection(collection).orderBy("points","desc").limit(count)
    .select("name","points","wins","losses","defensePower","totalPower","isBot","avatarIconId","heroIds","heroNames","heroPower","teamPower").get();
  return snapshot.docs.map(d=>{
    const x=d.data(),ids=Array.isArray(x.heroIds)?x.heroIds:[];
    return {id:d.id,name:str(x.name)||"Commander",points:num(x.points),wins:num(x.wins),losses:num(x.losses),defensePower:num(x.defensePower)||num(x.totalPower),
      isBot:x.isBot===true,avatar:x.avatarIconId||"",heroes:ids.map((id,i)=>({id:String(id),name:str(x.heroNames?.[i])||String(id),power:num(x.heroPower?.[i])})),
      teamPower:Array.isArray(x.teamPower)?x.teamPower.map(num):[]};
  });
}
return buildSnapshot;
}
module.exports={createLiveSnapshot};
