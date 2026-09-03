export interface Project {
  id: string;
  name: string;
  description: string;
  imageColor: string; // Used as a placeholder until real images are provided
  image: string; // Added image URL
}

export const workList: Project[] = [
  {
    id: '01.',
    name: 'Arjuna',
    description: 'Personal Portfolio Website for talented design engineer',
    imageColor: 'from-zinc-800 to-zinc-950',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&auto=format&fit=crop',
  },
  {
    id: '02.',
    name: 'Bima',
    description: 'E-commerce platform for high-end fashion and streetwear',
    imageColor: 'from-purple-900/40 to-black',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop',
  },
  {
    id: '03.',
    name: 'Mandala',
    description: 'Web3 dashboard for decentralized finance and crypto analytics',
    imageColor: 'from-emerald-900/40 to-black',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&auto=format&fit=crop',
  },
];
