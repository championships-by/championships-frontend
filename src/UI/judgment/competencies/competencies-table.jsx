/* eslint-disable prettier/prettier */
import { Flex, Tooltip, Table, Button, InputNumber } from "antd"
import { useEffect, useState } from 'react'
import './sass/competencies-criteria.scss'
import { getCompetencies } from "./api/api"

function limitStringLength(str){
    let maxLength = 50
    if(str.length > maxLength){
        return str.slice(0,maxLength - 3) + '...'
    }
    return str;

}
let columns = [
    {
        title: <Tooltip title="Компетенции"></Tooltip>,
        dataIndex: 'competencies',
        key: 'competencies',
        render: (text) => limitStringLength(text)
        
    },
    {
        title: <div className="rotate">Иванов Иван</div>,
        dataIndex: 'first_participant',
        key: 'first_participant'
    },
    {
        title: <div className="rotate">Петров Петр</div>,
        dataIndex: 'second_participant',
        key: 'second_participant'
    },
    {
        title: <div className="rotate">Сидоров Сидр</div>,
        dataIndex: 'third_participant',
        key: 'third_participant'
    }
    
]

let data = [
    {
        competencies: 'Компетенция №1',
        first_participant: <InputNumber max={10} min={0}></InputNumber>,
        second_participant: <InputNumber max={10} min={0}></InputNumber>,
        third_participant: <InputNumber max={10} min={0}></InputNumber>,
    },
    {
        competencies: 'Компетенция №2',
        first_participant: <InputNumber max={10} min={0}></InputNumber>,
        second_participant: <InputNumber max={10} min={0}></InputNumber>,
        third_participant: <InputNumber max={10} min={0}></InputNumber>,
    },
    {
        competencies: 'Компетенция №3',
        first_participant: <InputNumber max={10} min={0}></InputNumber>,
        second_participant: <InputNumber max={10} min={0}></InputNumber>,
        third_participant: <InputNumber max={10} min={0}></InputNumber>,
    },
    {
        competencies: 'Компетенция №4',
        first_participant: <InputNumber max={10} min={0}></InputNumber>,
        second_participant: <InputNumber max={10} min={0}></InputNumber>,
        third_participant: <InputNumber max={10} min={0}></InputNumber>,
    }
]
function CompetenciesTable(){
    const [competencies,setCompetencies] = useState([])
    useEffect(() => {
        ;(async () => {
          let response = await getCompetencies()
          setCompetencies(response)
        })()
      }, [])
    return (
        <>
            <Flex vertical gap="large">
            <Table
                className="table"
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            </Flex>
            
        </>
    )
}

export default CompetenciesTable