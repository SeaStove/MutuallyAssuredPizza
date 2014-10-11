#!/bin/bash

a=1

while [ a > 0 ]
do
	if [ pizzapartytime.html ]
	then
		java -jar selenium-server-standalone-2.43.1.jar -htmlSuite "*firefox" "http://order.dominos.com" "pizzaPartySuite.html" "results.html"
		
		a=-1
	else
		sleep 5s
		echo "sleeping"
	fi
done
sleep 5s
rm pizzaPartyTime.html
