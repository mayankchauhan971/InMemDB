const path = require('path');
const readline = require('readline');
const dbBackend = require(path.resolve('./dbBackend'));
const readInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let db = new dbBackend();
console.log("----------- InMemDB Ready!! -----------");


readInput.on('line', (input)=>{
  let cmd = input.split(' ');
  cmd[0] = cmd[0].toUpperCase();
	let key;
	let value;

	if (cmd.length > 1) {
		key = cmd[1] || null;
		value = cmd[2] || null; 
	}

	switch (cmd[0]) {
		case 'SET':
			db.set(key, value);
			break;
		case 'GET':
			console.log(db.get(key));
			break;
		case 'DELETE':
			db.delete('a');
			break;
		case 'COUNT':
			console.log(db.count(key));;
			break;
		case 'BEGIN':
			db.begin();
			break;
		case 'ROLLBACK':
			if (db.rollback() < 0) {
				console.log('TRANSACTION NOT FOUND');
			}
			break;
		case 'COMMIT':
			db.commit();
			break;
		case 'END':
      rl.close();
			console.log('----------- InMemDB Closed!! -----------');
			break;
		case 'OPTIONS':
			console.log('options:\nSET <Key> <Val>\n' +
				'GET <Key>\nDELETE <Key>\nCOUNT <value>\n' +
				'BEGIN\nROLLBACK\nCOMMIT\nEND\n');
			break;
		default: 
			console.log('\nInvalid input. Please try again.\n' + 'Use OPTIONS to see all possible commands\n');
			break;
	}

	db.manageState();
  

})