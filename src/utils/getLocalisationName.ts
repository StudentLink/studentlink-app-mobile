import City from "../data/customTypes/City";
import CityJson from "../data/cities.json";
import { CapitalizeData } from "./verification";

const getLocalisationName = (inseeCode: number) => {
    const result = (CityJson as City[]).find((city) => (parseInt(city.insee_code) == inseeCode));
    if (result) {
        return CapitalizeData(result.label);
    }
    return 'N/A';
}

export default getLocalisationName;