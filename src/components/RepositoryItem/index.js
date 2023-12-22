// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = itemData
  return (
    <li className="card">
      <img src={avatarUrl} className="card-img" alt={name} />
      <h1 className="card-name">{name}</h1>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-img"
        />
        <p className="count-para">{starsCount} stars</p>
      </div>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-img"
        />
        <p className="count-para">{forksCount} forks</p>
      </div>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-img"
        />
        <p className="count-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
