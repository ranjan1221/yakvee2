import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Factory,
  Gift,
  Grid3x3,
  Instagram,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  PaintBucket,
  Palette,
  Phone,
  Printer,
  Ruler,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';


type Project = {
  name: string;
  category: string;
  image: string;
  description: string;
  tags: Exclude<Filter, 'All'>[];
  client?: string;
};

type Client = {
  name: string;
  image?: string;
  category: string;
  featured?: boolean;
  logo?: boolean;
  logoImage?: string;
};

type Capability = {
  title: string;
  items: string[];
  icon: typeof Package;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

const imagePath = '/images/';
const clientPath = '/images/clients/';
const logoPath = '/images/logos/';

const suppliedLogos = [
  ['aurencia_logo_4.avif', 'Aurencia'],
  ['aweri-logo.webp', 'Aweri'],
  ['lil_igloo_logo_square.avif', 'Little Igloo'],
  ['signify-logo.svg', 'Signify'],
  ['instamart-logo-vector_logoshape.com.svg', 'Instamart'],
  ['payal-keyal-dark.png', 'Payal Keyal'],
  ['Zoet_For_Website.webp', 'Zoet'],
  ['350879139_633113418875222_3952075430178214945_n.png', 'Pearls India'],
  ['416748217_1534718534036178_5283738482777238866_n.png', 'High On Churros'],
  ['715375796_18049721957777624_2361478550552287758_n.png', 'Gemeria'],
  ['608857678_18356744929201640_7860221194799015723_n.png', 'Nytarra'],
  ['logo_4046f8a2-ed2e-4616-b823-9c7e32a3083d.avif', 'Majestic Pure'],
  ['logo_107a2c0c-7f30-46ef-b852-05b27807f310_110x@2x.avif', 'Sleepy Owl'],
  ['Gemini_Generated_Image_ozhhpiozhhpiozhh.png', 'Hyderabadi Chacha'],
  ['ChatGPT Image Sep 4, 2026, 02_28_29 PM.png', 'Purely Pufflicious'],
  ['ChatGPT Image Sep 4, 2026, 02_31_35 PM.png', 'Karvan'],
  ['ChatGPT Image Sep 4, 2026, 02_33_52 PM.png', 'Shri Shyam Tiffins'],
  ['ChatGPT Image Sep 4, 2026, 02_37_18 PM.png', 'YOGO'],
  ['Untitled_800_x_400_px_e2645dc5-92da-44b1-bccc-ed9161f37d0d.webp', 'AAURAM'],
] as const;

// Work gallery showcasing client projects with primary images and tags for filtering
const projects: Project[] = [
  // Featured client work
  { name: 'Payal Keyal', category: 'Fashion & couture', image: `${clientPath}Payal Keyal.jpeg`, tags: ['Gifting', 'Custom'], client: 'Payal Keyal', description: 'A rich, tactile couture presentation box with deep colour and floral detail designed to make every handover feel special.' },
  { name: 'Aurencia', category: 'Luxury pens & stationery', image: `${clientPath}aurencia.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Aurencia', description: 'A deep navy rigid box finished with gold detailing, built to turn a gift into a keepsake.' },
  { name: 'Aweri', category: 'Sweets & confectionery', image: `${clientPath}aweri.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Aweri', description: 'A vivid presentation set for Aweri, designed around branded gifting and product presentation.' },
  { name: 'Serenity Hue', category: 'Beauty & skincare', image: `${clientPath}serenity hue.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Serenity Hue', description: 'A considered gifting presentation for Serenity Hue with coordinated packaging and inserts.' },
  { name: 'Shri Shyam Tiffins', category: 'Tiffin & food service', image: `${clientPath}shrre shyam tiffins.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'Shri Shyam Tiffins', description: 'Branded food packaging for Shri Shyam Tiffins, bringing product information and presentation together.' },
  { name: 'Little Igloo', category: 'Baby essentials', image: `${clientPath}Little Igloo.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Little Igloo', description: 'A soft, story-led packaging presentation created for Little Igloo.' },
  { name: 'Pearls India', category: 'Jewellery', image: `${clientPath}pearls india.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Pearls India', description: 'A floral presentation box created for Pearls India, with a carefully finished opening experience.' },
  
  // Food & Beverage
  { name: 'Sprite', category: 'Beverage campaign', image: `${clientPath}Sprite.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'Sprite', description: 'A bold campaign packaging presentation for Sprite Korean Edition.' },
  { name: 'Swiggy', category: 'Food delivery campaign', image: `${clientPath}Swiggy.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'Swiggy', description: 'A branded campaign presentation developed for Swiggy.' },
  { name: 'Instamart', category: 'Food & grocery', image: `${clientPath}Instamart.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'Instamart', description: 'A playful branded packaging set created for Instamart.' },
  { name: 'Tencha Blends', category: 'Tea packaging', image: `${clientPath}Tencha.jpeg`, tags: ['Boxes', 'Gifting', 'Food', 'Custom'], client: 'Tencha Blends', description: 'Tea packaging for Tencha Blends, with a coordinated front and information-led back panel.' },
  
  // Additional clients
  { name: 'YOGO', category: 'Frozen yoghurt', image: `${clientPath}YOGO.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'YOGO', description: 'Premium packaging for YOGO, combining functionality with vibrant brand identity.' },
  { name: 'Mamaearth', category: 'Natural beauty & personal care', image: `${clientPath}Mamaearth.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Mamaearth', description: 'Eco-conscious packaging design for Mamaearth, reflecting their brand values.' },
  { name: 'High On Churros', category: 'Food packaging', image: `${clientPath}High On Churros.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'High On Churros', description: 'Fun and engaging packaging for High On Churros designed for immediate shelf appeal.' },
  { name: 'Hyderabadi Chacha', category: 'Restaurant & takeaway', image: `${clientPath}Hyderabadi Chacha.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'Hyderabadi Chacha', description: 'Traditional meets modern in this packaging for Hyderabadi Chacha.' },
  { name: 'AAURAM', category: 'Wellness & gifting', image: `${clientPath}AAURAM.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'AAURAM', description: 'Premium wellness packaging solution for AAURAM brand.' },
  { name: 'Carat Bazaar', category: 'Fine jewellery', image: `${clientPath}Carat Bazaar.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Carat Bazaar', description: 'Luxury packaging for Carat Bazaar, emphasizing premium positioning.' },
  { name: 'Gemeria', category: 'Hair care & extensions', image: `${clientPath}Gemeria.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Gemeria', description: 'Sophisticated packaging design for Gemeria brand.' },
  { name: 'Nytarra', category: 'Incense & home fragrance', image: `${clientPath}Nytarra.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Nytarra', description: 'Elegant packaging for Nytarra, reflecting contemporary style.' },
  { name: 'Weaver Story', category: 'Handloom & textiles', image: `${clientPath}weaver story.jpeg`, tags: ['Boxes', 'Custom'], client: 'Weaver Story', description: 'Authentic packaging for Weaver Story, celebrating artisanal craftsmanship.' },
  { name: 'Karvan', category: 'Perfume & attar', image: `${clientPath}karvan.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Karvan', description: 'Distinguished packaging for Karvan brand.' },
  { name: 'Zoet', category: 'Ice cream & desserts', image: `${clientPath}Zoet.jpeg`, tags: ['Boxes', 'Food', 'Custom'], client: 'Zoet', description: 'Delightful packaging design for Zoet confectionery.' },
  { name: 'Kimai', category: 'Fine jewellery', image: `${clientPath}kimai.jpeg`, tags: ['Boxes', 'Gifting', 'Custom'], client: 'Kimai', description: 'Sophisticated packaging for Kimai product range.' },
  { name: 'Procode', category: 'Consumer electronics', image: `${clientPath}Procode.jpeg`, tags: ['Boxes', 'Custom'], client: 'Procode', description: 'Professional packaging solution for Procode.' },
  { name: 'Troveaa', category: 'E-commerce packaging', image: `${clientPath}Troveaa.jpeg`, tags: ['Boxes', 'Custom'], client: 'Troveaa', description: 'Branded packaging for Troveaa online marketplace.' },
  
  // Bag projects
  { name: 'Premium Bag Collection 1', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.13 PM.jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Premium custom carry bag with distinctive design and branding.' },
  { name: 'Premium Bag Collection 2', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.13 PM (1).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Elegant carry bag solution for premium brands.' },
  { name: 'Premium Bag Collection 3', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.13 PM (2).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Custom designed carry bag with attention to detail.' },
  { name: 'Premium Bag Collection 4', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.14 PM.jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Branded carry bag for retail and gifting purposes.' },
  { name: 'Premium Bag Collection 5', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.14 PM (1).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Sophisticated carry bag design for luxury products.' },
  { name: 'Premium Bag Collection 6', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.14 PM (2).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Custom printed carry bag with premium finish.' },
  { name: 'Premium Bag Collection 7', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.15 PM.jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Elegant carry bag solution for brand presentation.' },
  { name: 'Premium Bag Collection 8', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.15 PM (1).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Custom carry bag with distinctive branding elements.' },
  { name: 'Premium Bag Collection 9', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.16 PM.jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Premium carry bag designed for luxury retail.' },
  { name: 'Premium Bag Collection 10', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.16 PM (1).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Custom carry bag with refined aesthetics.' },
  { name: 'Premium Bag Collection 11', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.16 PM (2).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Branded carry bag for premium product presentation.' },
  { name: 'Premium Bag Collection 12', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.17 PM.jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Custom carry bag with exceptional design quality.' },
  { name: 'Premium Bag Collection 13', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.17 PM (1).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Premium carry bag solution for brand recognition.' },
  { name: 'Premium Bag Collection 14', category: 'Custom Carry Bags', image: `/images/bags/WhatsApp Image 2026-09-04 at 3.21.17 PM (2).jpeg`, tags: ['Bags'], client: 'Bag Collection', description: 'Custom designed carry bag for premium positioning.' },
];

const clients: Client[] = [
  // Featured clients with logos
  { name: 'Swiggy', image: `${clientPath}Swiggy.jpeg`, logoImage: `${clientPath}swiggy-com-logo.png`, category: 'Food Delivery', featured: true },
  { name: 'Instamart', image: `${clientPath}Instamart.jpeg`, category: 'Grocery & Retail', featured: true },
  { name: 'Mamaearth', image: `${clientPath}mamaearth2.jpg`, logoImage: `${clientPath}Mamaearthlogo.png`, category: 'Natural Beauty', featured: true },
  { name: 'Sleepy Owl', image: `${clientPath}Sleepy Owl.jpeg`, logoImage: `${logoPath}logo_107a2c0c-7f30-46ef-b852-05b27807f310_110x@2x.avif`, category: 'Coffee', featured: true },
  { name: 'Tencha Blends', image: `${clientPath}Tencha.jpeg`, logoImage: `${clientPath}Tencha_Horizontal_Logo_PNG.png`, category: 'Wellness & Tea', featured: true },
  { name: 'Signify', image: `${clientPath}Signify.jpeg`, logoImage: '/images/logos/signify-logo.svg', category: 'Brand Packaging', featured: true },
  { name: 'Majestic Pure', image: `${clientPath}Majestic Pure.jpeg`, logoImage: `${logoPath}logo_4046f8a2-ed2e-4616-b823-9c7e32a3083d.avif`, category: 'Home Fragrance & Beauty', featured: true },
  { name: 'Sprite', image: `${clientPath}Sprite.jpeg`, logoImage: `${clientPath}sprite-lemon-lime-soda-png-logo-4.png`, category: 'Beverages', featured: true },
  
  // Premium clients
  { name: 'Aurencia', image: `${clientPath}aurencia.jpeg`, logoImage: '/images/logos/aurencia_logo_4.avif', category: 'Luxury Pens & Stationery' },
  { name: 'Payal Keyal', image: `${clientPath}Payal Keyal.jpeg`, logoImage: `${logoPath}payal-keyal-dark.png`, category: 'Fashion & Couture' },
  { name: 'Serenity Hue', image: `${clientPath}serenity hue.jpeg`, logoImage: `${clientPath}SERENITY-HUE-LOGO.avif`, category: 'Beauty & Skincare' },
  { name: 'Shri Shyam Tiffins', image: `${clientPath}shrre shyam tiffins.jpeg`, logoImage: `${logoPath}ChatGPT Image Sep 4, 2026, 02_33_52 PM.png`, category: 'Tiffin & Food Service' },
  
  // Lifestyle & Fashion
  { name: 'Aweri', image: `${clientPath}aweri.jpeg`, logoImage: '/images/logos/aweri-logo.webp', category: 'Sweets & Confectionery' },
  { name: 'Nytarra', image: `${clientPath}Nytarra.jpeg`, logoImage: '/images/logos/608857678_18356744929201640_7860221194799015723_n.png', category: 'Incense & Home Fragrance' },
  { name: 'Weaver Story', image: `${clientPath}weaver story.jpeg`, logoImage: `${clientPath}weaver-story-logo-dark.png`, category: 'Handloom & Textiles' },
  
  // Food & Beverage
  { name: 'Little Igloo', image: `${clientPath}Little Igloo.jpeg`, logoImage: '/images/logos/lil_igloo_logo_square.avif', category: 'Baby Care & Essentials' },
  { name: 'Pearls India', image: `${clientPath}pearls india.jpeg`, logoImage: '/images/logos/350879139_633113418875222_3952075430178214945_n.png', category: 'Jewellery' },
  { name: 'High On Churros', image: `${clientPath}High On Churros.jpeg`, logoImage: '/images/logos/416748217_1534718534036178_5283738482777238866_n.png', category: 'Food & Snacks' },
  { name: 'Hyderabadi Chacha', image: `${clientPath}Hyderabadi Chacha.jpeg`, logoImage: `${logoPath}Gemini_Generated_Image_ozhhpiozhhpiozhh.png`, category: 'Restaurant & Takeaway' },
  { name: 'YOGO', image: `${clientPath}YOGO.jpeg`, logoImage: `${logoPath}ChatGPT Image Sep 4, 2026, 02_37_18 PM.png`, category: 'Frozen Yoghurt' },
  { name: 'Zoet', image: `${clientPath}Zoet.jpeg`, logoImage: '/images/logos/Zoet_For_Website.webp', category: 'Ice Cream & Desserts' },
  
  // Premium & Luxury
  { name: 'Gemeria', image: `${clientPath}Gemeria.jpeg`, logoImage: '/images/logos/715375796_18049721957777624_2361478550552287758_n.png', category: 'Hair Care & Extensions' },
  { name: 'Carat Bazaar', image: `${clientPath}Carat Bazaar.jpeg`, category: 'Fine Jewellery' },
  { name: 'AAURAM', image: `${clientPath}AAURAM.jpeg`, logoImage: '/images/logos/Untitled_800_x_400_px_e2645dc5-92da-44b1-bccc-ed9161f37d0d.webp', category: 'Wellness' },
  { name: 'Karvan', image: `${clientPath}karvan.jpeg`, logoImage: `${logoPath}ChatGPT Image Sep 4, 2026, 02_31_35 PM.png`, category: 'Perfume & Attar' },
  
  // Technology & Other
  { name: 'Procode', image: `${clientPath}Procode.jpeg`, category: 'Consumer Electronics' },
  { name: 'Troveaa', image: `${clientPath}Troveaa.jpeg`, category: 'E-commerce' },
  { name: 'Kimai', image: `${clientPath}kimai.jpeg`, category: 'Fine Jewellery' },
  
  // New clients
  { name: 'AARA', image: `${clientPath}AARA.jpeg`, category: 'Silver Jewellery' },
  { name: 'Amor By Tvisha', image: `${clientPath}Amor By tvisha.png`, category: 'Beauty & Gifting' },
];

const productCategories = [
  { number: '01', name: 'Corrugated Boxes', image: `${imagePath}typeboxes/Corrugated Boxes.png`, icon: Boxes, description: 'Strong and durable corrugated packaging solutions for shipping, e-commerce, retail and product protection. Available in custom sizes, printing and finishes.' },
  { number: '02', name: 'Rigid & MDF Boxes', image: `${imagePath}typeboxes/Rigid & MDF Boxes.jpg`, icon: Layers, description: 'Premium rigid packaging crafted from MDF and hard-board materials for luxury products, gifting, jewellery, cosmetics and premium brands.' },
  { number: '03', name: 'Wooden Boxes', image: `${imagePath}typeboxes/Wooden Boxes.png`, icon: Gift, description: 'Elegant and durable custom wooden boxes for premium gifting, corporate hampers, bottles, luxury products and special occasions.' },
  { number: '04', name: 'SBS & Duplex Boxes', image: `${imagePath}typeboxes/SBS & Duplex Boxes.png`, icon: Package, description: 'High-quality printed paper boxes made with SBS, Duplex and premium paper boards, suitable for food, retail, cosmetics and consumer products.' },
  { number: '05', name: 'Custom Paper Carry Bags', image: `${imagePath}typeboxes/Custom Paper Carry Bags.png`, icon: ShoppingBag, description: 'Custom-made paper carry bags in Kraft, Art Paper, Maplitho, Duplex and other paper options, with your choice of size, printing, handle and finishing.' },
  { number: '06', name: 'Printed Paper Products', image: `${imagePath}typeboxes/Printed Paper Products.png`, icon: Printer, description: 'A complete range of custom-printed paper products including Butter Paper, Tissue Paper, Sleeves, Inserts, Wrapping Paper and other brand essentials.' },
  { number: '07', name: 'Stickers & Labels', image: `${imagePath}typeboxes/Stickers & Labels.png`, icon: Palette, description: 'Professional product stickers, labels and branding solutions in different materials, shapes, sizes and finishes to match your packaging.' },
  { number: '08', name: 'Gift & Corporate Packaging', image: `${imagePath}typeboxes/Gift & Corporate Packaging.png`, icon: Gift, description: 'Premium Gift Hampers, Hamper Boxes and Corporate Gifting Packaging designed to create a strong impression for festivals, events, employee gifting and client gifting.' },
  { number: '09', name: 'Custom Packaging', image: `${imagePath}typeboxes/Custom Packaging.png`, icon: Ruler, description: 'Have something unique in mind? We create bespoke packaging structures, sizes, materials, printing and finishing exactly according to your requirements.' },
];

const capabilities: Capability[] = [
  {
    title: 'Materials',
    icon: Layers,
    items: ['Rigid board', 'Kappa', 'MDF', 'Premium paper', 'SBS', 'Acrylic'],
  },
  {
    title: 'Structures',
    icon: Boxes,
    items: ['Magnetic closure', 'Drawer style', 'Book style', 'Tray & insert', 'Window box', 'Custom shapes'],
  },
  {
    title: 'Finishes',
    icon: PaintBucket,
    items: ['Foil stamping', 'Embossing', 'Debossing', 'UV spot', 'Matte & gloss', 'Offset printing'],
  },
];

const whyYakvee = [
  { icon: Factory, title: 'Custom manufacturing', description: 'Packaging designed and produced around your exact requirements.' },
  { icon: Palette, title: 'Design support', description: 'Help selecting the right structure, material and finish for your product.' },
  { icon: ShieldCheck, title: 'Quality focus', description: 'Consistent attention to production, printing and finishing detail.' },
  { icon: Grid3x3, title: 'Flexible customisation', description: 'Sizes, structures and finishes adapted to each project.' },
  { icon: Printer, title: 'In-house printing', description: 'Designing, printing and packaging handled under one roof.' },
  { icon: Truck, title: 'Reliable delivery', description: 'Production and dispatch organised around your timeline.' },
];

const processSteps: ProcessStep[] = [
  { number: '01', title: 'Requirement', description: 'We listen to your product, brand and the experience you want to create.' },
  { number: '02', title: 'Design', description: 'Our team develops the structure, artwork and finish direction.' },
  { number: '03', title: 'Material & finish', description: 'We select the right board, paper and finishing for the brief.' },
  { number: '04', title: 'Sample', description: 'A physical sample is produced for your review and approval.' },
  { number: '05', title: 'Production', description: 'Approved samples move into full production with quality checks.' },
  { number: '06', title: 'Delivery', description: 'Finished packaging is packed and dispatched to your location.' },
];

const faqs = [
  { q: 'What types of packaging do you manufacture?', a: 'Rigid boxes, magnetic boxes, gift packaging, corporate packaging, wedding packaging, food packaging, carry bags and fully custom structures.' },
  { q: 'Can you manufacture custom sizes?', a: 'Yes. Every project can be customised in size, structure, material and finish to suit your product and brand.' },
  { q: 'Do you provide design assistance?', a: 'Yes. Our team can help you select the right packaging structure, artwork direction and finishing for your brief.' },
  { q: 'Can I request a sample?', a: 'Yes. After we finalise the brief, we produce a physical sample for your review before moving to production.' },
  { q: 'Can you manufacture from a reference image?', a: 'Yes. Share a reference image or design file and we will build a quote and production plan around it.' },
  { q: 'How do I get started?', a: 'Use the Request a Quote form, WhatsApp us, or call directly. Tell us about your product and we will take it from there.' },
];

const PHONE = '+918287271482';
const EMAIL = 'yakvee.printpack@gmail.com';
const WHATSAPP = '918287271482';
const WHATSAPP_MSG = encodeURIComponent('Hi Yakvee, I would like to discuss a custom packaging requirement.');

const projectFilters = ['All', 'Boxes', 'Bags', 'Gifting', 'Food', 'Custom'] as const;
type Filter = typeof projectFilters[number];


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const [showAllWork, setShowAllWork] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const animationRoot = useRef<HTMLElement>(null);

  const [form, setForm] = useState({
    name: '', company: '', phone: '', whatsapp: '', email: '',
    packagingType: '', quantity: '', dimensions: '', material: '',
    deliveryDate: '', message: '',
  });

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.tags.includes(filter));
  }, [filter]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-copy > *', { 
        opacity: 0, 
        y: 30, 
        duration: 0.9, 
        stagger: 0.12, 
        ease: 'power3.out' 
      });
      gsap.from('.hero-art > *', { 
        opacity: 0, 
        scale: 0.92, 
        duration: 1.1, 
        stagger: 0.15, 
        ease: 'power3.out' 
      });
      
      // Scrolling animations
      gsap.to('.trust-track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' });
      gsap.to('.brand-rail-track', { xPercent: -50, duration: 42, repeat: -1, ease: 'none' });
      
      // KICKASS ANIMATIONS - Safe scroll-triggered effects
      // Section heading animations
      gsap.utils.toArray<HTMLElement>('.section-heading').forEach((heading) => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
      
      // Product cards stagger animation
      const productCards = document.querySelectorAll('.product-card');
      if (productCards.length > 0) {
        gsap.from(productCards, {
          scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 80%'
          },
          y: 30,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });
      }
      
      // Work cards exciting animation
      const workCards = document.querySelectorAll('.work-card');
      if (workCards.length > 0) {
        gsap.from(workCards, {
          scrollTrigger: {
            trigger: '.work-grid',
            start: 'top 80%'
          },
          y: 40,
          rotationX: 15,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out'
        });
      }
      
      // Client cards elegant animation
      // Never apply a horizontal GSAP transform on mobile. The cards must
      // stay perfectly flush with the responsive grid and viewport.
      const clientCards = document.querySelectorAll('.client-showcase-card');
      if (clientCards.length > 0) {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (isMobile) {
          gsap.set(clientCards, { clearProps: 'transform,opacity' });
        } else {
          gsap.from(clientCards, {
            scrollTrigger: {
              trigger: '.client-showcase-grid',
              start: 'top 80%'
            },
            y: 25,
            x: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }
      }
      
      // Capability cards glow animation
      const capabilityCards = document.querySelectorAll('.capability-card');
      if (capabilityCards.length > 0) {
        gsap.from(capabilityCards, {
          scrollTrigger: {
            trigger: '.capability-grid',
            start: 'top 80%'
          },
          scale: 0.9,
          y: 20,
          duration: 0.7,
          stagger: 0.12,
          ease: 'elastic.out(1, 0.8)'
        });
      }
      
      // Why cards bounce animation
      const whyCards = document.querySelectorAll('.why-card');
      if (whyCards.length > 0) {
        gsap.from(whyCards, {
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 80%'
          },
          y: 30,
          opacity: 0.8,
          duration: 0.6,
          stagger: 0.1,
          ease: 'bounce.out'
        });
      }
      
      // Process steps timeline animation
      const processSteps = document.querySelectorAll('.process-step');
      if (processSteps.length > 0) {
        gsap.from(processSteps, {
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 80%'
          },
          x: -30,
          opacity: 0.9,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power4.out'
        });
      }
      
      // FAQ items slide animation
      const faqItems = document.querySelectorAll('.faq-item');
      if (faqItems.length > 0) {
        gsap.from(faqItems, {
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 80%'
          },
          y: 20,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out'
        });
      }
      
    }, animationRoot);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? i : (i + 1) % filteredProjects.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? i : (i - 1 + filteredProjects.length) % filteredProjects.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filteredProjects.length, lightboxIndex]);

  const openQuote = () => {
    setSent(false);
    setSubmitError(null);
    setForm({ name: '', company: '', phone: '', whatsapp: '', email: '', packagingType: '', quantity: '', dimensions: '', material: '', deliveryDate: '', message: '' });
    setQuoteOpen(true);
    setMenuOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 1000);
  };

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-bag">
            <div className="loading-handle" />
            <div className="loading-face">Yakvee</div>
            <div className="loading-line" />
          </div>
          <p>Making a first impression<span className="loading-dots">...</span></p>
        </div>
      )}

      <nav className={`nav-shell ${scrolled ? 'nav-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Yakvee Enterprises home">
          <img src={`${imagePath}566732607_17859929130530150_7894496642426142046_n.jpg`} alt="Yakvee Enterprises" />
        </a>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Our Work</a>
          <a href="#clients" onClick={() => setMenuOpen(false)}>Clients</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="nav-wa" href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><MessageCircle size={16} /> WhatsApp</a>
          <button className="nav-cta" onClick={openQuote}>Request a Quote <ArrowUpRight size={16} /></button>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <main id="top" ref={animationRoot}>
        {/* Hero */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Designing · Printing · Packaging</p>
            <h1>Packaging made to be <em>remembered.</em></h1>
            <p className="hero-description">Custom packaging solutions crafted around your product, your brand and the experience you want your customer to have.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={openQuote}>Request a Quote <ArrowUpRight size={18} /></button>
              <a className="text-link" href="#work">Explore Our Work <ChevronDown size={17} /></a>
            </div>
          </div>
          <div className="hero-art" aria-label="Yakvee Enterprises packaging showcase">
            <div className="hero-img-main">
              <img src={`${clientPath}aurencia.jpeg`} alt="Yakvee premium packaging design" loading="eager" />
            </div>
            <div className="hero-img-sub">
              <img src={`${clientPath}Payal Keyal.jpeg`} alt="Yakvee luxury gifting" loading="eager" />
            </div>
            <div className="hero-badge"><Sparkles size={14} /> Custom manufacturing</div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="trust-strip" aria-label="Yakvee capabilities">
          <div className="trust-track">
            <span>Custom Manufacturing</span><b>•</b>
            <span>Premium Materials</span><b>•</b>
            <span>Precision Finishing</span><b>•</b>
            <span>Brand-led Design</span><b>•</b>
            <span>Pan-India Delivery</span><b>•</b>
            <span>Custom Manufacturing</span><b>•</b>
            <span>Premium Materials</span><b>•</b>
            <span>Precision Finishing</span><b>•</b>
            <span>Brand-led Design</span><b>•</b>
            <span>Pan-India Delivery</span>
          </div>
        </section>

        {/* Brand rail — rotating with logos */}
        <section className="brand-rail" id="clients">
          <p className="brand-rail-label">Trusted by businesses and brands</p>
          <div className="brand-rail-track">
            {[...suppliedLogos, ...suppliedLogos].map(([filename, name], i) => (
              <div className="brand-rail-item" key={`${filename}-${i}`}>
                <img src={`${logoPath}${filename}`} alt={name} />
              </div>
            ))}
          </div>
        </section>

        {/* Complete client showcase — every named client appears once */}
        <section className="client-showcase">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Our clients <span /></div>
              <h2>Brands that trust<br /><em>Yakvee Enterprises.</em></h2>
            </div>
            <p>A curated showcase of Yakvee clients and standout packaging work. More client projects can be added as their original photography is supplied.</p>
          </div>
          <div className="client-showcase-grid client-showcase-grid-complete">
            {clients.map((client, index) => (
              <div className="client-showcase-card" key={client.name} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className={`client-image-wrap ${client.logo ? 'client-logo-wrap' : ''}`}>
                  {client.image ? (
                    <img src={client.image} alt={client.name} />
                  ) : (
                    <div className="client-text-logo" aria-label={`${client.name} client`}>{client.name}</div>
                  )}
                  <span className="client-category">{client.category}</span>
                </div>
                <div className="client-info">
                  <div className="client-name-row">
                    <h3>{client.name}</h3>
                    {client.logoImage && <img className="client-mini-logo" src={client.logoImage} alt="" aria-hidden="true" loading="lazy" />}
                  </div>
                  <button type="button" className="client-work-link" onClick={() => { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>View work <ArrowUpRight size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="intro section-pad" id="about">
          <div className="section-kicker">Our approach <span /></div>
          <div className="intro-grid">
            <h2>Packaging is the first<br /><em>touchpoint</em><br />between your brand<br />and your customer.</h2>
            <div className="intro-body">
              <p>At Yakvee Enterprises, we believe packaging is more than protection. It shapes presentation, perception and the experience of receiving your product.</p>
              <p className="muted">Our ideology is to deliver innovative designs, premium printing, reliable quality and customised packaging solutions that help businesses build a strong brand identity.</p>
              <a href="#capabilities" className="circle-link">Discover Yakvee <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="products section-pad" id="products">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Our packaging & printing solutions <span /></div>
              <h2>Complete Packaging Solutions —<br /><em>Designed, Printed & Crafted for Your Brand</em></h2>
            </div>
            <p>From everyday packaging to premium corporate gifting, we provide complete custom packaging and printing solutions tailored to your brand, product and budget.</p>
          </div>
          <div className="product-grid product-grid-expanded">
            {productCategories.map((product) => {
              const Icon = product.icon;
              return (
                <div className="product-card" key={product.name}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={`${product.name} packaging`} loading="lazy" />
                    <span className="product-number">{product.number}</span>
                    <div className="product-icon"><Icon size={21} /></div>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button className="product-explore" onClick={openQuote}>Explore <ArrowUpRight size={15} /></button>
                </div>
              );
            })}
          </div>
        </section>
        {/* Selected work */}
        <section className="work section-pad" id="work">
          <div className="work-header">
            <div>
              <div className="section-kicker">Selected work <span /></div>
              <h2>Work that speaks<br /><em>for itself.</em></h2>
            </div>
            <div className="work-filter-area"><span className="work-count">{filteredProjects.length} projects</span><div className="work-filters">
              {projectFilters.map((f) => (
                <button key={f} className={`work-filter ${filter === f ? 'work-filter-active' : ''}`} onClick={() => { setFilter(f); setShowAllWork(false); }}>{f}</button>
              ))}
            </div></div>
          </div>
          <div className={`work-grid ${showAllWork ? 'work-grid-expanded' : 'work-grid-collapsed'}`}>
            {filteredProjects.map((project, index) => (
              <button className={`work-card ${index >= 8 ? 'work-card-extra' : ''}`} key={project.image} onClick={() => setLightboxIndex(index)}>
                <img src={project.image} alt={project.name} loading={index < 8 ? 'eager' : 'lazy'} />
                <span className="work-overlay">
                  <small>{project.client ? `${project.client} · ${project.category.replace('Client work · ', '')}` : project.category}</small>
                  <strong>{project.name}</strong>
                  <ArrowUpRight size={18} />
                </span>
              </button>
            ))}
          </div>
          {filteredProjects.length > 8 && (
            <div className="work-more">
              <button className="circle-link work-more-button" type="button" onClick={() => setShowAllWork((value) => !value)}>
                {showAllWork ? 'Show less' : `View all ${filteredProjects.length} projects`} <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>
        {/* Capabilities */}
        <section className="capabilities" id="capabilities">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Capabilities <span /></div>
              <h2>Built around your<br /><em>requirements.</em></h2>
            </div>
            <p>Materials, structures and finishes that can be combined to create packaging unique to your product.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div className="capability-card" key={cap.title}>
                  <div className="capability-head"><Icon size={20} /> <h3>{cap.title}</h3></div>
                  <ul>
                    {cap.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Yakvee */}
        <section className="why-yakvee section-pad">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Why Yakvee <span /></div>
              <h2>Why brands<br /><em>choose Yakvee.</em></h2>
            </div>
          </div>
          <div className="why-grid">
            {whyYakvee.map((item) => {
              const Icon = item.icon;
              return (
                <div className="why-card" key={item.title}>
                  <div className="why-icon"><Icon size={22} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section className="process" id="process">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Process <span /></div>
              <h2>From idea to<br /><em>finished packaging.</em></h2>
            </div>
          </div>
          <div className="process-timeline">
            {processSteps.map((step) => (
              <div className="process-step" key={step.number}>
                <span className="process-number">{step.number}</span>
                <div className="process-line" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="faq section-pad">
          <div className="section-heading">
            <div>
              <div className="section-kicker">FAQ <span /></div>
              <h2>Questions, <em>answered.</em></h2>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={index}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  {faq.q}
                  <ChevronDown size={18} className="faq-chevron" />
                </button>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta" id="contact">
          <div className="final-cta-inner">
            <p className="eyebrow light"><span className="eyebrow-dot" /> Have a project in mind?</p>
            <h2>Your next package<br /><em>starts here.</em></h2>
            <p className="final-cta-text">Tell us what you're looking to create and let's build packaging around it.</p>
            <div className="final-cta-actions">
              <button className="light-button" onClick={openQuote}>Request a Quote <ArrowUpRight size={18} /></button>
              <a className="ghost-button" href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp Us</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={`${imagePath}566732607_17859929130530150_7894496642426142046_n.jpg`} alt="Yakvee Enterprises" />
              <p>Premium custom packaging solutions — designing, printing and packaging under one roof.</p>
              <div className="footer-social">
                <a href="https://www.instagram.com/yakvee_print_pack/" target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Products</h4>
              <a href="#products">Rigid Boxes</a>
              <a href="#products">Magnetic Boxes</a>
              <a href="#products">Gift Packaging</a>
              <a href="#products">Food Packaging</a>
              <a href="#products">Carry Bags</a>
              <a href="#products">Custom Packaging</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#work">Our Work</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href={`tel:${PHONE}`}><Phone size={15} /> +91 8287271482</a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>
              <a href={`mailto:${EMAIL}`}><Mail size={15} /> {EMAIL}</a>
              <span className="footer-loc"><MapPin size={15} /> Delhi NCR, India</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Yakvee Enterprises. All Rights Reserved.</span>
            <span>Your Brand. Our Packaging.</span>
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp */}
      <a className="wa-float" href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle size={26} />
      </a>

      {/* Mobile action bar */}
      <div className="mobile-bar">
        <a href={`tel:${PHONE}`}><Phone size={18} /> Call</a>
        <a href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
        <button onClick={openQuote}><Send size={18} /> Get Quote</button>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close"><X size={28} /></button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i - 1 + filteredProjects.length) % filteredProjects.length)); }} aria-label="Previous"><ChevronLeft size={28} /></button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={filteredProjects[lightboxIndex].image} alt={filteredProjects[lightboxIndex].name} />
            <div className="lightbox-info">
              <small>{filteredProjects[lightboxIndex].category}</small>
              <h3>{filteredProjects[lightboxIndex].name}</h3>
              <p>{filteredProjects[lightboxIndex].description}</p>
            </div>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i + 1) % filteredProjects.length)); }} aria-label="Next"><ChevronRight size={28} /></button>
        </div>
      )}

      {/* Quote modal */}
      {quoteOpen && (
        <div className="modal-backdrop" onClick={() => setQuoteOpen(false)}>
          <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close"><X size={20} /></button>
            {sent ? (
              <div className="success-state">
                <div className="success-icon"><Check size={28} /></div>
                <h2>Thank you.</h2>
                <p>We've received your enquiry and will get back to you shortly.</p>
                <button className="primary-button" onClick={() => setQuoteOpen(false)}>Back to site <ArrowUpRight size={17} /></button>
              </div>
            ) : (
              <>
                <p className="section-kicker">Request a Quote <span /></p>
                <h2>Tell us what you're<br /><em>making.</em></h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>Name *
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                    </label>
                    <label>Company
                      <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company / brand" />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>Phone *
                      <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
                    </label>
                    <label>WhatsApp
                      <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="WhatsApp number" />
                    </label>
                  </div>
                  <label>Email *
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@yourbrand.com" />
                  </label>
                  <div className="form-row">
                    <label>Packaging type
                      <select value={form.packagingType} onChange={(e) => setForm({ ...form, packagingType: e.target.value })}>
                        <option value="">Select type</option>
                        <option>Rigid Box</option>
                        <option>Magnetic Box</option>
                        <option>Gift Packaging</option>
                        <option>Food Packaging</option>
                        <option>Carry Bag</option>
                        <option>Custom Packaging</option>
                      </select>
                    </label>
                    <label>Quantity
                      <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 500" />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>Approx. dimensions
                      <input value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} placeholder="L × W × H" />
                    </label>
                    <label>Material preference
                      <input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} placeholder="e.g. Rigid board" />
                    </label>
                  </div>
                  <label>Required delivery date
                    <input type="date" value={form.deliveryDate} onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} />
                  </label>
                  <label>Requirement / message *
                    <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." rows={3} />
                  </label>
                  {submitError && <p className="form-error"><AlertCircle size={16} /> {submitError}</p>}
                  <button className="primary-button" type="submit" disabled={submitting}>
                    {submitting ? <><Loader2 size={17} className="spin" /> Sending…</> : <>Send Enquiry <Send size={17} /></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
