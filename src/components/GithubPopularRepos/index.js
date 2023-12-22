import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repoitems: [],
    apiStatus: apiStatusConstant.initial,
    queryParams: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const {queryParams} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${queryParams}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repoitems: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  updateQueryParams = activeId => {
    this.setState({queryParams: activeId}, this.getRepos)
  }

  renderSuccessView = () => {
    const {repoitems} = this.state
    return (
      <ul className="repo-items-cont">
        {repoitems.map(each => (
          <RepositoryItem key={each.id} itemData={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderApiResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {queryParams} = this.state
    return (
      <div className="main-container">
        <h1 className="main-head">Popular</h1>
        <ul className="language-buttons">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              isActive={each.id === queryParams}
              languageDetails={each}
              updateQueryParams={this.updateQueryParams}
            />
          ))}
        </ul>
        {this.renderApiResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
