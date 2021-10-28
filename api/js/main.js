let table = document.getElementsByTagName('table')[0];
let getStandings = async () =>{
    let season = document.querySelector('#season').value;
    let round =  document.querySelector('#round').value;
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data
}

let loadData = async () =>{
    let data = await getStandings();
    table.setAttribute('style','')

    for(let i = 0; i<7; i++){
        let position = document.createElement('th')
        position.innerHTML = `${i+1}`
        position.scope = "row"
        document.querySelector(`#tr-${i}`).append(position)
        
        let first_name = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName
        let last_name = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName
        let name = first_name + ' ' + last_name

        let name_show = document.createElement('td')
        name_show.innerHTML = name
        document.querySelector(`#tr-${i}`).append(name_show)

        let nationality = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality
        let nation_show = document.createElement('td')
        nation_show.innerHTML = nationality
        document.querySelector(`#tr-${i}`).append(nation_show)

        let constructor = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name
        let constr_show = document.createElement('td')
        constr_show.innerHTML = constructor
        document.querySelector(`#tr-${i}`).append(constr_show)

        let points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points
        let point_show = document.createElement('td')
        point_show.innerHTML = points
        document.querySelector(`#tr-${i}`).append(point_show)
    }
}

let clearData = () => {
    for(let i = 0; i<7; i++){
        let row = document.querySelector(`#tr-${i}`);
        row.innerHTML = ''
    }
}