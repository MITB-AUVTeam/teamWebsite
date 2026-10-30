export interface CrewMember {
  name: string;
  role: string;
  department?: string;
  bio?: string;
  image: string;
  location?: string;
  skills?: string[];
  social?: { linkedin?: string | null; github?: string | null; email?: string | null };
}

/** Badge code such as "AUV-03·07": group number, then position within the group. */
export const crewCode = (group: number, index: number) =>
  `AUV-${String(group + 1).padStart(2, "0")}·${String(index + 1).padStart(2, "0")}`;
