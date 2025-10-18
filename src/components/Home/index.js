import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamsList: [],
    isLoading: true, // loader must start true
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const data = await response.json()
      const updatedData = data.teams.map(each => ({
        id: each.id,
        name: each.name,
        teamImageUrl: each.team_image_url,
      }))
      // loader hides only after data updates
      this.setState({teamsList: updatedData, isLoading: false})
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  renderTeamsList = () => {
    const {teamsList} = this.state
    return (
      <ul className="teams-list">
        {teamsList.map(team => (
          <TeamCard key={team.id} teamDetails={team} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-container">
        <div className="ipl-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>

        {isLoading ? (
          // ✅ must be wrapped in a container with testid="loader"
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamsList()
        )}
      </div>
    )
  }
}

export default Home
