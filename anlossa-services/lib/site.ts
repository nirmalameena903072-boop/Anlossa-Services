export const SITE = {
  name: "Anlossa Services",
  monogram: "AS",
  email: "anlossaservices@gmail.com",
  founder: "Pradeep",
  founderTitle: "Founder & Talent Partnerships",
  model: {
    upfront: "₹0",
    commission: "20%",
    trial: "30-day",
  },
} as const;

export const NAV_LINKS = [
  { label: "Positioning", href: "#positioning", index: "01" },
  { label: "Roster", href: "#roster", index: "02" },
  { label: "Method", href: "#method", index: "03" },
  { label: "Partners", href: "#partners", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
] as const;

export type RosterProfile = {
  id: string;
  name: string;
  archetype: string;
  city: string;
  followers: string;
  engagement: string;
  reach: string;
  saveRate: string;
  demographic: string;
  contentFocus: string[];
  campaign: string;
  campaignDetail: string;
  formats: string[];
  window: string;
  accent: string;
};

export const ROSTER: RosterProfile[] = [
  {
    id: "01",
    name: "The Barrier Specialist",
    archetype: "Acne & Barrier Repair",
    city: "Mumbai",
    followers: "84K",
    engagement: "6.2%",
    reach: "310K / mo",
    saveRate: "9.4%",
    demographic: "86% women · 24–34 · Tier-1 metros",
    contentFocus: ["Acne protocols", "Barrier repair", "Ingredient science"],
    campaign: "14-Day Barrier Reset",
    campaignDetail:
      "A fortnight of clinical, non-hype storytelling around a ceramide-led moisturiser — builds trust before the sell.",
    formats: ["4 Reels", "1 long-form YouTube", "6 Stories"],
    window: "3-week flight",
    accent: "#C6A87C",
  },
  {
    id: "02",
    name: "The Ingredient Ledger",
    archetype: "Ingredient-Led Skincare",
    city: "Bengaluru",
    followers: "121K",
    engagement: "4.8%",
    reach: "402K / mo",
    saveRate: "7.1%",
    demographic: "78% women · 22–30 · Metro + Tier-2",
    contentFocus: ["Actives education", "Formulation deep-dives", "Routine audits"],
    campaign: "Actives, Decoded",
    campaignDetail:
      "A three-part explainer series placing a niacinamide + zinc launch beside evidence, patch tests and honest caveats.",
    formats: ["3 Reels", "2 carousels", "8 Stories"],
    window: "4-week flight",
    accent: "#9CB3A6",
  },
  {
    id: "03",
    name: "The Bridal Constant",
    archetype: "Bridal & Everyday Beauty",
    city: "Delhi NCR",
    followers: "148K",
    engagement: "5.4%",
    reach: "455K / mo",
    saveRate: "8.2%",
    demographic: "91% women · 25–38 · NCR + Punjab",
    contentFocus: ["Bridal prep", "Long-wear bases", "Prep-to-ceremony rituals"],
    campaign: "The 90-Day Prep Edit",
    campaignDetail:
      "Wedding-season editorial where a hydration range becomes the backbone of a bride's skin-prep calendar.",
    formats: ["5 Reels", "1 YouTube vlog", "10 Stories"],
    window: "6-week flight",
    accent: "#D7B7AE",
  },
  {
    id: "04",
    name: "The Clean-Scalp Voice",
    archetype: "Haircare & Scalp Health",
    city: "Pune",
    followers: "63K",
    engagement: "7.1%",
    reach: "198K / mo",
    saveRate: "10.6%",
    demographic: "72% women · 20–32 · Maharashtra + Goa",
    contentFocus: ["Scalp health", "Hair-fall routines", "Sulphate-free swaps"],
    campaign: "Root Cause",
    campaignDetail:
      "Documentary-style series following a six-week scalp-oil ritual, with honest before/after and zero paid claims.",
    formats: ["4 Reels", "1 carousel", "6 Stories"],
    window: "6-week flight",
    accent: "#B9A2C0",
  },
  {
    id: "05",
    name: "The Grooming Ledger",
    archetype: "Men's Grooming & Skin",
    city: "Hyderabad",
    followers: "37K",
    engagement: "6.8%",
    reach: "112K / mo",
    saveRate: "8.9%",
    demographic: "68% men · 22–31 · Telangana + AP",
    contentFocus: ["Beard care routines", "Oil-control skin", "Barrier basics for men"],
    campaign: "The Quiet Routine",
    campaignDetail:
      "A non-performative morning routine series built for a grooming brand entering South India at scale.",
    formats: ["3 Reels", "4 Stories", "1 YouTube short"],
    window: "3-week flight",
    accent: "#A8B6C4",
  },
  {
    id: "06",
    name: "The Daily-Actives Author",
    archetype: "Everyday Minimalist Skincare",
    city: "Kolkata",
    followers: "96K",
    engagement: "5.6%",
    reach: "268K / mo",
    saveRate: "7.8%",
    demographic: "88% women · 23–35 · East India metros",
    contentFocus: ["3-step routines", "Budget actives", "Sunscreen fluency"],
    campaign: "One Product, Seven Days",
    campaignDetail:
      "A seven-day diary proving a single-product positioning through real use, not scripted claims.",
    formats: ["7 Reels", "6 Stories"],
    window: "2-week flight",
    accent: "#C9B99B",
  },
];

export const SERVICE_CATEGORIES = [
  "Skincare",
  "Sunscreen & Actives",
  "Haircare",
  "Clean Beauty",
  "Grooming",
  "D2C Launches",
  "Personal Care",
  "Barrier Repair",
] as const;

/**
 * What each side of the marketplace actually receives. This is the value
 * proposition shown beside the composer — concrete deliverables, not
 * testimonials or invented examples.
 */
export const VALUE_CREATOR = [
  "Direct outreach to relevant skincare, haircare and beauty sponsors",
  "Rate negotiation and usage-rights clarity before you shoot",
  "Contract and payment coordination handled end to end",
  "₹0 upfront — there is no fee to join the roster",
  "20% commission, charged only on closed deals",
  "30-day non-exclusive trial — cancel any time",
] as const;

export const VALUE_BRAND = [
  "Vetted Indian beauty and skincare creators, matched to product fit",
  "Audience authenticity checked before any introduction",
  "Campaign briefs, deliverables and approvals run through one point of contact",
  "Rate architecture and usage rights written into one clean term sheet",
  "Contracts and invoicing handled by Anlossa, not by you",
  "20% on closed deals only — no retainer, no listing fee",
] as const;
