/*
 *  Mutually Assured Pizza
 *  Project for Hack Mizzou 2014
 *  October 3-5, 2014
 *  Peter Dirks, Greg Highland, Robert Stovall
 *  Arduino Component
 */
int toggleMED = 2;    // medium
int lightMED = 3;

int toggleLRG = 4;    // large
int lightLRG = 5;

int togglePEP = 13;    // pep

int toggleSAU = 11;    // bac

int toggleBAC = 12;    // sausage

int toggleKEY = 10;     // key

int toggleKILL = 7;  // kill
int lightKILL = 6;

void setup(){
  //set serial communication at 9600 bits per second
  Serial.begin(9600);
  
  // setup for pins in board...
  
  // medium  
  pinMode(toggleMED, INPUT);
  pinMode(lightMED, OUTPUT);
  
  // large
  pinMode(toggleLRG, INPUT);
  pinMode(lightLRG, OUTPUT);

  // pepperoni
  pinMode(togglePEP, INPUT);
  
  // sausage
  pinMode(toggleSAU, INPUT);
  
  // bacon
  pinMode(toggleBAC, INPUT);
  
  // GO! flag
  pinMode(toggleKEY,  INPUT);
  
  // kill flag
  pinMode(toggleKILL, INPUT);
  pinMode(lightKILL, OUTPUT);
  
}// end setup
void loop(){
  
  int goFlag = 0;
  
  int pepperoni = 0;
  int sausage = 0;
  int bacon = 0;
  int kill = 0;
//  int restuarant = 0;
  
  int order[] = {0,0,0,0,0};
  
  
  // check if debug flag is true, only start if true

  goFlag = digitalRead( toggleKEY );  // read in goFlag
  int medium = digitalRead(toggleMED);
  int large = digitalRead(toggleLRG);      
  kill = digitalRead(toggleKILL);
  if (medium == HIGH) {  // if med is pressed...
    digitalWrite(lightMED, HIGH);
    order[0] = 0;
  }// end med check
  else{
    digitalWrite(lightMED, LOW);
  } 

  if (large == HIGH) { // if large is pressed...
      digitalWrite(lightLRG, HIGH);
      order[0] = 1;
  }// end large check
  else{
       digitalWrite(lightLRG, LOW);
  }  
  if (kill == HIGH){
    //Serial.print("kill");
    // handle LED light next to size options

    

    goFlag = digitalRead( toggleKEY );  // read in goFlag
//    if( goFlag == HIGH ) {// both keys are turned, take input and go!        
        //Serial.print("go");
        pepperoni = digitalRead(togglePEP);
        sausage = digitalRead(toggleSAU);
        bacon = digitalRead(toggleBAC);
//        restaurant = digitalRead();
        
        // work out toppings and options from input
        if ( pepperoni == HIGH ) {
          order[1] = 1;
        }
        if ( sausage == HIGH ) {
          order[2] = 1;
        }
        if ( bacon == HIGH ) {
          order[3] = 1;
        }
        
        // all input is recorded, now need to transmit out to serial port
        
        delay(300);
        int i = 0;    // counter
        Serial.print(9, DEC);
        Serial.print(9, DEC);
        delay(500);
        for ( i = 0; i < 5; i++ ){   // transmit message to host
          delay(900);
          //Serial.write(order[i]);
          //Serial.print(order[i]);
          Serial.print(order[i], DEC);
        }// end message transmit
        
        
        delay(2000);
        
        
//   }// key
   }// kill
}// end loop
