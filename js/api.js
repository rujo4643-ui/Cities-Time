async function getCityData(city) {
    try {
        const res = await fetch(
            "https://api.api-ninjas.com/v1/city?name=" + city,
            {
                method: "GET",
                headers: {
                    "x-api-key": "TsW2fjN9YuaIf0I2vS0CKQ==VgQnJJEjqMaQSxdl",
                },
            },
        );
        return await res.json();
    } catch (error) {}
}

async function getTimezoneData(long, lat) {
    try {
        const res = await fetch(
            `https://api.mapy.com/v1/timezone/coordinate?lon=${long}&lat=${lat}&lang=en&apikey=HlStrL2F1Hrp6BI06_HfCZxIVQbJDeSbk0159Q_MIY8`,
        );
        return await res.json();
    } catch (error) {}
}

async function getImageData(name) {
    try {
        const res = await fetch(
            `https://api.pexels.com/v1/search?query=${name}%20street%20no%20human&per_page=1`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "0yfdkGX3xQsskM5KseFVKvOzphUIV3dF7FEt7W5Vnz1OusJxR0tyySqq",
                },
            },
        );
        return await res.json();
    } catch (error) {}
}

async function getFlagData(country) {
    try {
        const res = await fetch(
            `https://api.api-ninjas.com/v1/countryflag?country=${country}`,
            {
                method: "GET",
                headers: {
                    "x-api-key": "TsW2fjN9YuaIf0I2vS0CKQ==VgQnJJEjqMaQSxdl",
                },
            },
        );
        return await res.json();
    } catch (error) {}
}
