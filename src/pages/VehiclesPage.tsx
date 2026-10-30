import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@/components/ui/smooth-scroll";
import { Footer } from "@/components/Footer";
import proto1Img from "@/assets/Gallery/IMG_4024_2.webp";
import proto2Img from "@/assets/Gallery/deuterium3.jpeg";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { VehicleChapter, type Vehicle } from "@/components/vehicles/vehicle-chapter";
import { TdrReport } from "@/components/vehicles/tdr-report";

const vehicles: Vehicle[] = [
  {
    name: "Hydrogen",
    tagline: "Prototype 0",
    description: "Our zeroth prototype, which was essentially an ROV, designed to test our basic design philosophy and understand the core concepts around underwater robotics.",
    image: proto1Img,
    specs: [
      { label: "Dimensions", value: "330mm (L) × 340mm (W) × 230mm (H)" },
      { label: "Mass", value: "5 kg" },
      { label: "Degrees of Freedom", value: "5 (Surge, Heave, Roll, Pitch, Yaw)" },
      { label: "Navigation", value: "BNO055 IMU" },
      { label: "Compute", value: "Raspberry Pi5 8GB" },
      { label: "Power", value: "External DC Power Supply" },
      { label: "Propulsion", value: "5× T200 Thrusters, 5× BlueRobotics Basic ESCs" },
      { label: "Software", value: "ROS on Ubuntu 22.04 LTS" },
    ],
    scan: {
      aspect: 4 / 3,
      points: [
        { x: 30, y: 70, system: "Propulsion", label: "T200 thrusters", detail: "Five BlueRobotics T200 thrusters on Basic ESCs give five degrees of freedom: surge, heave, roll, pitch and yaw." },
        { x: 47, y: 54, system: "Compute", label: "Raspberry Pi 5", detail: "An 8GB Raspberry Pi 5 running ROS on Ubuntu 22.04, sealed inside the central enclosure." },
        { x: 52, y: 42, system: "Navigation", label: "BNO055 IMU", detail: "A BNO055 inertial measurement unit tracks orientation so the vehicle can hold its attitude." },
        { x: 62, y: 29, system: "Structure", label: "Open frame", detail: "A lightweight open frame, 330 × 340 × 230 mm and 5 kg, built to test our core design philosophy." },
        { x: 34, y: 89, system: "Power", label: "Surface tether", detail: "Hydrogen runs from an external DC power supply through its tether, making it an ROV rather than a free swimmer." },
      ],
    },
  },
  {
    name: "Deuterium",
    tagline: "Prototype 1",
    description: "Our very first AUV, designed based on our learnings from Hydrogen, this model gives us extreme modularity and ample space to house all essential electronics safely for successful task execution.",
    image: proto2Img,
    specs: [
      { label: "Dimensions", value: "620mm (L) × 400mm (W) × 250mm (H)" },
      { label: "Mass", value: "20 kg" },
      { label: "Degrees of Freedom", value: "5 (Surge, Heave, Roll, Pitch, Yaw)" },
      { label: "Navigation", value: "BNO055 IMU, BlueRobotics Pressure/Depth Sensor" },
      { label: "Compute", value: "Raspberry Pi5 8GB, Nvidia Jetson Orin Nano 8GB" },
      { label: "Power", value: "Lithium-ion Battery (14.8V, 18Ah)" },
      { label: "Vision System", value: "Zed 2i Depth Camera (x2)" },
      { label: "Propulsion", value: "5× T200 Thrusters, 5× BlueRobotics Basic ESCs" },
      { label: "Dropper", value: "Custom-designed 3D printed dropper" },
      { label: "Hydrophones", value: "In-house custom-built Hydrophones" },
      { label: "Software", value: "ROS2 on Ubuntu 22.04 LTS" },
    ],
    scan: {
      aspect: 982 / 877,
      points: [
        { x: 55, y: 30, system: "Compute", label: "Pi 5 + Jetson Orin Nano", detail: "A Raspberry Pi 5 and an Nvidia Jetson Orin Nano share the electronics bay, running ROS2 on Ubuntu 22.04." },
        { x: 78, y: 56, system: "Vision", label: "Zed 2i depth cameras", detail: "Two Zed 2i stereo depth cameras look out through a sealed front window for object detection and navigation." },
        { x: 44, y: 66, system: "Propulsion", label: "T200 thrusters", detail: "Five BlueRobotics T200 thrusters with Basic ESCs drive surge, heave, roll, pitch and yaw." },
        { x: 13, y: 44, system: "Navigation", label: "IMU + depth sensor", detail: "A BNO055 IMU and a BlueRobotics pressure sensor give the vehicle its orientation and depth." },
        { x: 30, y: 22, system: "Hull", label: "Aluminium pressure hull", detail: "A custom aluminium hull with a clamped, sealed lid: 620 × 400 × 250 mm and 20 kg, with room to keep every board dry." },
        { x: 26, y: 74, system: "Power", label: "14.8V Li-ion pack", detail: "An 18Ah, 14.8V lithium-ion battery powers the vehicle untethered, alongside a custom dropper and in-house hydrophones." },
      ],
    },
  },
];

/** Home's subsystem cards land here: each sub-team's part of Deuterium, or the design report. */
const SUBSYSTEM_TARGETS: Record<string, string> = {
  mechanical: "deuterium-hull",
  electrical: "deuterium-power",
  software: "deuterium-compute",
  design: "tdr",
};

export function VehiclesPage() {
  const { hash } = useLocation();
  const lenis = useLenis();

  // Glide down to the requested subsystem once the page has settled, and light it up in the scan
  useEffect(() => {
    const id = SUBSYSTEM_TARGETS[hash.slice(1).toLowerCase()];
    if (!id) return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      window.dispatchEvent(new CustomEvent("auv:focus-system", { detail: id }));
      // Rows land just above the scan's activation line; the report heading near the top
      const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * (id === "tdr" ? 0.12 : 0.4);
      if (lenis) lenis.scrollTo(top, { duration: 1.8 });
      else window.scrollTo({ top, behavior: "smooth" });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [hash, lenis]);

  return (
    <div className="flex min-h-screen flex-col text-white">
      <PageHeader
        eyebrow="Vehicles"
        title="Our"
        accent="vehicles."
        description="Discover the engineering marvels that power our underwater exploration. From our initial proof-of-concept to our advanced autonomous systems."
      >
        <nav aria-label="Vehicles" data-gsap="batch" className="flex flex-wrap gap-3">
          {vehicles.map((v, i) => (
            <a
              key={v.name}
              href={`#${v.name.toLowerCase()}`}
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-2 pr-5 text-sm text-slate-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] font-mono text-xs tabular-nums text-slate-400 transition-colors group-hover:bg-tone group-hover:text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              {v.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {vehicles.map((vehicle, index) => (
          <VehicleChapter key={vehicle.name} vehicle={vehicle} index={index} />
        ))}
      </div>

      <section id="tdr" aria-label="Technical design report" className="mx-auto w-full max-w-7xl px-5 sm:px-8 pb-24 md:pb-36">
        <div className="border-t border-white/10 pt-24 md:pt-36">
          <SectionHeading
            eyebrow="Documentation"
            title="Technical design"
            accent="report."
            description="Our official Technical Design Report (TDR) details the engineering decisions, hardware architecture, and software autonomy methodologies behind our competition vehicle."
          />

          <TdrReport />
        </div>
      </section>

      <Footer />
    </div>
  );
}
