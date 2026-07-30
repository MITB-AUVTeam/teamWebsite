# System Overview

One of the core tasks in RoboSub is locating an underwater acoustic pinger—a beacon that periodically emits ultrasonic pulses. The objective was to design a system capable of detecting these signals, rejecting environmental noise, and estimating the direction of arrival.

This led to the development of a complete passive sonar pipeline spanning hydrophone design, analog signal conditioning, digital signal processing, and multi-sensor time synchronization.

# Hydrophone Design and Analog Front-End

At the core of the system is the hydrophone. Unlike conventional air microphones, hydrophones are designed to detect pressure variations in water. The design uses a piezoelectric ceramic element, which generates a voltage when mechanically deformed by acoustic pressure waves.

Most RoboSub teams use purpose-built hydrophones, which offer high sensitivity but are expensive. A lower-cost approach was adopted by sourcing raw piezoelectric transducers in waterproof aluminium housings for approximately $6 each. While inexpensive and readily available, these components were not originally intended for precision acoustic sensing.

This introduced several constraints.

The piezoelectric elements exhibit a strong resonance around 24 kHz in air. Because they behave as high-Q resonators, their sensitivity varies sharply with frequency, producing narrow peaks of response and steep roll-offs outside those regions. This is particularly relevant in RoboSub, where the pinger operates between 25–40 kHz.

In non-resonant regions, the output signal amplitude is extremely small—often in the microvolt range—requiring significant amplification and filtering before digitization. The mismatch between the sensor's natural response and the target frequency band necessitated a carefully designed analog front-end to condition the signal and extract usable information.

Designing this analog front-end turned out to be one of the most difficult parts of the entire subsystem. Extensive iteration was required across different combinations of resistors and capacitors to stabilize the signal, control gain, and shape the frequency response. Small changes in component values would dramatically affect noise levels, bandwidth, and even whether the pinger signal was detectable at all. What initially looked like a straightforward amplification stage quickly became an iterative process of tuning, testing, and reworking the circuit until the hydrophone output was both stable and usable.

# Field Reliability Issues and Ongoing Improvements

While the analog front-end performs well in controlled testing, a significant reliability issue began appearing during extended real-world operation.

A number of hydrophone PCBs would suddenly stop functioning after a period of time, even though no obvious physical damage was present. In some cases, the failure appeared intermittent—recovering after power cycling—while in others the board became permanently unresponsive.

After investigation, two primary contributing factors are suspected:

**1. Static and charge accumulation on the piezo element.** The piezoelectric transducer can generate relatively high voltages when excited near resonance. In air, especially during bench testing, the element can behave like a high-Q resonator and produce unexpectedly large voltage spikes. These transient voltages may exceed the input protection limits of the analog front-end or microcontroller ADC, gradually degrading components over time.

**2. High-voltage transients at resonance.** When the piezo is excited near its resonant frequency, mechanical amplification leads to sharp voltage peaks. These spikes are not always fully suppressed by the current input protection network, especially during sudden acoustic events or mechanical shocks. Over repeated exposure, this may lead to latent damage in op-amps or ADC input stages.

A redesign of the front-end is currently underway, with reliability treated as a primary constraint rather than only signal quality.

# Narrowband Detection in the Digital Domain

Once digitized, the problem transitions into digital signal processing.

The pinger occupies a narrow frequency band, meaning most of the sampled spectrum contains irrelevant information. Rather than performing full-spectrum analysis, the Goertzel algorithm is used to efficiently detect energy at specific frequencies without requiring a full FFT.

This approach is well-suited for embedded systems due to its low computational overhead and deterministic execution time.

However, it introduces a system-level constraint: each hydrophone must independently execute real-time signal processing. With multiple spatially distributed sensors, this results in several concurrent DSP pipelines operating in parallel.

# Spatial Localization Using Time Difference of Arrival

Detecting the pinger is only the first step. The primary objective is to determine its direction.

To achieve this, a minimum of four hydrophones are arranged around the vehicle. As an acoustic wave propagates through water, it reaches each sensor at slightly different times, typically separated by microseconds.

These time offsets encode spatial information about the source location.

This method, known as Time Difference of Arrival (TDOA), is analogous to human auditory localization, where the brain estimates direction based on interaural timing differences between the ears.

In this system, the same principle is applied computationally, with higher temporal precision and multi-sensor redundancy.

# Distributed Real-Time Processing Architecture

A key design challenge was implementing real-time processing across all hydrophones simultaneously.

Each sensor requires continuous sampling and concurrent execution of the Goertzel algorithm. With four hydrophones, this results in four independent real-time processing pipelines.

A conventional solution would be to use an FPGA, which naturally supports highly parallel signal processing. However, FPGAs introduce increased cost, development complexity, and longer iteration cycles.

Instead, a distributed embedded architecture was implemented using four RP2350 microcontrollers—one per hydrophone.

Each node operates independently:
- **Core 0** is dedicated to deterministic ADC sampling, ensuring precise and stable acquisition timing.
- **Core 1** executes the Goertzel algorithm continuously, monitoring for pinger detections within the target frequency band.

This design effectively transforms each hydrophone into a self-contained real-time acoustic processing unit. When a valid pinger signal is detected, the node immediately timestamps the event and transmits a compact detection packet to the central controller.

# System Synchronization and Master–Slave Communication

To coordinate the distributed hydrophone nodes, the main microcontroller acts as a central synchronization and fusion unit.

A critical requirement of the system is that all hydrophones must begin sampling at precisely the same time to ensure valid Time Difference of Arrival (TDOA) measurements. This synchronization is achieved using a custom single-wire communication protocol implemented via the RP2350's PIO (Programmable I/O) subsystem.

The master MCU issues a hardware-timed trigger pulse over this single-wire bus. Each hydrophone node listens passively on the line and begins sampling immediately upon receiving the trigger, ensuring deterministic alignment across all channels.

The same PIO-based bus is also used for upstream communication from the hydrophone nodes to the master.

When a hydrophone detects a valid pinger event, it writes a compact detection packet into its PIO transmit buffer. Because communication is handled at the hardware level through PIO state machines, multiple hydrophones can report detections simultaneously without contention or blocking. The PIO subsystem arbitrates access deterministically, ensuring that no node stalls or loses data even under concurrent transmission conditions.

This design guarantees that detection events are reliably captured and forwarded without requiring complex software-level locking or scheduling mechanisms.

The main microcontroller does not perform signal processing. Instead, timestamped detections from all hydrophones are aggregated, and Time Difference of Arrival (TDOA) is computed to estimate the direction of the acoustic source.
