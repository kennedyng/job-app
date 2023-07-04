interface NavLink {
  id: string;
  label: string;
  link: string;
}

export const navlinks: NavLink[] = [
  {
    id: "link-1",
    label: "Find Jobs",
    link: "/listings",
  },
  {
    id: "link-2",
    label: "saved",
    link: "/listings/saved",
  },
];
