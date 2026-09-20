import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-hot-wheels',
    slug: 'hot-wheels',
    name: 'Hot Wheels',
    shortDescription: 'Mainline and collectible Hot Wheels models for every kind of collector.',
    description: 'Mainline and collectible Hot Wheels models for every kind of collector.',
    image: '/image/hw.png',
    featuredHighlights: ['Mainline', 'Collectibles', '1:64']
  },
  {
    id: 'cat-hot-wheels-rlc',
    slug: 'hot-wheels-rlc',
    name: 'Hot Wheels RLC',
    shortDescription: 'Collector-focused Hot Wheels releases from the Red Line Club.',
    description: 'Collector-focused Hot Wheels releases from the Red Line Club.',
    image: '/image/rlc.png',
    featuredHighlights: ['RLC', 'Limited Releases', '1:64']
  },
  {
    id: 'cat-hot-wheels-team-transport',
    slug: 'hot-wheels-team-transport',
    name: 'Hot Wheels Team Transport',
    shortDescription: 'Hot Wheels models paired with detailed transporters and haulers.',
    description: 'Hot Wheels models paired with detailed transporters and haulers.',
    image: '/image/tt.png',
    featuredHighlights: ['Team Transport', 'Haulers', '1:64']
  },
  {
    id: 'cat-mini-gt',
    slug: 'mini-gt',
    name: 'Mini GT',
    shortDescription: 'Highly detailed 1:64 scale models built for collectors.',
    description: 'Highly detailed 1:64 scale models built for collectors.',
    image: '/image/mg.png',
    featuredHighlights: ['1:64', 'Detailed Models', 'Collectibles']
  },
  {
    id: 'cat-kaido-house',
    slug: 'kaido-house',
    name: 'Kaido House',
    shortDescription: 'Distinctive 1:64 scale designs inspired by custom and modified car culture.',
    description: 'Distinctive 1:64 scale designs inspired by custom and modified car culture.',
    image: '/image/kh.png',
    featuredHighlights: ['1:64', 'Custom Culture', 'Collectibles']
  },
  {
    id: 'cat-cca',
    slug: 'cca',
    name: 'CCA',
    shortDescription: 'Curated die-cast models from CCA and its collector-focused releases.',
    description: 'Curated die-cast models from CCA and its collector-focused releases.',
    image: '/image/cca.png',
    featuredHighlights: ['1:64', 'Die-Cast', 'Collectibles']
  }
];
