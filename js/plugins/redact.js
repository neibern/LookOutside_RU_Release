
if(Utils.isOptionValid("test"))
{
	//Magic Circle of Kelp
	KelpCircle={}

	KelpCircle.clearNames = function (inputFile){
		const fs = require('fs');
		const path = require('path');

		const parsedPath = path.parse(inputFile);
		const outputFile = path.join(parsedPath.dir, `${parsedPath.name}_new${parsedPath.ext}`);

		data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
		// can't just parse as text because 'name' keeps deeper in the tree
		// should remain unchanged.
		// only clear the first level of object namespaces
		if (Array.isArray(data)) {
		data.forEach(item => {
				if (item && typeof item === 'object')
				{
					if ('name' in item) {
						item.name = '';
					}
					if ('expanded' in item)
					{
						item.expanded=false;
					}
				}
				
			});
		}
		fs.writeFileSync(outputFile, JSON.stringify(data, null, 4), 'utf8');
		console.log("Sanitized "+outputFile);
	}
	
	
	KelpCircle.clearSystem = function (){
		const fs = require('fs');
		const path = require('path');
		const inputFile="data/System.json";
		const parsedPath = path.parse(inputFile);
		const outputFile = path.join(parsedPath.dir, `${parsedPath.name}_new${parsedPath.ext}`);

		data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
		

		for (i = 0; i< data.switches.length; i++)
		{
			data.switches[i]="";
		}
		for (i = 0; i< data.variables.length; i++)
		{
			data.variables[i]="";
		}
		data.hasEncryptedImages= true
		data.hasEncryptedAudio= true
		data.encryptionKey= "4f163b0b5fc11c8ce2980b7c94608ca4"
		fs.writeFileSync(outputFile, JSON.stringify(data, null, 4), 'utf8');
		console.log("Sanitized "+outputFile);

	}

	KelpCircle.clearNames("data/MapInfos.json")
	KelpCircle.clearNames("data/CommonEvents.json")
	KelpCircle.clearSystem()
	KelpCircle={}
}