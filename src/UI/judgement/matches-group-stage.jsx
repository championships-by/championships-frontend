/* eslint-disable prettier/prettier */
import { Card,  Tooltip, Table, ConfigProvider, Row, Col } from 'antd'
import { useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import ModalGroupStage from './modal-matches-group-stage'

function MatchesGroupStage() {
  const [dataMatches, setMatches] = useState([])


  const getMatches = (dataMatches) => {
    let result = []
    let matchNumber = 1
    dataMatches?.map((group) => {
      group?.matches.map((match) => {
        console.log(match)
        match.team1 = match.team1?.name
        match.team2 = match.team2?.name
        const { team1, team2, match_id, team1_score,team2_score } = match
        var team = { team1, team2, matchNumber,team1_score, team2_score,match_id }
        if (team.team1 === undefined) {
          team.team1 = 'Отсутствует'
        } else if (team.team2 === undefined) {
          team.team2 = 'Отсутствует'
        }
        result.push(team)
        matchNumber++
      })
    })
    
    return result
  }

  let data = getMatches(dataMatches)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    ;(async () => {
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
        `http://127.0.0.1:8000/api/match/get_group_matches?event_id=${searchParams.get('event_id')}&nomination_id=${searchParams.get('nomination_id')}`,
        requestOptions
      )
      let responseJson = await response.json()

      setMatches(responseJson)
      console.log(responseJson)
    })()
  }, [])

 
  const MatchCard = ( {match} ) => {
    let columns = [
      {
        title: <Tooltip title="Команды">Команды</Tooltip>,
        key: 'team1',
        render: (record) => (
          <div style={{alignItems: 'center' }}>
            <div>{record?.team1} </div>
            <div>{record?.team2} </div>
          </div>
        ),
      },
      {
        title: <Tooltip title="Результаты матча">Результат</Tooltip>,
        key: 'result',
        render: (record) => (
          <div >
              <div style={{ marginTop: '15px'}}>
                <div ><span style={{float: 'left', alignItems: 'center'}}>{record.team1_score}</span></div><br/>
                <div><span style={{float: 'left',alignItems: 'center'}}>{record.team2_score}</span></div>
              </div>
                <div style={{marginLeft: '100px',alignItems: 'center'}}><ModalGroupStage match={record} /></div>
          </div>
        ),
      },
    ]

    return (
      <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: '#1E90FF',
          },
        },
      }}
      >
        <Card  title={`Матч ${match.matchNumber}`} style={{width: '100%'
       }}>
        <Table
          columns={columns}
          dataSource={[match]}
          pagination={false}
          style={{
            width: '100%',
          }}  
        />
      </Card>
      </ConfigProvider>
    )
  }
  return (
    <Row gutter={[16, 16]} style={{ maxWidth: '100vw', overflowX: 'auto', overflowY: 'auto'}}>
      {data.map((match, index) => (
        <Col key={index} span={8} style={{ minWidth: '200px' }}>
          <MatchCard match={match} />
        </Col>
      ))}
    </Row>
  )
} 

export default MatchesGroupStage
