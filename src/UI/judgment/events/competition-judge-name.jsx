import { useState } from 'react'
import { Typography, Flex, Space, AutoComplete } from "antd"
import './sass/events.scss'

function CompetitionType(){
    const [options,setOptions] = useState([])
    const [inputValue,setInputValue] = useState('')

    const handleSearch = (value) => {
        setInputValue(value)

        if(value){
            const filteredOptions = ['Сергачев Виктор', 'Иванов Сергей', 'Викторов Евгений', 'grape', 'lemon']
            .filter(item => item.toLowerCase().includes(value.toLowerCase()))
            .map(item => ({value: item}))

            setOptions(filteredOptions)
        }
        else{
            setOptions([])
        }
    }
    return (
        <div className="events__competition-judge__div">
            <Typography.Text>Судья</Typography.Text>
            <Flex>
                <Space.Compact>
                    <AutoComplete
                    className='events__competition-judge__name'
                    placeholder={'Введите фамилию судьи'}
                    options={options}
                    onSearch={handleSearch}
                    onSelect={(value) => setInputValue(value)}
                    value={inputValue}
                    ></AutoComplete>
                </Space.Compact>   
            </Flex>
        </div>
    )
}

export default CompetitionType