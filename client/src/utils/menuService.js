import menuData from '../data/menu.json';
import alergiesData from '../data/alergies.json';

const CATEGORY_ICONS = {
    'Seafood starters': 'ti-fish',
    'Land starters': 'ti-meat',
    'Large salads': 'ti-salad',
    'Seafood first courses': 'ti-anchor',
    'The classics': 'ti-star',
    'Main seafood courses': 'ti-fish',
    'Main couuses with meat': 'ti-meat',
    'Side dishes': 'ti-salad',
    'Pizzas': 'ti-pizza',
    'Gourmet pizzas': 'ti-pizza',
    'Desserts': 'ti-ice-cream',
    'Drinks': 'ti-glass',
    'Our bar': 'ti-glass-full',
    'Our Selection of Spirits': 'ti-glass-full'
};

const UI_STRINGS = {
    pt: {
        backButton: 'Voltar ao prato',
        Lang: 'PT',
        categories: 'Categorias',
        allAllergies: 'Todas as alergias',
        allergiesLabel: 'Alergias',
        closeMenu: 'Fechar menu',
        openMenu: 'Abrir categorias',
        zoomImage: 'Ampliar imagem',
        alertTittle: 'ATENÇÃO: em caso de alergias ou intolerâncias alimentares, informe o pessoal responsável antes de fazer o pedido.',
        alertMEssage: 'Os produtos marcados com asterisco, caso não estejam disponíveis no mercado de produtos frescos, poderão ser substituídos por produtos congelados. Além disso, os pratos servidos sem cozimento prévio são submetidos a um processo de ultracongelamento, de acordo com a legislação sanitária vigente (-20 graus por pelo menos 24 horas).'
    },
    en: {
        backButton: 'Back to dish',
        Lang: 'EN',
        categories: 'Categories',
        allAllergies: 'All allergies',
        allergiesLabel: 'Allergies',
        closeMenu: 'Close menu',
        openMenu: 'Open categories',
        zoomImage: 'Zoom image',
        alertTittle: 'ATTENTION: if you have any food allergies or intolerances, please inform the staff before placing your order.',
        alertMEssage: 'Products marked with an asterisk may be replaced with frozen products when fresh ingredients are unavailable. In addition, dishes served without prior cooking undergo a blast-freezing process in accordance with current food safety regulations (-20°C for at least 24 hours).'
    },
    it: {
        backButton: 'Torna al piatto',
        Lang: 'IT',
        categories: 'Categorie',
        allAllergies: 'Tutte le allergie',
        allergiesLabel: 'Allergie',
        closeMenu: 'Chiudi menu',
        openMenu: 'Apri categorie',
        zoomImage: 'Ingrandisci immagine',
        alertTittle: 'ATTENZIONE: in caso di allergie o intolleranze alimentari, prima di ordinare, informare il personale preposto.',
        alertMEssage: 'I prodotti con asterisco in mancanza dal mercato del fresco possono essere sostituiti con prodotti surgelati, inoltre le pietanze servite senza previa cottura sono trattati con procedura di abbattimento secondo la normativa sanitaria vigente(- 20 gradi per almeno 24 ore)'
    },
    fr: {
        backButton: 'Retour au plat',
        Lang: 'FR',
        categories: 'Catégories',
        allAllergies: 'Tous les allergènes',
        allergiesLabel: 'Allergènes',
        closeMenu: 'Fermer le menu',
        openMenu: 'Ouvrir les catégories',
        zoomImage: 'Agrandir l’image',
        alertTittle: 'ATTENTION: si vous avez des allergies alimentaires ou des intolérances, veuillez informer le personnel avant de passer votre commande.',
        alertMEssage: 'Les produits marqués d’un astérisque peuvent être remplacés par des produits surgelés lorsque les ingrédients frais ne sont pas disponibles. De plus, les plats servis sans cuisson préalable sont soumis à un processus de congélation à froid en conformité avec les réglementations actuelles de sécurité alimentaire (-20°C pour au moins 24 heures).'
    },
    de: {
        backButton: 'Zurück zum Gericht',
        Lang: 'DE',
        categories: 'Kategorien',
        allAllergies: 'Alle Allergene',
        allergiesLabel: 'Allergene',
        closeMenu: 'Menü schließen',
        openMenu: 'Kategorien öffnen',
        zoomImage: 'Bild vergrößern',
        alertTittle: 'ACHTUNG: Bei Lebensmittelallergien oder -unverträglichkeiten informieren Sie bitte das zuständige Personal, bevor Sie Ihre Bestellung aufgeben.',
        alertMEssage: 'Mit einem Sternchen gekennzeichnete Produkte können, wenn frische Produkte auf dem Markt nicht verfügbar sind, durch Tiefkühlprodukte ersetzt werden. Außerdem werden Speisen, die ohne vorheriges Garen serviert werden, gemäß den geltenden lebensmittelrechtlichen Vorschriften einem Schockfrostverfahren unterzogen (-20 °C für mindestens 24 Stunden).'
    },
    es: {
        backButton: 'Volver al plato',
        Lang: 'ES',
        categories: 'Categorías',
        allAllergies: 'Todos los alérgenos',
        allergiesLabel: 'Alérgenos',
        closeMenu: 'Cerrar menú',
        openMenu: 'Abrir categorías',
        zoomImage: 'Ampliar imagen',
        alertTittle: 'ATENCIÓN: si tiene alergias alimentarias o intolerancias, por favor informe al personal antes de realizar su pedido.',
        alertMEssage: 'Los productos marcados con un asterisco pueden ser reemplazados por productos congelados cuando los ingredientes frescos no estén disponibles. Además, los platos servidos sin cocción previa son sometidos a un proceso de congelación en bloque de acuerdo con las regulaciones de seguridad alimentaria vigentes (-20°C durante al menos 24 horas).'
    }
};

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

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
    const allergiesBlock = alergiesData.Alergies?.[0];

    if (!allergiesBlock) {return { title: '', items: [] };}

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
        categories: parseCategories(menuData.items, safeLang),
        allergiesLegend: parseAllergiesLegend(safeLang),
        ui: UI_STRINGS[safeLang],
        formatPrice,
    };
}

export default getMenuData;
