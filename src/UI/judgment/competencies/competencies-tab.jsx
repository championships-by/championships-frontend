import { Tabs } from 'antd'
import CompetenciesTable from './competencies-table'
import CompetenciesResult from './competencies-result'

const items = [
    {
        key: '1',
        label: 'Таблица',
        children: <CompetenciesTable />
        
    },
    {
        key: '2',
        label: 'Итоги',
        children: <CompetenciesResult/>
        
    }
]
function CompetenciesTab(){
    return (
        <Tabs defaultActiveKey="1" items={items}/>
    )
}

export default CompetenciesTab