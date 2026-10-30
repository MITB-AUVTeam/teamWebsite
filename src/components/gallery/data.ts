// Every photo and clip in the gallery, its filters, and the featured reel.

import azadLockedIn from "@/assets/Gallery/azad_lockedin.webp";
import img_1184 from "@/assets/Gallery/IMG_1184.webp";
import img_1187 from "@/assets/Gallery/IMG_1187.webp";
import img_1325 from "@/assets/Gallery/IMG_1325.webp";
import img_1328 from "@/assets/Gallery/IMG_1328.webp";
import img_2551 from "@/assets/Gallery/IMG_2551.webp";
import img_2811 from "@/assets/Gallery/IMG_2811.webp";
import img_2812 from "@/assets/Gallery/IMG_2812.webp";
import img_2816 from "@/assets/Gallery/IMG_2816.webp";
import img_3106 from "@/assets/Gallery/IMG_3106.webp";
import img_3145 from "@/assets/Gallery/IMG_3145.webp";
import img_3146 from "@/assets/Gallery/IMG_3146.webp";
import img_3556 from "@/assets/Gallery/IMG_3556.webp";
import img_3559 from "@/assets/Gallery/IMG_3559.webp";
import img_3566 from "@/assets/Gallery/IMG_3566.webp";
import img_3568 from "@/assets/Gallery/IMG_3568.webp";
import img_3845 from "@/assets/Gallery/IMG_3845.webp";
import img_3849 from "@/assets/Gallery/IMG_3849.webp";
import img_3923 from "@/assets/Gallery/IMG_3923.webp";
import img_3933 from "@/assets/Gallery/IMG_3933.webp";
import img_3977 from "@/assets/Gallery/IMG_3977.webp";
import img_3980 from "@/assets/Gallery/IMG_3980.webp";
import img_4006 from "@/assets/Gallery/IMG_4006.webp";
import img_4017 from "@/assets/Gallery/IMG_4017.webp";
import img_4026 from "@/assets/Gallery/IMG_4026.webp";
import img0 from "@/assets/Gallery/IMG0.webp";
import img1 from "@/assets/Gallery/IMG1.webp";
import img2 from "@/assets/Gallery/IMG2.webp";
import img3 from "@/assets/Gallery/IMG3.webp";
import img4 from "@/assets/Gallery/IMG4.webp";
import img6 from "@/assets/Gallery/IMG6.webp";
import img7 from "@/assets/Gallery/IMG7.webp";
import img9 from "@/assets/Gallery/IMG9.webp";
import img10 from "@/assets/Gallery/IMG10.webp";
import img11 from "@/assets/Gallery/IMG11.webp";
import img12 from "@/assets/Gallery/IMG12.webp";
import img14 from "@/assets/Gallery/IMG14.webp";
import img15 from "@/assets/Gallery/IMG15.webp";
import img16 from "@/assets/Gallery/IMG16.webp";
import img17 from "@/assets/Gallery/IMG17.webp";
import img18 from "@/assets/Gallery/IMG18.webp";
import img19 from "@/assets/Gallery/IMG19.webp";
import img20 from "@/assets/Gallery/IMG20.webp";
import img22 from "@/assets/Gallery/IMG22.webp";
import img23 from "@/assets/Gallery/IMG23.webp";
import img25 from "@/assets/Gallery/IMG25.webp";
import img26 from "@/assets/Gallery/IMG26.webp";
import img28 from "@/assets/Gallery/IMG28.webp";
import img31 from "@/assets/Gallery/IMG31.webp";
import img32 from "@/assets/Gallery/IMG32.webp";
import img33 from "@/assets/Gallery/IMG33.webp";
import img34 from "@/assets/Gallery/IMG34.webp";
import img36 from "@/assets/Gallery/IMG36.webp";
import img39 from "@/assets/Gallery/IMG39.webp";
import img40 from "@/assets/Gallery/IMG40.webp";
import img41 from "@/assets/Gallery/IMG41.webp";
import img42 from "@/assets/Gallery/IMG42.webp";
import img43 from "@/assets/Gallery/IMG43.webp";
import img44 from "@/assets/Gallery/IMG44.webp";
import im2g3 from "@/assets/Gallery/IM2G3.webp";
import im2g6 from "@/assets/Gallery/IM2G6.webp";
import im2g12 from "@/assets/Gallery/IM2G12.webp";
import im2g14 from "@/assets/Gallery/IM2G14.webp";
import im2g15 from "@/assets/Gallery/IM2G15.webp";
import aryanImg from "@/assets/Gallery/aryan.jpeg";
import cam1Img from "@/assets/Gallery/cam1.jpeg";
import internalImg from "@/assets/Gallery/internal.jpeg";
import teamImg from "@/assets/Gallery/team.jpeg";
import galleryWhiteboard from "@/assets/Gallery/gallery_whiteboard.jpg";
import galleryPoolSide from "@/assets/Gallery/gallery_pool_side.jpg";
import galleryUnderwater from "@/assets/Gallery/gallery_underwater.jpg";
import galleryBoard from "@/assets/Gallery/gallery_board.jpg";
import galleryCad from "@/assets/Gallery/gallery_cad.jpg";
import img_5589 from "@/assets/Gallery/IMG_5589.MOV";
import galleryMentors from "@/assets/Gallery/gallery_mentors.jpg";
import galleryWorking from "@/assets/Gallery/gallery_working.jpg";
import galleryAward from "@/assets/Gallery/gallery_award.jpg";
import galleryPressureTest from "@/assets/Gallery/gallery_pressure_test.jpg";
import galleryPoolTest2 from "@/assets/Gallery/gallery_pool_test_2.mov";
import robosubDepartureBengaluru from "@/assets/Gallery/robosub_departure_bengaluru.jpg";
import robosubFlightToLa from "@/assets/Gallery/robosub_flight_to_la.jpg";
import robosubArrivalAirport from "@/assets/Gallery/robosub_arrival_airport.jpg";
import robosubHotelHullPrep from "@/assets/Gallery/robosub_hotel_hull_prep.jpg";
import robosubHotelElectronics from "@/assets/Gallery/robosub_hotel_electronics.jpg";
import robosubOpeningBriefing from "@/assets/Gallery/robosub_opening_briefing.jpg";
import robosubWoollettAquaticsCenter from "@/assets/Gallery/robosub_woollett_aquatics_center.jpg";
import robosubTeamVillage from "@/assets/Gallery/robosub_team_village.jpg";

export interface GalleryItem {
  src: string;
  category: string;
  alt: string;
  /** Height / width, measured from the file, so columns can be balanced before images load. */
  ratio: number;
}

export const archiveImages: GalleryItem[] = [
  // RoboSub 2026: Irvine, California
  { src: robosubDepartureBengaluru, ratio: 0.75, category: "robosub", alt: "Team departing from Bengaluru airport with the AUV and equipment" },
  { src: robosubFlightToLa, ratio: 0.75, category: "robosub", alt: "Inflight map on the way to Los Angeles" },
  { src: robosubArrivalAirport, ratio: 0.75, category: "robosub", alt: "Team arriving in California with all the luggage" },
  { src: robosubHotelHullPrep, ratio: 1.333, category: "robosub", alt: "Prepping the hull in the hotel room" },
  { src: robosubHotelElectronics, ratio: 1.333, category: "robosub", alt: "Late-night electronics work on the vehicle before competition" },
  { src: robosubOpeningBriefing, ratio: 0.75, category: "robosub", alt: "RoboSub 2026 opening briefing at the venue" },
  { src: robosubWoollettAquaticsCenter, ratio: 0.75, category: "robosub", alt: "Team at the William Woollett Jr. Aquatics Center" },
  { src: robosubTeamVillage, ratio: 0.75, category: "robosub", alt: "Team with Deuterium at the RoboSub team village" },

  { src: aryanImg, ratio: 0.75, category: "team", alt: "Aryan" },
  { src: cam1Img, ratio: 0.804, category: "testing", alt: "Camera View" },
  { src: internalImg, ratio: 1.333, category: "vehicles", alt: "Internal Vehicle View" },
  { src: teamImg, ratio: 0.75, category: "team", alt: "Team Photo" },
  { src: galleryMentors, ratio: 0.75, category: "team", alt: "Team with Mentors" },
  { src: img_1184, ratio: 1.333, category: "team", alt: "Team" },
  { src: img_1187, ratio: 1.333, category: "team", alt: "Team" },
  { src: galleryWhiteboard, ratio: 0.75, category: "team", alt: "Whiteboard Brainstorming" },
  { src: img_1325, ratio: 0.75, category: "team", alt: "Testing" },
  { src: img_1328, ratio: 1.136, category: "team", alt: "Testing" },
  { src: img_2551, ratio: 0.685, category: "team", alt: "Vehicle work session" },
  { src: img_2811, ratio: 0.75, category: "team", alt: "Vehicle assembly work" },
  { src: img_2812, ratio: 0.75, category: "team", alt: "Vehicle assembly close-up" },
  { src: galleryPoolSide, ratio: 0.75, category: "testing", alt: "Poolside Testing" },
  { src: img_2816, ratio: 0.75, category: "team", alt: "Vehicle testing setup" },
  { src: galleryWorking, ratio: 0.562, category: "team", alt: "Prototyping Session" },
  { src: img_3106, ratio: 0.75, category: "team", alt: "Team" },
  { src: img_3145, ratio: 0.75, category: "team", alt: "Testing" },
  { src: img_3146, ratio: 0.75, category: "team", alt: "Testing" },
  { src: img_3556, ratio: 1.333, category: "vehicles", alt: "Vehicle frame and electronics" },
  { src: img_3559, ratio: 1.333, category: "team", alt: "Team working on the vehicle" },
  { src: galleryUnderwater, ratio: 1.333, category: "testing", alt: "AUV Underwater Test" },
  { src: img_3566, ratio: 1.333, category: "team", alt: "Team" },
  { src: img_3568, ratio: 0.75, category: "vehicles", alt: "Vehicle assembly" },
  { src: img_3845, ratio: 1.333, category: "vehicles", alt: "Vehicle testing setup" },
  { src: img_3849, ratio: 1.333, category: "vehicles", alt: "Vehicle testing close-up" },
  { src: galleryAward, ratio: 0.75, category: "vehicles", alt: "First Prize at IEEE RAS Competition" },
  { src: img_3923, ratio: 1.333, category: "team", alt: "Team vehicle work session" },
  { src: img_3933, ratio: 1.333, category: "team", alt: "Team working near the vehicle" },
  { src: img_3977, ratio: 0.75, category: "team", alt: "Team" },
  { src: img_3980, ratio: 0.75, category: "vehicles", alt: "Vehicle hardware close-up" },
  { src: img_4006, ratio: 0.75, category: "testing", alt: "Testing" },
  { src: img_4017, ratio: 1.333, category: "testing", alt: "Testing" },
  { src: img_5589, ratio: 0.68, category: "testing", alt: "AUV Test Run Video" },
  { src: galleryBoard, ratio: 0.75, category: "vehicles", alt: "Main MCU Board" },
  { src: img_4026, ratio: 0.75, category: "vehicles", alt: "Vehicle electronics and wiring" },
  { src: img0, ratio: 0.75, category: "testing", alt: "Swimming pool assembly" },
  { src: img1, ratio: 0.75, category: "testing", alt: "First T200 thruster testing" },
  { src: img2, ratio: 1.333, category: "testing", alt: "Ground launcher testing" },
  { src: img3, ratio: 1.333, category: "team", alt: "Assembling the first ground bot" },
  { src: img4, ratio: 1.327, category: "team", alt: "Aditya and Pranav working" },
  { src: img6, ratio: 0.75, category: "team", alt: "First test of all five thrusters" },
  { src: img7, ratio: 1.333, category: "testing", alt: "Top view of the hull" },
  { src: img9, ratio: 0.75, category: "testing", alt: "Ground launcher testing" },
  { src: img10, ratio: 1.333, category: "testing", alt: "Checking ZED 2i camera feed" },
  { src: img11, ratio: 0.753, category: "testing", alt: "Azad using the oscilloscope" },
  { src: img12, ratio: 0.75, category: "vehicles", alt: "Ground bot" },
  { src: img14, ratio: 0.75, category: "vehicles", alt: "Hydrogen in the pool" },
  { src: galleryPressureTest, ratio: 1.333, category: "testing", alt: "Watertight Pressure Testing" },
  { src: img15, ratio: 0.753, category: "team", alt: "Faizal, Azad, and Arunava working" },
  { src: img16, ratio: 0.75, category: "team", alt: "Arunava and Faizal in the wood workshop" },
  { src: img17, ratio: 0.75, category: "testing", alt: "Pool testing" },
  { src: img18, ratio: 0.753, category: "team", alt: "Hanging up our IEEE RAS first-place award" },
  { src: img19, ratio: 1.333, category: "testing", alt: "Wiring the AUV in front of the pool" },
  { src: img20, ratio: 1.333, category: "team", alt: "Wood fabrication" },
  { src: img22, ratio: 1.333, category: "vehicles", alt: "Screwing in the thrusters" },
  { src: img23, ratio: 1.333, category: "vehicles", alt: "Siddharth standing in the pool" },
  { src: img25, ratio: 1.327, category: "testing", alt: "Preparing the AUV for testing" },
  { src: img26, ratio: 0.75, category: "team", alt: "Siddharth and Azad discussing something important" },
  { src: img28, ratio: 0.75, category: "testing", alt: "Woodfish Gazebo simulation" },
  { src: img31, ratio: 1.333, category: "team", alt: "Chatur and Azad discussing" },
  { src: img32, ratio: 0.753, category: "team", alt: "Faizal sitting in the balcony" },
  { src: img33, ratio: 1.333, category: "team", alt: "Wooden stick in Arunava's hair" },
  { src: img34, ratio: 1.333, category: "team", alt: "Animesh and Azad discussing" },
  { src: img36, ratio: 1.327, category: "vehicles", alt: "First test of all five thrusters" },
  { src: galleryCad, ratio: 0.604, category: "vehicles", alt: "AUV 3D Render" },
  { src: img39, ratio: 1.333, category: "vehicles", alt: "First look at the fabricated hull" },
  { src: img40, ratio: 1.333, category: "team", alt: "Testing the ground bot" },
  { src: img41, ratio: 0.75, category: "team", alt: "First pool testing of Hydrogen" },
  { src: galleryPoolTest2, ratio: 0.68, category: "testing", alt: "Underwater Swimming Test" },
  { src: img42, ratio: 0.75, category: "team", alt: "Azad teaching Aditya and Pranav" },
  { src: img43, ratio: 1.333, category: "testing", alt: "First DShot testing" },
  { src: img44, ratio: 1.333, category: "team", alt: "Arunava working on the ground bot" },
  { src: im2g3, ratio: 1.333, category: "testing", alt: "Internal layout of the AUV" },
  { src: im2g6, ratio: 0.562, category: "team", alt: "Hydrophones PCB design" },
  { src: im2g12, ratio: 0.562, category: "team", alt: "RTAB-Map visualization" },
  { src: im2g14, ratio: 1.329, category: "testing", alt: "Animesh, Chatur, and Arunava" },
  { src: im2g15, ratio: 1.333, category: "testing", alt: "IM2G15" },
  { src: azadLockedIn, ratio: 0.75, category: "team", alt: "Azad Roy" },
];

export const filters = [
  { value: "all", label: "All" },
  { value: "vehicles", label: "Vehicles" },
  { value: "team", label: "Team" },
  { value: "testing", label: "Testing" },
  { value: "robosub", label: "RoboSub 26'" },
];

export const filterCounts = Object.fromEntries(
  filters.map((f) => [
    f.value,
    f.value === "all" ? archiveImages.length : archiveImages.filter((i) => i.category === f.value).length,
  ]),
) as Record<string, number>;

export const isVideo = (src: string) => /\.(mov|mp4)(\?|$)/i.test(src);

// 960px-wide copies of every photo (src/assets/Gallery/thumbs) for the grid and the
// lightbox strip; the full-size original only loads in the lightbox itself.
const thumbs = Object.fromEntries(
  Object.entries(import.meta.glob<string>("/src/assets/Gallery/thumbs/*.webp", { eager: true, import: "default" })).map(
    ([path, url]) => [path.split("/").pop()!.replace(/\.webp$/, ""), url],
  ),
);

/** Grid-sized copy of a gallery photo, or the original when there isn't one. */
export function thumbOf(src: string) {
  // Built asset names carry an 8-character hash suffix: IMG_1184-a1B2c3D4.webp
  const stem = src.split("/").pop()!.split("?")[0].replace(/\.[^.]+$/, "").replace(/-[\w-]{8}$/, "");
  return thumbs[stem] ?? src;
}

export const categoryLabel: Record<string, string> = Object.fromEntries(filters.map((f) => [f.value, f.label]));

/** Hand-picked frames for the opening reel, with short field-log captions. */
export const featured = [
  { src: robosubTeamVillage, alt: "Team with Deuterium at the RoboSub team village", caption: "Team village", place: "Irvine, CA" },
  { src: galleryUnderwater, alt: "AUV Underwater Test", caption: "First dive", place: "Pool test" },
  { src: galleryAward, alt: "First Prize at IEEE RAS Competition", caption: "First prize", place: "IEEE RAS" },
  { src: robosubWoollettAquaticsCenter, alt: "Team at the William Woollett Jr. Aquatics Center", caption: "Woollett Aquatics", place: "Irvine, CA" },
  { src: img14, alt: "Hydrogen in the pool", caption: "Hydrogen afloat", place: "Pool test" },
  { src: robosubHotelElectronics, alt: "Late-night electronics work on the vehicle before competition", caption: "Night shift", place: "Hotel bench" },
  { src: galleryPressureTest, alt: "Watertight Pressure Testing", caption: "Seal check", place: "Pressure test" },
  { src: galleryCad, alt: "AUV 3D Render", caption: "Hull render", place: "CAD" },
];
