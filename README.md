# Dark SSH

A simple SSH client & server that illustrates the connection between a client and a C2 (Command & Control) server. This project is built with JavaScript and runs on Node.js using just a pair of JavaScript files.

#### **Warning:** This is for educational purposes only and should not be used on any system or computer you do not own. You are solely responsible for your actions.

### Proof of Concept

This project showcases my strong understanding of the command-line interface, remote networking, and security principles as a DevSecOps professional. I don't just use software—I have a solid understanding of how they work.

### Note on My Development Environment

This project was developed on an **Android** phone using **Termux**. This was a personal challenge to demonstrate my resourcefulness and ability to build complex applications using limited resources.

### Dependencies
* git
* nodejs-lts v22.17.1 or higher
* An operating system (e.g., Linux, Windows, macOS)

### Challenges I Faced While Building This Project:

#### Problem: IP Address

I struggled to get the device's correct IP address. The `os.networkInterfaces()` method always returned `127.0.0.1`, which is the loopback address (`localhost`). I then tried using `os.hostname()`, which always returned "localhost," not even an IP address.

#### Solution:

I ended up seeing solutions that used `os.networkInterfaces()` again. I tested it, and it worked, but later, when I went offline and tried again, it returned `127.0.0.1`. After reconnecting to Wi-Fi, it worked again.

#### Lesson Learnt

I learned a crucial lesson: a device's local IP address (like `192.168.x.x`) is only assigned when it is actively connected to a network. When a device is offline, it falls back to its loopback address (`127.0.0.1` or `localhost`).

### Project Limitations

* **`child_process.exec()`:** This project uses Node.js's `child_process.exec()` function, which does not support advanced commands like nested prompts. It can only execute basic, single-line commands.
* **Not a Robust Tool:** This is not a robust version of a real SSH client or C2 server. It is an illustration of how they work behind the scenes.
* **No Security:** It is not recommended to use this project in place of SSH, as it uses unencrypted HTTP to send and receive data. An attacker can easily intercept your data.
* **No Authentication:** The project uses a simple HTTP server and client to communicate, with no authentication implemented.
* **No Multiple Connections:** It does not manage multiple connections like a real-world C2 server.

**Conclusion:** Knowing the limitations of this project helps you to understand its purpose and how to use it safely and effectively.

### Setup / Test

**NOTE:** The setup steps below assume you are running both the client (`attacker.js`) and the server (`malware.js`) on the same machine. If you want to run them on separate machines, follow the instructions in **Step 5**.

**Step 1:** Update your packages.

```apt update && apt upgrade```

**Step 2:** Install Node.js LTS (if not already installed).

```apt install nodejs-lts```


**Step 3:** Check if Node.js is installed successfully.

```node -v```


**Step 4:** Install Git (if not already installed).

```apt install git```


**Step 5:** Clone the project to your machine.

```git clone https://github.com/Axiontrix/Dark-SSH.git```

You will see two files: `attacker.js` and `malware.js`.

**For separate machines:** If you want to run the client and server on different devices, you must update the IP address in the `malware.js` file. First, find the local IP address of the machine you will run the `attacker.js` file on. On a Linux-based system, you can use `ip a`. Then, open the `malware.js` file and replace the hardcoded host with that IP address.

`const host = 'your_ip_address_here';`

**Step 6:** Run the `attacker.js` file first.

```node attacker.js```

You should see an output similar to this:

`~Dark SSH~`

`attack host running on port 1146`

`waiting for target response...`

**Step 7:** Open a new terminal and run the `malware.js` file.

```node malware.js```

**Step 8:** Go back to the `attacker.js` terminal. You will see a similar output showing the connection information.

`=>[: DARK SSH :]<=`

`Remote-Host: localhost   Remote-Port: 10195`

`Remote-Ipaddress: 127.0.0.1`

`Operating-System: android  Remote-Username: u0_a122`

`[u0_a122]>`

You are now connected! Run your commands (e.g., `ls`) and see the output.

> **Why is it named `malware.js`?** The file is named `malware.js` to reflect its functionality. Its purpose is to showcase how malicious code can operate, but it is entirely safe and intended for educational use. Never run code from an untrusted source.

---
If you encounter issues setting up this project, please feel free to contact me via email.


[mondaygodsgift7@gmail.com](mailto:mondaygodsgift7@gmail.com?subject=I%20need%20help%20with%20your%20project%20setup&body=Hello%20there,%20I'm%20writing%20to%20you%20about%20your%20Dark%20SSH%20project%20on%20GitHub.%20I've%20encountered%20an%20issue%20with%20the%20setup%20and%20was%20hoping%20you%20could%20help.)

© Axiontrix 2024 - 2025