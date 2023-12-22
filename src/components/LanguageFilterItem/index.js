import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateQueryParams, isActive} = props
  const {language, id} = languageDetails
  const onUpdateParams = () => {
    updateQueryParams(id)
  }
  const btnStyle = isActive ? 'normal selected' : 'normal'
  return (
    <li>
      <button type="button" className={btnStyle} onClick={onUpdateParams}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
