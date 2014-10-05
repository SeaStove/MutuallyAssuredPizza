/*
 *
 */
 
fs = require('fs');

var inData = ["65210", "W1025 Lafferre Hall", "Columbia", "label=MO",'Peter','Dirks','pld9bc@mail.missouri.edu','3098388801']
var order = ['','','','','']

// main loop of program - wait from input to read in
var sCount = 0;
var SerialPort = require("serialport").SerialPort;
var sPort = new SerialPort("/dev/ttyACM4")
sPort.on('open', function(){
	console.log('Serial Port Opened')
	sPort.on('data', function(data){
		console.log( data[0]-48 );
		var inNum = data[0] - 48;
		if( inNum != 9){
			if( sCount == 0 ){
				console.log("Receiving data....")
				order[sCount] = inNum;
				console.log("\t size:"+order[sCount]);
			}
			else if( sCount == 1 ){
				order[sCount] = inNum;
				console.log("\t Pepperoni:"+order[sCount]);
			}
			else if( sCount == 2 ){
				order[sCount] = inNum;
				console.log("\t Sausage:"+order[sCount]);
			}
			else if( sCount == 3 ){
				order[sCount] = inNum;
				console.log("\t Bacon:"+order[sCount]);
			}
			else if( sCount == 4 ){
				order[sCount] = inNum;
				console.log("\t Restaurant:"+order[sCount]);
			}
		
			sCount++
		
			if(sCount == 5){					// if order array is ready, send to edit
				console.log("input received...editing order");
				var buffer = fs.readFileSync('./script/dom2.html')	// load file into memory buffer 
				var wstream = fs.createWriteStream('./script/pizzapartytime.html') 
	
				var setupStrm = fs.readFileSync('./script/setup_canvas.html') 
				var setupLines = setupStrm.toString();
				var setupText = setupLines.split('\n')
		
				var checkStrm = fs.readFileSync('./script/checkout_canvas.html') 
				var checkLines = checkStrm.toString();
				var checkText = checkLines.split('\n')
	
				var nextFlag = false;								// flag indicates id next line is important
		
				var lastLine = '';

		//		var text = buffer.toString();						// convert to string
		//		var lines = text.split('\n');						// subdivide by newlines
		//		var nextFlag = false;								// flag indicates id next line is important

				setupText.forEach( function( line ) {	// setup
			 		wstream.write(line+"\n");
				})
				// ********************* Build Order *********************** //
		
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>//div[@id='entree-BuildYourOwn']/a/div[2]/h2</td>\n\t<td></td>\n</tr>\n");
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>id=sizeCrust</td>\n\t<td></td>\n</tr>\n");
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>name=S_PIZZA|Topping|X</td>\n\t<td></td>\n</tr>\n");
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>name=selectSauceToggle</td>\n\t<td></td>\n</tr>\n");
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>name=S_PIZZA|Topping|C|SPLIT</td>\n\t<td></td>\n</tr>\n");
				if(order[0]==0){		// size
					wstream.write("<tr>\n\t<td>click</td>\n\t<td>xpath=(//input[@name='S_PIZZA|Variant'])[2]</td>\n\t<td></td>\n</tr>\n");
				}
				else{
					wstream.write("<tr>\n\t<td>click</td>\n\t<td>xpath=(//input[@name='S_PIZZA|Variant'])[3]</td>\n\t<td></td>\n</tr>\n");
				}
				wstream.write("<tr>\n<td>click</td>\n\t<td>link=Next Step ►</td>\n\t<td></td>\n</tr>\n");
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>link=Next Step ►</td>\n\t<td></td>\n</tr>\n");
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>xpath=(//button[@type='submit'])[50]</td>\n\t<td></td>\n</tr>\n");
				wstream.write("<tr>\n\t<td>click</td>\n\t<td>name=S_PIZZA|Topping|P</td>\n\t<td></td>\n</tr>\n");
				if(order[1]==1){
					wstream.write("<tr>\n\t<td>click</td>\n\t");
					wstream.write("<td>//div[@id='toppingsWrapper']/div[2]/div/div/div/label</td>\n\t");
					wstream.write("<td></td>\n</tr>\n");
				}
				if(order[2]==1){
					wstream.write("<tr>\n\t<td>click</td>\n\t");
					wstream.write("<td>//div[@id='toppingsWrapper']/div[2]/div/div/div[2]/label</td>\n\t");
					wstream.write("<td></td>\n</tr>\n");
				}
				if(order[3]==1){
					wstream.write("<tr>\n\t<td>click</td>\n\t");
					wstream.write("<td>//div[@id='toppingsWrapper']/div[2]/div/div/div[7]/label</td>");
					wstream.write("<td></td>\n</tr>\n");
				}

				wstream.write("<tr>\n\t<td>click</td>\n\t<td>xpath=(//button[@type='submit'])[51]</td>\n\t<td></td>\n</tr>\n")
		
		
				// ******************************************** //
				checkText.forEach( function( line ) {	// setup
			 		wstream.write(line+"\n");		
				})

				wstream.end();
				console.log("done!");
			}// break if count == 5
		}// no 9
		else{
			order[0]=0;
			order[1]=0;
			order[2]=0;
			order[3]=0;
			order[4]=0;
		
		}
		
	})
})





 
/* fs.readFile('./script/dom2.html', 'utf8', function (err, data) {
 	if (err) throw err;
 	console.log(data);
 })*/
