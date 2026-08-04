# Plan: backend pentru trace-ul programelor C++

> **Stare: pasii 0-4 sunt facuti.** Runner-ul traieste in
> [CppTraceRunner](https://github.com/raresChelariu/CppTraceRunner), imaginea e
> publica pe `ghcr.io/rareschelariu/cpptracerunner`, iar trace-urile lectiilor se
> regenereaza automat la push. Raman pasii de Azure si playground-ul.
>
> **Trei lucruri din planul de mai jos s-au dovedit gresite pe parcurs:**
>
> 1. **`.vgtrace` nu e formatul OPT.** E brut, fara heap. Conversia o face
>    `vg_to_opt_trace.py` (474 de linii, Philip Guo, 2015), pe care il aducem ca
>    dependinta si il portam la Python 3 la build.
> 2. **Trace-urile NU ies din git.** Cloudflare Pages construieste site-ul pe
>    infrastructura lui, unde nu exista Docker, deci generarea se face in GitHub
>    Actions si rezultatul se comite inapoi. Git e cache-ul. Efect secundar util:
>    site-ul ramane self-contained daca runner-ul cade.
> 3. **`actions/cache` nu e necesar.** Amprenta `sha256(sursa + intrare + digest
>    imagine)` scrisa in fiecare JSON face acelasi lucru, si in plus propaga
>    automat corectiile din runner catre toate trace-urile.
>
> Detaliile a ce e verificat si ce nu sunt in `DE-VERIFICAT.md` din repo-ul
> runner-ului.

Scopul: trace generat la cerere, in loc de fisierele statice de acum din
`docs/public/traces/`. Site-ul e VitePress pe Cloudflare Pages.

Referinta: [knazir/SeePlusPlus](https://github.com/knazir/SeePlusPlus), de unde e
inspirat frontend-ul din [debugger.md](docs/cpp/unelte/debugger.md).

---

## 1. Cum au facut cei de la SeePlusPlus

| Parte | Tehnologie |
|---|---|
| Frontend | React 18 + TypeScript, Vite, Tailwind, Zustand, **CodeMirror 6**, **Dagre** pentru asezarea nodurilor din heap |
| Backend | Node + Express + TypeScript, Postgres |
| Code runner | **AWS Lambda** in productie, **Docker** local — acelasi contract |
| Motor de trace | **SPP-Valgrind**, fork de Valgrind, submodul git |

Runner-ul face doar doi pasi:

```
g++ -std=c++11 -ggdb -O0 -fno-omit-frame-pointer
valgrind --tool=memcheck --source-filename=... --trace-filename=... --read-var-info=yes
```

si intoarce `{ ccStdout, ccStderr, stdout, stderr, traceContent }`.

### Descoperirea importanta

Flag-urile `--source-filename` / `--trace-filename` / `--read-var-info` **nu
exista in Valgrind-ul normal**. Sunt exact flag-urile fork-ului lui Philip Guo
din `opt-cpp-backend` — adica backend-ul C++ al **pythontutor**, acelasi pe care
il apelez azi din [genereaza-trace.mjs](scripts/genereaza-trace.mjs).

**SeePlusPlus si pythontutor folosesc acelasi motor.** Difera doar
post-procesarea: pythontutor ruleaza `vg_to_opt_trace.py` si scoate formatul OPT
(`C_DATA` / `C_STRUCT` / `C_ARRAY`), pe care il decodez deja la
[genereaza-trace.mjs:101-182](scripts/genereaza-trace.mjs#L101-L182); ei si-au
scris un parser TypeScript propriu peste `.vgtrace`-ul brut.

Fisierul `.vgtrace` e interfata stabila intre straturi, deci **munca mea de
decodare nu e pierduta** — pastrez formatul OPT si nu ating `DebuggerVisual.vue`.

### Performanta

EC2 → ECS Fargate (**1-2 minute**) → Lambda (**1-3 secunde**). Secretul: **10 GB
de memorie**. Pe Lambda memoria aloca proportional si CPU, deci cumpara vCPU-uri,
nu RAM.

### Ce nu au facut

1. **Nu au cache.** Documentatia lor spune ca bucket-ul S3 `trace-store` e
   *"currently unused by the runtime... kept around for a future trace-cache layer"*.
2. **Nu suporta stdin.** `handler.py` primeste doar codul. Pentru mine e blocant —
   exemplele citesc cu `cin >> n`.

> Licenta: aplicatia e MIT, dar submodulul `SPP-Valgrind` e derivat din Valgrind
> si ramane **GPL**. Pentru un serviciu web GPL nu obliga la publicarea codului
> propriu (nu e AGPL), dar redistribuirea imaginii trebuie sa respecte termenii.

---

## 2. Ce schimba limita de 200 de sample-uri

Asta e cea mai importanta constrangere din tot documentul, si simplifica radical
arhitectura.

Am masurat trace-urile existente:

| Fisier | Brut | Gzip |
|---|---|---|
| `lista-dublata.json` | 147,7 KB | **2,6 KB** |
| `stiva-apeluri.json` | 3,6 KB | 0,4 KB |
| `acelasi-nume.json` | 2,7 KB | 0,4 KB |
| `parametri-copie.json` | 2,7 KB | 0,4 KB |

**Raport 57:1** pe cel mare — un trace e aceeasi structura repetata de sute de
ori. La 200 de sample-uri, cu `lista-dublata` (cel mai mare de pana acum) ca
medie pesimista, **tot cache-ul inseamna sub 1 MB comprimat**.

### Consecinta: nu am nevoie de infrastructura de cache

Fara Workers KV, fara R2, fara Azure Blob, fara Redis. Sub 1 MB de date imutabile
e o problema care nu exista. Cache-ul devine:

- **la build:** `actions/cache` in GitHub Actions, cu cheie pe hash-ul fisierelor
  `.cpp`. Daca nu s-a schimbat niciun exemplu, nu se apeleaza backend-ul deloc;
- **la servire:** CDN-ul Cloudflare Pages, care oricum comprima si distribuie
  fisierele statice. Deja functioneaza asa.

### Consecinta a doua, mai mare

Daca **doar** exemplele din lectii ajung vreodata sa fie trasate, atunci
backend-ul e apelat de cateva ori per commit — nu de mii de ori pe zi. Nu am
nevoie de un serviciu care ruleaza permanent. Am nevoie de o **imagine Docker
rulata la build**.

Iar `raresChelariu/AlgPlayground` e repo **public**, deci minutele de GitHub
Actions pe runnere standard sunt **gratuite si nelimitate**.

Adica: pot genera toate cele 200 de trace-uri **direct in workflow-ul de build**,
fara niciun cloud provider, cu cost zero si **fara niciun risc de securitate** —
nu exista endpoint public, deci nu exista executie de cod arbitrar de pe internet.
Toata sectiunea de sandboxing dispare.

### Deci de ce as mai vrea un serviciu deployat?

Un singur motiv: **playground** — o pagina unde elevul isi scrie propriul cod.
Acolo chiar ai nevoie de un endpoint public, la cerere.

**Recomandarea: o imagine, doi consumatori.**

| Consumator | Cand | Unde ruleaza | Cost |
|---|---|---|---|
| Trace-uri pentru lectii (200) | la build | direct in GitHub Actions | 0 |
| Playground cu cod arbitrar | la cerere | Azure Container Apps | 0 (free grant) |

Aceeasi imagine publicata o data pe `ghcr.io`. Daca amani playground-ul, pasul 2
nu se face si nu platesti nimic niciodata.

---

## 3. Azure — ce e gratis

### Azure Container Apps — **da, si e generos**

Free grant, per abonament, pe luna:

- **180.000 vCPU-secunde**
- **360.000 GiB-secunde**
- **2 milioane de cereri**

La 2 vCPU / 4 GiB si ~3 s per rulare, o rulare consuma 6 vCPU-s si 12 GiB-s:

```
180.000 / 6  = 30.000 rulari
360.000 / 12 = 30.000 rulari
```

**~30.000 de rulari pe luna, gratis.** Cele doua limite se ating simultan pentru
ca grantul e in raport 1:2, exact raportul vCPU:GiB pe care il aloca oricum
Container Apps — deci orice combinatie permisa da acelasi numar.

Pentru comparatie, AWS Lambda (10 GB, ruta SeePlusPlus) da ~13.000 rulari pe
luna gratis. **Azure e de peste doua ori mai generos aici.**

Doua conditii obligatorii:

- **`minReplicas: 0`.** Free grantul se aplica doar la *active compute*. Replicile
  idle pastrate cu `minReplicas > 0` se factureaza **din prima secunda**, chiar si
  la tarif redus. Cu 0, cand nu ruleaza nimeni nu platesti nimic.
- **Environment de tip Consumption-only**, nu workload profiles (acela are cost de
  baza).

Atentie si la **Log Analytics**: un environment Container Apps isi creeaza implicit
un workspace, care se factureaza separat peste 5 GB/luna. Pentru asa ceva pune
logging-ul pe minim.

### Azure Functions — **nu merge**

Ar fi echivalentul direct al Lambda, dar **planul Consumption nu suporta imagini
de container**, si Microsoft spune ca nu are in plan sa adauge suportul. Containere
doar pe Premium, care porneste de la ordinul sutelor de dolari pe luna. Cum eu am
nevoie sa impachetez un Valgrind compilat din surse, Functions e exclus.

Exista *Azure Functions on Container Apps*, dar atunci esti deja pe Container Apps
si mai bine il folosesti direct.

### Azure Container Registry — **nu e gratis, si nu imi trebuie**

ACR nu are tier gratuit; Basic e ~0,167 $/zi, adica ~5 $/luna — ar fi singurul cost
real din tot proiectul.

Solutie: **`ghcr.io` public**, gratuit, si Container Apps trage imaginea fara
credentiale. (Daca as vrea imagine privata, ar trebui `az containerapp registry set`
cu un PAT **classic** — token-urile fine-grained nu suporta inca `packages`.)

### Alte optiuni gratuite

- **Azure free account:** 200 $ credit pentru 30 de zile, plus serviciile
  always-free (grantul Container Apps e printre ele, si ramane si dupa).
- **Azure for Students:** 100 $ pe an fara card, dar cere verificare cu adresa
  academica — de verificat daca te califici.

### Verdict

**Azure Container Apps e o alegere buna, mai buna decat Lambda pentru cazul asta:**
free grant dublu, deploy mai simplu (nu ai nevoie de registry propriu), si nu
depinzi de particularitatile pachetului Lambda.

Compromisul: **cold start**. Cu `minReplicas: 0` si o imagine care contine un
Valgrind compilat, prima cerere dupa o pauza poate lua zeci de secunde. Pentru
lectii nu conteaza (nu trec pe acolo). Pentru playground e o secunda-doua de
asteptare in plus la primul elev din ora. Se atenueaza tinand imaginea mica —
multi-stage build, in imaginea finala doar `gcc`, `g++`, `glibc-devel` si binarul
Valgrind, exact ca la ei.

---

## 4. Repo nou si deploy pe push la master

### Structura

```
cpp-trace-runner/
├── .github/workflows/
│   ├── ci.yml           # build + smoke test pe PR
│   └── deploy.yml       # push pe master -> ghcr.io + Azure
├── valgrind/            # submodul: opt-cpp-backend sau SPP-Valgrind
├── src/                 # server HTTP + normalizarea in format OPT
├── exemple/             # 2-3 .cpp pentru smoke test
├── Dockerfile           # multi-stage
└── compose.yml          # dev local
```

Exemplele lectiilor raman in `AlgPlayground/scripts/exemple/` — sunt continut
didactic, nu tin de runner.

### Configurarea Azure (o singura data)

Fara secrete de lunga durata — **OIDC cu federated credentials**:

```bash
az ad app create --display-name gh-cpp-trace-runner
az ad sp create --id <appId>

az role assignment create \
  --role Contributor --assignee <appId> \
  --scope /subscriptions/<sub>/resourceGroups/algplayground

az ad app federated-credential create --id <appId> --parameters '{
  "name": "master",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "repo:raresChelariu/cpp-trace-runner:ref:refs/heads/master",
  "audiences": ["api://AzureADTokenExchange"]
}'
```

`subject` fixeaza si repo-ul, si branch-ul: un push pe alt branch nu poate obtine
token. In GitHub pui doar trei **variables** (nu secrets, nu sunt sensibile):
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`.

### `deploy.yml`

```yaml
name: deploy
on:
  push:
    branches: [master]

permissions:
  id-token: write      # necesar pentru OIDC
  contents: read
  packages: write      # push in ghcr.io

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:${{ github.sha }}
            ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - uses: azure/login@v2
        with:
          client-id: ${{ vars.AZURE_CLIENT_ID }}
          tenant-id: ${{ vars.AZURE_TENANT_ID }}
          subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}

      - run: |
          az containerapp update \
            --name cpp-trace-runner \
            --resource-group algplayground \
            --image ghcr.io/${{ github.repository }}:${{ github.sha }}
```

Doua detalii care conteaza:

- **`cache-from/cache-to: type=gha`** e obligatoriu. Compilarea Valgrind din surse
  dureaza minute; cu cache-ul de layere, un build in care nu s-a atins submodulul
  trece in secunde.
- **tag pe `github.sha`**, nu doar `latest`. Container Apps creeaza o revizie noua
  per imagine, deci ai rollback cu o comanda.

### In `AlgPlayground`

Workflow-ul de Pages genereaza trace-urile inainte de `npm run docs:build`:

```yaml
- uses: actions/cache@v4
  with:
    path: docs/public/traces
    key: traces-${{ hashFiles('scripts/exemple/**') }}
    restore-keys: traces-

- run: node scripts/genereaza-toate.mjs   # sare peste ce e deja in cache
```

`restore-keys: traces-` aduce cache-ul precedent chiar si cand cheia nu se
potriveste exact, iar scriptul regenereaza **doar** exemplele al caror hash s-a
schimbat (hash-ul sursei se scrie in JSON). In practica: modifici un exemplu, se
regenereaza unul singur.

---

## 5. Ce fork de Valgrind

| | pythontutor `opt-cpp-backend` | `SPP-Valgrind` |
|---|---|---|
| Iesire | format OPT, dupa `vg_to_opt_trace.py` | `.vgtrace` brut, parser propriu |
| Cod nou la mine | ~zero, mut logica din `genereaza-trace.mjs` | parser de la zero |
| Vechime | Valgrind 3.11, ~2015 | intretinut in 2025 |

Incerc intai `opt-cpp-backend`, ca sa pastrez tot ce am scris. Daca nu compileaza
pe o distributie moderna, trec pe `SPP-Valgrind`.

Merita testata si combinatia **`SPP-Valgrind` + `vg_to_opt_trace.py`** — fiind un
fork al aceluiasi Valgrind, `.vgtrace`-ul ar trebui sa fie compatibil, deci as
avea si fork-ul intretinut, si formatul meu. **Nu am verificat**, e prima proba.

---

## 6. Ce se schimba in cod

### Runner

Handler care: scrie sursa in `/tmp` → `g++ -std=c++17 -ggdb -O0
-fno-omit-frame-pointer` (30 s timeout) → **scrie intrarea intr-un fisier si o
redirecteaza catre program** (bucata care lipseste la SeePlusPlus) → `valgrind
--tool=memcheck --source-filename=... --trace-filename=... --read-var-info=yes`
(60 s timeout) → `.vgtrace` in format OPT → normalizarea din
[genereaza-trace.mjs:81-203](scripts/genereaza-trace.mjs#L81-L203) (remaparea
adreselor la `0x100`, `0x110`..., decodarea `C_DATA`/`C_STRUCT`/`C_ARRAY`,
eliminarea `<padding>`, scurtarea numelor de functii) → `{ cod, intrare, pasi }`,
**exact structura de azi**.

### Frontend

- `DebuggerVisual.vue`: pe langa `trace="nume"`, poate primi obiectul direct prin
  prop. Randarea nu se schimba — formatul intern e identic.
- `RulatorCpp.vue` (doar daca fac playground): CodeMirror 6 sau `<textarea>`,
  caseta de intrare, buton *Ruleaza*.

### Limite

Max 1000 de pasi (plafonul pythontutor), max ~2 MB JSON necomprimat, stdout
trunchiat la 64 KB.

### Securitate — doar daca fac playground

Cat timp runner-ul e apelat numai din CI, nu exista suprafata de atac. Din clipa
in care exista endpoint public: Turnstile, rate limit pe IP, limite de dimensiune
pe sursa (64 KB) si intrare (16 KB), plafon zilnic, kill switch. Izolarea de
proces o da Container Apps; nu filtra codul sursa dupa cuvinte cheie (`system`,
`fork`) — se ocoleste banal.

---

## 7. Etapizare

| Pas | Ce fac | Efort | Rezultat |
|---|---|---|---|
| 0 | Construiesc local imaginea si o rulez pe `lista-dublata.cpp`; verific ca iese acelasi trace | 0,5-1 zi | **pasul cu tot riscul** |
| 1 | Adaug stdin si mut normalizarea din `genereaza-trace.mjs` in runner | 0,5 zi | paritate cu ce am azi |
| 2 | Repo nou, `ci.yml`, imagine publica pe `ghcr.io` | 2 ore | imagine versionata |
| 3 | In `AlgPlayground`: generez trace-urile in Actions si le comit inapoi (Cloudflare nu are Docker) | 0,5 zi | **gata, fara cloud** |
| 4 | Azure: resource group, Container Apps environment consumption-only, `minReplicas: 0`, OIDC, `deploy.yml` | 0,5 zi | endpoint public |
| 5 | `RulatorCpp.vue` + pagina *Playground* la **Unelte** | 1-1,5 zile | elevul isi ruleaza codul |
| 6 | Buton *Ruleaza* pe blocurile `cpp` din lectii | 0,5 zi | fiecare exemplu executabil |

**Dupa pasul 3 ai deja tot ce ai cerut pentru cele 200 de sample-uri**, la cost
zero si fara Azure. Pasii 4-6 sunt exclusiv pentru playground.

---

## 8. Costuri

| | Lunar |
|---|---|
| GitHub Actions (repo public, runnere standard) | 0 |
| `ghcr.io`, imagine publica | 0 |
| Cloudflare Pages | 0 |
| Azure Container Apps, sub 30.000 de rulari, `minReplicas: 0` | 0 |
| Azure Container Registry — **evitat**, folosesc `ghcr.io` | ~5 $ economisiti |
| **Total** | **0** |

---

## 9. Riscuri

- **Fork-ul de Valgrind nu compileaza pe toolchain modern.** Riscul principal.
  Mitigare: pasul 0 primul; plan B = `SPP-Valgrind`.
- **Valgrind blocat de politicile de sandbox ale platformei.** Ruleaza in user
  space si are nevoie sa faca `mmap` la adrese specifice. In Docker standard merge,
  pe Lambda merge (dovedit de SeePlusPlus), pe Container Apps **de verificat la
  pasul 4** — nu presupune.
- **Cold start** la prima cerere dupa pauza. Irelevant pentru lectii, sesizabil in
  playground. Se atenueaza cu imagine mica.
- **Trace-uri uriase** dintr-un `for` cu 100.000 de iteratii. Plafon 1000 de pasi.
- **Elevul asteapta input interactiv.** Nu suportam — datele se dau dinainte, ca pe
  pbinfo. E si mai aproape de cum se lucreaza la BAC.
