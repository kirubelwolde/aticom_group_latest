
export interface BusinessSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  route: string;
  buttonText: string;
}

export const businessSlides: BusinessSlide[] = [
  {
    title: "Real Estate Development",
    subtitle: "Building Ethiopia's Future",
    description: "Modern residential and commercial properties that shape Ethiopia's urban landscape with quality and innovation.",
    image: "https://nairametrics.com/wp-content/uploads/2022/03/Property-Development.jpg",
    route: "/real-estate",
    buttonText: "Explore Real Estate"
  },
  {
    title: "ATICADO Fresh Avocado",
    subtitle: "Premium Ethiopian Avocados",
    description: "Premium Ethiopian avocados cultivated with sustainbable farming practices and exported globally.",
    image: "https://www.bda.uk.com/static/3f0121a6-68e0-4a0f-867102c9da2f0763/avocadoes.jpg",
    route: "/avocado-fresh",
    buttonText: "Explore Avocado Business"
  },
  {
    title: "Ethiopian Coffee Export",
    subtitle: "Rich Heritage Coffee",
    description: "Premium Ethiopian coffee beans sourced from highlands, renowned for exceptional flavor and rich heritage.",
    image: "https://coffeehunter.com/wp-content/uploads/2022/10/Ethiopia-square-2.jpg",
    route: "/coffee",
    buttonText: "Explore Coffee Export"
  },
  {
    title: "Bathroom Solutions",
    subtitle: "Complete Sanitary Solutions",
    description: "Modern bathroom fittings, sanitary ware, and complete bathroom solutions for residential and commercial projects.",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    route: "/bathroom-solutions",
    buttonText: "Explore Bathroom Solutions"
  },
  {
    title: "Ceramic Tiles",
    subtitle: "Premium Tile Manufacturing",
    description: "High-quality ceramic tiles for flooring and wall applications, combining durability with aesthetic appeal.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
    route: "/ceramic-tiles",
    buttonText: "Explore Ceramic Tiles"
  },
  {
    title: "Cereal Crops Export",
    subtitle: "Quality Ethiopian Grains",
    description: "High-quality Ethiopian cereal crops including wheat, barley, and specialty grains for international markets.",
    image: "https://millingmea.com/wp-content/uploads/2023/05/cereal-crops.jpg",
    route: "/cereal-crops",
    buttonText: "Explore Cereal Export"
  }
];
