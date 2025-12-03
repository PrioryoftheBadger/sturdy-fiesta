// src/categories.ts
import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "preLunchHype",
    name: "Pre-Lunch Hype",
    description:
      "How well was the lunch organised? Invites, menus, reminders – did it feel vaguely professional?",
  },
  {
    id: "distanceToVenue",
    name: "Distance to Venue",
    description:
      "Perfect balance between “brisk constitutional” and “why didn’t we take the bus?”.",
  },
  {
    id: "weatherManagement",
    name: "Weather Management",
    description:
      "Bonus vibes if it didn’t rain or gale. Double if someone forgot an umbrella.",
  },
  {
    id: "firstImpressions",
    name: "First Impressions",
    description:
      "Did the place look inviting, or like a front for something mildly unlicensed?",
  },
  {
    id: "ambianceAcoustics",
    name: "Ambiance & Acoustics",
    description:
      "Could you hear your colleagues, or only the espresso machine and existential dread?",
  },
  {
    id: "tableConfiguration",
    name: "Table Configuration",
    description:
      "Can everyone see everyone else, or is someone marooned on the orphan seat in the corner?",
  },
  {
    id: "serviceSpeed",
    name: "Service Speed",
    description: "Graded on a generous curve: faster than a glacier = 10.",
  },
  {
    id: "foodQuality",
    name: "Food Quality",
    description:
      "Tasted good? Looked edible? We’re not checking the kitchen hygiene rating today.",
  },
  {
    id: "beverageSelection",
    name: "Beer / Beverage Selection",
    description:
      "Range, quality, and price. Bonus vibes for non-alcoholic options that don’t taste like regret.",
  },
  {
    id: "conversationQuality",
    name: "Conversation Quality",
    description:
      "Witty banter, light gossip, or at least one non-awkward weekend plan.",
  },
  {
    id: "unexpectedGuestStar",
    name: "Unexpected Guest Star",
    description:
      "Boss? Client? That one person from IT? Did their presence improve or tank the mood?",
  },
  {
    id: "budgetCompliance",
    name: "Budget Compliance",
    description:
      "Did you stay within limit or creatively rebrand dessert as “staff morale initiative”?",
  },
  {
    id: "managerialApproval",
    name: "Managerial Approval Rating",
    description:
      "Would HR plausibly describe this as a “good use of public funds”?",
  },
  {
    id: "digestiveAftermath",
    name: "Digestive Aftermath",
    description:
      "Were naps discussed? Was regret felt? Would you do it again tomorrow?",
  },
  {
    id: "returnToOfficeVelocity",
    name: "Return to Office Velocity",
    description:
      "Did the walk back feel shorter or longer? Adjust for post-lunch lethargy.",
  },
];

export const MAX_BASE_TOTAL = CATEGORIES.length * 10;
