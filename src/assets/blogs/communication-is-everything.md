People say communication is the key to every relationship. Mine? Let's just say it's still under active development. I'm terrible at starting conversations, and keeping one alive somehow feels even harder. Thankfully, robots don't judge. Unfortunately, they do stop working if they don't understand each other. 

When we started building our bot, I never expected communication to become one of the biggest engineering challenges I'd work on. Not communication between teammates (although there was plenty of that too) but communication between dozens of electronic components that all needed to exchange information reliably while sealed inside a waterproof aluminum hull. 

Inside the AUV, almost every component has something important to say. The IMU constantly reports the vehicle's orientation, the pressure sensor keeps track of depth, the Battery Management System watches over the batteries, and the cameras continuously stream images to the Jetson Orin Nano. Meanwhile the Jetson is busy doing computer vision and planning, pretending it's too important to answer anyone immediately (microprocessor issues.. T_T).

# **The Brain and the Muscle** _(Jetson ↔ Pico)_

Despite what the Jetson likes to believe, it doesn't directly control everything. The Jetson is the strategist. *It decides what should happen.* The RP2350 (Nickname Pico, dont ask why.. we call everything a Pico at this point XD, whether its a Vicharak shrike lite or any other similar board) microcontroller is the executor. *It decides how to make that happen without missing timing deadlines.*
- The Jetson says, `"Turn 15 degrees left."`
- The Pico replies, `"Got it. I'll deal with the thrusters."`
While the Jetson is perfectly happy processing camera frames at 30 FPS, the Pico is busy making control decisions every few milliseconds. Those are two very different worlds, and they need a reliable way to communicate. This is where USB CDC comes in.

USB CDC (Communication Device Class) essentially lets the Pico appear as a virtual serial port to the Jetson. From the software side, it feels just like opening `/dev/ttyACM0` and reading or writing bytes, but underneath you're getting the reliability and bandwidth of USB. It also conveniently powers the Pico over the same cable, meaning one connection handles both communication and power. It was simple, reliable and exactly what we needed.

Sending random bytes over USB isn't particularly useful unless both sides agree on what those bytes actually mean.

So Chatur and I designed a simple packet protocol that both the Jetson and the Pico understood. It was lightweight, reliable, and Unlike Adwait, our packets didn't have a habit of showing up fashionably late. 

The Jetson periodically sends high-level control commands: desired surge velocity, yaw setpoints, depth targets, servo actions and other mission-level instructions. The Pico receives these commands, validates them and translates them into low-level hardware actions such as generating DSHOT commands for the ESCs or driving actuators.

Communication also happens in the opposite direction. The Pico continuously streams sensor feedback back to the Jetson, including IMU measurements, pressure sensor readings, battery information, kill-switch status and any other information the autonomy stack needs for state estimation and decision making. This constant two-way exchange allows the Jetson to make informed decisions while the Pico ensures the hardware continues operating safely and deterministically.

Structure of data actually Sent :

```C++
//                            JETSON -----> PICO
struct ControlPacket {
    float yaw;                // Error between required and target yaw.
    float depth;              // Target DEPTH in (m).
    float surge;              // Amount of distance required to move ahead.
    bool stop;                // Stop all Thrusters
    bool dropper;             // Activate dopper
    bool torpedo1;            // Activate Torpedo 1
    bool torpedo2;            // Activate Torpedo 2
};
```


```C++
//                            PICO -----> JETSON
struct FeedbackPacket {
    Attitude attitude;         // Roll, Pitch, Yaw
    float depth;               // Current depth

    BatteryStatus battery;     // Voltage, current, SOC
    HealthStatus health;       // Sensor health for startup system check

    bool kill_switch;          // Status of Kill Switch
};
```

---
# **Speaking Thruster** _(DSHOT)_ 

Of course, talking to the Pico was only the beginning. Receiving a command like "move forward" is one thing; convincing five thrusters to actually do it is another.

The obvious option would have been PWM. After all, that's how hobby ESCs have been controlled for years. But PWM has one annoying flaw: it relies on pulse widths, making it susceptible to timing inaccuracies and electrical noise. Underwater robots already have enough things trying to ruin your day; noisy motor signals didn't need to be one of them.

Instead, Chatur chose DSHOT, a fully digital protocol designed specifically for ESC communication. Every command is transmitted as a digital packet with an embedded checksum, allowing the ESC to detect corrupted messages instead of blindly acting on them. It also eliminates calibration headaches, since commands represent digital throttle values rather than pulse widths.

The Pico continuously converts the high-level motion commands received from the Jetson into individual thrust values for each motor, packages them into DSHOT frames and transmits them to the ESCs. By the time the Jetson is busy planning the next move, the Pico has already told five thrusters exactly what to do. 

---
# SITREP (Situation Report)

Telling the robot what to do is only half the story. It also needs to know what's actually happening. Jetson needs to know every detail regarding the situation of the bot at any Instant. That's where the IMU and pressure sensor come in. The pressure sensor communicates with the Pico over **I²C (Inter-Integrated Circuit)**, a simple two-wire communication protocol where multiple low-speed devices can share the same data and clock lines. Since the pressure sensor only needs to report depth measurements at regular intervals, I²C provides more than enough bandwidth while keeping the wiring inside the already cramped hull nice and tidy.

The IMU, on the other hand, uses **SPI (Serial Peripheral Interface)**. Unlike I²C, SPI dedicates separate data lines for transmitting and receiving, along with a dedicated chip-select line for each device. This allows much faster communication with lower latency, making it ideal for an IMU that's constantly producing high-frequency orientation data for the control loop.

The Pico continuously polls both sensors, converts their raw measurements into meaningful information like orientation, depth and sensor health, and packages everything into a neat `FeedbackPacket`. The Jetson doesn't need to worry about sensor registers, communication protocols or calibration details; it simply asks, _"Where are we?"_, and the Pico replies with a clean, SITREP!

---
# **Our Turn to Talk** _(AUV <---> US)_

By this point, the Jetson could talk to the Pico, the Pico could talk to the sensors and thrusters, and everything inside the robot was happily exchanging information. There was just one problem: we still needed a way to talk to the robot ourselves.

During development, we spend most of our time connected to the robot. We SSH into the Jetson, stream camera feeds, inspect ROS topics, upload new code, and inevitably fix bugs that somehow only appear five minutes before a pool test. All of that relies on one thing: a fast and reliable Ethernet connection.

Wi-Fi sounds convenient until you remember that water is exceptionally good at blocking radio signals. Once the robot is submerged, wireless communication is practically useless. It is very unreliable even if the bot stays at water surface due to the Aluminum hull blocking most of the signals A wired connection was the only realistic option. 

Unfortunately, waterproof connectors aren't exactly designed with Gigabit Ethernet in mind. The connector we had available could only accommodate a cable around 6.5 mm in diameter, while our cat6 ethernet cable is smaller than 6.5mm but the RJ45 jack itself is about 10 mm.

Our first iteration was fairly straightforward: we cut the Ethernet cable, passed it through the WetLink penetrator and the hull wall, and then crimped a new RJ45 connector onto the inside. While this worked, it wasn't particularly reliable. We frequently ran into disconnections and packet loss because cutting the cable meant the individual conductors were no longer maintained as tightly twisted pairs inside the hull, nor were they properly shielded. At Gigabit Ethernet speeds, those seemingly small changes were enough to noticeably affect signal integrity.

This ended up being one of the biggest engineering challenges we faced throughout the project. While our current solution works well enough for development, we're still exploring more robust and reliable ways to solve it.

---
# Communication is Everything

When people think about building an autonomous underwater vehicle, they usually imagine computer vision, AI, path planning or fancy control algorithms. Those are certainly the glamorous parts. But before any of that can happen, the robot first needs to be able to **talk**.

The Jetson has to tell the Pico where it wants to go. The Pico has to command the thrusters using DSHOT. The sensors have to continuously report back over SPI and I²C. And somehow, through all of this, we still need a reliable way to communicate with the robot ourselves over Ethernet.

Every protocol inside the robot has a different job. Some prioritize speed, others prioritize simplicity, and a few exist simply because that's what the hardware speaks. There isn't a single "best" communication protocol, only the right tool for the right conversation.

Looking back, it's funny how much time we spent thinking about communication. We came into the project expecting to spend our days writing autonomy algorithms and tuning controllers. Instead, we found ourselves reading protocol specifications, crimping Ethernet cables, debugging packet loss, and arguing over why two devices refused to acknowledge each other's existence.

In the end, that's probably the biggest lesson this project taught us. Building a robot isn't just about making individual components work; it's about making **everything work together**. Because at the end of the day, an autonomous underwater vehicle is really just a collection of electronics that have learned how to have a conversation.

And unlike me... this conversation actually works pretty well. XD
