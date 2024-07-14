/* eslint-disable prettier/prettier */
import { useSearchParams } from 'react-router-dom'
 export async function getGroupStageQueries(){
    const [searchParams] = useSearchParams()
    const myHeaders = new Headers()
      myHeaders.append('accept', 'application/json')
      myHeaders.append('Content-Type', 'application/json')
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: null,
        redirect: 'follow',
        credentials: 'include',
      }
      const response = await fetch(
        `${API_PATH}/api/match/get_group_matches?event_id=${searchParams.get('event_id')}&nomination_id=${searchParams.get('nomination_id')}`,
        requestOptions
      )
      let responseJson = await response.json()
      return responseJson
}

export function sendMatchResult(match,team1Score,team2Score){
    const [searchParams] = useSearchParams()
    let data = {
        nomination_event: {
          event_id: searchParams.get('event_id'),
          nomination_id: searchParams.get('nomination_id')
        },
        match_id: match.match.match_id,
        team1_score: team1Score,
        team2_score: team2Score
      }
      
      fetch(`${API_PATH}/match/set_group_match_result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        credentials: 'include',
        body: JSON.stringify(data)
      })
      .then((response) => {
        if (response.ok) {
          window.location.reload()
        }
      })
}
