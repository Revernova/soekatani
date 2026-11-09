import { Product, SellerOrder } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Mangga Harum Manis',
    category: 'Buah',
    price: 22000,
    originalPrice: 28000,
    rating: 4.8,
    reviewsCount: 1200,
    soldCount: 1850,
    stock: 65,
    unit: '1 kg',
    farmerName: 'Kelompok Tani Sari Mulyani',
    farmerLoc: 'Indramayu, Jawa Barat',
    harvestTime: 'Petik Subuh 05:30 WIB',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Mangga Harum Manis pilihan matang pohon langsung dari kebun Indramayu. Daging tebal, serat halus, aroma khas harum manis yang memikat. Kaya vitamin C & A.',
    isBestSeller: true,
    tags: ['Matang Pohon', 'Manis Legit', 'Grade A']
  },
  {
    id: 'p2',
    name: 'Cabai Merah Keriting',
    category: 'Sayur',
    price: 18000,
    originalPrice: 24000,
    rating: 4.7,
    reviewsCount: 960,
    soldCount: 1420,
    stock: 40,
    unit: '1 kg',
    farmerName: 'Koperasi Tani Subang',
    farmerLoc: 'Subang, Jawa Barat',
    harvestTime: 'Petik Pagi 06:00 WIB',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Cabai merah keriting super pedas alami, dipetik segar di pagi hari. Warna merah merona mengkilap, tahan simpan lebih lama untuk aneka sambal.',
    isBestSeller: true,
    tags: ['Pedas Alami', 'Segar Mengkilap']
  },
  {
    id: 'p3',
    name: 'Selada Hidroponik',
    category: 'Sayur',
    price: 8000,
    originalPrice: 12000,
    rating: 4.6,
    reviewsCount: 532,
    soldCount: 890,
    stock: 80,
    unit: '1 ikat (250g)',
    farmerName: 'Green House Lembang',
    farmerLoc: 'Bandung, Jawa Barat',
    harvestTime: 'Potong Subuh 05:00 WIB',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Selada hidroponik bersih tanpa pestisida kimia. Tekstur renyah dan segar, sangat ideal untuk salad segar, burger rumahan, dan garnis.',
    isBestSeller: true,
    tags: ['Bebas Pestisida', 'Ekstra Renyah']
  },
  {
    id: 'p4',
    name: 'Tomat Segar',
    category: 'Sayur',
    price: 15000,
    originalPrice: 19000,
    rating: 4.7,
    reviewsCount: 584,
    soldCount: 940,
    stock: 55,
    unit: '1 kg',
    farmerName: 'Agro Berkah Malang',
    farmerLoc: 'Malang, Jawa Timur',
    harvestTime: 'Petik Pagi 06:15 WIB',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Tomat apel segar dengan kulit kencang dan kandungan air tinggi. Rasa segar asam manis seimbang untuk masakan harian dan jus tomat bernutrisi.',
    isBestSeller: true,
    tags: ['Kaya Likopen', 'Kulit Kencang']
  },
  {
    id: 'p5',
    name: 'Jeruk Medan',
    category: 'Buah',
    price: 18000,
    originalPrice: 24000,
    rating: 4.8,
    reviewsCount: 724,
    soldCount: 1100,
    stock: 35,
    unit: '1 kg',
    farmerName: 'Tani Berastagi Sejuk',
    farmerLoc: 'Medan, Sumatra Utara',
    harvestTime: 'Petik Segar Kemarin Sore',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Jeruk Medan manis legit dengan bulir air berlimpah. Kulit tipis mudah dikupas, sangat cocok untuk asupan vitamin C harian keluarga.',
    isBestSeller: true,
    tags: ['Bulir Air Banyak', 'Tinggi Vitamin C']
  },
  {
    id: 'p6',
    name: 'Pisang Cavendish',
    category: 'Buah',
    price: 12000,
    originalPrice: 16000,
    rating: 4.6,
    reviewsCount: 724,
    soldCount: 1340,
    stock: 90,
    unit: '1 sisir (~1.2 kg)',
    farmerName: 'Kebun Tani Subang',
    farmerLoc: 'Subang, Jawa Barat',
    harvestTime: 'Petik Pagi 06:00 WIB',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80'
    ],
    desc: 'Pisang Cavendish mulus tanpa getah berlebih. Tekstur lembut manis alami, sumber energi instan sebelum berolahraga atau camilan sehat anak.',
    isBestSeller: true,
    tags: ['Tekstur Creamy', 'Kulit Mulus']
  },
  {
    id: 'p7',
    name: 'Alpukat Mentega Super',
    category: 'Buah',
    price: 28000,
    originalPrice: 34000,
    rating: 4.9,
    reviewsCount: 412,
    soldCount: 680,
    stock: 45,
    unit: '1 kg (3-4 butir)',
    farmerName: 'Kelompok Tani Sari Mulyani',
    farmerLoc: 'Indramayu, Jawa Barat',
    harvestTime: 'Petik Tua Pohon 06:00 WIB',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    desc: 'Alpukat mentega daging kuning tebal tanpa serat pahit. Daging gurih creamy berlemak baik, siap matang dalam 1-2 hari simpan suhu ruang.',
    isBestSeller: false,
    tags: ['Daging Tebal', 'Lemak Nabati Sehat']
  },
  {
    id: 'p8',
    name: 'Paket Sayur Sop Komplit Organik',
    category: 'Paket Hemat',
    price: 19500,
    originalPrice: 25000,
    rating: 4.9,
    reviewsCount: 388,
    soldCount: 910,
    stock: 50,
    unit: '1 paket (600g)',
    farmerName: 'Green House Lembang',
    farmerLoc: 'Bandung, Jawa Barat',
    harvestTime: 'Kemas Segar Pagi Ini',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    desc: 'Paket praktis memasak sup rumahan: Wortel Brastagi, Kentang Dieng, Kol segar, Buncis renyah, dan Seledri + Daun Bawang wangi.',
    isBestSeller: true,
    tags: ['Siap Masak', 'Hemat 25%']
  }
];

export const INITIAL_ORDERS: SellerOrder[] = [
  {
    orderId: 'ST-2026-9921',
    customerName: 'Budi Santoso',
    phone: '0812-3456-7890',
    address: 'Jl. Melati No. 12, Kel. Menteng, Jakarta Selatan',
    date: 'Hari ini, 09:30 WIB',
    items: [
      { name: 'Mangga Harum Manis', qty: 2, price: 22000, unit: '1 kg', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=200&q=80' },
      { name: 'Tomat Segar', qty: 1, price: 15000, unit: '1 kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 59000,
    shippingFee: 15000,
    total: 74000,
    paymentMethod: 'QRIS Instan',
    status: 'Perlu Diproses',
    courier: 'SoekaTani Cold-Chain Express',
    resi: 'SKT-9921-COLD',
    notes: 'Mohon pilih mangga yang matang pohon siap santap hari ini.'
  },
  {
    orderId: 'ST-2026-9884',
    customerName: 'Siti Rahmawati',
    phone: '0857-1122-3344',
    address: 'Apartemen Sudirman Tower A Lt. 8, Jakarta Pusat',
    date: 'Hari ini, 08:15 WIB',
    items: [
      { name: 'Selada Hidroponik', qty: 3, price: 8000, unit: '1 ikat', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=200&q=80' },
      { name: 'Cabai Merah Keriting', qty: 1, price: 18000, unit: '1 kg', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 42000,
    shippingFee: 15000,
    total: 57000,
    paymentMethod: 'Virtual Account BCA',
    status: 'Perlu Diproses',
    courier: 'Reguler Sayur Cepat',
    resi: 'SKT-9884-REG',
    notes: 'Titipkan ke concierge lobby apabila belum sampai unit.'
  },
  {
    orderId: 'ST-2026-9740',
    customerName: 'Hendra Gunawan',
    phone: '0813-8899-7766',
    address: 'Pondok Indah Blok G-4, Jakarta Selatan',
    date: 'Kemarin, 16:40 WIB',
    items: [
      { name: 'Pisang Cavendish', qty: 2, price: 12000, unit: '1 sisir', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 24000,
    shippingFee: 15000,
    total: 39000,
    paymentMethod: 'COD (Bayar di Tempat)',
    status: 'Dalam Pengiriman',
    courier: 'SoekaTani Cold-Chain Express',
    resi: 'SKT-9740-COLD',
    notes: 'Kurir sedang dalam perjalanan ke alamat tujuan.'
  }
];

export const SAMPLE_IMAGES = {
  alpukat: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
  pepaya: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=600&q=80',
  bayam: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
  strawberry: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
  jagung: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80'
};

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}
