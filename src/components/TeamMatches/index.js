import {Component} from 'react'
import {withRouter, useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(eachMatch => ({
        umpires: eachMatch.umpires,
        result: eachMatch.result,
        manOfTheMatch: eachMatch.man_of_the_match,
        id: eachMatch.id,
        date: eachMatch.date,
        venue: eachMatch.venue,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        firstInnings: eachMatch.first_innings,
        secondInnings: eachMatch.second_innings,
        matchStatus: eachMatch.match_status,
      })),
    }

    this.setState({
      teamBannerUrl: updatedData.teamBannerUrl,
      latestMatch: updatedData.latestMatch,
      recentMatches: updatedData.recentMatches,
      isLoading: false,
    })
  }

  handleBack = () => {
    const {history} = this.props
    history.push('/')
  }

  renderTeamMatches = () => {
    const {teamBannerUrl, latestMatch, recentMatches} = this.state

    const wins = recentMatches.filter(match => match.matchStatus === 'Won')
      .length
    const losses = recentMatches.filter(match => match.matchStatus === 'Lost')
      .length
    const draws = recentMatches.filter(match => match.matchStatus === 'Draw')
      .length

    const statsData = [
      {name: 'Wins', value: wins, color: '#4CAF50'},
      {name: 'Losses', value: losses, color: '#F44336'},
      {name: 'Draws', value: draws, color: '#FFC107'},
    ]

    return (
      <div className="team-matches-content">
        {/* Back Button */}
        <button type="button" className="back-button" onClick={this.handleBack}>
          ← Back to Home
        </button>

        {/* Team Banner */}
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />

        {/* Latest Match */}
        <LatestMatch details={latestMatch} />

        {/* Pie Chart Section */}
        <div className="pie-chart-container">
          <h3 className="chart-title">Match Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart data-testid="pieChart">
              <Pie
                data={statsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statsData.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Matches */}
        <ul className="recent-matches-list">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

// ✅ Wrapper for hooks
const TeamMatchesWrapper = props => {
  const params = useParams()
  return <TeamMatches {...props} match={{params}} />
}

export default withRouter(TeamMatchesWrapper)
