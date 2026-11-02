import { GAME_GUIDE } from '@/config/gameGuide'
import './GameplayShowcase.css'

export default function LiveTournamentInfo() {
  return (
    <section id="live-tournaments" className="live-tournament-info mt-14 md:mt-20" aria-labelledby="live-tournament-heading">
      <div className="sec-ornament mb-4 max-w-[240px]"><span>Live Arena</span></div>
      <h2 id="live-tournament-heading" className="display-lg text-white">Your turn.<br /><span className="text-gradient-gold">Their next move.</span></h2>
      <p className="body-lg mt-5 mb-8 max-w-3xl">Live Arena pairs two players for turn-based 3v3 battles. Each commander chooses abilities and targets on their turn. Three teams of three heroes compete in a best-of-three match; two round wins decide it.</p>
      <dl className="live-tournament-info__facts">
        <div><dt>Build your teams</dt><dd>Nine different heroes across three formations. Unlock Live Arena at Town Hall {GAME_GUIDE.liveArena.townHall} with {GAME_GUIDE.liveArena.heroes} heroes. Your levels, stars and equipment count.</dd></div>
        <div><dt>Make the call</dt><dd>You have {GAME_GUIDE.liveArena.turnSeconds} seconds to choose a skill and target on your turn. Missed decisions are handled automatically so the match keeps moving.</dd></div>
        <div><dt>Watch the competition</dt><dd>Spectators can follow ongoing qualification and tournament matches, including team changes and the final result.</dd></div>
      </dl>
      <h3 className="font-display text-2xl text-white uppercase mt-10">A new tournament every week</h3>
      <p className="font-body text-sm text-[var(--bone-dim)] mt-3">All times below use Game Time (UTC), the same clock shown in the game.</p>
      <dl className="live-tournament-info__schedule">
        <div><dt>Qualify</dt><dd>Monday 00:00 to Saturday 00:00 UTC. Climb the weekly rankings; the top {GAME_GUIDE.liveArena.finalists} qualifying players advance to the knockout bracket.</dd></div>
        <div><dt>Saturday</dt><dd>18:00 · Round of 64. 19:00 · Round of 32. 20:00 · Round of 16.</dd></div>
        <div><dt>Sunday</dt><dd>18:00 · Quarter-finals. 19:00 · Semi-finals. 20:00 · The final.</dd></div>
      </dl>
      <p className="font-body text-sm text-[var(--bone-dim)] mt-4">Scheduled matches continue automatically when a player is absent. Check the in-game bracket for the current season and your match.</p>
    </section>
  )
}
