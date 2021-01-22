import React, { Component } from 'react'
import {connect } from 'react-redux'

import Search from '../component/search/Search'
import SearchResult from '../component/search/SearchResult'

import * as actions from '../redux/search/action'

class SearchContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '' // input에 입력되는 value
    }
  }

  // arrow function으로 작성하면 bind(this) 할 필요없다
  onChanageInput = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Search
          name={this.state.name}
          onSearch={this.props.onSearch}
          onChangeInput={this.onChanageInput}
        />
        {
          this.props.error?<div>Something wrong!</div>
            :
            <SearchResult
              data={this.props.data}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data : state.search.data,
    error: state.search.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (text) => {
      dispatch({type: actions.SEARCH, payload: text});
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)(SearchContainer);