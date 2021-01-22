//// SearchResult.js
import React, {memo} from 'react'

const SearchResult = (props) => {
  const viewItems = (data) => {
    if(!data.data){
      return 'please search'
    } else{
      return <div>
        name: {data.data.pName}
      </div>
    }
  }

  return (
    <div>
      {viewItems(props.data)}
    </div>
  )

}

export default memo(SearchResult);