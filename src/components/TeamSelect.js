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
                let sortedResponse = response.data.teams.sort(compareTeams)
                // console.log(sortedResponse)
                setTeamsData(sortedResponse)
                setIsLoading(false)
            })
    }, [])

    function compareTeams(team1, team2) {
    if(team1.teamName < team2.teamName) return -1
    else if (team1.teamName > team2.teamName) return 1
    else return 0
    }

    function doSelectTeam() {
        selectTeam()
    }

    if (isLoading) {
        return <div>loading...</div>
    }
    
    return (
        <div className='padTop'>
            <select name='teams' id='teamsDropdown'>
                {teamsData.map((team, i) => {
                    return <option value={i} key={i}>{team.teamName}</option>
                })}
            </select>
            <button className='selectButton' id='selectButton' onClick={() => {doSelectTeam()}}>Select Team</button>
        </div>

    )
}



export default TeamSelect