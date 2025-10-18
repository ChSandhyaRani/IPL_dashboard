import './index.css'

const MatchCard = ({matchDetails}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  const statusClass =
    matchStatus === 'Won' ? 'match-status won' : 'match-status lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-team-logo"
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={statusClass}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
