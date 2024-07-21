/* eslint-disable prettier/prettier */
import { Tabs, Button } from 'antd'
import TableTimeMatches from '../time-matches/table-time-matches'
import ResultTableTimeMatches from './result-table-time-matches'
import './sass/time-matches.scss'

const items = [
    {
        key: '1',
        label: 'Таблица',
        children: <TableTimeMatches/>

    },
    {
        key: '2',
        label: 'Итоги',
        children: <ResultTableTimeMatches/>
    }
]
function TabMatches(){
    return (
        <>
            <Tabs className="Tabs" defaultActiveKey='1' items={items}></Tabs>
        </>
    )
}

export default TabMatches