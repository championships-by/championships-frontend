/* eslint-disable prettier/prettier */
import { Flex, Tooltip, Table, Button, InputNumber } from "antd"
import { useEffect, useState } from 'react'
import './sass/competencies-criteria.scss'
import { getCompetencies } from "./api/api"

let columns = [
    {
        title: <Tooltip title="Компетенции"></Tooltip>,
        dataIndex: 'competencies',
        key: 'competencies',
        
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
        first_participant: <InputNumber></InputNumber>,
        second_participant: <InputNumber></InputNumber>,
        third_participant: <InputNumber></InputNumber>,
    },
    {
        competencies: 'Компетенция №2',
        first_participant: <InputNumber></InputNumber>,
        second_participant: <InputNumber></InputNumber>,
        third_participant: <InputNumber></InputNumber>,
    },
    {
        competencies: 'Компетенция №3',
        first_participant: <InputNumber></InputNumber>,
        second_participant: <InputNumber></InputNumber>,
        third_participant: <InputNumber></InputNumber>,
    },
    {
        competencies: 'Компетенция №4',
        first_participant: <InputNumber></InputNumber>,
        second_participant: <InputNumber></InputNumber>,
        third_participant: <InputNumber></InputNumber>,
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