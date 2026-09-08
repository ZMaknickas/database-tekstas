process.env.PORT — Hostinger pats priskiria portą per aplinkos kintamąjį, hardcoded 5531 produkcijoje neveiks.
CORS_ORIGIN — nustatysi kaip environment variable hPanel'e (pvz. https://tavodomenas.lt), lokaliai liks localhost:5530 per default.
express.static(clientDistPath) — patiekia client/dist (Vite build rezultatą).
SPA fallback regex — visi keliai, kurie neprasideda /api, grąžina index.html (svarbu, jei naudoji React Router su kliento puse routinimu).
Pašalinau seną app.get('/') ir netinkamą app.get('*error', ...) — pakeičiau tvarkinga API+SPA logika.

build — vykdo client'o Vite build'ą (sukuria client/dist). Hostinger'io Build command lauke įrašysi: npm install && npm run build
start — paleidžia serverį per jo paties package.json start scriptą. Hostinger'io Start command lauke įrašysi: npm start (nes root start tiesiog deleguoja į server)