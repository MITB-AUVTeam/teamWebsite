The kill switch is one of the most critical safety features on the vehicle. It needed to be physically separated from the rest of the Power Supply Distribution System (PSDS) and genuinely robust: if a sensor fails underwater, the software might be able to compensate, but if the kill switch fails, you either can't start the robot, or worse, you can't stop it.

# Why MOSFETs First

The initial decision was to use MOSFETs after careful research. Having no moving parts meant no mechanical wear over thousands of switching cycles, they switch far faster than any mechanical alternative, and being solid-state meant no arcing to worry about.

The design utilized two separate MOSFET lines controlled by an RP2350-Zero: one connected to all components, and one connected exclusively to the actuation domain (the thrusters). The idea was versatility: if we needed to kill just actuation, we could do that externally, and if a water leak occurred, we could shut down everything at once. We all collaborated on the overall architecture: Chatur helped spec the right MOSFETs, Adwait soldered the board and tweaked a few layout details, and I wired the final connections between the BMS, the PSDS, and the thrusters.

# Choosing the Trigger

Once the voltages were verified, the next problem was how to actually trigger the switch. A magnet was the obvious choice: it meant one less hole to drill through the hull, eliminating a potential leak point. It also allows a diver to trigger the switch externally without needing wet-mateable connectors.

Working with Kshitij on the physical trigger mechanisms, we initially tried a reed switch with small bar magnets, but the trigger distance was too short. Reed switches require the magnet to be extremely close to physically pull the internal contacts together, and through the thickness of the hull, that margin just wasn't there.

We pivoted to a Hall Effect sensor. Since it detects magnetic field strength electronically rather than relying on mechanical contact, it gave us a much greater standoff distance. Kshitij and I paired it with a strong magnet for reliable range and finalized a simple mechanical twist action on the outside of the hull: twist the magnet away, and the actuation domain dies.

# The First Real Test

Testing the setup with both the compute domain and the propulsion system connected went beautifully. The Hall sensor triggered reliably, the thrusters killed on cue, and the compute domain kept running.

Then, during a bench assembly, the system was tested without the thrusters connected, meaning only the line that kills everything was active. After a few minutes, a capacitor blew on one of the PSDS's buck converters.

Our first instinct was to point at inrush current: MOSFETs switch in roughly a microsecond, so the buck capacitors might have seen a near-instant full-voltage step the moment that line came alive. While this could have been the cause, we don't know for sure, and we just couldn't risk blowing up more components to find out.

However, after wiring the BMS directly to the PSDS (which ran fine) and then putting the kill switch back in, only to blow another buck capacitor, the decision was made for us. Two failures across two separate attempts ruled out a one-off bad component. Whatever the exact cause was, you don't gamble on the last line of defense in an emergency.

# Switching to a Relay

After discussing the failure with Chatur, he suggested moving to a mechanical relay. The new design strips away the complexity: it only kills power to the actuation domain. The compute domain stays completely separate, though water leak integration remains open for future revisions.

The reasoning came straight from the hardware failure. A mechanical relay closes over several milliseconds rather than a microsecond, so downstream components see a gradual voltage rise instead of a violent step. This sidesteps the inrush concern without needing to fully redesign the original board.

Taking the compute domain out of the switched path entirely was also the most robust call. The new board reflects that simplicity: a single 30A relay, triggered directly by the Hall sensor through the RP2350-Zero.

# Debouncing and Final Logic

With the hardware locked in, I wrote the switching logic. The code couldn't just be a simple read command. An underwater AUV drawing 30A of high-frequency switching current through its ESCs creates massive Electromagnetic Interference (EMI), and a standard interrupt reading the sensor directly would be exposed to that noise, enough to cause the relay to chatter open and closed rapidly, eventually welding the contacts shut. Physical vibration from the motors was another risk worth guarding against, since it could shift the magnet slightly at the threshold and trigger the same kind of chatter.

To solve this, I implemented a non-blocking state machine with a 50ms software debounce. The code waits for the sensor reading to hold perfectly stable for a short window, filtering out EMI spikes and physical rattling, before treating it as a real state change.

We mounted it in the hull. One clean twist produced one clean cutoff, every time. There will always be room for iteration, but for now, the cutoff is clean, the vehicle is safe, and the AUV keeps swimming.
