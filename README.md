# TripTeller-BACKEND
# <p align="center">나만의 맞춤여행 가이드</p>


<p align="center"><img src="https://github.com/Trip-Teller/TripTeller-BACKEND/blob/dev/image/logo.png" width="200" height="200"></p>



### **TripTeller는!?🤷‍♂️🙎‍♀️ 개개인의 취향 및 가치관 고려한 비대면 맞춤 여행 설계 플랫폼입니다.**

**아래 문제점에 착안하여 TripTeller라는 앱이 탄생되게 되었습니다.**

# Problem

---

**1. 세분화되는 여행취향**
세분화 시대의 밀레니얼 세대들은 남들과 똑같은 관광지투어가 아닌, 자신만의 가치관과 취향에 맞는 맞춤여행을 원합니다. 

**2. 대면 여행가이드의 쇠퇴**
코로나19로 인해 대면 여행가이드가 없어지고, 사람들은 사람이 붐비는 관광지를 피하려고 합니다.

**3. 여행 과정의 간편함 추구**
시간을 재화로 여기는 밀레니얼 세대들은 여행계획부터 예약과정까지 모두 간편함을 추구합니다.


# Server Architecture
---
![image](https://user-images.githubusercontent.com/49120090/120502850-be31a980-c3fd-11eb-8d0b-dad926cf94ff.png)

# ⚙️ Dependencies
-----
```json
{
  "name": "tripteller-backend",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "lint": "node ./node_modules/eslint/bin/eslint .",
    "test": "node ./node_modules/nyc/bin/nyc.js --reporter=text --reporter=html ./node_modules/mocha/bin/mocha tests tests/**/*.spec.js tests/**/**/*.spec.js"
  },
  "dependencies": {
    "@google-cloud/storage": "^5.7.0",
    "bcrypt": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "bytes": "^3.1.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "eslint-config-airbnb": "^18.2.1",
    "express": "^4.16.4",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "mime-types": "^2.1.26",
    "moment": "^2.24.0",
    "morgan": "~1.9.1",
    "ms": "^2.1.2",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.1.0",
    "passport": "^0.4.1",
    "sequelize": "^5.21.6",
    "sqlite3": "^4.2.0",
    "uuid": "^7.0.3"
  },
  "devDependencies": {
    "eslint": "^7.13.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-mocha": "^8.0.0",
    "mocha": "^7.1.1",
    "node-mocks-http": "^1.9.0",
    "nyc": "^15.0.1",
    "sequelize-cli": "^5.5.1",
    "should": "^13.2.3",
    "sinon": "^9.0.2",
    "supertest": "^4.0.2"
  }
}
```

# Database Modeling
---
![image](https://user-images.githubusercontent.com/49120090/120920196-a35e7e00-c6f8-11eb-85c1-047b14130678.png)

