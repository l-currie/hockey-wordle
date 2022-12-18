import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useContext } from "react"
import { AppContext } from '../App'

function TeamSelect() {
    const { selectTeam, teamsData, setTeamsData } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        Axios.get('https://statsapi.web.nhl.com/api/v1/teams')
            .then(response => {
                setTeamsData(response.data.teams)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <div>loading...</div>
    }
    return (
        <div>
            <select name='teams' id='teamsDropdown'>
                {console.log('teamsData')}
                {console.log(teamsData)}
                {teamsData.map((team, i) => {
                    return <option value={i}>{team.teamName}</option>
                })}
            </select>
            <button onClick={() => {selectTeam()}}>asd</button>
        </div >
    )
}



export default TeamSelect