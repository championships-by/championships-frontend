const Queries = {
    getMatches: async (event_id,nomination_id) => {
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
            `${API_PATH}/match/get_group_matches?event_id=${event_id}&nomination_id=${nomination_id}`,
            requestOptions
        )
        let responseJson = await response.json()
        return responseJson
    },
    setMatches: async (event_id,nomination_id,match,team1Score,team2Score) => {
        let data = {
            nomination_event: {
              event_id:event_id,
              nomination_id: nomination_id,
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
}

export default Queries


