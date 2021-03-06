const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

// google geocode response for 76309
const googleGeoInfo = {
  results: [
    {
      address_components: [
        {
          long_name: '76309',
          short_name: '76309',
          types: ['postal_code'],
        },
        {
          long_name: 'Wichita Falls',
          short_name: 'Wichita Falls',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Wichita Falls, TX 76309, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 33.917815,
            lng: -98.510035,
          },
          southwest: {
            lat: 33.8747139,
            lng: -98.5688309,
          },
        },
        location: {
          lat: 33.8954726,
          lng: -98.544636,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 33.917815,
            lng: -98.510035,
          },
          southwest: {
            lat: 33.8747139,
            lng: -98.5688309,
          },
        },
      },
      place_id: 'ChIJuWg8_6MhU4YRwmeb0Wqukjs',
      types: ['postal_code'],
    },
  ],
  status: 'OK',
};

// query: https://maps.googleapis.com/maps/api/geocode/json?latlng=33.8954726,-98.544636&key=${weatherAPI}
const googleZipFromLatLng = {
  plus_code: {
    compound_code: 'VFW4+54 Wichita Falls, TX, USA',
    global_code: '8653VFW4+54',
  },
  results: [
    {
      address_components: [
        {
          long_name: '2113',
          short_name: '2113',
          types: ['street_number'],
        },
        {
          long_name: 'Richmond Drive',
          short_name: 'Richmond Dr',
          types: ['route'],
        },
        {
          long_name: 'Wichita Falls',
          short_name: 'Wichita Falls',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
        {
          long_name: '76309',
          short_name: '76309',
          types: ['postal_code'],
        },
        {
          long_name: '2912',
          short_name: '2912',
          types: ['postal_code_suffix'],
        },
      ],
      formatted_address: '2113 Richmond Dr, Wichita Falls, TX 76309, USA',
      geometry: {
        location: {
          lat: 33.8953654,
          lng: -98.5451741,
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: 33.89671438029149,
            lng: -98.5438251197085,
          },
          southwest: {
            lat: 33.89401641970849,
            lng: -98.54652308029151,
          },
        },
      },
      place_id: 'ChIJC1KM4qMhU4YR4j32ivL_FX8',
      plus_code: {
        compound_code: 'VFW3+4W Wichita Falls, Texas, United States',
        global_code: '8653VFW3+4W',
      },
      types: ['street_address'],
    },
    {
      address_components: [
        {
          long_name: '2111',
          short_name: '2111',
          types: ['street_number'],
        },
        {
          long_name: 'Richmond Drive',
          short_name: 'Richmond Dr',
          types: ['route'],
        },
        {
          long_name: 'Wichita Falls',
          short_name: 'Wichita Falls',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
        {
          long_name: '76309',
          short_name: '76309',
          types: ['postal_code'],
        },
        {
          long_name: '2912',
          short_name: '2912',
          types: ['postal_code_suffix'],
        },
      ],
      formatted_address: '2111 Richmond Dr, Wichita Falls, TX 76309, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 33.8955919,
            lng: -98.54523209999999,
          },
          southwest: {
            lat: 33.8954309,
            lng: -98.54539349999999,
          },
        },
        location: {
          lat: 33.8954912,
          lng: -98.545301,
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: 33.8968603802915,
            lng: -98.5439638197085,
          },
          southwest: {
            lat: 33.8941624197085,
            lng: -98.5466617802915,
          },
        },
      },
      place_id: 'ChIJCyv1V6EhU4YREG7ifAR05CQ',
      types: ['premise'],
    },
    {
      address_components: [
        {
          long_name: '2112',
          short_name: '2112',
          types: ['street_number'],
        },
        {
          long_name: 'Richmond Drive',
          short_name: 'Richmond Dr',
          types: ['route'],
        },
        {
          long_name: 'Wichita Falls',
          short_name: 'Wichita Falls',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
        {
          long_name: '76309',
          short_name: '76309',
          types: ['postal_code'],
        },
        {
          long_name: '2913',
          short_name: '2913',
          types: ['postal_code_suffix'],
        },
      ],
      formatted_address: '2112 Richmond Dr, Wichita Falls, TX 76309, USA',
      geometry: {
        location: {
          lat: 33.8952979,
          lng: -98.54550789999999,
        },
        location_type: 'RANGE_INTERPOLATED',
        viewport: {
          northeast: {
            lat: 33.89664688029149,
            lng: -98.54415891970848,
          },
          southwest: {
            lat: 33.89394891970849,
            lng: -98.5468568802915,
          },
        },
      },
      place_id:
        'Ei4yMTEyIFJpY2htb25kIERyLCBXaWNoaXRhIEZhbGxzLCBUWCA3NjMwOSwgVVNBIhsSGQoUChIJYaqo5KMhU4YRLWiqy9Yirt8QwBA',
      types: ['street_address'],
    },
    {
      address_components: [
        {
          long_name: '2199-2101',
          short_name: '2199-2101',
          types: ['street_number'],
        },
        {
          long_name: 'Richmond Drive',
          short_name: 'Richmond Dr',
          types: ['route'],
        },
        {
          long_name: 'Wichita Falls',
          short_name: 'Wichita Falls',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
        {
          long_name: '76309',
          short_name: '76309',
          types: ['postal_code'],
        },
        {
          long_name: '2912',
          short_name: '2912',
          types: ['postal_code_suffix'],
        },
      ],
      formatted_address: '2199-2101 Richmond Dr, Wichita Falls, TX 76309, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 33.8964516,
            lng: -98.54497610000001,
          },
          southwest: {
            lat: 33.8936048,
            lng: -98.5458603,
          },
        },
        location: {
          lat: 33.8950265,
          lng: -98.545425,
        },
        location_type: 'GEOMETRIC_CENTER',
        viewport: {
          northeast: {
            lat: 33.8964516,
            lng: -98.5440692197085,
          },
          southwest: {
            lat: 33.8936048,
            lng: -98.54676718029151,
          },
        },
      },
      place_id: 'ChIJYaqo5KMhU4YRLGiqy9Yirt8',
      types: ['route'],
    },
    {
      address_components: [
        {
          long_name: '76309',
          short_name: '76309',
          types: ['postal_code'],
        },
        {
          long_name: 'Wichita Falls',
          short_name: 'Wichita Falls',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Wichita Falls, TX 76309, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 33.917815,
            lng: -98.510035,
          },
          southwest: {
            lat: 33.8747139,
            lng: -98.5688309,
          },
        },
        location: {
          lat: 33.8954726,
          lng: -98.544636,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 33.917815,
            lng: -98.510035,
          },
          southwest: {
            lat: 33.8747139,
            lng: -98.5688309,
          },
        },
      },
      place_id: 'ChIJuWg8_6MhU4YRwmeb0Wqukjs',
      types: ['postal_code'],
    },
    {
      address_components: [
        {
          long_name: 'Wichita Falls',
          short_name: 'Wichita Falls',
          types: ['locality', 'political'],
        },
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Wichita Falls, TX, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 33.9964111,
            lng: -98.42433779999999,
          },
          southwest: {
            lat: 33.8356488,
            lng: -98.61438,
          },
        },
        location: {
          lat: 33.9137085,
          lng: -98.4933873,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 33.9964111,
            lng: -98.42433779999999,
          },
          southwest: {
            lat: 33.8356488,
            lng: -98.61438,
          },
        },
      },
      place_id: 'ChIJ9dpicJIgU4YRAFLq78v6Bh0',
      types: ['locality', 'political'],
    },
    {
      address_components: [
        {
          long_name: 'Wichita County',
          short_name: 'Wichita County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Wichita County, TX, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 34.2124969,
            lng: -98.422972,
          },
          southwest: {
            lat: 33.83399990000001,
            lng: -98.9530879,
          },
        },
        location: {
          lat: 33.9309651,
          lng: -98.7481167,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 34.2124969,
            lng: -98.422972,
          },
          southwest: {
            lat: 33.83399990000001,
            lng: -98.9530879,
          },
        },
      },
      place_id: 'ChIJG-W5i09HU4YRiUwVqIdjhGw',
      types: ['administrative_area_level_2', 'political'],
    },
    {
      address_components: [
        {
          long_name: 'Texas',
          short_name: 'TX',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'Texas, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 36.5007041,
            lng: -93.5080389,
          },
          southwest: {
            lat: 25.8371638,
            lng: -106.6456461,
          },
        },
        location: {
          lat: 31.9685988,
          lng: -99.9018131,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 36.5007041,
            lng: -93.5080389,
          },
          southwest: {
            lat: 25.8371638,
            lng: -106.6456461,
          },
        },
      },
      place_id: 'ChIJSTKCCzZwQIYRPN4IGI8c6xY',
      types: ['administrative_area_level_1', 'political'],
    },
    {
      address_components: [
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'United States',
      geometry: {
        bounds: {
          northeast: {
            lat: 71.5388001,
            lng: -66.885417,
          },
          southwest: {
            lat: 18.7763,
            lng: 170.5957,
          },
        },
        location: {
          lat: 37.09024,
          lng: -95.712891,
        },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: {
            lat: 71.5388001,
            lng: -66.885417,
          },
          southwest: {
            lat: 18.7763,
            lng: 170.5957,
          },
        },
      },
      place_id: 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw',
      types: ['country', 'political'],
    },
  ],
  status: 'OK',
};

const forecastResponse = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1574802000,
      main: {
        temp: 73,
        temp_min: 72.7,
        temp_max: 73,
        pressure: 998,
        sea_level: 998,
        grnd_level: 962,
        humidity: 29,
        temp_kf: 0.17,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 93,
      },
      wind: {
        speed: 19.48,
        deg: 251,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-26 21:00:00',
    },
    {
      dt: 1574812800,
      main: {
        temp: 63.36,
        temp_min: 63.12,
        temp_max: 63.36,
        pressure: 1002,
        sea_level: 1002,
        grnd_level: 967,
        humidity: 24,
        temp_kf: 0.13,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 81,
      },
      wind: {
        speed: 21.09,
        deg: 284,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 00:00:00',
    },
    {
      dt: 1574823600,
      main: {
        temp: 54.61,
        temp_min: 54.46,
        temp_max: 54.61,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 973,
        humidity: 17,
        temp_kf: 0.08,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 18.72,
        deg: 271,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 03:00:00',
    },
    {
      dt: 1574834400,
      main: {
        temp: 44.82,
        temp_min: 44.74,
        temp_max: 44.82,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 978,
        humidity: 42,
        temp_kf: 0.04,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 11.56,
        deg: 315,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 06:00:00',
    },
    {
      dt: 1574845200,
      main: {
        temp: 41.31,
        temp_min: 41.31,
        temp_max: 41.31,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 981,
        humidity: 48,
        temp_kf: 0,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      clouds: {
        all: 32,
      },
      wind: {
        speed: 9.08,
        deg: 320,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 09:00:00',
    },
    {
      dt: 1574856000,
      main: {
        temp: 39,
        temp_min: 39,
        temp_max: 39,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 985,
        humidity: 52,
        temp_kf: 0,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 55,
      },
      wind: {
        speed: 6.53,
        deg: 333,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 12:00:00',
    },
    {
      dt: 1574866800,
      main: {
        temp: 41.34,
        temp_min: 41.34,
        temp_max: 41.34,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 988,
        humidity: 49,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 8.79,
        deg: 7,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-27 15:00:00',
    },
    {
      dt: 1574877600,
      main: {
        temp: 48.07,
        temp_min: 48.07,
        temp_max: 48.07,
        pressure: 1027,
        sea_level: 1027,
        grnd_level: 989,
        humidity: 38,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 9.53,
        deg: 38,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-27 18:00:00',
    },
    {
      dt: 1574888400,
      main: {
        temp: 50.77,
        temp_min: 50.77,
        temp_max: 50.77,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 988,
        humidity: 35,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 6.82,
        deg: 73,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-27 21:00:00',
    },
    {
      dt: 1574899200,
      main: {
        temp: 47.93,
        temp_min: 47.93,
        temp_max: 47.93,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 989,
        humidity: 45,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 3.98,
        deg: 102,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 00:00:00',
    },
    {
      dt: 1574910000,
      main: {
        temp: 44.2,
        temp_min: 44.2,
        temp_max: 44.2,
        pressure: 1028,
        sea_level: 1028,
        grnd_level: 989,
        humidity: 62,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 10.18,
        deg: 77,
      },
      rain: {
        '3h': 0.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 03:00:00',
    },
    {
      dt: 1574920800,
      main: {
        temp: 42.44,
        temp_min: 42.44,
        temp_max: 42.44,
        pressure: 1028,
        sea_level: 1028,
        grnd_level: 990,
        humidity: 77,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 8.77,
        deg: 92,
      },
      rain: {
        '3h': 0.88,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 06:00:00',
    },
    {
      dt: 1574931600,
      main: {
        temp: 40.12,
        temp_min: 40.12,
        temp_max: 40.12,
        pressure: 1027,
        sea_level: 1027,
        grnd_level: 989,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 12.08,
        deg: 110,
      },
      rain: {
        '3h': 4.06,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 09:00:00',
    },
    {
      dt: 1574942400,
      main: {
        temp: 40.82,
        temp_min: 40.82,
        temp_max: 40.82,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 987,
        humidity: 94,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 13.82,
        deg: 94,
      },
      rain: {
        '3h': 6.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 12:00:00',
    },
    {
      dt: 1574953200,
      main: {
        temp: 41.63,
        temp_min: 41.63,
        temp_max: 41.63,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 988,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 15.95,
        deg: 110,
      },
      rain: {
        '3h': 5.75,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-28 15:00:00',
    },
    {
      dt: 1574964000,
      main: {
        temp: 42.04,
        temp_min: 42.04,
        temp_max: 42.04,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 986,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 16.46,
        deg: 109,
      },
      rain: {
        '3h': 1.5,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-28 18:00:00',
    },
    {
      dt: 1574974800,
      main: {
        temp: 42.93,
        temp_min: 42.93,
        temp_max: 42.93,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 984,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 11.77,
        deg: 115,
      },
      rain: {
        '3h': 0.75,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-28 21:00:00',
    },
    {
      dt: 1574985600,
      main: {
        temp: 43.9,
        temp_min: 43.9,
        temp_max: 43.9,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 985,
        humidity: 93,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 11.54,
        deg: 106,
      },
      rain: {
        '3h': 0.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 00:00:00',
    },
    {
      dt: 1574996400,
      main: {
        temp: 45.01,
        temp_min: 45.01,
        temp_max: 45.01,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 984,
        humidity: 95,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 12.41,
        deg: 115,
      },
      rain: {
        '3h': 0.25,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 03:00:00',
    },
    {
      dt: 1575007200,
      main: {
        temp: 46.54,
        temp_min: 46.54,
        temp_max: 46.54,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 983,
        humidity: 94,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 13.29,
        deg: 135,
      },
      rain: {
        '3h': 0.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 06:00:00',
    },
    {
      dt: 1575018000,
      main: {
        temp: 47.89,
        temp_min: 47.89,
        temp_max: 47.89,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 982,
        humidity: 93,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 13.6,
        deg: 137,
      },
      rain: {
        '3h': 1.5,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 09:00:00',
    },
    {
      dt: 1575028800,
      main: {
        temp: 53.91,
        temp_min: 53.91,
        temp_max: 53.91,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 979,
        humidity: 97,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 14.9,
        deg: 130,
      },
      rain: {
        '3h': 0.88,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 12:00:00',
    },
    {
      dt: 1575039600,
      main: {
        temp: 62.31,
        temp_min: 62.31,
        temp_max: 62.31,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 979,
        humidity: 94,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 14.25,
        deg: 153,
      },
      rain: {
        '3h': 0.69,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-29 15:00:00',
    },
    {
      dt: 1575050400,
      main: {
        temp: 67.91,
        temp_min: 67.91,
        temp_max: 67.91,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 976,
        humidity: 88,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 20.76,
        deg: 173,
      },
      rain: {
        '3h': 3.25,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-29 18:00:00',
    },
    {
      dt: 1575061200,
      main: {
        temp: 69.46,
        temp_min: 69.46,
        temp_max: 69.46,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 971,
        humidity: 86,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 19.77,
        deg: 177,
      },
      rain: {
        '3h': 0.81,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-29 21:00:00',
    },
    {
      dt: 1575072000,
      main: {
        temp: 68.45,
        temp_min: 68.45,
        temp_max: 68.45,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 970,
        humidity: 88,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 99,
      },
      wind: {
        speed: 17.34,
        deg: 187,
      },
      rain: {
        '3h': 3.75,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 00:00:00',
    },
    {
      dt: 1575082800,
      main: {
        temp: 68.68,
        temp_min: 68.68,
        temp_max: 68.68,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 969,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 19.26,
        deg: 186,
      },
      rain: {
        '3h': 2.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 03:00:00',
    },
    {
      dt: 1575093600,
      main: {
        temp: 62.78,
        temp_min: 62.78,
        temp_max: 62.78,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 971,
        humidity: 70,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 14.43,
        deg: 292,
      },
      rain: {
        '3h': 3.06,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 06:00:00',
    },
    {
      dt: 1575104400,
      main: {
        temp: 57.42,
        temp_min: 57.42,
        temp_max: 57.42,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 972,
        humidity: 58,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 4,
      },
      wind: {
        speed: 14.67,
        deg: 268,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 09:00:00',
    },
    {
      dt: 1575115200,
      main: {
        temp: 51.31,
        temp_min: 51.31,
        temp_max: 51.31,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 973,
        humidity: 55,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 2,
      },
      wind: {
        speed: 14.58,
        deg: 256,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 12:00:00',
    },
    {
      dt: 1575126000,
      main: {
        temp: 51.67,
        temp_min: 51.67,
        temp_max: 51.67,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 974,
        humidity: 43,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 22.26,
        deg: 257,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-30 15:00:00',
    },
    {
      dt: 1575136800,
      main: {
        temp: 59.31,
        temp_min: 59.31,
        temp_max: 59.31,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 974,
        humidity: 31,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 26.04,
        deg: 273,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-30 18:00:00',
    },
    {
      dt: 1575147600,
      main: {
        temp: 60.01,
        temp_min: 60.01,
        temp_max: 60.01,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 972,
        humidity: 32,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 24.7,
        deg: 275,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-30 21:00:00',
    },
    {
      dt: 1575158400,
      main: {
        temp: 53.82,
        temp_min: 53.82,
        temp_max: 53.82,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 973,
        humidity: 37,
        temp_kf: 0,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02n',
        },
      ],
      clouds: {
        all: 19,
      },
      wind: {
        speed: 13,
        deg: 255,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 00:00:00',
    },
    {
      dt: 1575169200,
      main: {
        temp: 51.04,
        temp_min: 51.04,
        temp_max: 51.04,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 975,
        humidity: 39,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 12.01,
        deg: 262,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 03:00:00',
    },
    {
      dt: 1575180000,
      main: {
        temp: 46.98,
        temp_min: 46.98,
        temp_max: 46.98,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 977,
        humidity: 45,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 9.86,
        deg: 324,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 06:00:00',
    },
    {
      dt: 1575190800,
      main: {
        temp: 44.89,
        temp_min: 44.89,
        temp_max: 44.89,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 979,
        humidity: 37,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 10.98,
        deg: 346,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 09:00:00',
    },
    {
      dt: 1575201600,
      main: {
        temp: 41.38,
        temp_min: 41.38,
        temp_max: 41.38,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 981,
        humidity: 41,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 8.79,
        deg: 340,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 12:00:00',
    },
    {
      dt: 1575212400,
      main: {
        temp: 45.41,
        temp_min: 45.41,
        temp_max: 45.41,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 985,
        humidity: 40,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 11.88,
        deg: 336,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-12-01 15:00:00',
    },
    {
      dt: 1575223200,
      main: {
        temp: 55.27,
        temp_min: 55.27,
        temp_max: 55.27,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 985,
        humidity: 34,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 15.86,
        deg: 337,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-12-01 18:00:00',
    },
  ],
  city: {
    name: 'Wichita Falls',
    coord: {
      lat: 33.8931,
      lon: -98.5343,
    },
    country: 'US',
    timezone: -21600,
    sunrise: 1574774205,
    sunset: 1574810787,
  },
};

const forecastResponse2 = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1574812800,
      main: {
        temp: 63.36,
        temp_min: 63.12,
        temp_max: 63.36,
        pressure: 1002,
        sea_level: 1002,
        grnd_level: 967,
        humidity: 24,
        temp_kf: 0.13,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 81,
      },
      wind: {
        speed: 21.09,
        deg: 284,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 00:00:00',
    },
    {
      dt: 1574823600,
      main: {
        temp: 54.61,
        temp_min: 54.46,
        temp_max: 54.61,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 973,
        humidity: 17,
        temp_kf: 0.08,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 18.72,
        deg: 271,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 03:00:00',
    },
    {
      dt: 1574834400,
      main: {
        temp: 44.82,
        temp_min: 44.74,
        temp_max: 44.82,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 978,
        humidity: 42,
        temp_kf: 0.04,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 11.56,
        deg: 315,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 06:00:00',
    },
    {
      dt: 1574845200,
      main: {
        temp: 41.31,
        temp_min: 41.31,
        temp_max: 41.31,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 981,
        humidity: 48,
        temp_kf: 0,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
      ],
      clouds: {
        all: 32,
      },
      wind: {
        speed: 9.08,
        deg: 320,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 09:00:00',
    },
    {
      dt: 1574856000,
      main: {
        temp: 39,
        temp_min: 39,
        temp_max: 39,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 985,
        humidity: 52,
        temp_kf: 0,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 55,
      },
      wind: {
        speed: 6.53,
        deg: 333,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-27 12:00:00',
    },
    {
      dt: 1574866800,
      main: {
        temp: 41.34,
        temp_min: 41.34,
        temp_max: 41.34,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 988,
        humidity: 49,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 8.79,
        deg: 7,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-27 15:00:00',
    },
    {
      dt: 1574877600,
      main: {
        temp: 48.07,
        temp_min: 48.07,
        temp_max: 48.07,
        pressure: 1027,
        sea_level: 1027,
        grnd_level: 989,
        humidity: 38,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 9.53,
        deg: 38,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-27 18:00:00',
    },
    {
      dt: 1574888400,
      main: {
        temp: 50.77,
        temp_min: 50.77,
        temp_max: 50.77,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 988,
        humidity: 35,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 6.82,
        deg: 73,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-27 21:00:00',
    },
    {
      dt: 1574899200,
      main: {
        temp: 47.93,
        temp_min: 47.93,
        temp_max: 47.93,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 989,
        humidity: 45,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 3.98,
        deg: 102,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 00:00:00',
    },
    {
      dt: 1574910000,
      main: {
        temp: 44.2,
        temp_min: 44.2,
        temp_max: 44.2,
        pressure: 1028,
        sea_level: 1028,
        grnd_level: 989,
        humidity: 62,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 10.18,
        deg: 77,
      },
      rain: {
        '3h': 0.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 03:00:00',
    },
    {
      dt: 1574920800,
      main: {
        temp: 42.44,
        temp_min: 42.44,
        temp_max: 42.44,
        pressure: 1028,
        sea_level: 1028,
        grnd_level: 990,
        humidity: 77,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 8.77,
        deg: 92,
      },
      rain: {
        '3h': 0.88,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 06:00:00',
    },
    {
      dt: 1574931600,
      main: {
        temp: 40.12,
        temp_min: 40.12,
        temp_max: 40.12,
        pressure: 1027,
        sea_level: 1027,
        grnd_level: 989,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 12.08,
        deg: 110,
      },
      rain: {
        '3h': 4.06,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 09:00:00',
    },
    {
      dt: 1574942400,
      main: {
        temp: 40.82,
        temp_min: 40.82,
        temp_max: 40.82,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 987,
        humidity: 94,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 13.82,
        deg: 94,
      },
      rain: {
        '3h': 6.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-28 12:00:00',
    },
    {
      dt: 1574953200,
      main: {
        temp: 41.63,
        temp_min: 41.63,
        temp_max: 41.63,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 988,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 15.95,
        deg: 110,
      },
      rain: {
        '3h': 5.75,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-28 15:00:00',
    },
    {
      dt: 1574964000,
      main: {
        temp: 42.04,
        temp_min: 42.04,
        temp_max: 42.04,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 986,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 16.46,
        deg: 109,
      },
      rain: {
        '3h': 1.5,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-28 18:00:00',
    },
    {
      dt: 1574974800,
      main: {
        temp: 42.93,
        temp_min: 42.93,
        temp_max: 42.93,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 984,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 11.77,
        deg: 115,
      },
      rain: {
        '3h': 0.75,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-28 21:00:00',
    },
    {
      dt: 1574985600,
      main: {
        temp: 43.9,
        temp_min: 43.9,
        temp_max: 43.9,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 985,
        humidity: 93,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 11.54,
        deg: 106,
      },
      rain: {
        '3h': 0.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 00:00:00',
    },
    {
      dt: 1574996400,
      main: {
        temp: 45.01,
        temp_min: 45.01,
        temp_max: 45.01,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 984,
        humidity: 95,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 12.41,
        deg: 115,
      },
      rain: {
        '3h': 0.25,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 03:00:00',
    },
    {
      dt: 1575007200,
      main: {
        temp: 46.54,
        temp_min: 46.54,
        temp_max: 46.54,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 983,
        humidity: 94,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 13.29,
        deg: 135,
      },
      rain: {
        '3h': 0.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 06:00:00',
    },
    {
      dt: 1575018000,
      main: {
        temp: 47.89,
        temp_min: 47.89,
        temp_max: 47.89,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 982,
        humidity: 93,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 13.6,
        deg: 137,
      },
      rain: {
        '3h': 1.5,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 09:00:00',
    },
    {
      dt: 1575028800,
      main: {
        temp: 53.91,
        temp_min: 53.91,
        temp_max: 53.91,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 979,
        humidity: 97,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 14.9,
        deg: 130,
      },
      rain: {
        '3h': 0.88,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-29 12:00:00',
    },
    {
      dt: 1575039600,
      main: {
        temp: 62.31,
        temp_min: 62.31,
        temp_max: 62.31,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 979,
        humidity: 94,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 14.25,
        deg: 153,
      },
      rain: {
        '3h': 0.69,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-29 15:00:00',
    },
    {
      dt: 1575050400,
      main: {
        temp: 67.91,
        temp_min: 67.91,
        temp_max: 67.91,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 976,
        humidity: 88,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 20.76,
        deg: 173,
      },
      rain: {
        '3h': 3.25,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-29 18:00:00',
    },
    {
      dt: 1575061200,
      main: {
        temp: 69.46,
        temp_min: 69.46,
        temp_max: 69.46,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 971,
        humidity: 86,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 19.77,
        deg: 177,
      },
      rain: {
        '3h': 0.81,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-29 21:00:00',
    },
    {
      dt: 1575072000,
      main: {
        temp: 68.45,
        temp_min: 68.45,
        temp_max: 68.45,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 970,
        humidity: 88,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 99,
      },
      wind: {
        speed: 17.34,
        deg: 187,
      },
      rain: {
        '3h': 3.75,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 00:00:00',
    },
    {
      dt: 1575082800,
      main: {
        temp: 68.68,
        temp_min: 68.68,
        temp_max: 68.68,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 969,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 19.26,
        deg: 186,
      },
      rain: {
        '3h': 2.38,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 03:00:00',
    },
    {
      dt: 1575093600,
      main: {
        temp: 58,
        temp_min: 62.78,
        temp_max: 62.78,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 971,
        humidity: 70,
        temp_kf: 0,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 14.43,
        deg: 292,
      },
      rain: {
        '3h': 3.06,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 06:00:00',
    },
    {
      dt: 1575104400,
      main: {
        temp: 57.42,
        temp_min: 57.42,
        temp_max: 57.42,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 972,
        humidity: 58,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 4,
      },
      wind: {
        speed: 14.67,
        deg: 268,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 09:00:00',
    },
    {
      dt: 1575115200,
      main: {
        temp: 78,
        temp_min: 78,
        temp_max: 51.31,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 973,
        humidity: 55,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 2,
      },
      wind: {
        speed: 14.58,
        deg: 256,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-11-30 12:00:00',
    },
    {
      dt: 1575126000,
      main: {
        temp: 51.67,
        temp_min: 51.67,
        temp_max: 51.67,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 974,
        humidity: 43,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 22.26,
        deg: 257,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-30 15:00:00',
    },
    {
      dt: 1575136800,
      main: {
        temp: 59.31,
        temp_min: 59.31,
        temp_max: 59.31,
        pressure: 1010,
        sea_level: 1010,
        grnd_level: 974,
        humidity: 31,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 26.04,
        deg: 273,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-30 18:00:00',
    },
    {
      dt: 1575147600,
      main: {
        temp: 60.01,
        temp_min: 60.01,
        temp_max: 60.01,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 972,
        humidity: 32,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 24.7,
        deg: 275,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-11-30 21:00:00',
    },
    {
      dt: 1575158400,
      main: {
        temp: 5,
        temp_min: 53.82,
        temp_max: 53.82,
        pressure: 1009,
        sea_level: 1009,
        grnd_level: 973,
        humidity: 37,
        temp_kf: 0,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02n',
        },
      ],
      clouds: {
        all: 19,
      },
      wind: {
        speed: 13,
        deg: 255,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 00:00:00',
    },
    {
      dt: 1575169200,
      main: {
        temp: 51.04,
        temp_min: 51.04,
        temp_max: 51.04,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 975,
        humidity: 39,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 12.01,
        deg: 262,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 03:00:00',
    },
    {
      dt: 1575180000,
      main: {
        temp: 46.98,
        temp_min: 46.98,
        temp_max: 46.98,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 977,
        humidity: 45,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 9.86,
        deg: 324,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 06:00:00',
    },
    {
      dt: 1575190800,
      main: {
        temp: 70,
        temp_min: 44.89,
        temp_max: 44.89,
        pressure: 1016,
        sea_level: 1016,
        grnd_level: 979,
        humidity: 37,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 10.98,
        deg: 346,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 09:00:00',
    },
    {
      dt: 1575201600,
      main: {
        temp: 30,
        temp_min: 41.38,
        temp_max: 41.38,
        pressure: 1019,
        sea_level: 1019,
        grnd_level: 981,
        humidity: 41,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 8.79,
        deg: 340,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2019-12-01 12:00:00',
    },
    {
      dt: 1575212400,
      main: {
        temp: 52,
        temp_min: 50,
        temp_max: 55,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 985,
        humidity: 40,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 11.88,
        deg: 336,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-12-01 15:00:00',
    },
    {
      dt: 1575223200,
      main: {
        temp: 55.27,
        temp_min: 55.27,
        temp_max: 55.27,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 985,
        humidity: 34,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 15.86,
        deg: 337,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2019-12-01 18:00:00',
    },
  ],
  city: {
    name: 'San Francisco',
    coord: {
      lat: 33.8931,
      lon: -98.5343,
    },
    country: 'US',
    timezone: -21600,
    sunrise: 1574774205,
    sunset: 1574810787,
  },
};

const currentResponse = {
  coord: {
    lon: -98.53,
    lat: 33.89,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 53.58,
    pressure: 1021,
    humidity: 35,
    temp_min: 51.8,
    temp_max: 55.4,
  },
  visibility: 16093,
  wind: {
    speed: 8.05,
    deg: 160,
  },
  clouds: {
    all: 1,
  },
  dt: 1575329091,
  sys: {
    type: 1,
    id: 3734,
    country: 'US',
    sunrise: 1575292923,
    sunset: 1575329120,
  },
  timezone: -21600,
  id: 0,
  name: 'Wichita Falls',
  cod: 200,
};

app.get('/geo', (req, res) => res.json(googleGeoInfo));
app.get('/current', (req, res) => res.json(currentResponse));
app.get('/test', (req, res) => res.json(forecastResponse));
app.get('/test2', (req, res) => res.json(forecastResponse2));
app.get('/loctozip', (req, res) => res.json(googleZipFromLatLng));
app.post('/getdata', (req, res) => {
  console.log('******************************************');
  console.log(req.body);
  fs.writeFileSync(path.resolve(__dirname, 'image.png'), req.body.data);
});

app.post('/savereq', (req, res) => {
  console.log(req.body);
  fs.writeFile(`./${req.body.name}.js`, req.body.data)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

app.listen('3001', () => console.log('api listening on port 3001'));
