When I joined the mechanical subsystem of our RoboSub team, I was assigned the task of designing the AUV's manipulator. At the time, I had little experience with CAD and virtually no background in mechanical design. What followed was nearly a year of learning through research, prototyping, failures, and countless design iterations.

Like most engineering projects, the first step wasn't opening Fusion 360—it was understanding how others had approached the same problem.

I spent several days studying manipulator designs used by RoboSub teams from previous years, reading design reports, and watching maker videos on YouTube. One design, in particular, caught my attention: a **single-servo parallel jaw gripper**. Its simplicity, compactness, and ease of control made it an ideal starting point.

Since I had never designed a gripper before, I began by following a complete CAD tutorial to understand the fundamentals of parametric modeling, assemblies, and motion constraints. Once I was comfortable with the workflow, I started recreating and modifying existing gripper concepts instead of designing entirely from scratch.

Before committing to a design, I performed basic calculations for gripping force, friction, and the torque required to lift common competition objects. The numbers were discouraging.

The inexpensive hobby servos available to us simply could not generate enough output torque to reliably grasp and lift even lightweight objects. While a high-torque industrial servo would have solved the problem, it was far beyond our team's budget. After evaluating the available options, we settled on a **13 kg·cm servo**, which meant the mechanical design itself would have to compensate for the lack of actuator torque.

Rather than purchasing a more powerful actuator, I had to extract more performance from the one we already had.

That became the central engineering challenge.

---

# Iteration 1 — Gear-Assisted Parallel Gripper

The first prototype used a simple gear reduction mechanism.

A **12-tooth spur gear** mounted on the servo shaft drove two **24-tooth spur gears**, providing a 2:1 reduction while synchronizing the motion of both gripper arms. Each driven gear actuated a parallel linkage, allowing the end effector to remain nearly vertical throughout its motion.

Before committing to a full-sized print, I manufactured a **1:4 scale prototype**. This reduced print time and filament consumption while allowing me to evaluate the mechanism's proportions, clearances, and overall feel.

The prototype immediately exposed several shortcomings that were difficult to appreciate in CAD.

The most significant issue was **backlash**. Because the motion relied entirely on spur gears, the accumulated gear clearance resulted in noticeable play at the gripper jaws, reducing positioning accuracy and making object grasping inconsistent.

The second issue was structural rigidity.

To minimize weight, I had designed the links with relatively thin cross-sections. While this looked acceptable in CAD, the printed prototype revealed that the mechanism could flex under modest bending loads, making it unsuitable for underwater manipulation.

Although the first iteration did not meet the performance requirements, it served its purpose perfectly—it transformed assumptions into measurable engineering problems.

---

# Iteration 2 — Chasing Rigidity and Precision

The second design focused on solving the two biggest weaknesses of the original prototype:
- improving structural stiffness,
- reducing backlash in the transmission.

This proved far more difficult than I had anticipated.

As a Computer Science student, I had never formally studied mechanism synthesis or product design. Unlike software, where redesigning architecture is often inexpensive, every mechanical modification affected dozens of interconnected components.

For several weeks, I cycled through one CAD model after another, testing different layouts, link geometries, and transmission concepts. Progress was slow, and there were many occasions when it felt as though every solution introduced two new problems.

Interestingly, the breakthrough came away from the computer.

One morning, after spending days thinking about the problem, I woke up with the idea of abandoning spur gears altogether and replacing the entire transmission with a **worm gear drive**.

The idea immediately appealed to me because I had recently learned in my first-year Mechanics course that worm gear systems are commonly used in lifting mechanisms due to their **high reduction ratios** and **self-locking characteristics**, which greatly reduce back-driving under load.

Instead of relying on the servo alone to resist external forces, the transmission itself could help hold the object securely.

The concept seemed promising, so I decided to redesign the entire mechanism around a worm-drive transmission powered by a **stepper motor**, which would provide continuous rotation and precise position control.

---

# Iteration 3 — Designing Around Constraints

The new transmission solved one problem but immediately created another.

Stepper motors are significantly larger than hobby servos, and the AUV had never been designed to accommodate one. The available vertical clearance was extremely limited, leaving insufficient space for both the manipulator and the motor.

At this point, the challenge shifted from mechanism design to packaging.

I explored multiple CAD layouts, repeatedly rearranging components in an attempt to reduce the overall height of the assembly. Most concepts failed simply because the motor occupied too much vertical space.

After several unsuccessful layouts, I questioned one assumption that I had unconsciously carried throughout the project:

**Why does the motor need to be mounted vertically?**

Once that assumption disappeared, the solution became much clearer.

The stepper motor was rotated into a **horizontal configuration**, dramatically reducing the required vertical clearance. A **worm drive** was mounted directly to the motor shaft, while a combination of **bevel gears** redirected the power transmission by **90 degrees**, allowing the output shaft to drive the vertical gripper mechanism.

This arrangement achieved several objectives simultaneously:
- compact packaging within the AUV,
- higher torque through gear reduction,
- improved positional stability due to the worm drive's self-locking behavior,
- and a much more rigid mechanical architecture.

The final mechanism evolved into what I later called the **Worm-Driven Parallel Jaw Gripper**—a design shaped not by following a textbook, but by repeatedly encountering constraints and engineering around them.

---

# Looking Back

When I began this project, I barely knew how to create a CAD assembly. A year later, I had designed, prototyped, tested, and iterated a complete electromechanical manipulator for an international RoboSub competition.

More importantly, I learned that engineering is rarely about getting the first design right. It is about understanding why a design fails, questioning your assumptions, and using each iteration to move one step closer to a better solution.

The gripper taught me far more than CAD or gear trains—it taught me how real engineering happens.
