import './index.css'

const LatestMatch = ({details}) => {
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = details

  return (
    <div className="latest-match">
      <div className="latest-match-top">
        <div className="latest-left">
          <p className="team-name">{competingTeam}</p>
          <p className="match-date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="result">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="team-logo"
        />
      </div>

      <hr className="divider" />

      <div className="latest-match-bottom">
        <p>{firstInnings}</p>
        <p>{secondInnings}</p>
        <p>{manOfTheMatch}</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
