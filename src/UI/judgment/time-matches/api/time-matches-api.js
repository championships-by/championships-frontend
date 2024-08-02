export const timeMatchesApi = {
  getTimeMatches: async ({ eventId, nominationId }) => {
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
      `${API_PATH}/race_round/race_round?event_id=${eventId}&nomination_id=${nominationId}`,
      requestOptions
    )
    return await response.json()
  },
}
