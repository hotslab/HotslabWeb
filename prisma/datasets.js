const countries = [
    {
        "name": "Afghanistan",
        "code": "AF",
        "capital": "Kabul",
        "region": "AS",
        "currency": {
            "code": "AFN",
            "name": "Afghan afghani",
            "symbol": "؋"
        },
        "language": {
            "code": "ps",
            "name": "Pashto"
        },
        "flag": "https://restcountries.eu/data/afg.svg",
        "diallingCode": "+93",
        "isoCode": "004"
    },
    {
        "name": "Albania",
        "code": "AL",
        "capital": "Tirana",
        "region": "EU",
        "currency": {
            "code": "ALL",
            "name": "Albanian lek",
            "symbol": "L"
        },
        "language": {
            "code": "sq",
            "name": "Albanian"
        },
        "flag": "https://restcountries.eu/data/alb.svg",
        "diallingCode": "+355",
        "isoCode": "008"
    },
    {
        "name": "Algeria",
        "code": "DZ",
        "capital": "Algiers",
        "region": "AF",
        "currency": {
            "code": "DZD",
            "name": "Algerian dinar",
            "symbol": "د.ج"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/dza.svg",
        "diallingCode": "+213",
        "isoCode": "012"
    },
    {
        "name": "American Samoa",
        "code": "AS",
        "capital": "Pago Pago",
        "region": "OC",
        "currency": {
            "code": "USD",
            "name": "United State Dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/asm.svg",
        "diallingCode": "+1",
        "isoCode": "016"
    },
    {
        "name": "Andorra",
        "code": "AD",
        "capital": "Andorra la Vella",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "ca",
            "name": "Catalan"
        },
        "flag": "https://restcountries.eu/data/and.svg",
        "diallingCode": "+376",
        "isoCode": "020"
    },
    {
        "name": "Angola",
        "code": "AO",
        "capital": "Luanda",
        "region": "AF",
        "currency": {
            "code": "AOA",
            "name": "Angolan kwanza",
            "symbol": "Kz"
        },
        "language": {
            "code": "pt",
            "name": "Portuguese"
        },
        "flag": "https://restcountries.eu/data/ago.svg",
        "diallingCode": "+244",
        "isoCode": "024"
    },
    {
        "name": "Anguilla",
        "code": "AI",
        "capital": "The Valley",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/aia.svg",
        "diallingCode": "+43",
        "isoCode": "660"
    },
    {
        "name": "Antigua and Barbuda",
        "code": "AG",
        "capital": "Saint John's",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/atg.svg",
        "diallingCode": "+1",
        "isoCode": "028"
    },
    {
        "name": "Argentina",
        "code": "AR",
        "capital": "Buenos Aires",
        "region": "SA",
        "currency": {
            "code": "ARS",
            "name": "Argentine peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/arg.svg",
        "diallingCode": "+54",
        "isoCode": "032"
    },
    {
        "name": "Armenia",
        "code": "AM",
        "capital": "Yerevan",
        "region": "AS",
        "currency": {
            "code": "AMD",
            "name": "Armenian dram",
            "symbol": null
        },
        "language": {
            "code": "hy",
            "name": "Armenian"
        },
        "flag": "https://restcountries.eu/data/arm.svg",
        "diallingCode": "+374",
        "isoCode": "051"
    },
    {
        "name": "Aruba",
        "code": "AW",
        "capital": "Oranjestad",
        "region": "SA",
        "currency": {
            "code": "AWG",
            "name": "Aruban florin",
            "symbol": "ƒ"
        },
        "language": {
            "code": "nl",
            "name": "Dutch"
        },
        "flag": "https://restcountries.eu/data/abw.svg",
        "diallingCode": "+297",
        "isoCode": "533"
    },
    {
        "name": "Australia",
        "code": "AU",
        "capital": "Canberra",
        "region": "OC",
        "currency": {
            "code": "AUD",
            "name": "Australian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/aus.svg",
        "diallingCode": "+61",
        "isoCode": "036"
    },
    {
        "name": "Azerbaijan",
        "code": "AZ",
        "capital": "Baku",
        "region": "AS",
        "currency": {
            "code": "AZN",
            "name": "Azerbaijani manat",
            "symbol": null
        },
        "language": {
            "code": "az",
            "name": "Azerbaijani"
        },
        "flag": "https://restcountries.eu/data/aze.svg",
        "diallingCode": "+994",
        "isoCode": "031"
    },
    {
        "name": "Bahamas",
        "code": "BS",
        "capital": "Nassau",
        "region": "NA",
        "currency": {
            "code": "BSD",
            "name": "Bahamian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/bhs.svg",
        "diallingCode": "+1",
        "isoCode": "044"
    },
    {
        "name": "Bahrain",
        "code": "BH",
        "capital": "Manama",
        "region": "AS",
        "currency": {
            "code": "BHD",
            "name": "Bahraini dinar",
            "symbol": ".د.ب"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/bhr.svg",
        "diallingCode": "+973",
        "isoCode": "048"
    },
    {
        "name": "Bangladesh",
        "code": "BD",
        "capital": "Dhaka",
        "region": "AS",
        "currency": {
            "code": "BDT",
            "name": "Bangladeshi taka",
            "symbol": "৳"
        },
        "language": {
            "code": "bn",
            "name": "Bengali"
        },
        "flag": "https://restcountries.eu/data/bgd.svg",
        "diallingCode": "+880",
        "isoCode": "050"
    },
    {
        "name": "Barbados",
        "code": "BB",
        "capital": "Bridgetown",
        "region": "NA",
        "currency": {
            "code": "BBD",
            "name": "Barbadian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/brb.svg",
        "diallingCode": "+1",
        "isoCode": "052"
    },
    {
        "name": "Belarus",
        "code": "BY",
        "capital": "Minsk",
        "region": "EU",
        "currency": {
            "code": "BYN",
            "name": "New Belarusian ruble",
            "symbol": "Br"
        },
        "language": {
            "code": "be",
            "name": "Belarusian"
        },
        "flag": "https://restcountries.eu/data/blr.svg",
        "diallingCode": "+375",
        "isoCode": "112"
    },
    {
        "name": "Belgium",
        "code": "BE",
        "capital": "Brussels",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "nl",
            "name": "Dutch"
        },
        "flag": "https://restcountries.eu/data/bel.svg",
        "diallingCode": "+32",
        "isoCode": "056"
    },
    {
        "name": "Belize",
        "code": "BZ",
        "capital": "Belmopan",
        "region": "NA",
        "currency": {
            "code": "BZD",
            "name": "Belize dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/blz.svg",
        "diallingCode": "+501",
        "isoCode": "084"
    },
    {
        "name": "Benin",
        "code": "BJ",
        "capital": "Porto-Novo",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/ben.svg",
        "diallingCode": "+229",
        "isoCode": "204"
    },
    {
        "name": "Bermuda",
        "code": "BM",
        "capital": "Hamilton",
        "region": "NA",
        "currency": {
            "code": "BMD",
            "name": "Bermudian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/bmu.svg",
        "diallingCode": "+1",
        "isoCode": "060"
    },
    {
        "name": "Bhutan",
        "code": "BT",
        "capital": "Thimphu",
        "region": "AS",
        "currency": {
            "code": "BTN",
            "name": "Bhutanese ngultrum",
            "symbol": "Nu."
        },
        "language": {
            "code": "dz",
            "name": "Dzongkha"
        },
        "flag": "https://restcountries.eu/data/btn.svg",
        "diallingCode": "+975",
        "isoCode": "064"
    },
    {
        "name": "Bolivia (Plurinational State of)",
        "code": "BO",
        "capital": "Sucre",
        "region": "SA",
        "currency": {
            "code": "BOB",
            "name": "Bolivian boliviano",
            "symbol": "Bs."
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/bol.svg",
        "diallingCode": "+591",
        "isoCode": "068"
    },
    {
        "name": "Bosnia and Herzegovina",
        "code": "BA",
        "capital": "Sarajevo",
        "region": "EU",
        "currency": {
            "code": "BAM",
            "name": "Bosnia and Herzegovina convertible mark",
            "symbol": null
        },
        "language": {
            "code": "bs",
            "name": "Bosnian"
        },
        "flag": "https://restcountries.eu/data/bih.svg",
        "diallingCode": "+387",
        "isoCode": "070"
    },
    {
        "name": "Botswana",
        "code": "BW",
        "capital": "Gaborone",
        "region": "AF",
        "currency": {
            "code": "BWP",
            "name": "Botswana pula",
            "symbol": "P"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/bwa.svg",
        "diallingCode": "+267",
        "isoCode": "072"
    },
    {
        "name": "Brazil",
        "code": "BR",
        "capital": "Brasília",
        "region": "SA",
        "currency": {
            "code": "BRL",
            "name": "Brazilian real",
            "symbol": "R$"
        },
        "language": {
            "code": "pt",
            "name": "Portuguese"
        },
        "flag": "https://restcountries.eu/data/bra.svg",
        "diallingCode": "+55",
        "isoCode": "076"
    },
    {
        "name": "British Indian Ocean Territory",
        "code": "IO",
        "capital": "Diego Garcia",
        "region": "AF",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/iot.svg",
        "diallingCode": "+246",
        "isoCode": "086"
    },
    {
        "name": "Virgin Islands (British)",
        "code": "VG",
        "capital": "Road Town",
        "region": "NA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/vgb.svg",
        "diallingCode": "+1",
        "isoCode": "092"
    },
    {
        "name": "Virgin Islands (U.S.)",
        "code": "VI",
        "capital": "Charlotte Amalie",
        "region": "NA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/vir.svg",
        "diallingCode": "+1",
        "isoCode": "850"
    },
    {
        "name": "Brunei Darussalam",
        "code": "BN",
        "capital": "Bandar Seri Begawan",
        "region": "AS",
        "currency": {
            "code": "BND",
            "name": "Brunei dollar",
            "symbol": "$"
        },
        "language": {
            "code": "ms",
            "name": "Malay"
        },
        "flag": "https://restcountries.eu/data/brn.svg",
        "diallingCode": "+673",
        "isoCode": "096"
    },
    {
        "name": "Bulgaria",
        "code": "BG",
        "capital": "Sofia",
        "region": "EU",
        "currency": {
            "code": "BGN",
            "name": "Bulgarian lev",
            "symbol": "лв"
        },
        "language": {
            "code": "bg",
            "name": "Bulgarian"
        },
        "flag": "https://restcountries.eu/data/bgr.svg",
        "diallingCode": "+359",
        "isoCode": "100"
    },
    {
        "name": "Burkina Faso",
        "code": "BF",
        "capital": "Ouagadougou",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/bfa.svg",
        "diallingCode": "+226",
        "isoCode": "854"
    },
    {
        "name": "Burundi",
        "code": "BI",
        "capital": "Bujumbura",
        "region": "AF",
        "currency": {
            "code": "BIF",
            "name": "Burundian franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/bdi.svg",
        "diallingCode": "+257",
        "isoCode": "108"
    },
    {
        "name": "Cambodia",
        "code": "KH",
        "capital": "Phnom Penh",
        "region": "AS",
        "currency": {
            "code": "KHR",
            "name": "Cambodian riel",
            "symbol": "៛"
        },
        "language": {
            "code": "km",
            "name": "Khmer"
        },
        "flag": "https://restcountries.eu/data/khm.svg",
        "diallingCode": "+855",
        "isoCode": "116"
    },
    {
        "name": "Cameroon",
        "code": "CM",
        "capital": "Yaoundé",
        "region": "AF",
        "currency": {
            "code": "XAF",
            "name": "Central African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/cmr.svg",
        "diallingCode": "+237",
        "isoCode": "120"
    },
    {
        "name": "Canada",
        "code": "CA",
        "capital": "Ottawa",
        "region": "NA",
        "currency": {
            "code": "CAD",
            "name": "Canadian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/can.svg",
        "diallingCode": "+1",
        "isoCode": "124"
    },
    {
        "name": "Cabo Verde",
        "code": "CV",
        "capital": "Praia",
        "region": "AF",
        "currency": {
            "code": "CVE",
            "name": "Cape Verdean escudo",
            "symbol": "Esc"
        },
        "language": {
            "code": "pt",
            "iso639_2": "por",
            "name": "Portuguese",
            "nativeName": "Português"
        },
        "flag": "https://restcountries.eu/data/cpv.svg",
        "diallingCode": "+238",
        "isoCode": "132"
    },
    {
        "name": "Cayman Islands",
        "code": "KY",
        "capital": "George Town",
        "region": "NA",
        "demonym": "Caymanian",
        "currency": {
            "code": "KYD",
            "name": "Cayman Islands dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/cym.svg",
        "diallingCode": "+1",
        "isoCode": "136"
    },
    {
        "name": "Central African Republic",
        "code": "CF",
        "capital": "Bangui",
        "region": "AF",
        "currency": {
            "code": "XAF",
            "name": "Central African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/caf.svg",
        "diallingCode": "+236",
        "isoCode": "140"
    },
    {
        "name": "Central African Republic",
        "code": "CF",
        "capital": "Bangui",
        "region": "AF",
        "currency": {
            "code": "XAF",
            "name": "Central African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/caf.svg",
        "diallingCode": "+236",
        "isoCode": "140"
    },
    {
        "name": "Chile",
        "code": "CL",
        "capital": "Santiago",
        "region": "SA",
        "currency": {
            "code": "CLP",
            "name": "Chilean peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "iso639_2": "spa",
            "name": "Spanish",
            "nativeName": "Español"
        },
        "flag": "https://restcountries.eu/data/chl.svg",
        "diallingCode": "+56",
        "isoCode": "152"
    },
    {
        "name": "China",
        "code": "CN",
        "capital": "Beijing",
        "region": "AS",
        "currency": {
            "code": "CNY",
            "name": "Chinese yuan",
            "symbol": "¥"
        },
        "language": {
            "code": "zh",
            "name": "Chinese"
        },
        "flag": "https://restcountries.eu/data/chn.svg",
        "diallingCode": "+86",
        "isoCode": "156"
    },
    {
        "name": "Colombia",
        "code": "CO",
        "capital": "Bogotá",
        "region": "SA",
        "currency": {
            "code": "COP",
            "name": "Colombian peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/col.svg",
        "diallingCode": "+57",
        "isoCode": "170"
    },
    {
        "name": "Comoros",
        "code": "KM",
        "capital": "Moroni",
        "region": "AF",
        "currency": {
            "code": "KMF",
            "name": "Comorian franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/com.svg",
        "diallingCode": "+269",
        "isoCode": "174"
    },
    {
        "name": "Congo",
        "code": "CG",
        "capital": "Brazzaville",
        "region": "AF",
        "currency": {
            "code": "XAF",
            "name": "Central African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/cog.svg",
        "diallingCode": "+242",
        "isoCode": "178"
    },
    {
        "name": "Congo (Democratic Republic of the)",
        "code": "CD",
        "capital": "Kinshasa",
        "region": "AF",
        "currency": {
            "code": "CDF",
            "name": "Congolese franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/cod.svg",
        "diallingCode": "+243",
        "isoCode": "180"
    },
    {
        "name": "Cook Islands",
        "code": "CK",
        "capital": "Avarua",
        "region": "OC",
        "currency": {
            "code": "NZD",
            "name": "New Zealand dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/cok.svg",
        "diallingCode": "+682",
        "isoCode": "184"
    },
    {
        "name": "Costa Rica",
        "code": "CR",
        "capital": "San José",
        "region": "NA",
        "currency": {
            "code": "CRC",
            "name": "Costa Rican colón",
            "symbol": "₡"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/cri.svg",
        "diallingCode": "+506",
        "isoCode": "188"
    },
    {
        "name": "Croatia",
        "code": "HR",
        "capital": "Zagreb",
        "region": "EU",
        "currency": {
            "code": "HRK",
            "name": "Croatian kuna",
            "symbol": "kn"
        },
        "language": {
            "code": "hr",
            "name": "Croatian"
        },
        "flag": "https://restcountries.eu/data/hrv.svg",
        "diallingCode": "+385",
        "isoCode": "191"
    },
    {
        "name": "Cuba",
        "code": "CU",
        "capital": "Havana",
        "region": "NA",
        "currency": {
            "code": "CUC",
            "name": "Cuban convertible peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/cub.svg",
        "diallingCode": "+53",
        "isoCode": "192"
    },
    {
        "name": "Cuba",
        "code": "CU",
        "capital": "Havana",
        "region": "NA",
        "currency": {
            "code": "CUC",
            "name": "Cuban convertible peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/cub.svg",
        "diallingCode": "+53",
        "isoCode": "192"
    },
    {
        "name": "Cyprus",
        "code": "CY",
        "capital": "Nicosia",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "tr",
            "name": "Turkish"
        },
        "flag": "https://restcountries.eu/data/cyp.svg",
        "diallingCode": "+357",
        "isoCode": "196"
    },
    {
        "name": "Czech Republic",
        "code": "CZ",
        "capital": "Prague",
        "region": "EU",
        "currency": {
            "code": "CZK",
            "name": "Czech koruna",
            "symbol": "Kč"
        },
        "language": {
            "code": "cs",
            "name": "Czech"
        },
        "flag": "https://restcountries.eu/data/cze.svg",
        "diallingCode": "+420",
        "isoCode": "203"
    },
    {
        "name": "Denmark",
        "code": "DK",
        "capital": "Copenhagen",
        "region": "EU",
        "currency": {
            "code": "DKK",
            "name": "Danish krone",
            "symbol": "kr"
        },
        "language": {
            "code": "da",
            "name": "Danish"
        },
        "flag": "https://restcountries.eu/data/dnk.svg",
        "diallingCode": "+45",
        "isoCode": "208"
    },
    {
        "name": "Djibouti",
        "code": "DJ",
        "capital": "Djibouti",
        "region": "AF",
        "currency": {
            "code": "DJF",
            "name": "Djiboutian franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/dji.svg",
        "diallingCode": "+253",
        "isoCode": "262"
    },
    {
        "name": "Dominica",
        "code": "DM",
        "capital": "Roseau",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/dma.svg",
        "diallingCode": "+1",
        "isoCode": "212"
    },
    {
        "name": "Dominican Republic",
        "code": "DO",
        "capital": "Santo Domingo",
        "region": "NA",
        "currency": {
            "code": "DOP",
            "name": "Dominican peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/dom.svg",
        "diallingCode": "+1",
        "isoCode": "214"
    },
    {
        "name": "Ecuador",
        "code": "EC",
        "capital": "Quito",
        "region": "SA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/ecu.svg",
        "diallingCode": "+593",
        "isoCode": "218"
    },
    {
        "name": "Egypt",
        "code": "EG",
        "capital": "Cairo",
        "region": "AF",
        "currency": {
            "code": "EGP",
            "name": "Egyptian pound",
            "symbol": "£"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/egy.svg",
        "diallingCode": "+20",
        "isoCode": "818"
    },
    {
        "name": "El Salvador",
        "code": "SV",
        "capital": "San Salvador",
        "region": "NA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/slv.svg",
        "diallingCode": "+503",
        "isoCode": "222"
    },
    {
        "name": "Equatorial Guinea",
        "code": "GQ",
        "capital": "Malabo",
        "region": "AF",
        "currency": {
            "code": "XAF",
            "name": "Central African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "es",
            "iso639_2": "spa",
            "name": "Spanish",
            "nativeName": "Español"
        },
        "flag": "https://restcountries.eu/data/gnq.svg",
        "diallingCode": "+240",
        "isoCode": "226"
    },
    {
        "name": "Eritrea",
        "code": "ER",
        "capital": "Asmara",
        "region": "AF",
        "currency": {
            "code": "ERN",
            "name": "Eritrean nakfa",
            "symbol": "Nfk"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/eri.svg",
        "diallingCode": "+291",
        "isoCode": "232"
    },
    {
        "name": "Estonia",
        "code": "EE",
        "capital": "Tallinn",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "et",
            "name": "Estonian"
        },
        "flag": "https://restcountries.eu/data/est.svg",
        "diallingCode": "+372",
        "isoCode": "233"
    },
    {
        "name": "Ethiopia",
        "code": "ET",
        "capital": "Addis Ababa",
        "region": "AF",
        "currency": {
            "code": "ETB",
            "name": "Ethiopian birr",
            "symbol": "Br"
        },
        "language": {
            "code": "am",
            "name": "Amharic"
        },
        "flag": "https://restcountries.eu/data/eth.svg",
        "diallingCode": "+251",
        "isoCode": "231"
    },
    {
        "name": "Falkland Islands (Malvinas)",
        "code": "FK",
        "capital": "Stanley",
        "region": "SA",
        "currency": {
            "code": "FKP",
            "name": "Falkland Islands pound",
            "symbol": "£"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/flk.svg",
        "diallingCode": "+500",
        "isoCode": "238"
    },
    {
        "name": "Faroe Islands",
        "code": "FO",
        "capital": "Tórshavn",
        "region": "EU",
        "currency": {
            "code": "DKK",
            "name": "Danish krone",
            "symbol": "kr"
        },
        "language": {
            "code": "fo",
            "name": "Faroese"
        },
        "flag": "https://restcountries.eu/data/fro.svg",
        "diallingCode": "+298",
        "isoCode": "234"
    },
    {
        "name": "Fiji",
        "code": "FJ",
        "capital": "Suva",
        "region": "OC",
        "currency": {
            "code": "FJD",
            "name": "Fijian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/fji.svg",
        "diallingCode": "+679",
        "isoCode": "242"
    },
    {
        "name": "Finland",
        "code": "FI",
        "capital": "Helsinki",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fi",
            "iso639_2": "fin",
            "name": "Finnish",
            "nativeName": "suomi"
        },
        "flag": "https://restcountries.eu/data/fin.svg",
        "diallingCode": "+358",
        "isoCode": "246"
    },
    {
        "name": "France",
        "code": "FR",
        "capital": "Paris",
        "region": "EU",
        "demonym": "French",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/fra.svg",
        "diallingCode": "+33",
        "isoCode": "250"
    },
    {
        "name": "French Guiana",
        "code": "GF",
        "capital": "Cayenne",
        "region": "SA",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/guf.svg",
        "diallingCode": "+594",
        "isoCode": "254"
    },
    {
        "name": "French Polynesia",
        "code": "PF",
        "capital": "Papeetē",
        "region": "OC",
        "currency": {
            "code": "XPF",
            "name": "CFP franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/pyf.svg",
        "diallingCode": "+689",
        "isoCode": "258"
    },
    {
        "name": "Gabon",
        "code": "GA",
        "capital": "Libreville",
        "region": "AF",
        "currency": {
            "code": "XAF",
            "name": "Central African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/gab.svg",
        "diallingCode": "+241",
        "isoCode": "266"
    },
    {
        "name": "Gambia",
        "code": "GM",
        "capital": "Banjul",
        "region": "AF",
        "currency": {
            "code": "GMD",
            "name": "Gambian dalasi",
            "symbol": "D"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/gmb.svg",
        "diallingCode": "+220",
        "isoCode": "270"
    },
    {
        "name": "Georgia",
        "code": "GE",
        "capital": "Tbilisi",
        "region": "AS",
        "currency": {
            "code": "GEL",
            "name": "Georgian Lari",
            "symbol": "ლ"
        },
        "language": {
            "code": "ka",
            "name": "Georgian"
        },
        "flag": "https://restcountries.eu/data/geo.svg",
        "diallingCode": "+995",
        "isoCode": "268"
    },
    {
        "name": "Germany",
        "code": "DE",
        "capital": "Berlin",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "de",
            "name": "German"
        },
        "flag": "https://restcountries.eu/data/deu.svg",
        "diallingCode": "+49",
        "isoCode": "276"
    },
    {
        "name": "Ghana",
        "code": "GH",
        "capital": "Accra",
        "region": "AF",
        "currency": {
            "code": "GHS",
            "name": "Ghanaian cedi",
            "symbol": "₵"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/gha.svg",
        "diallingCode": "+233",
        "isoCode": "288"
    },
    {
        "name": "Gibraltar",
        "code": "GI",
        "capital": "Gibraltar",
        "region": "EU",
        "currency": {
            "code": "GIP",
            "name": "Gibraltar pound",
            "symbol": "£"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/gib.svg",
        "diallingCode": "+350",
        "isoCode": "292"
    },
    {
        "name": "Greece",
        "code": "GR",
        "capital": "Athens",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "el",
            "name": "Greek (modern)"
        },
        "flag": "https://restcountries.eu/data/grc.svg",
        "diallingCode": "+30",
        "isoCode": "300"
    },
    {
        "name": "Greenland",
        "code": "GL",
        "capital": "Nuuk",
        "region": "NA",
        "currency": {
            "code": "DKK",
            "name": "Danish krone",
            "symbol": "kr"
        },
        "language": {
            "code": "kl",
            "name": "Kalaallisut"
        },
        "flag": "https://restcountries.eu/data/grl.svg",
        "diallingCode": "+299",
        "isoCode": "304"
    },
    {
        "name": "Grenada",
        "code": "GD",
        "capital": "St. George's",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/grd.svg",
        "diallingCode": "+1",
        "isoCode": "308"
    },
    {
        "name": "Guadeloupe",
        "code": "GP",
        "capital": "Basse-Terre",
        "region": "NA",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/glp.svg",
        "diallingCode": "+590",
        "isoCode": "312"
    },
    {
        "name": "Guam",
        "code": "GU",
        "capital": "Hagåtña",
        "region": "OC",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/gum.svg",
        "diallingCode": "+1",
        "isoCode": "316"
    },
    {
        "name": "Guatemala",
        "code": "GT",
        "capital": "Guatemala City",
        "region": "NA",
        "currency": {
            "code": "GTQ",
            "name": "Guatemalan quetzal",
            "symbol": "Q"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/gtm.svg",
        "diallingCode": "+502",
        "isoCode": "320"
    },
    {
        "name": "Guinea",
        "code": "GN",
        "capital": "Conakry",
        "region": "AF",
        "currency": {
            "code": "GNF",
            "name": "Guinean franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/gin.svg",
        "diallingCode": "+224",
        "isoCode": "324"
    },
    {
        "name": "Guinea-Bissau",
        "code": "GW",
        "capital": "Bissau",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "pt",
            "name": "Portuguese"
        },
        "flag": "https://restcountries.eu/data/gnb.svg",
        "diallingCode": "+245",
        "isoCode": "624"
    },
    {
        "name": "Guyana",
        "code": "GY",
        "capital": "Georgetown",
        "region": "SA",
        "currency": {
            "code": "GYD",
            "name": "Guyanese dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/guy.svg",
        "diallingCode": "+592",
        "isoCode": "328"
    },
    {
        "name": "Haiti",
        "code": "HT",
        "capital": "Port-au-Prince",
        "region": "Americas",
        "currency": {
            "code": "HTG",
            "name": "Haitian gourde",
            "symbol": "G"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/hti.svg",
        "diallingCode": "+509",
        "isoCode": "332"
    },
    {
        "name": "Holy See",
        "code": "VA",
        "capital": "Rome",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/vat.svg",
        "diallingCode": "+39",
        "isoCode": "336"
    },
    {
        "name": "Honduras",
        "code": "HN",
        "capital": "Tegucigalpa",
        "region": "NA",
        "currency": {
            "code": "HNL",
            "name": "Honduran lempira",
            "symbol": "L"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/hnd.svg",
        "diallingCode": "+504",
        "isoCode": "340"
    },
    {
        "name": "Hong Kong",
        "code": "HK",
        "capital": "City of Victoria",
        "region": "AS",
        "currency": {
            "code": "HKD",
            "name": "Hong Kong dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/hkg.svg",
        "diallingCode": "+852",
        "isoCode": "344"
    },
    {
        "name": "Hungary",
        "code": "HU",
        "capital": "Budapest",
        "region": "EU",
        "currency": {
            "code": "HUF",
            "name": "Hungarian forint",
            "symbol": "Ft"
        },
        "language": {
            "code": "hu",
            "name": "Hungarian"
        },
        "flag": "https://restcountries.eu/data/hun.svg",
        "diallingCode": "+36",
        "isoCode": "348"
    },
    {
        "name": "Iceland",
        "code": "IS",
        "capital": "Reykjavík",
        "region": "EU",
        "currency": {
            "code": "ISK",
            "name": "Icelandic króna",
            "symbol": "kr"
        },
        "language": {
            "code": "is",
            "name": "Icelandic"
        },
        "flag": "https://restcountries.eu/data/isl.svg",
        "diallingCode": "+354",
        "isoCode": "352"
    },
    {
        "name": "India",
        "code": "IN",
        "capital": "New Delhi",
        "region": "AS",
        "currency": {
            "code": "INR",
            "name": "Indian rupee",
            "symbol": "₹"
        },
        "language": {
            "code": "hi",
            "name": "Hindi"
        },
        "flag": "https://restcountries.eu/data/ind.svg",
        "diallingCode": "+91",
        "isoCode": "356"
    },
    {
        "name": "Indonesia",
        "code": "ID",
        "capital": "Jakarta",
        "region": "AS",
        "currency": {
            "code": "IDR",
            "name": "Indonesian rupiah",
            "symbol": "Rp"
        },
        "language": {
            "code": "id",
            "name": "Indonesian"
        },
        "flag": "https://restcountries.eu/data/idn.svg",
        "diallingCode": "+62",
        "isoCode": "360"
    },
    {
        "name": "Côte d'Ivoire",
        "code": "CI",
        "capital": "Yamoussoukro",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/civ.svg",
        "diallingCode": "+225",
        "isoCode": "384"
    },
    {
        "name": "Iran (Islamic Republic of)",
        "code": "IR",
        "capital": "Tehran",
        "region": "AS",
        "currency": {
            "code": "IRR",
            "name": "Iranian rial",
            "symbol": "﷼"
        },
        "language": {
            "code": "fa",
            "name": "Persian (Farsi)"
        },
        "flag": "https://restcountries.eu/data/irn.svg",
        "diallingCode": "+98",
        "isoCode": "364"
    },
    {
        "name": "Iraq",
        "code": "IQ",
        "capital": "Baghdad",
        "region": "AS",
        "currency": {
            "code": "IQD",
            "name": "Iraqi dinar",
            "symbol": "ع.د"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/irq.svg",
        "diallingCode": "+964",
        "isoCode": "368"
    },
    {
        "name": "Ireland",
        "code": "IE",
        "capital": "Dublin",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "ga",
            "name": "Irish"
        },
        "flag": "https://restcountries.eu/data/irl.svg",
        "diallingCode": "+353",
        "isoCode": "372"
    },
    {
        "name": "Israel",
        "code": "IL",
        "capital": "Jerusalem",
        "region": "AS",
        "currency": {
            "code": "ILS",
            "name": "Israeli new shekel",
            "symbol": "₪"
        },
        "language": {
            "code": "he",
            "name": "Hebrew (modern)"
        },
        "flag": "https://restcountries.eu/data/isr.svg",
        "diallingCode": "+972",
        "isoCode": "376"
    },
    {
        "name": "Italy",
        "code": "IT",
        "capital": "Rome",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "it",
            "name": "Italian"
        },
        "flag": "https://restcountries.eu/data/ita.svg",
        "diallingCode": "+39",
        "isoCode": "380"
    },
    {
        "name": "Jamaica",
        "code": "JM",
        "capital": "Kingston",
        "region": "NA",
        "currency": {
            "code": "JMD",
            "name": "Jamaican dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/jam.svg",
        "diallingCode": "+1",
        "isoCode": "388"
    },
    {
        "name": "Japan",
        "code": "JP",
        "capital": "Tokyo",
        "region": "AS",
        "currency": {
            "code": "JPY",
            "name": "Japanese yen",
            "symbol": "¥"
        },
        "language": {
            "code": "ja",
            "name": "Japanese"
        },
        "flag": "https://restcountries.eu/data/jpn.svg",
        "diallingCode": "+81",
        "isoCode": "392"
    },
    {
        "name": "Jordan",
        "code": "JO",
        "capital": "Amman",
        "region": "AS",
        "currency": {
            "code": "JOD",
            "name": "Jordanian dinar",
            "symbol": "د.ا"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/jor.svg",
        "diallingCode": "+962",
        "isoCode": "400"
    },
    {
        "name": "Kazakhstan",
        "code": "KZ",
        "capital": "Astana",
        "region": "AS",
        "currency": {
            "code": "KZT",
            "name": "Kazakhstani tenge",
            "symbol": null
        },
        "language": {
            "code": "kk",
            "name": "Kazakh"
        },
        "flag": "https://restcountries.eu/data/kaz.svg",
        "diallingCode": "+7",
        "isoCode": "398"
    },
    {
        "name": "Kenya",
        "code": "KE",
        "capital": "Nairobi",
        "region": "AF",
        "currency": {
            "code": "KES",
            "name": "Kenyan shilling",
            "symbol": "Sh"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/ken.svg",
        "diallingCode": "+254",
        "isoCode": "404"
    },
    {
        "name": "Kiribati",
        "code": "KI",
        "capital": "South Tarawa",
        "region": "OC",
        "currency": {
            "code": "AUD",
            "name": "Australian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/kir.svg",
        "diallingCode": "+686",
        "isoCode": "296"
    },
    {
        "name": "Kuwait",
        "code": "KW",
        "capital": "Kuwait City",
        "region": "AS",
        "currency": {
            "code": "KWD",
            "name": "Kuwaiti dinar",
            "symbol": "د.ك"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/kwt.svg",
        "diallingCode": "+965",
        "isoCode": "414"
    },
    {
        "name": "Kyrgyzstan",
        "code": "KG",
        "capital": "Bishkek",
        "region": "AS",
        "currency": {
            "code": "KGS",
            "name": "Kyrgyzstani som",
            "symbol": "с"
        },
        "language": {
            "code": "ky",
            "name": "Kyrgyz"
        },
        "flag": "https://restcountries.eu/data/kgz.svg",
        "diallingCode": "+996",
        "isoCode": "417"
    },
    {
        "name": "Lao People's Democratic Republic",
        "code": "LA",
        "capital": "Vientiane",
        "region": "AS",
        "currency": {
            "code": "LAK",
            "name": "Lao kip",
            "symbol": "₭"
        },
        "language": {
            "code": "lo",
            "name": "Lao"
        },
        "flag": "https://restcountries.eu/data/lao.svg",
        "diallingCode": "+856",
        "isoCode": "418"
    },
    {
        "name": "Latvia",
        "code": "LV",
        "capital": "Riga",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "lv",
            "name": "Latvian"
        },
        "flag": "https://restcountries.eu/data/lva.svg",
        "diallingCode": "+371",
        "isoCode": "428"
    },
    {
        "name": "Lebanon",
        "code": "LB",
        "capital": "Beirut",
        "region": "AS",
        "currency": {
            "code": "LBP",
            "name": "Lebanese pound",
            "symbol": "ل.ل"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/lbn.svg",
        "diallingCode": "+961",
        "isoCode": "422"
    },
    {
        "name": "Lesotho",
        "code": "LS",
        "capital": "Maseru",
        "region": "AF",
        "currency": {
            "code": "LSL",
            "name": "Lesotho loti",
            "symbol": "L"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/lso.svg",
        "diallingCode": "+266",
        "isoCode": "426"
    },
    {
        "name": "Liberia",
        "code": "LR",
        "capital": "Monrovia",
        "region": "AF",
        "currency": {
            "code": "LRD",
            "name": "Liberian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/lbr.svg",
        "diallingCode": "+231",
        "isoCode": "430"
    },
    {
        "name": "Libya",
        "code": "LY",
        "capital": "Tripoli",
        "region": "AF",
        "currency": {
            "code": "LYD",
            "name": "Libyan dinar",
            "symbol": "ل.د"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/lby.svg",
        "diallingCode": "+218",
        "isoCode": "434"
    },
    {
        "name": "Liechtenstein",
        "code": "LI",
        "capital": "Vaduz",
        "region": "EU",
        "currency": {
            "code": "CHF",
            "name": "Swiss franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "de",
            "name": "German"
        },
        "flag": "https://restcountries.eu/data/lie.svg",
        "diallingCode": "+423",
        "isoCode": "438"
    },
    {
        "name": "Lithuania",
        "code": "LT",
        "capital": "Vilnius",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "lt",
            "name": "Lithuanian"
        },
        "flag": "https://restcountries.eu/data/ltu.svg",
        "diallingCode": "+370",
        "isoCode": "440"
    },
    {
        "name": "Luxembourg",
        "code": "LU",
        "capital": "Luxembourg",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/lux.svg",
        "diallingCode": "+352",
        "isoCode": "442"
    },
    {
        "name": "Macao",
        "code": "MO",
        "capital": "",
        "region": "AS",
        "currency": {
            "code": "MOP",
            "name": "Macanese pataca",
            "symbol": "P"
        },
        "language": {
            "code": "zh",
            "name": "Chinese"
        },
        "flag": "https://restcountries.eu/data/mac.svg",
        "diallingCode": "+853",
        "isoCode": "446"
    },
    {
        "name": "Macedonia (the former Yugoslav Republic of)",
        "code": "MK",
        "capital": "Skopje",
        "region": "EU",
        "currency": {
            "code": "MKD",
            "name": "Macedonian denar",
            "symbol": "ден"
        },
        "language": {
            "code": "mk",
            "name": "Macedonian"
        },
        "flag": "https://restcountries.eu/data/mkd.svg",
        "diallingCode": "+389",
        "isoCode": "807"
    },
    {
        "name": "Madagascar",
        "code": "MG",
        "capital": "Antananarivo",
        "region": "AF",
        "currency": {
            "code": "MGA",
            "name": "Malagasy ariary",
            "symbol": "Ar"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/mdg.svg",
        "diallingCode": "+261",
        "isoCode": "450"
    },
    {
        "name": "Malawi",
        "code": "MW",
        "capital": "Lilongwe",
        "region": "AF",
        "currency": {
            "code": "MWK",
            "name": "Malawian kwacha",
            "symbol": "MK"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/mwi.svg",
        "diallingCode": "+265",
        "isoCode": "454"
    },
    {
        "name": "Malaysia",
        "code": "MY",
        "capital": "Kuala Lumpur",
        "region": "AS",
        "currency": {
            "code": "MYR",
            "name": "Malaysian ringgit",
            "symbol": "RM"
        },
        "language": {
            "code": null,
            "name": "Malaysian"
        },
        "flag": "https://restcountries.eu/data/mys.svg",
        "diallingCode": "+60",
        "isoCode": "458"
    },
    {
        "name": "Maldives",
        "code": "MV",
        "capital": "Malé",
        "region": "AS",
        "currency": {
            "code": "MVR",
            "name": "Maldivian rufiyaa",
            "symbol": ".ރ"
        },
        "language": {
            "code": "dv",
            "name": "Divehi"
        },
        "flag": "https://restcountries.eu/data/mdv.svg",
        "diallingCode": "+960",
        "isoCode": "462"
    },
    {
        "name": "Mali",
        "code": "ML",
        "capital": "Bamako",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/mli.svg",
        "diallingCode": "+223",
        "isoCode": "466"
    },
    {
        "name": "Malta",
        "code": "MT",
        "capital": "Valletta",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "mt",
            "name": "Maltese"
        },
        "flag": "https://restcountries.eu/data/mlt.svg",
        "diallingCode": "+356",
        "isoCode": "470"
    },
    {
        "name": "Marshall Islands",
        "code": "MH",
        "capital": "Majuro",
        "region": "OC",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/mhl.svg",
        "diallingCode": "+692",
        "isoCode": "584"
    },
    {
        "name": "Martinique",
        "code": "MQ",
        "capital": "Fort-de-France",
        "region": "Americas",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/mtq.svg",
        "diallingCode": "+596",
        "isoCode": "474"
    },
    {
        "name": "Mauritania",
        "code": "MR",
        "capital": "Nouakchott",
        "region": "AF",
        "currency": {
            "code": "MRO",
            "name": "Mauritanian ouguiya",
            "symbol": "UM"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/mrt.svg",
        "diallingCode": "+222",
        "isoCode": "478"
    },
    {
        "name": "Mauritius",
        "code": "MU",
        "capital": "Port Louis",
        "region": "AF",
        "currency": {
            "code": "MUR",
            "name": "Mauritian rupee",
            "symbol": "₨"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/mus.svg",
        "diallingCode": "+230",
        "isoCode": "480"
    },
    {
        "name": "Mayotte",
        "code": "YT",
        "capital": "Mamoudzou",
        "region": "AF",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/myt.svg",
        "diallingCode": "+262",
        "isoCode": "175"
    },
    {
        "name": "Mexico",
        "code": "MX",
        "capital": "Mexico City",
        "region": "NA",
        "currency": {
            "code": "MXN",
            "name": "Mexican peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/mex.svg",
        "diallingCode": "+52",
        "isoCode": "484"
    },
    {
        "name": "Micronesia (Federated States of)",
        "code": "FM",
        "capital": "Palikir",
        "region": "OC",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/fsm.svg",
        "diallingCode": "+691",
        "isoCode": "583"
    },
    {
        "name": "Moldova (Republic of)",
        "code": "MD",
        "capital": "Chișinău",
        "region": "EU",
        "currency": {
            "code": "MDL",
            "name": "Moldovan leu",
            "symbol": "L"
        },
        "language": {
            "code": "ro",
            "name": "Romanian"
        },
        "flag": "https://restcountries.eu/data/mda.svg",
        "diallingCode": "+373",
        "isoCode": "498"
    },
    {
        "name": "Monaco",
        "code": "MC",
        "capital": "Monaco",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/mco.svg",
        "diallingCode": "+377",
        "isoCode": "492"
    },
    {
        "name": "Mongolia",
        "code": "MN",
        "capital": "Ulan Bator",
        "region": "AS",
        "currency": {
            "code": "MNT",
            "name": "Mongolian tögrög",
            "symbol": "₮"
        },
        "language": {
            "code": "mn",
            "name": "Mongolian"
        },
        "flag": "https://restcountries.eu/data/mng.svg",
        "diallingCode": "+976",
        "isoCode": "496"
    },
    {
        "name": "Montenegro",
        "code": "ME",
        "capital": "Podgorica",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "sr",
            "name": "Serbian"
        },
        "flag": "https://restcountries.eu/data/mne.svg",
        "diallingCode": "+382",
        "isoCode": "499"
    },
    {
        "name": "Montserrat",
        "code": "MS",
        "capital": "Plymouth",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/msr.svg",
        "diallingCode": "+1",
        "isoCode": "500"
    },
    {
        "name": "Morocco",
        "code": "MA",
        "capital": "Rabat",
        "region": "AF",
        "currency": {
            "code": "MAD",
            "name": "Moroccan dirham",
            "symbol": "د.م."
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/mar.svg",
        "diallingCode": "+212",
        "isoCode": "504"
    },
    {
        "name": "Mozambique",
        "code": "MZ",
        "capital": "Maputo",
        "region": "AF",
        "currency": {
            "code": "MZN",
            "name": "Mozambican metical",
            "symbol": "MT"
        },
        "language": {
            "code": "pt",
            "name": "Portuguese"
        },
        "flag": "https://restcountries.eu/data/moz.svg",
        "diallingCode": "+258",
        "isoCode": "508"
    },
    {
        "name": "Myanmar",
        "code": "MM",
        "capital": "Naypyidaw",
        "region": "AS",
        "currency": {
            "code": "MMK",
            "name": "Burmese kyat",
            "symbol": "Ks"
        },
        "language": {
            "code": "my",
            "name": "Burmese"
        },
        "flag": "https://restcountries.eu/data/mmr.svg",
        "diallingCode": "+95",
        "isoCode": "104"
    },
    {
        "name": "Namibia",
        "code": "NA",
        "capital": "Windhoek",
        "region": "AF",
        "currency": {
            "code": "NAD",
            "name": "Namibian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/nam.svg",
        "diallingCode": "+264",
        "isoCode": "516"
    },
    {
        "name": "Nauru",
        "code": "NR",
        "capital": "Yaren",
        "region": "OC",
        "currency": {
            "code": "AUD",
            "name": "Australian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/nru.svg",
        "diallingCode": "+674",
        "isoCode": "520"
    },
    {
        "name": "Nepal",
        "code": "NP",
        "capital": "Kathmandu",
        "region": "AS",
        "currency": {
            "code": "NPR",
            "name": "Nepalese rupee",
            "symbol": "₨"
        },
        "language": {
            "code": "ne",
            "name": "Nepali"
        },
        "flag": "https://restcountries.eu/data/npl.svg",
        "diallingCode": "+977",
        "isoCode": "524"
    },
    {
        "name": "Netherlands",
        "code": "NL",
        "capital": "Amsterdam",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "nl",
            "name": "Dutch"
        },
        "flag": "https://restcountries.eu/data/nld.svg",
        "diallingCode": "+31",
        "isoCode": "528"
    },
    {
        "name": "New Caledonia",
        "code": "NC",
        "capital": "Nouméa",
        "region": "OC",
        "currency": {
            "code": "XPF",
            "name": "CFP franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/ncl.svg",
        "diallingCode": "+687",
        "isoCode": "540"
    },
    {
        "name": "New Zealand",
        "code": "NZ",
        "capital": "Wellington",
        "region": "OC",
        "currency": {
            "code": "NZD",
            "name": "New Zealand dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/nzl.svg",
        "diallingCode": "+64",
        "isoCode": "554"
    },
    {
        "name": "Nicaragua",
        "code": "NI",
        "capital": "Managua",
        "region": "NA",
        "currency": {
            "code": "NIO",
            "name": "Nicaraguan córdoba",
            "symbol": "C$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/nic.svg",
        "diallingCode": "+505",
        "isoCode": "558"
    },
    {
        "name": "Niger",
        "code": "NE",
        "capital": "Niamey",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/ner.svg",
        "diallingCode": "+227",
        "isoCode": "562"
    },
    {
        "name": "Nigeria",
        "code": "NG",
        "capital": "Abuja",
        "region": "AF",
        "currency": {
            "code": "NGN",
            "name": "Nigerian naira",
            "symbol": "₦"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/nga.svg",
        "diallingCode": "+234",
        "isoCode": "566"
    },
    {
        "name": "Niue",
        "code": "NU",
        "capital": "Alofi",
        "region": "OC",
        "currency": {
            "code": "NZD",
            "name": "New Zealand dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/niu.svg",
        "diallingCode": "+683",
        "isoCode": "570"
    },
    {
        "name": "Norfolk Island",
        "code": "NF",
        "capital": "Kingston",
        "region": "OC",
        "currency": {
            "code": "AUD",
            "name": "Australian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/nfk.svg",
        "diallingCode": "+672",
        "isoCode": "574"
    },
    {
        "name": "Korea (Democratic People's Republic of)",
        "code": "KP",
        "capital": "Pyongyang",
        "region": "AS",
        "currency": {
            "code": "KPW",
            "name": "North Korean won",
            "symbol": "₩"
        },
        "language": {
            "code": "ko",
            "name": "Korean"
        },
        "flag": "https://restcountries.eu/data/prk.svg",
        "diallingCode": "+850",
        "isoCode": "408"
    },
    {
        "name": "Northern Mariana Islands",
        "code": "MP",
        "capital": "Saipan",
        "region": "OC",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/mnp.svg",
        "diallingCode": "+1",
        "isoCode": "580"
    },
    {
        "name": "Norway",
        "code": "NO",
        "capital": "Oslo",
        "region": "EU",
        "currency": {
            "code": "NOK",
            "name": "Norwegian krone",
            "symbol": "kr"
        },
        "language": {
            "code": "no",
            "name": "Norwegian"
        },
        "flag": "https://restcountries.eu/data/nor.svg",
        "diallingCode": "+47",
        "isoCode": "578"
    },
    {
        "name": "Oman",
        "code": "OM",
        "capital": "Muscat",
        "region": "AS",
        "currency": {
            "code": "OMR",
            "name": "Omani rial",
            "symbol": "ر.ع."
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/omn.svg",
        "diallingCode": "+968",
        "isoCode": "512"
    },
    {
        "name": "Pakistan",
        "code": "PK",
        "capital": "Islamabad",
        "region": "AS",
        "currency": {
            "code": "PKR",
            "name": "Pakistani rupee",
            "symbol": "₨"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/pak.svg",
        "diallingCode": "+92",
        "isoCode": "586"
    },
    {
        "name": "Palau",
        "code": "PW",
        "capital": "Ngerulmud",
        "region": "OC",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/plw.svg",
        "diallingCode": "+680",
        "isoCode": "585"
    },
    {
        "name": "Palestine, State of",
        "code": "PS",
        "capital": "Ramallah",
        "region": "AS",
        "currency": {
            "code": "ILS",
            "name": "Israeli new sheqel",
            "symbol": "₪"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/pse.svg",
        "diallingCode": "+970",
        "isoCode": "275"
    },
    {
        "name": "Panama",
        "code": "PA",
        "capital": "Panama City",
        "region": "NA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/pan.svg",
        "diallingCode": "+507",
        "isoCode": "591"
    },
    {
        "name": "Papua New Guinea",
        "code": "PG",
        "capital": "Port Moresby",
        "region": "OC",
        "currency": {
            "code": "PGK",
            "name": "Papua New Guinean kina",
            "symbol": "K"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/png.svg",
        "diallingCode": "+675",
        "isoCode": "598"
    },
    {
        "name": "Paraguay",
        "code": "PY",
        "capital": "Asunción",
        "region": "SA",
        "currency": {
            "code": "PYG",
            "name": "Paraguayan guaraní",
            "symbol": "₲"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/pry.svg",
        "diallingCode": "+595",
        "isoCode": "600"
    },
    {
        "name": "Peru",
        "code": "PE",
        "capital": "Lima",
        "region": "SA",
        "currency": {
            "code": "PEN",
            "name": "Peruvian sol",
            "symbol": "S/."
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/per.svg",
        "diallingCode": "+51",
        "isoCode": "604"
    },
    {
        "name": "Philippines",
        "code": "PH",
        "capital": "Manila",
        "region": "AS",
        "currency": {
            "code": "PHP",
            "name": "Philippine peso",
            "symbol": "₱"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/phl.svg",
        "diallingCode": "+63",
        "isoCode": "608"
    },
    {
        "name": "Poland",
        "code": "PL",
        "capital": "Warsaw",
        "region": "EU",
        "currency": {
            "code": "PLN",
            "name": "Polish złoty",
            "symbol": "zł"
        },
        "language": {
            "code": "pl",
            "name": "Polish"
        },
        "flag": "https://restcountries.eu/data/pol.svg",
        "diallingCode": "+48",
        "isoCode": "616"
    },
    {
        "name": "Portugal",
        "code": "PT",
        "capital": "Lisbon",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "pt",
            "name": "Portuguese"
        },
        "flag": "https://restcountries.eu/data/prt.svg",
        "diallingCode": "+351",
        "isoCode": "620"
    },
    {
        "name": "Puerto Rico",
        "code": "PR",
        "capital": "San Juan",
        "region": "NA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/pri.svg",
        "diallingCode": "+1",
        "isoCode": "630"
    },
    {
        "name": "Qatar",
        "code": "QA",
        "capital": "Doha",
        "region": "AS",
        "currency": {
            "code": "QAR",
            "name": "Qatari riyal",
            "symbol": "ر.ق"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/qat.svg",
        "diallingCode": "+974",
        "isoCode": "634"
    },
    {
        "name": "Republic of Kosovo",
        "code": "XK",
        "capital": "Pristina",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "sq",
            "name": "Albanian"
        },
        "flag": "https://restcountries.eu/data/kos.svg",
        "diallingCode": "+381",
        "isoCode": "383"
    },
    {
        "name": "Réunion",
        "code": "RE",
        "capital": "Saint-Denis",
        "region": "AF",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/reu.svg",
        "diallingCode": "+262",
        "isoCode": "638"
    },
    {
        "name": "Romania",
        "code": "RO",
        "capital": "Bucharest",
        "region": "EU",
        "currency": {
            "code": "RON",
            "name": "Romanian leu",
            "symbol": "lei"
        },
        "language": {
            "code": "ro",
            "name": "Romanian"
        },
        "flag": "https://restcountries.eu/data/rou.svg",
        "diallingCode": "+40",
        "isoCode": "642"
    },
    {
        "name": "Russian Federation",
        "code": "RU",
        "capital": "Moscow",
        "region": "EU",
        "currency": {
            "code": "RUB",
            "name": "Russian ruble",
            "symbol": "₽"
        },
        "language": {
            "code": "ru",
            "name": "Russian"
        },
        "flag": "https://restcountries.eu/data/rus.svg",
        "diallingCode": "+7",
        "isoCode": "643"
    },
    {
        "name": "Rwanda",
        "code": "RW",
        "capital": "Kigali",
        "region": "AF",
        "currency": {
            "code": "RWF",
            "name": "Rwandan franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "rw",
            "name": "Kinyarwanda"
        },
        "flag": "https://restcountries.eu/data/rwa.svg",
        "diallingCode": "+250",
        "isoCode": "646"
    },
    {
        "name": "Saint Barthélemy",
        "code": "BL",
        "capital": "Gustavia",
        "region": "NA",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/blm.svg",
        "diallingCode": "+590",
        "isoCode": "652"
    },
    {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "code": "SH",
        "capital": "Jamestown",
        "region": "AF",
        "currency": {
            "code": "SHP",
            "name": "Saint Helena pound",
            "symbol": "£"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/shn.svg",
        "diallingCode": "+290",
        "isoCode": "654"
    },
    {
        "name": "Saint Kitts and Nevis",
        "code": "KN",
        "capital": "Basseterre",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/kna.svg",
        "diallingCode": "+1",
        "isoCode": "659"
    },
    {
        "name": "Saint Lucia",
        "code": "LC",
        "capital": "Castries",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/lca.svg",
        "diallingCode": "+1",
        "isoCode": "662"
    },
    {
        "name": "Saint Martin (French part)",
        "code": "MF",
        "capital": "Marigot",
        "region": "NA",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/maf.svg",
        "diallingCode": "+590",
        "isoCode": "663"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "code": "PM",
        "capital": "Saint-Pierre",
        "region": "NA",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/spm.svg",
        "diallingCode": "+508",
        "isoCode": "666"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "code": "VC",
        "capital": "Kingstown",
        "region": "NA",
        "currency": {
            "code": "XCD",
            "name": "East Caribbean dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/vct.svg",
        "diallingCode": "+1",
        "isoCode": "670"
    },
    {
        "name": "Samoa",
        "code": "WS",
        "capital": "Apia",
        "region": "OC",
        "currency": {
            "code": "WST",
            "name": "Samoan tālā",
            "symbol": "T"
        },
        "language": {
            "code": "sm",
            "name": "Samoan"
        },
        "flag": "https://restcountries.eu/data/wsm.svg",
        "diallingCode": "+685",
        "isoCode": "882"
    },
    {
        "name": "San Marino",
        "code": "SM",
        "capital": "City of San Marino",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "it",
            "name": "Italian"
        },
        "flag": "https://restcountries.eu/data/smr.svg",
        "diallingCode": "+378",
        "isoCode": "674"
    },
    {
        "name": "Sao Tome and Principe",
        "code": "ST",
        "capital": "São Tomé",
        "region": "AF",
        "currency": {
            "code": "STD",
            "name": "São Tomé and Príncipe dobra",
            "symbol": "Db"
        },
        "language": {
            "code": "pt",
            "name": "Portuguese"
        },
        "flag": "https://restcountries.eu/data/stp.svg",
        "diallingCode": "+239",
        "isoCode": "678"
    },
    {
        "name": "Saudi Arabia",
        "code": "SA",
        "capital": "Riyadh",
        "region": "AS",
        "currency": {
            "code": "SAR",
            "name": "Saudi riyal",
            "symbol": "ر.س"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/sau.svg",
        "diallingCode": "+966",
        "isoCode": "682"
    },
    {
        "name": "Senegal",
        "code": "SN",
        "capital": "Dakar",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/sen.svg",
        "diallingCode": "+221",
        "isoCode": "686"
    },
    {
        "name": "Serbia",
        "code": "RS",
        "capital": "Belgrade",
        "region": "EU",
        "currency": {
            "code": "RSD",
            "name": "Serbian dinar",
            "symbol": "дин."
        },
        "language": {
            "code": "sr",
            "name": "Serbian"
        },
        "flag": "https://restcountries.eu/data/srb.svg",
        "diallingCode": "+381",
        "isoCode": "688"
    },
    {
        "name": "Seychelles",
        "code": "SC",
        "capital": "Victoria",
        "region": "AF",
        "currency": {
            "code": "SCR",
            "name": "Seychellois rupee",
            "symbol": "₨"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/syc.svg",
        "diallingCode": "+248",
        "isoCode": "690"
    },
    {
        "name": "Sierra Leone",
        "code": "SL",
        "capital": "Freetown",
        "region": "AF",
        "currency": {
            "code": "SLL",
            "name": "Sierra Leonean leone",
            "symbol": "Le"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/sle.svg",
        "diallingCode": "+232",
        "isoCode": "694"
    },
    {
        "name": "Singapore",
        "code": "SG",
        "capital": "Singapore",
        "region": "AS",
        "currency": {
            "code": "SGD",
            "name": "Singapore dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/sgp.svg",
        "diallingCode": "+65",
        "isoCode": "702"
    },
    {
        "name": "Singapore",
        "code": "SG",
        "capital": "Singapore",
        "region": "AS",
        "currency": {
            "code": "SGD",
            "name": "Singapore dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/sgp.svg",
        "diallingCode": "+65",
        "isoCode": "702"
    },
    {
        "name": "Slovakia",
        "code": "SK",
        "capital": "Bratislava",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "sk",
            "name": "Slovak"
        },
        "flag": "https://restcountries.eu/data/svk.svg",
        "diallingCode": "+421",
        "isoCode": "703"
    },
    {
        "name": "Slovenia",
        "code": "SI",
        "capital": "Ljubljana",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "sl",
            "name": "Slovene"
        },
        "flag": "https://restcountries.eu/data/svn.svg",
        "diallingCode": "+386",
        "isoCode": "705"
    },
    {
        "name": "Solomon Islands",
        "code": "SB",
        "capital": "Honiara",
        "region": "OC",
        "currency": {
            "code": "SBD",
            "name": "Solomon Islands dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/slb.svg",
        "diallingCode": "+677",
        "isoCode": "090"
    },
    {
        "name": "Somalia",
        "code": "SO",
        "capital": "Mogadishu",
        "region": "AF",
        "currency": {
            "code": "SOS",
            "name": "Somali shilling",
            "symbol": "Sh"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/som.svg",
        "diallingCode": "+252",
        "isoCode": "706"
    },
    {
        "name": "South Africa",
        "code": "ZA",
        "capital": "Pretoria",
        "region": "AF",
        "currency": {
            "code": "ZAR",
            "name": "South African rand",
            "symbol": "R"
        },
        "language": {
            "code": "en",
            "iso639_2": "eng",
            "name": "English",
            "nativeName": "English"
        },
        "flag": "https://restcountries.eu/data/zaf.svg",
        "diallingCode": "+27",
        "isoCode": "710"
    },
    {
        "name": "Korea (Republic of)",
        "code": "KR",
        "capital": "Seoul",
        "region": "AS",
        "currency": {
            "code": "KRW",
            "name": "South Korean won",
            "symbol": "₩"
        },
        "language": {
            "code": "ko",
            "name": "Korean"
        },
        "flag": "https://restcountries.eu/data/kor.svg",
        "diallingCode": "+82",
        "isoCode": "410"
    },
    {
        "name": "Spain",
        "code": "ES",
        "capital": "Madrid",
        "region": "EU",
        "currency": {
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/esp.svg",
        "diallingCode": "+34",
        "isoCode": "724"
    },
    {
        "name": "Sri Lanka",
        "code": "LK",
        "capital": "Colombo",
        "region": "AS",
        "currency": {
            "code": "LKR",
            "name": "Sri Lankan rupee",
            "symbol": "Rs"
        },
        "language": {
            "code": "si",
            "iso639_2": "sin",
            "name": "Sinhalese",
            "nativeName": "සිංහල"
        },
        "flag": "https://restcountries.eu/data/lka.svg",
        "diallingCode": "+94",
        "isoCode": "144"
    },
    {
        "name": "Sudan",
        "code": "SD",
        "capital": "Khartoum",
        "region": "AF",
        "currency": {
            "code": "SDG",
            "name": "Sudanese pound",
            "symbol": "ج.س."
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/sdn.svg",
        "diallingCode": "+249",
        "isoCode": "729"
    },
    {
        "name": "Suriname",
        "code": "SR",
        "capital": "Paramaribo",
        "region": "SA",
        "currency": {
            "code": "SRD",
            "name": "Surinamese dollar",
            "symbol": "$"
        },
        "language": {
            "code": "nl",
            "name": "Dutch"
        },
        "flag": "https://restcountries.eu/data/sur.svg",
        "diallingCode": "+597",
        "isoCode": "740"
    },
    {
        "name": "Swaziland",
        "code": "SZ",
        "capital": "Lobamba",
        "region": "AF",
        "currency": {
            "code": "SZL",
            "name": "Swazi lilangeni",
            "symbol": "L"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/swz.svg",
        "diallingCode": "+268",
        "isoCode": "748"
    },
    {
        "name": "Sweden",
        "code": "SE",
        "capital": "Stockholm",
        "region": "EU",
        "currency": {
            "code": "SEK",
            "name": "Swedish krona",
            "symbol": "kr"
        },
        "language": {
            "code": "sv",
            "name": "Swedish"
        },
        "flag": "https://restcountries.eu/data/swe.svg",
        "diallingCode": "+46",
        "isoCode": "752"
    },
    {
        "name": "Switzerland",
        "code": "CH",
        "capital": "Bern",
        "region": "EU",
        "currency": {
            "code": "CHF",
            "name": "Swiss franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "de",
            "name": "German"
        },
        "flag": "https://restcountries.eu/data/che.svg",
        "diallingCode": "+41",
        "isoCode": "756"
    },
    {
        "name": "Syrian Arab Republic",
        "code": "SY",
        "capital": "Damascus",
        "region": "AS",
        "currency": {
            "code": "SYP",
            "name": "Syrian pound",
            "symbol": "£"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/syr.svg",
        "diallingCode": "+963",
        "isoCode": "760"
    },
    {
        "name": "Taiwan",
        "code": "TW",
        "capital": "Taipei",
        "region": "AS",
        "currency": {
            "code": "TWD",
            "name": "New Taiwan dollar",
            "symbol": "$"
        },
        "language": {
            "code": "zh",
            "name": "Chinese"
        },
        "flag": "https://restcountries.eu/data/twn.svg",
        "diallingCode": "+886",
        "isoCode": "158"
    },
    {
        "name": "Tajikistan",
        "code": "TJ",
        "capital": "Dushanbe",
        "region": "AS",
        "currency": {
            "code": "TJS",
            "name": "Tajikistani somoni",
            "symbol": "ЅМ"
        },
        "language": {
            "code": "tg",
            "name": "Tajik"
        },
        "flag": "https://restcountries.eu/data/tjk.svg",
        "diallingCode": "+992",
        "isoCode": "762"
    },
    {
        "name": "Tanzania, United Republic of",
        "code": "TZ",
        "capital": "Dodoma",
        "region": "AF",
        "currency": {
            "code": "TZS",
            "name": "Tanzanian shilling",
            "symbol": "Sh"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/tza.svg",
        "diallingCode": "+255",
        "isoCode": "834"
    },
    {
        "name": "Thailand",
        "code": "TH",
        "capital": "Bangkok",
        "region": "AS",
        "currency": {
            "code": "THB",
            "name": "Thai baht",
            "symbol": "฿"
        },
        "language": {
            "code": "th",
            "name": "Thai"
        },
        "flag": "https://restcountries.eu/data/tha.svg",
        "diallingCode": "+66",
        "isoCode": "764"
    },
    {
        "name": "Timor-Leste",
        "code": "TL",
        "capital": "Dili",
        "region": "AS",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "pt",
            "name": "Portuguese"
        },
        "flag": "https://restcountries.eu/data/tls.svg",
        "diallingCode": "+670",
        "isoCode": "626"
    },
    {
        "name": "Togo",
        "code": "TG",
        "capital": "Lomé",
        "region": "AF",
        "currency": {
            "code": "XOF",
            "name": "West African CFA franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/tgo.svg",
        "diallingCode": "+228",
        "isoCode": "768"
    },
    {
        "name": "Tokelau",
        "code": "TK",
        "capital": "Fakaofo",
        "region": "OC",
        "currency": {
            "code": "NZD",
            "name": "New Zealand dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/tkl.svg",
        "diallingCode": "+690",
        "isoCode": "772"
    },
    {
        "name": "Tonga",
        "code": "TO",
        "capital": "Nuku'alofa",
        "region": "OC",
        "currency": {
            "code": "TOP",
            "name": "Tongan paʻanga",
            "symbol": "T$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/ton.svg",
        "diallingCode": "+676",
        "isoCode": "776"
    },
    {
        "name": "Trinidad and Tobago",
        "code": "TT",
        "capital": "Port of Spain",
        "region": "SA",
        "currency": {
            "code": "TTD",
            "name": "Trinidad and Tobago dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/tto.svg",
        "diallingCode": "+1",
        "isoCode": "780"
    },
    {
        "name": "Tunisia",
        "code": "TN",
        "capital": "Tunis",
        "region": "AF",
        "currency": {
            "code": "TND",
            "name": "Tunisian dinar",
            "symbol": "د.ت"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/tun.svg",
        "diallingCode": "+216",
        "isoCode": "788"
    },
    {
        "name": "Turkey",
        "code": "TR",
        "capital": "Ankara",
        "region": "AS",
        "currency": {
            "code": "TRY",
            "name": "Turkish lira",
            "symbol": null
        },
        "language": {
            "code": "tr",
            "name": "Turkish"
        },
        "flag": "https://restcountries.eu/data/tur.svg",
        "diallingCode": "+90",
        "isoCode": "792"
    },
    {
        "name": "Turkmenistan",
        "code": "TM",
        "capital": "Ashgabat",
        "region": "AS",
        "currency": {
            "code": "TMT",
            "name": "Turkmenistan manat",
            "symbol": "m"
        },
        "language": {
            "code": "tk",
            "name": "Turkmen"
        },
        "flag": "https://restcountries.eu/data/tkm.svg",
        "diallingCode": "+993",
        "isoCode": "795"
    },
    {
        "name": "Turks and Caicos Islands",
        "code": "TC",
        "capital": "Cockburn Town",
        "region": "NA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/tca.svg",
        "diallingCode": "+1",
        "isoCode": "796"
    },
    {
        "name": "Tuvalu",
        "code": "TV",
        "capital": "Funafuti",
        "region": "OC",
        "currency": {
            "code": "AUD",
            "name": "Australian dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/tuv.svg",
        "diallingCode": "+688",
        "isoCode": "798"
    },
    {
        "name": "Uganda",
        "code": "UG",
        "capital": "Kampala",
        "region": "AF",
        "currency": {
            "code": "UGX",
            "name": "Ugandan shilling",
            "symbol": "Sh"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/uga.svg",
        "diallingCode": "+256",
        "isoCode": "800"
    },
    {
        "name": "Ukraine",
        "code": "UA",
        "capital": "Kiev",
        "region": "EU",
        "currency": {
            "code": "UAH",
            "name": "Ukrainian hryvnia",
            "symbol": "₴"
        },
        "language": {
            "code": "uk",
            "name": "Ukrainian"
        },
        "flag": "https://restcountries.eu/data/ukr.svg",
        "diallingCode": "+380",
        "isoCode": "804"
    },
    {
        "name": "United Arab Emirates",
        "code": "AE",
        "capital": "Abu Dhabi",
        "region": "AS",
        "currency": {
            "code": "AED",
            "name": "United Arab Emirates dirham",
            "symbol": "د.إ"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/are.svg",
        "diallingCode": "+971",
        "isoCode": "784"
    },
    {
        "name": "United Kingdom of Great Britain and Northern Ireland",
        "code": "GB",
        "capital": "London",
        "region": "EU",
        "currency": {
            "code": "GBP",
            "name": "British pound",
            "symbol": "£"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/gbr.svg",
        "diallingCode": "+44",
        "isoCode": "826"
    },
    {
        "name": "United States of America",
        "code": "US",
        "capital": "Washington, D.C.",
        "region": "NA",
        "currency": {
            "code": "USD",
            "name": "United States dollar",
            "symbol": "$"
        },
        "language": {
            "code": "en",
            "iso639_2": "eng",
            "name": "English",
            "nativeName": "English"
        },
        "flag": "https://restcountries.eu/data/usa.svg",
        "diallingCode": "+1",
        "isoCode": "840"
    },
    {
        "name": "Uruguay",
        "code": "UY",
        "capital": "Montevideo",
        "region": "SA",
        "currency": {
            "code": "UYU",
            "name": "Uruguayan peso",
            "symbol": "$"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/ury.svg",
        "diallingCode": "+598",
        "isoCode": "858"
    },
    {
        "name": "Uzbekistan",
        "code": "UZ",
        "capital": "Tashkent",
        "region": "AS",
        "currency": {
            "code": "UZS",
            "name": "Uzbekistani so'm",
            "symbol": null
        },
        "language": {
            "code": "uz",
            "name": "Uzbek"
        },
        "flag": "https://restcountries.eu/data/uzb.svg",
        "diallingCode": "+998",
        "isoCode": "860"
    },
    {
        "name": "Vanuatu",
        "code": "VU",
        "capital": "Port Vila",
        "region": "OC",
        "currency": {
            "code": "VUV",
            "name": "Vanuatu vatu",
            "symbol": "Vt"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/vut.svg",
        "diallingCode": "+678",
        "isoCode": "548"
    },
    {
        "name": "Venezuela (Bolivarian Republic of)",
        "code": "VE",
        "capital": "Caracas",
        "region": "SA",
        "currency": {
            "code": "VEF",
            "name": "Venezuelan bolívar",
            "symbol": "Bs F"
        },
        "language": {
            "code": "es",
            "name": "Spanish"
        },
        "flag": "https://restcountries.eu/data/ven.svg",
        "diallingCode": "+58",
        "isoCode": "862"
    },
    {
        "name": "Viet Nam",
        "code": "VN",
        "capital": "Hanoi",
        "region": "AS",
        "currency": {
            "code": "VND",
            "name": "Vietnamese đồng",
            "symbol": "₫"
        },
        "language": {
            "code": "vi",
            "name": "Vietnamese"
        },
        "flag": "https://restcountries.eu/data/vnm.svg",
        "diallingCode": "+84",
        "isoCode": "704"
    },
    {
        "name": "Wallis and Futuna",
        "code": "WF",
        "capital": "Mata-Utu",
        "region": "OC",
        "currency": {
            "code": "XPF",
            "name": "CFP franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/wlf.svg",
        "diallingCode": "+681",
        "isoCode": "876"
    },
    {
        "name": "Wallis and Futuna",
        "code": "WF",
        "capital": "Mata-Utu",
        "region": "OC",
        "currency": {
            "code": "XPF",
            "name": "CFP franc",
            "symbol": "Fr"
        },
        "language": {
            "code": "fr",
            "name": "French"
        },
        "flag": "https://restcountries.eu/data/wlf.svg",
        "diallingCode": "+681",
        "isoCode": "876"
    },
    {
        "name": "Yemen",
        "code": "YE",
        "capital": "Sana'a",
        "region": "AS",
        "currency": {
            "code": "YER",
            "name": "Yemeni rial",
            "symbol": "﷼"
        },
        "language": {
            "code": "ar",
            "name": "Arabic"
        },
        "flag": "https://restcountries.eu/data/yem.svg",
        "diallingCode": "+967",
        "isoCode": "887"
    },
    {
        "name": "Zambia",
        "code": "ZM",
        "capital": "Lusaka",
        "region": "AF",
        "currency": {
            "code": "ZMW",
            "name": "Zambian kwacha",
            "symbol": "ZK"
        },
        "language": {
            "code": "en",
            "name": "English"
        },
        "flag": "https://restcountries.eu/data/zmb.svg",
        "diallingCode": "+260",
        "isoCode": "894"
    },
    {
        "name": "Zimbabwe",
        "code": "ZW",
        "capital": "Harare",
        "region": "AF",
        "currency": {
            "code": "BWP",
            "name": "Botswana pula",
            "symbol": "P"
        },
        "language": {
            "code": "en",
            "iso639_2": "eng",
            "name": "English",
            "nativeName": "English"
        },
        "flag": "https://restcountries.eu/data/zwe.svg",
        "diallingCode": "+263",
        "isoCode": "716"
    }
]

const skills = [
    "JavaScript",
    "Typescript",
    "PHP",
    "HTML",
    "SQL",
    "CSS",
    "Java",
    "Python",
    "Bash",
    "Git",
    "Gitlab",
    "Github",
    "Node",
    "AdonisJS",
    "Docker",
    "Kubernetes",
    "Jquery",
    "AngularJS",
    "React",
    "Angular",
    "Vue",
    "Laravel",
    "Yii",
    "Symfony",
    "GraphQL",
    "Quasar",
    "NextJS",
    "Redux",
    "npm",
    "composer",
    "Cordova",
    "Apollo",
    "WebRTC",
    "SocketIO",
    "ElasticSearch",
    "Capacitor",
    "SOAP",
    "HTTP",
    "REST",
    "JSONAPI",
    "AWS",
    "Linux",
    "MySQL",
    "MariaDB",
    "Postgre",
    "MSSQL",
    "MongoDB",
    "Redis",
    "Nginx",
    "Apache",
    "Wordpress",
    "WooCommerce",
    "TailwindCSS",
    "Bootstrap",
    "JIRA",
    "Notion",
    "Slack",
    "Google Cloud",
    "Express",
    "Koa",
    "Cypress",
    "Electron",
    "Gimp",
    "Photoshop",
    "InkScape",
    "GooglePlay",
    "IOS",
    "Xcode",
    "Android Studio",
    "Puppeteer",
    "XML",
    "Markdown",
    "CPanel"
]

const roles = [
    { name: 'Owner', active: true },
    { name: 'Client', active: true },
    { name: 'Admin', active: true },
]

const tags = [
    "project",
    "portfolio",
    "design",
]

const experiences = [
    {
        title: "Full Stack Engineer",
        employmentType: "FullTime",
        companyName: "Superb Aps",
        location: "Zimbabwe",
        locationType: "Remote",
        isCurrentPosition: false,
        startDate: new Date("2022-09-01").toISOString(),
        endDate: new Date("2022-12-31").toISOString(),
        industry: "Software Development",
        description: `
            <p>I worked as a full stack engineer at Superb Aps from October to December 2022.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>The technology stack I worked on was mostly based on JavaScript both the frontend and backend. I worked with React.js, MongoDB, Redis, Koa.js, Docker, Kubernetes, AWS, Mailtrap and other various tools.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>For reference please contact Mr Henrik Karlsson (CTO) at henrik.karlsson@superbexperience.com</p>
            `
    },
    {
        title: "Full Stack Software Developer",
        employmentType: "FullTime",
        companyName: "Evision/Ebit Technologies",
        location: "South Africa and Zimbabwe",
        locationType: "Hybrid",
        isCurrentPosition: false,
        startDate: new Date("2016-08-01").toISOString(),
        endDate: new Date("2022-08-31").toISOString(),
        industry: "Software Development",
        description: `
            <p>I worked as an onsite full stack software developer from August 2016 to 2020 in South Africa, and remotely in Zimbabwe until end of September 2022, building web applications targeting desktop and mobile environments for our major customer and one of South Africa&rsquo;s biggest debt collectors, Nimble Group (Pty) Ltd (https://nimblegroup.co.za).</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>The technology stack we primarily use is JavaScript on the frontend via the VueJS framework, and PHP on the backend via the Laravel framework. We also used NodeJS in the server to run other services like sockets via SocketIO, and to interact with in-memory databases like Redis for fast data access.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>For reference please contact Mr Corne Dreyer (Managing Director) at corne@evision.co.za / +2721 003 0087.</p>
            `
    },
    {
        title: "Freelance Web Developer",
        employmentType: "PartTime",
        companyName: "Hotslab",
        location: "South Africa",
        locationType: "Onsite",
        isCurrentPosition: false,
        startDate: new Date("2015-10-01").toISOString(),
        endDate: new Date("2016-09-01").toISOString(),
        industry: "Software Development",
        description: `
            <p>Web design and development from September 2015 to August 2016 on a freelance basis.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>The work consisted of managing an e-commerce store called Buladeals (https://www.buladeals.com), on a part time basis. I also worked on various projects built under my own portfolio agency, operating under the business name of Hotslab (http://www.hotslab.com).</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>Most of the sites were built using WordPress.</p>
            `
    },
    {
        title: "Cashier",
        employmentType: "PartTime",
        companyName: "The Cape Wheel",
        location: "South Africa",
        locationType: "Onsite",
        isCurrentPosition: false,
        startDate: new Date("2014-12-02").toISOString(),
        endDate: new Date("2015-09-31").toISOString(),
        industry: "Hospitality",
        description: `
            <p>Cashier for the Cape Wheel in the VA Waterfront Shopping Centre, on a part-time contract starting from 2 December 2014 up to September 2015.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>For reference please call Mr Brynn Roberts (General Manager) on 021 418 2502.</p>
            `
    },
    {
        title: "Store Room Manager",
        employmentType: "FullTime",
        companyName: "Fastway Couriers (Pty) Ltd",
        location: "South Africa",
        locationType: "Onsite",
        isCurrentPosition: false,
        startDate: new Date("2015-02-01").toISOString(),
        endDate: new Date("2015-06-31").toISOString(),
        industry: "Freight Services",
        description: `
            <p>Store Room Supervisor at Fastway Couriers, starting from February 2015 to end June 2015.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>For reference please call Mrs Phyllis Timba (Financial Manager) on 0861 222 882 or 076 914 5584.</p>
            `
    },
    {
        title: "Call Centre Sales Agent",
        employmentType: "FullTime",
        companyName: "Netsurit IT Support (Pty) Ltd",
        location: "South Africa",
        locationType: "Onsite",
        isCurrentPosition: false,
        startDate: new Date("2014-07-01").toISOString(),
        endDate: new Date("2014-09-31").toISOString(),
        industry: "IT Services",
        description: `
            <p>Outbound Telephonic Sales Consultant at Netsurit for a 3 month contract beginning 1 August 2014 and ending 31 October 2014.</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>For reference please&nbsp; contact Mr Christian Papst on 021 404 3600.</p>
            `
    },
]

const educations = [
    {
        title: 'Bachelor of Social Science',
        school: 'University of Kwa-Zulu Natal',
        location: "South Africa",
        description: `
            <p>Majored in Economics and Development Studies under the Zimbabwe Presidential Scholarship program for disadvantaged students.</p>
            `,
        startDate: new Date('2010-01-01').toISOString(),
        endDate: new Date('2012-12-31').toISOString()
    },
    {
        title: 'ZIMSEC 2007 A-Levels',
        school: 'Ellis Robins Boys High School',
        location: "Zimbabwe",
        description: `
            <p>High school education completed with the following grades:</p>
            \n
            <p>&nbsp;</p>
            \n
            <p>i. Economics &ndash; A</p>
            \n
            <p>ii. Management of Business &ndash; B</p>
            \n
            <p>iii. Accounting &ndash; C</p>
            `,
        startDate: new Date('2002-01-01').toISOString(),
        endDate: new Date('2007-12-31').toISOString()
    }
]

module.exports = { countries, skills, roles, tags, experiences, educations }