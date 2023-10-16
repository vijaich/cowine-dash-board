import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VacationCoverage from '../VaccinationCoverage'
import VacationByGender from '../VaccinationByGender'
import VacationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vacationList: [],
    vacationByAgeList: [],
    vacationByGenderList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJsonData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({
        vacationList: updatedJsonData.last7DaysVaccination,
        vacationByAgeList: updatedJsonData.vaccinationByAge,
        vacationByGenderList: updatedJsonData.vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVacationCoverage = () => {
    const {vacationList} = this.state
    return <VacationCoverage list={vacationList} />
  }

  renderVacationByGender = () => {
    const {vacationByGenderList} = this.state
    return <VacationByGender list={vacationByGenderList} />
  }

  renderVacationByAge = () => {
    const {vacationByAgeList} = this.state
    return <VacationByAge list={vacationByAgeList} />
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderCowineDashBoard = () => (
    <>
      {this.renderVacationCoverage()}
      {this.renderVacationByGender()}
      {this.renderVacationByAge()}
    </>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCowineDashBoard()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="logo-name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="website-name">Co-WIN</p>
        </div>
        <h1 className="website-description">CoWIN Vaccination in India</h1>
        <div className="bottom-charts-container">{this.renderApiStatus()}</div>
      </div>
    )
  }
}

export default CowinDashboard
