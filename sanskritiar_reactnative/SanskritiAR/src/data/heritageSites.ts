export interface HeritageSite {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  category: 'monument' | 'temple' | 'fort' | 'palace' | 'natural';
  state: string;
  yearBuilt?: string;
  significance: string;
}

export const heritageSites: HeritageSite[] = [
  {
    id: '1',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    description: 'An ivory-white marble mausoleum and UNESCO World Heritage Site, symbol of eternal love.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    category: 'monument',
    state: 'Uttar Pradesh',
    yearBuilt: '1653',
    significance: 'One of the New Seven Wonders of the World'
  },
  {
    id: '2',
    name: 'Red Fort',
    location: 'Delhi',
    description: 'Historic fortified palace of the Mughal dynasty, a symbol of India\'s sovereignty.',
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150215?w=800&q=80',
    category: 'fort',
    state: 'Delhi',
    yearBuilt: '1648',
    significance: 'UNESCO World Heritage Site and site of Independence Day celebrations'
  },
  {
    id: '3',
    name: 'Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    description: 'Palace of Winds with intricate latticework, an architectural marvel of Rajputana.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    category: 'palace',
    state: 'Rajasthan',
    yearBuilt: '1799',
    significance: 'Iconic symbol of Jaipur\'s royal heritage'
  },
  {
    id: '4',
    name: 'Gateway of India',
    location: 'Mumbai, Maharashtra',
    description: 'Iconic arch-monument built to commemorate the visit of British royalty.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    category: 'monument',
    state: 'Maharashtra',
    yearBuilt: '1924',
    significance: 'Symbol of Mumbai and major tourist attraction'
  },
  {
    id: '5',
    name: 'Mysore Palace',
    location: 'Mysore, Karnataka',
    description: 'Magnificent royal palace known for its Indo-Saracenic architecture and grandeur.',
    image: 'https://images.unsplash.com/photo-1598197748619-6f6280c5ae00?w=800&q=80',
    category: 'palace',
    state: 'Karnataka',
    yearBuilt: '1912',
    significance: 'One of India\'s most visited monuments'
  },
  {
    id: '6',
    name: 'Konark Sun Temple',
    location: 'Konark, Odisha',
    description: 'Ancient sun temple designed as a colossal chariot with intricate stone carvings.',
    image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80',
    category: 'temple',
    state: 'Odisha',
    yearBuilt: '1250',
    significance: 'UNESCO World Heritage Site and architectural masterpiece'
  },
  {
    id: '7',
    name: 'Hampi',
    location: 'Hampi, Karnataka',
    description: 'Ruins of the Vijayanagara Empire with stunning temples and royal structures.',
    image: 'https://images.unsplash.com/photo-1588409006388-5a3ead19ded1?w=800&q=80',
    category: 'monument',
    state: 'Karnataka',
    yearBuilt: '14th Century',
    significance: 'UNESCO World Heritage Site and ancient capital city'
  },
  {
    id: '8',
    name: 'Lotus Temple',
    location: 'Delhi',
    description: 'Bahá\'í House of Worship known for its flower-like architecture and peaceful ambiance.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
    category: 'temple',
    state: 'Delhi',
    yearBuilt: '1986',
    significance: 'Modern architectural marvel and place of worship'
  },
  {
    id: '9',
    name: 'Qutub Minar',
    location: 'Delhi',
    description: 'Tallest brick minaret in the world, a masterpiece of Indo-Islamic architecture.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
    category: 'monument',
    state: 'Delhi',
    yearBuilt: '1192',
    significance: 'UNESCO World Heritage Site and iconic Delhi landmark'
  },
  {
    id: '10',
    name: 'Amber Fort',
    location: 'Jaipur, Rajasthan',
    description: 'Majestic fort palace with stunning mirror work and panoramic views.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    category: 'fort',
    state: 'Rajasthan',
    yearBuilt: '1592',
    significance: 'UNESCO World Heritage Site and epitome of Rajput architecture'
  },
  {
    id: '11',
    name: 'Ajanta Caves',
    location: 'Aurangabad, Maharashtra',
    description: 'Ancient Buddhist cave monuments with exquisite paintings and sculptures.',
    image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80',
    category: 'monument',
    state: 'Maharashtra',
    yearBuilt: '2nd Century BCE',
    significance: 'UNESCO World Heritage Site and ancient Buddhist art masterpiece'
  },
  {
    id: '12',
    name: 'Golden Temple',
    location: 'Amritsar, Punjab',
    description: 'The holiest Sikh shrine with stunning golden architecture and sacred pool.',
    image: 'https://images.unsplash.com/photo-1631019465419-786e93f58f87?w=800&q=80',
    category: 'temple',
    state: 'Punjab',
    yearBuilt: '1604',
    significance: 'Most sacred Sikh pilgrimage site and symbol of equality'
  },
  {
    id: '13',
    name: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    description: 'Historic Hindu temple with towering gopurams covered in thousands of colorful sculptures.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    category: 'temple',
    state: 'Tamil Nadu',
    yearBuilt: '17th Century',
    significance: 'Major pilgrimage site and Dravidian architecture masterpiece'
  },
  {
    id: '14',
    name: 'Charminar',
    location: 'Hyderabad, Telangana',
    description: 'Iconic monument and mosque with four grand arches, symbol of Hyderabad.',
    image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80',
    category: 'monument',
    state: 'Telangana',
    yearBuilt: '1591',
    significance: 'Symbol of Hyderabad and Indo-Islamic architecture'
  },
  {
    id: '15',
    name: 'Victoria Memorial',
    location: 'Kolkata, West Bengal',
    description: 'Grand marble building dedicated to Queen Victoria, now a museum.',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80',
    category: 'monument',
    state: 'West Bengal',
    yearBuilt: '1921',
    significance: 'Colonial heritage and major tourist attraction'
  },
  {
    id: '16',
    name: 'Khajuraho Temples',
    location: 'Khajuraho, Madhya Pradesh',
    description: 'Group of Hindu and Jain temples famous for intricate erotic sculptures.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    category: 'temple',
    state: 'Madhya Pradesh',
    yearBuilt: '950-1050 CE',
    significance: 'UNESCO World Heritage Site and pinnacle of temple architecture'
  },
  {
    id: '17',
    name: 'Gol Gumbaz',
    location: 'Bijapur, Karnataka',
    description: 'Mausoleum with the second largest dome in the world and unique acoustics.',
    image: 'https://images.unsplash.com/photo-1598197748619-6f6280c5ae00?w=800&q=80',
    category: 'monument',
    state: 'Karnataka',
    yearBuilt: '1656',
    significance: 'Architectural wonder known for whispering gallery effect'
  },
  {
    id: '18',
    name: 'Brihadisvara Temple',
    location: 'Thanjavur, Tamil Nadu',
    description: 'Magnificent Chola temple with towering vimana, a UNESCO World Heritage Site.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    category: 'temple',
    state: 'Tamil Nadu',
    yearBuilt: '1010',
    significance: 'Greatest achievement of Chola architecture'
  },
  {
    id: '19',
    name: 'Sanchi Stupa',
    location: 'Sanchi, Madhya Pradesh',
    description: 'Ancient Buddhist complex with beautifully carved gateways and stupas.',
    image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80',
    category: 'monument',
    state: 'Madhya Pradesh',
    yearBuilt: '3rd Century BCE',
    significance: 'UNESCO World Heritage Site and oldest stone structure in India'
  },
  {
    id: '20',
    name: 'Elephanta Caves',
    location: 'Mumbai, Maharashtra',
    description: 'Rock-cut cave temples dedicated to Lord Shiva with magnificent sculptures.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    category: 'temple',
    state: 'Maharashtra',
    yearBuilt: '5th-8th Century',
    significance: 'UNESCO World Heritage Site with iconic Trimurti sculpture'
  }
];

export const heritageCategories = [
  { id: 'all', name: 'All Sites', icon: 'explore' },
  { id: 'monument', name: 'Monuments', icon: 'account-balance' },
  { id: 'temple', name: 'Temples', icon: 'place-of-worship' },
  { id: 'fort', name: 'Forts', icon: 'security' },
  { id: 'palace', name: 'Palaces', icon: 'castle' },
  { id: 'natural', name: 'Natural', icon: 'nature' }
];