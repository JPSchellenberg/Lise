#include <websocketpp/config/asio_no_tls.hpp>

#include <websocketpp/server.hpp>

#include <iostream>
#include <fstream>
#include <string>
#include <boost/container/set.hpp>
#include <websocketpp/common/thread.hpp>

#include <string.h>     // string function definitions
#include <unistd.h>     // UNIX standard function definitions
#include <fcntl.h>      // File control definitions
#include <errno.h>      // Error number definitions
#include <termios.h>    // POSIX terminal control definitions

typedef websocketpp::server<websocketpp::config::asio> server;

using websocketpp::connection_hdl;
using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
using websocketpp::lib::bind;


class webserial_server {
public:
    webserial_server() {
        // Initialize Asio Transport
        m_server.init_asio();

        // Disable all logging
        m_server.clear_access_channels(websocketpp::log::alevel::all);

        // Register handler callbacks
        m_server.set_open_handler(bind(&webserial_server::on_open,this,::_1));
        m_server.set_close_handler(bind(&webserial_server::on_close,this,::_1));
        m_server.set_message_handler(bind(&webserial_server::on_message,this,::_1,::_2));
    }

    void run(uint16_t port, std::string serialport) {
        // listen on specified port
        m_server.listen(boost::asio::ip::tcp::v4(), port);

        // Start the server accept loop
        m_server.start_accept();

        open_serialport( serialport );
        write_serialport("lisestart\n"); // send start

        // Start the ASIO io_service run loop
        try {
            m_server.run();

        } catch (const std::exception & e) {
            std::cout << e.what() << std::endl;
        }
    }

    void open_serialport(std::string serialport) {
        m_serialport = serialport;
        m_serialport_num = open( m_serialport.c_str() , O_RDWR| O_NOCTTY );

        struct termios tty;
        struct termios tty_old;
        memset (&tty, 0, sizeof tty);

        /* Error Handling */
        if ( tcgetattr ( m_serialport_num, &tty ) != 0 ) {
        std::cout << "Error " << errno << " from tcgetattr: " << strerror(errno) << std::endl;
        }

        /* Save old tty parameters */
        tty_old = tty;

        /* Set Baud Rate */
        cfsetospeed (&tty, (speed_t)B115200);
        cfsetispeed (&tty, (speed_t)B115200);

        /* Setting other Port Stuff */
        tty.c_cflag     &=  ~PARENB;            // Make 8n1
        tty.c_cflag     &=  ~CSTOPB;
        tty.c_cflag     &=  ~CSIZE;
        tty.c_cflag     |=  CS8;

        tty.c_cflag     &=  ~CRTSCTS;           // no flow control
        tty.c_cc[VMIN]   =  1;                  // read doesn't block
        tty.c_cc[VTIME]  =  5;                  // 0.5 seconds read timeout
        tty.c_cflag     |=  CREAD | CLOCAL;     // turn on READ & ignore ctrl lines

        /* Make raw */
        cfmakeraw(&tty);

        /* Flush Port, then applies attributes */
        tcflush( m_serialport_num, TCIFLUSH );
        if ( tcsetattr ( m_serialport_num, TCSANOW, &tty ) != 0) {
            std::cout << "Error " << errno << " from tcsetattr" << std::endl;
        }
    }

    void on_open(connection_hdl hdl) {
            m_connections.insert( hdl );
    }

    void on_close(connection_hdl hdl) {
            m_connections.erase( hdl );
    }

    void on_message(connection_hdl hdl, server::message_ptr msg) {
        write_serialport( msg->get_payload() );
    }

    void write_serialport(std::string command) {
        for (int i=0; i<command.size(); i++) {
            write( m_serialport_num , &command.at(i), 1);
        }
    }

    void read_serialport(void) {
        std::string line;
        std::ifstream serialport( m_serialport.c_str() );
        if (serialport.is_open()) {
            while ( getline (serialport,line) ) {
                boost::container::set<connection_hdl>::const_iterator it;
                for (it = m_connections.begin(); it != m_connections.end(); ++it) {
                    try {
                        m_server.send(*it, line , websocketpp::frame::opcode::text);
                    } catch (websocketpp::exception const & e) {
                        std::cout << e.what() << std::endl;
                    } 
                }
            }
            serialport.close();
        }
    }

private:
    server m_server;
    boost::container::set<connection_hdl> m_connections;
    int m_serialport_num;
    std::string m_serialport;
};

int main(int argc, char* argv[]) {
    try {
        if (argc != 3) {
            std::cout << "usage: webserial <serialport> <port>" << std::endl;
            return 1;
        }

        std::string serialport = std::string(argv[1]);

        uint16_t port = 3001;
        int i = atoi(argv[2]);
        if (i <= 0 || i > 65535) {
            std::cout << "invalid port" << std::endl;
            return 1;
        }
        
        port = uint16_t(i);

        webserial_server server_instance;

        websocketpp::lib::thread read_serialport(bind(&webserial_server::read_serialport,&server_instance));

        server_instance.run(port, serialport);

        read_serialport.join();

    } catch (websocketpp::exception const & e) {
        std::cout << e.what() << std::endl;
    }
}
