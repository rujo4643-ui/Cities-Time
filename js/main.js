const cities = JSON.parse(localStorage.getItem("@content")) || [
    "hanoi",
    "new york",
    "tokyo",
];
const main = document.querySelector("#content");
const input = document.querySelector("#input");

let visible = false;

//---------------- Time Function
function getCurrTime(offset) {
    const d = new Date();
    let m = d.getUTCMinutes() * 60;

    offsetM = (offset + m) % 3600;
    offsetH = offset + m - offsetM;

    m /= 60;
    if (m < 0) {
        m += 60;
        h--;
    }

    let h = d.getUTCHours() + offsetH / 3600;
    h = h >= 24 ? h - 24 : h < 0 ? 24 + h : h;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

//--------------------- Add Function
async function newData(cityName) {
    const cityData = await getCityData(cityName);
    if (cityData.length == 0) return;

    const imageData = await getImageData(cityName);
    const flagData = await getFlagData(cityData[0].country);
    const timezoneData = await getTimezoneData(
        cityData[0].longitude,
        cityData[0].latitude
    );

    const data = [
        timezoneData.timezone.currentUtcOffsetSeconds,
        flagData.rectangle_image_url,
        "url(" + imageData.photos[0].src.original + ")",
    ];

    localStorage.setItem(cityName, JSON.stringify(data));
    return data;
}

async function addItem(cityName) {
    cityName = cityName.trim();

    let value = localStorage.getItem(cityName);
    value = value == 0 ? undefined : JSON.parse(value);
    const data = value || (await newData(cityName));
    if (data == undefined) {
        window.alert(
            "City not found!\n- Data missing\n- Infamous city\n- Invalid input\n- Outdated API"
        );
        localStorage.setItem(cityName, 0);
        return 0;
    }

    const item = document.createElement("div");
    item.style.backgroundImage = data[2];
    item.addEventListener("click", () => {
        const index = [...main.children].indexOf(item);
        cities.splice(index, 1);
        item.remove();
    });

    const flag = document.createElement("img");
    flag.src = data[1];
    item.appendChild(flag);

    const time = document.createElement("p");
    time.innerText = "00:00";
    item.appendChild(time);

    const city = document.createElement("p");
    item.appendChild(city);

    cityName.split(" ").forEach((str) => {
        city.innerText += `${str.charAt(0).toUpperCase() + str.slice(1)} `;
    });

    setInterval(function () {
        time.innerText = getCurrTime(data[0]);
    }, 500);

    main.insertBefore(item, main.lastElementChild);
    return 1;
}

for (let i = 0; i < cities.length; i++) {
    addItem(cities[i].toLowerCase());
}

//------------------ Input Button Function
const visibleInput = (value) => {
    visible = value ? value : !visible;
    input.style.visibility = visible == true ? "visible" : "hidden";
    if (visible == true) {
        input.querySelector("div").classList.add("animated-start");
    } else {
        input.querySelector("div").classList.remove("animated-start");
    }
};

const getInput = async () => {
    const str = document.querySelector("#city").value.toLowerCase();
    document.querySelector("#city").value = "";
    if (str == "" || (await addItem(str)) === 0) return;
    cities.push(str);
};

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => visibleInput());
});

document.querySelector("#add").addEventListener("click", getInput);
document.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        visibleInput(false);
        getInput();
    }
});

document.querySelector("#cancel").addEventListener("click", () => {
    document.querySelector("#city").value = "";
});

window.addEventListener("beforeunload", function (event) {
    localStorage.setItem("@content", JSON.stringify(cities));
});
