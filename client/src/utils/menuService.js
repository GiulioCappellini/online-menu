import aquiEntraOJson from '../data/menu.json';
import aquiEntraAlergiasJson from '../data/alergies.json';

const CATEGORY_ICONS = {
    'Seafood appetizers': 'ti-fish',
    'Meat-based appetizers': 'ti-meat',
    'First seafood courses': 'ti-anchor',
    'The classics': 'ti-star',
    'Second seafood courses': 'ti-fish',
    'Second meat courses': 'ti-meat',
    'Side dishes': 'ti-salad',
    'Pizzas': 'ti-pizza',
    'Gourmet pizzas': 'ti-pizza',
    'Desserts': 'ti-ice-cream',
    'Drinks': 'ti-glass',
    'Our bar': 'ti-glass-full',
    'Large salads': 'ti-salad',
};

const UI_STRINGS = {
    pt: {
        categories: 'Categorias',
        allAllergies: 'Todas as alergias',
        allergiesLabel: 'Alergias',
        dishHint: 'toque no nome do prato para ver o original',
        closeMenu: 'Fechar menu',
        openMenu: 'Abrir categorias',
        zoomImage: 'Ampliar imagem',
    },
    en: {
        categories: 'Categories',
        allAllergies: 'All allergies',
        allergiesLabel: 'Allergies',
        dishHint: 'tap the dish name to see the original',
        closeMenu: 'Close menu',
        openMenu: 'Open categories',
        zoomImage: 'Zoom image',
    },
    it: {
        categories: 'Categorie',
        allAllergies: 'Tutte le allergie',
        allergiesLabel: 'Allergie',
        dishHint: 'tocca il nome del piatto per vedere l\'originale',
        closeMenu: 'Chiudi menu',
        openMenu: 'Apri categorie',
        zoomImage: 'Ingrandisci immagine',
    },
};

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function parseCategories(items, lang) {
    if (!items?.length) return [];

    const categoriesMap = items[0];

    return Object.entries(categoriesMap).map(([categoryKey, categoryItems]) => {
        const titleEntry = categoryItems.find((item) => item['translations-tittle']);
        const dishes = categoryItems.filter((item) => item.price !== undefined);

        return {
            key: categoryKey,
            slug: slugify(categoryKey),
            icon: CATEGORY_ICONS[categoryKey] ?? 'ti-circle-dot',
            title: titleEntry?.['translations-tittle']?.[lang] ?? categoryKey,
            titleIt: titleEntry?.['translations-tittle']?.it ?? categoryKey,
            dishes: dishes.map((dish, index) => ({
                id: `${slugify(categoryKey)}-${index}`,
                price: dish.price,
                image: dish.image,
                allergies: dish.allergies ?? [],
                name: dish.translations?.[lang]?.name ?? '',
                nameIt: dish.translations?.it?.name ?? '',
                ingredients: dish.translations?.[lang]?.ingredients ?? [],
            })),
        };
    });
}

function parseAllergiesLegend(lang) {
    const allergiesBlock = aquiEntraAlergiasJson.Alergies?.[0];

    if (!allergiesBlock) {
        return { title: '', items: [] };
    }

    const title = allergiesBlock['translations-tittle']?.[lang] ?? 'Allergies';
    const items = Object.entries(allergiesBlock)
        .filter(([key]) => key !== 'translations-tittle' && !Number.isNaN(Number(key)))
        .map(([code, translations]) => ({
            code,
            label: translations[lang] ?? translations.en ?? '',
        }));

    return { title, items };
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

export function getMenuData(lang) {
    const safeLang = UI_STRINGS[lang] ? lang : 'en';

    return {
        categories: parseCategories(aquiEntraOJson.items, safeLang),
        allergiesLegend: parseAllergiesLegend(safeLang),
        ui: UI_STRINGS[safeLang],
        formatPrice,
    };
}

export default getMenuData;
