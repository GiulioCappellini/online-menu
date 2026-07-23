function organizeList(languagesData) {
    return (
        [...languagesData].sort((a, b) => {
            // Italian always first
            if (a.code === "it") return -1;
            if (b.code === "it") return 1;

            // English always second
            if (a.code === "en") return -1;
            if (b.code === "en") return 1;

            // The rest alphabetically
            return a.name.localeCompare(b.name);
        }).map((item, index) => ({
            ...item,
            id: index + 1
        }))
    );
};

export default organizeList;