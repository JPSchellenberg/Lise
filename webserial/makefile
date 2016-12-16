compile: webserial.cpp
	g++-mips -c webserial.cpp

link: webserial.o
	g++-mips -o webserial webserial.o -lboost_system -lboost_chrono -lboost_thread -lrt -lpthread -lstdc++

clean:
	rm *.o