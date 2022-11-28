import axios from 'axios';

var MenuList = [];

axios({
    url: "/api/readMenuList",
    method: 'post',
    baseUrl: "http://localhost:8080"
}).then((res) => {
    console.log("통신 성공")
    const data = res.data.menuList
    console.log(data)
    for (var item in data) {
        MenuList.push([
            data[item].menuName, 
            data[item].price, 
            data[item].description, 
            data[item].stock,
            data[item].allergy,
            data[item].imageLocation,
        ]);
    }
    console.log({"MenuList": MenuList})
})

// INSERT INTO menu 
// (menu_name, allergy, description, image_location, price, stock) 
// VALUES 
// ("메뉴1", "알러지1", "설명1", "", 20000, 5),
// ("메뉴2", "알러지2", "설명2", "", 30000, 5),
// ("메뉴3", "알러지3", "설명3", "", 40000, 5),
// ("메뉴4", "알러지4", "설명4", "", 50000, 5),
// ("메뉴5", "알러지5", "설명5", "", 60000, 5),
// ("메뉴6", "알러지6", "설명6", "", 70000, 5),
// ("메뉴7", "알러지7", "설명7", "", 14000, 5),
// ("메뉴8", "알러지8", "설명8", "", 26000, 5),
// ("메뉴9", "알러지9", "설명9", "", 62000, 5),
// ("메뉴10", "알러지10", "설명10", "", 10000, 5);

export default MenuList;