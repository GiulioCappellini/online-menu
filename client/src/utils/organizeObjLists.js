function organizeList(languagesData) {
    return (
        [...languagesData].sort((a, b) => {
            if (a.code === "it") return -1;
            if (b.code === "it") return 1;

            return a.name.localeCompare(b.name);
        }).map((item, index) => ({
            ...item,
            id: index + 1
        }))
    );
};

export default organizeList;