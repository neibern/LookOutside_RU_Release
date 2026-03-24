let totalWordCount = 0
let totalMapCount = 0
let nbMaps = 0;
function countWordsOnMap(mapJson, mapId) {
    return new Promise((resolve, reject) => {
        let mapWordCount = 0
        mapJson.events.forEach(event => {
            if (event) {
                event.pages.forEach(page => {
                    page.list.forEach(listItem => {
                        if (listItem.code === 401) {
                            mapWordCount += listItem.parameters[0].split(' ').length
                        }
                    })
                })
            }
        })
        nbMaps+=1;
        totalWordCount += mapWordCount
		totalMapCount += mapWordCount
		console.log(`Map ${mapId} ${mapJson.displayName} has ${mapWordCount} words. MAPSTOTAL: ${totalMapCount},  TOTAL: ${totalWordCount}, NBCOUNTED: ${nbMaps}`)
        resolve()
    })
}

function countWordsOnCommonEvents(jsonData){
	return new Promise((resolve, reject) => {
		let evWordCount = 0
		jsonData.forEach(event => {
            if (event) {
				event.list.forEach(item => {
					if(item.code === 401){
						evWordCount += item.parameters[0].split(' ').length
					}
				})
            }
        })
		console.log(`Common events have ${evWordCount} words.`)
		totalWordCount += evWordCount;
		resolve()
	})
}

function countWordsInTroops(jsonData){
	return new Promise((resolve, reject) => {
		let evWordCount = 0
		jsonData.forEach(troop => {
            if (troop) {
				troop.pages.forEach(page => {
					if(page)
					{
						page.list.forEach(item => {
							if(item.code === 401){
								evWordCount += item.parameters[0].split(' ').length
							}
						})
					}
				})
            }
        })
		console.log(`Troops have ${evWordCount} words.`)
		totalWordCount += evWordCount;
		resolve()
	})
}

function countWordsInItems(jsonData){
	return new Promise((resolve, reject) => {
		let evWordCount = 0
		jsonData.forEach(item => {
            if (item) {
				evWordCount += item.description.split(' ').length
				evWordCount += item.name.split(' ').length
            }
        })
		console.log(`Items have ${evWordCount} words.`)
		totalWordCount += evWordCount;
		resolve()
	})
}

function countWordsInWeapons(jsonData){
	return new Promise((resolve, reject) => {
		let evWordCount = 0
		jsonData.forEach(item => {
            if (item) {
				evWordCount += item.description.split(' ').length
				evWordCount += item.name.split(' ').length
            }
        })
		console.log(`Weapons have ${evWordCount} words.`)
		totalWordCount += evWordCount;
		resolve()
	})
}

function countWordsInEquip(jsonData){
	return new Promise((resolve, reject) => {
		let evWordCount = 0
		jsonData.forEach(item => {
            if (item) {
				evWordCount += item.description.split(' ').length
				evWordCount += item.name.split(' ').length
            }
        })
		console.log(`Equipment have ${evWordCount} words.`)
		totalWordCount += evWordCount;
		resolve()
	})
}

function countWordsInSkills(jsonData){
	return new Promise((resolve, reject) => {
		let evWordCount = 0
		jsonData.forEach(item => {
            if (item) {
				evWordCount += item.description.split(' ').length
				evWordCount += item.name.split(' ').length
				evWordCount += item.message1.split(' ').length
				evWordCount += item.message2.split(' ').length
            }
        })
		console.log(`Skills have ${evWordCount} words.`)
		totalWordCount += evWordCount;
		resolve()
	})
}

async function countAllWords() {
    const mapInfosPromise = await fetch('data/MapInfos.json')
    const mapInfosJson = await mapInfosPromise.json()
    
	
	
	const commonEvfile = await fetch('data/CommonEvents.json')
    const commonEvData = await commonEvfile.json()
	
	countWordsOnCommonEvents(commonEvData);
	
	const troopfile = await fetch('data/Troops.json')
    const troopData = await troopfile.json()
	
	countWordsInTroops(troopData);
	
	const itemfile = await fetch('data/Items.json')
    const itemData = await itemfile.json()
	
	countWordsInItems(itemData);
	
	const wpnfile = await fetch('data/Weapons.json')
    const wpnData = await wpnfile.json()
	
	countWordsInWeapons(wpnData);
	
	const eqfile = await fetch('data/Armors.json')
    const eqData = await eqfile.json()
	
	countWordsInEquip(eqData);
	
	const skfile = await fetch('data/Skills.json')
    const skData = await skfile.json()
	
	countWordsInSkills(skData);
	
	const promises = mapInfosJson.map(async info => {
        if (info) {
			console.log("READING MAP: "+ info.id.toString());
            const mapPromise = await fetch(`data/Map${info.id.toString().padStart(3, '0')}.json`)
            const mapJson = await mapPromise.json()
            return countWordsOnMap(mapJson, info.id)
        }
    })
    const values = await Promise.all(promises)
	console.log(`The total number of words in maps is: ${totalMapCount}`)
    console.log(`The total number of words in the game is: ${totalWordCount}`);
	

}
