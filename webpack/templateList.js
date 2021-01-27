const Path = require('path');

module.exports = [
  {
    filename: 'index.html',
    scriptLoading: 'defer',
    template: Path.resolve(__dirname, '../src/hbs/pages/index.hbs'),
    title: 'Home page',
    chunks: ['index']
  },
  {
    filename: 'stone-page.html',
    scriptLoading: 'defer',
    template: Path.resolve(__dirname, '../src/hbs/pages/stone-page.hbs'),
    title: 'Stone page',
    breadcrumbsLeft: 'Решения',
    chunks: ['stonePage']
  },
  {
    filename: 'detail-stone-page.html',
    scriptLoading: 'defer',
    template: Path.resolve(__dirname, '../src/hbs/pages/detail-stone-page.hbs'),
    title: 'Detail page',
    breadcrumbsLeft: 'Натуральный камень',
    chunks: ['detailStonePage']
  },
  {
    filename: 'materials.html',
    scriptLoading: 'defer',
    template: Path.resolve(__dirname, '../src/hbs/pages/materials.hbs'),
    title: 'Materials page',
    breadcrumbsLeft: 'Решения',
    chunks: ['materialsPage']
  },
  {
    filename: 'mining.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/mining.hbs'),
    title: 'Mining page',
    breadcrumbsLeft: 'Решения',
    chunks: ['miningPage']
  },
  {
    filename: 'mining-detail.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/mining-detail.hbs'),
    title: 'Materials page',
    breadcrumbsLeft: 'Эксклюзивные карьеры',
    chunks: ['miningDetailPage']
  },
  {
    filename: 'news-detail.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/news-detail.hbs'),
    title: 'Новости - Новость',
    breadcrumbsLeft: 'Новости и события',
    chunks: ['newsDetailPage']
  },
  {
    filename: 'detail-project.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/detail-project.hbs'),
    title: 'Detail project page',
    chunks: ['detailProjectPage']
  },
  {
    filename: 'contacts.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/contacts.hbs'),
    title: 'Контакты',
    chunks: ['contactsPage']
  },
  {
    filename: 'news.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/news.hbs'),
    title: 'Новости и события',
    chunks: ['newsPage']
  },
  {
    filename: 'partners.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/partners.hbs'),
    title: 'Друзья и партнеры',
    chunks: ['partnersPage']
  },
  {
    filename: 'projects.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/projects.hbs'),
    title: 'Projects page',
    chunks: ['projectsPage']
  },
  {
    filename: 'gallery.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/gallery.hbs'),
    title: 'Gallery page',
    chunks: ['galleryPage']
  },
  {
    filename: 'product.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/product.hbs'),
    title: 'Product page',
    breadcrumbsLeft: 'Материалы',
    chunks: ['productPage']
  },
  {
    filename: 'product-detail.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/product-detail.hbs'),
    title: 'Product detail page',
    breadcrumbsLeft: 'Каталог изделий',
    chunks: ['productDetailPage']
  },
  {
    filename: 'about.html',
    template: Path.resolve(__dirname, '../src/hbs/pages/about.hbs'),
    title: 'О нас',
    breadcrumbsLeft: 'О нас',
    chunks: ['aboutPage']
  }
];
