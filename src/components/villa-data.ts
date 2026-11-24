import heroAsset from "@/assets/img/01_hero_exterior_sunset.jpg";
import exteriorEvening from "@/assets/img/02_villa_exterior_evening.jpg";
import exteriorDusk from "@/assets/img/03_villa_exterior_dusk.jpg";
import livingRoom from "@/assets/img/04_luxury_living_room.jpg";
import kitchen from "@/assets/img/05_modern_kitchen_dining.jpg";
import bedroom from "@/assets/img/06_master_bedroom_mountain_view.jpg";
import garden from "@/assets/img/07_landscaped_garden_lounge.jpg";
import bathroom from "@/assets/img/08_luxury_bathroom_mountain_view.jpg";
import pool from "@/assets/img/09_villa_pool_night.jpg";

export const photos = [
  { src: heroAsset, alt: "Budhanilkantha Villa at sunset" },
  { src: exteriorEvening, alt: "Villa exterior in the evening" },
  { src: exteriorDusk, alt: "Villa exterior at dusk" },
  { src: livingRoom, alt: "Spacious villa living room" },
  { src: kitchen, alt: "Modern kitchen and dining room" },
  { src: bedroom, alt: "Master bedroom overlooking the mountains" },
  { src: garden, alt: "Landscaped garden lounge" },
  { src: bathroom, alt: "Luxury bathroom with mountain view" },
  { src: pool, alt: "Villa pool at night" },
] as const;

export { bathroom, bedroom, garden, heroAsset, kitchen, livingRoom, pool };

export const statItems = [
  { title: "Scenic Surroundings", text: "Peaceful views of hills and lush greenery" },
  { title: "Secure & Private", text: "24/7 security in a gated community" },
  { title: "Premium Living", text: "Spacious rooms with modern architecture" },
  { title: "Eco Friendly", text: "Sustainable living with green environment" },
  { title: "Prime Location", text: "Close to schools, temples and main roads" },
] as const;

export const specs = [
  ["Land Area", "12 Aana"],
  ["Built-up Area", "6,500 sq.ft."],
  ["Bedrooms", "5"],
  ["Bathrooms", "6"],
  ["Living Rooms", "2"],
  ["Parking", "3 Cars"],
] as const;

export const amenities = [
  "Landscaped Garden",
  "Swimming Pool",
  "Rooftop Terrace",
  "Modern Kitchen",
  "Home Theater",
  "24/7 Security",
  "Power Backup",
  "Wi-Fi Connectivity",
] as const;

export const distances = [
  ["Budhanilkantha Temple", "2 mins"],
  ["Ring Road", "5 mins"],
  ["Airport", "25 mins"],
  ["Thamel", "20 mins"],
] as const;
