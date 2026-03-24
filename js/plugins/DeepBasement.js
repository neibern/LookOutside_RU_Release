const basementRoom = {
    EXIT: 0,
    SOUTH: 1,
    CENTER: 2,
	WEST: 3,
	EAST: 4,
	NORTH: 5,
	END: 6
};


function dBst_generate()
{
	sVr(661,0);
	sVr(662,0);
	sVr(663,0);
	sVr(664,0);
	sVr(665,0);
	sVr(666,0);
	
	var rmData = gVr(670);
	if(Array.isArray(rmData))
	{
		dBst_setupRooms();
	}
	
}

function dBst_setupRooms()
{
	var dBstRoomData = [];
	
	var dBst_southrooms = [];
		dBst_southrooms.push([315,14,21,14,9]);
	
	var dBst_centerrooms = [];
		dBst_centerrooms.push([314,14,28,5,15,23,15,14,6]);
		dBst_centerrooms.push([320,22,28,5,15,23,15,14,11]);
	
	var dBst_westrooms = [];
		dBst_westrooms.push([316,20,21,20,12]);
	
	var dBst_eastrooms = [];
		dBst_eastrooms.push([317,8,22,8,12]);
	
	var dBst_northrooms = [];
		dBst_northrooms.push([318,14,24,8,22,20,22,14,12]);
		
	var dBst_endrooms = [];
		dBst_endrooms.push([319,14,21]);
	
	dBstRoomData = [[[313,5,4]],dBst_southrooms,dBst_centerrooms,dBst_westrooms,dBst_eastrooms,dBst_northrooms,dBst_endrooms];
	sVr(670,dBstRoomData);
	
	var deepThemes = [];
		deepThemes.push([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
		deepThemes = shuffleArray(deepThemes);
	///0-omniTheme, 1-crush theme, 2-pierce theme, 3- slash/bleed theme, 4-bullet theme, 5-fire/burn theme, 6-cold/freeze theme, 7-acid/acidMelt theme, 8-shock/paralysis theme, 9-flesh theme,
	///10-stun theme, 11-sleep theme, 12 confusion theme, 13- rage theme, 14-charm theme, 15-tank theme, 16-ruin theme, 17-spider theme, 18- worms theme, 19- plant theme, 20- darkness
	sVr(671,deepThemes);
	
	sVr(681,"EnemyA");
	sVr(682,"EnemyB");
	sVr(683,"EnemyC");
}

function dBst_warp(roomFrom,roomTo)
{
	sSw(800,true);///room setup variable
	var dataPos = -1;
	switch(roomTo)
	{
		case 1: ///South Room
			switch(roomFrom)
			{
				case basementRoom.EXIT: dataPos = 0; break;
				case basementRoom.CENTER: dataPos = 1; break;
			}
			break;
		case 2: ///Center Room
			switch(roomFrom)
			{
				case basementRoom.SOUTH: dataPos = 0; break;
				case basementRoom.WEST: dataPos = 1; break;
				case basementRoom.EAST: dataPos = 2; break;
				case basementRoom.NORTH: dataPos = 3; break;
			}
			break;
		case 3: ///West Room
			switch(roomFrom)
			{
				case basementRoom.CENTER: dataPos = 0; break;
				case basementRoom.NORTH: dataPos = 1; break;
			}
			break;
		case 4: ///East Room
			switch(roomFrom)
			{
				case basementRoom.CENTER: dataPos = 0; break;
				case basementRoom.NORTH: dataPos = 1; break;
			}
			break;
		case 5: ///North Room
			switch(roomFrom)
			{
				case basementRoom.CENTER: dataPos = 0; break;
				case basementRoom.WEST: dataPos = 1; break;
				case basementRoom.EAST: dataPos = 2; break;
				case basementRoom.END: dataPos = 3; break;
			}
			break;
		case 6: ///End Room
			switch(roomFrom)
			{
				case basementRoom.NORTH: dataPos = 0; break;
			}
			break;
	}
	
	if(dataPos!=-1)
	{
		var rmData = gVr(670);
		if(Array.isArray(rmData))
		{
			dBst_setupRooms();
			dBst_generate();
		}
		var dBstRoomData = gVr(670)[roomTo][gVr(660+roomTo)];
		console.log(rmData);
		console.log(dBstRoomData);
		console.log("Trying to warp you to:  room-"+dBstRoomData[0]+", X"+dBstRoomData[1+dataPos*2]+", Y"+dBstRoomData[2+dataPos*2]);
		$gamePlayer.reserveTransfer(dBstRoomData[0], dBstRoomData[1+dataPos*2], dBstRoomData[2+dataPos*2], 0, 0);
	}
	else
	{
		$gamePlayer.reserveTransfer(313,5,4, 0, 0);
	}
	
}