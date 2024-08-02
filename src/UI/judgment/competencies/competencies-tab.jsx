import React,{useState} from 'react'
import { Tabs, Button } from 'antd'
import CompetenciesTable from './competencies-table'
import CompetenciesResult from './competencies-result'

const items = [
    {
        key: '1',
        label: 'Таблица',
        children: <CompetenciesTable/> 
        
        
    },
    {
        key: '2',
        label: 'Итоги',
        children: <CompetenciesResult/>
        
    }
]
function CompetenciesTab(){
    const [activeKey, setActiveKey] = useState('1');

    const onChange = (key) => {
      setActiveKey(key); 
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            activeKey={activeKey}
            onChange={onChange}
            style={{ flex: 3 }}
          />
          {activeKey === '1' && ( 
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary">
                Завершить этап
              </Button>
            </div>
          )}
        </div>
      </div>
        
    )
}

export default CompetenciesTab
