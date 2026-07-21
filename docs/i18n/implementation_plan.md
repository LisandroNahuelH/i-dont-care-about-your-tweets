# Agentic i18n Translation Pipeline — I Don't Care About Your Tweets

Este plan define el procedimiento estándar (SOP) para añadir de forma rápida, fiable y automática los **55 idiomas de Chrome Web Store** a la extensión, gestionado íntegramente por el agente de IA.

Referencia de diseño: pipeline de *Prism Volume Booster* (`implementation_plan.md` en Antigravity Brain).

---

## Estado actual

| Aspecto | Estado |
|---------|--------|
| Idiomas en producción | `en` (canónico), `es` |
| Catálogo runtime | `src/_locales/<locale>/messages.json` — **7 claves** |
| Cobertura i18n runtime | Manifest + tooltips/aria-label de botones en posts |
| Sin i18n | Popup (`index.html`, `index.ts`), nombres/descripciones de button kits (`button-kits.ts`) |
| Keywords DOM de X.com | Hardcodeados bilingües (`actionDefinitions.ts`, `dismissFeedbackKeywords.ts`) |
| Tooling i18n | **No existe** (`i18n:bootstrap-locale`, `i18n:check`, etc.) |
| Publicación Chrome Web Store | Solo ZIP en `release/`; sin fuentes de listing/privacy por locale |

---

## User Review Required

- **Calidad de traducción**: El agente traducirá automáticamente ~24 claves de UI runtime + textos de store por cada idioma. Términos de producto como *Block*, *Mute*, *Not interested* y el tono informal del nombre de la extensión pueden requerir revisión manual en mercados clave (`de`, `fr`, `ja`, `pt_BR`, `zh_CN`, etc.).
- **Keywords de X.com**: La extensión localiza menús nativos de X buscando texto en el DOM. Las keywords actuales solo cubren inglés y español. Para los 55 idiomas hace falta un registro de keywords por locale; algunas traducciones oficiales de X pueden divergir y requerir ajuste manual tras prueba en vivo.
- **Variantes regionales**: `en`, `en_US`, `en_GB` y `en_AU` comparten el mismo catálogo Chrome (`en`). `es` y `es_419` comparten `es`. El pipeline debe mapear variantes CWS → carpeta runtime correcta sin duplicar traducciones.
- **Store listings**: Si aún no existen fuentes canónicas en inglés para listing y privacy policy, la Fase 0 las crea antes de traducir los 49 locales runtime pendientes.

---

## Open Questions

1. ¿Incluir en esta entrega la **migración del popup y button kits** a `_locales` (recomendado), o limitar el alcance a los 7 mensajes actuales + store?
2. ¿Crear ya la carpeta `Publicacion Chrome Web Store/source/` con listing/privacy en inglés, o solo runtime `_locales`?
3. ¿Priorizar lotes por idioma (p. ej. lotes de 10) o ejecutar los 49 pendientes en una sola sesión multi-agente?

**Recomendación por defecto**: Fase 0 completa (tooling + ampliar catálogo + migrar popup) y luego traducir los 49 locales runtime pendientes en lotes de 8–10.

---

## Catálogo objetivo (post Fase 0)

### Runtime — claves existentes (7)

| Clave | Uso |
|-------|-----|
| `extensionName` | Manifest `name`, action `default_title` |
| `extensionDescription` | Manifest `description` |
| `actionBlock` / `actionBlockTitle` | Etiqueta corta / tooltip botón Block |
| `actionMute` / `actionMuteTitle` | Etiqueta corta / tooltip botón Mute |
| `actionDismiss` / `actionDismissTitle` | Etiqueta corta / tooltip botón Not interested |

### Runtime — claves nuevas propuestas (17)

| Clave | Origen actual |
|-------|---------------|
| `popupPageTitle` | `<title>` en `index.html` |
| `popupHeading` | `<h1>Button kit</h1>` |
| `popupSubtitle` | Subtítulo del header |
| `popupReset` | Botón Reset |
| `popupPreviewAriaLabel` | `aria-label` de `.preview` |
| `popupKitListAriaLabel` | `aria-label` de `.kit-list` |
| `kitClassicName` / `kitClassicDescription` | `button-kits.ts` |
| `kitMinimalName` / `kitMinimalDescription` | idem |
| `kitBoldName` / `kitBoldDescription` | idem |
| `kitSharpName` / `kitSharpDescription` | idem |
| `kitSoftName` / `kitSoftDescription` | idem |

**Total runtime**: 24 claves × 51 carpetas = 1.224 entradas `message` (más 4 variantes CWS alias que reutilizan `en` o `es`).

### Store — documentos por locale (2 archivos)

| Archivo | Contenido |
|---------|-----------|
| `listing.json` | Título, descripción corta, descripción detallada para CWS |
| `privacy-policy.json` | Política de privacidad localizada |

---

## Idiomas soportados (Chrome Web Store)

Fuente canónica: [`docs/i18n/chrome-web-store-locales.json`](./chrome-web-store-locales.json)

| # | Idioma | Código CWS | Carpeta `_locales` | Estado |
|---|--------|------------|-------------------|--------|
| 1 | Árabe | `ar` | `ar` | pending |
| 2 | Amhárico | `am` | `am` | pending |
| 3 | Búlgaro | `bg` | `bg` | pending |
| 4 | Bengalí | `bn` | `bn` | pending |
| 5 | Catalán | `ca` | `ca` | pending |
| 6 | Checo | `cs` | `cs` | pending |
| 7 | Danés | `da` | `da` | pending |
| 8 | Alemán | `de` | `de` | pending |
| 9 | Griego | `el` | `el` | pending |
| 10 | Inglés | `en` | `en` | **active** |
| 11 | Inglés (Australia) | `en_AU` | `en` (alias) | alias → store only |
| 12 | Inglés (Reino Unido) | `en_GB` | `en` (alias) | alias → store only |
| 13 | Inglés (EE.UU.) | `en_US` | `en` (alias) | alias → store only |
| 14 | Español | `es` | `es` | **active** |
| 15 | Español (Latinoamérica y Caribe) | `es_419` | `es` (alias) | alias → store only |
| 16 | Estonio | `et` | `et` | pending |
| 17 | Persa | `fa` | `fa` | pending |
| 18 | Finlandés | `fi` | `fi` | pending |
| 19 | Filipino | `fil` | `fil` | pending |
| 20 | Francés | `fr` | `fr` | pending |
| 21 | Gujarati | `gu` | `gu` | pending |
| 22 | Hebreo | `he` | `he` | pending |
| 23 | Hindi | `hi` | `hi` | pending |
| 24 | Croata | `hr` | `hr` | pending |
| 25 | Húngaro | `hu` | `hu` | pending |
| 26 | Indonesio | `id` | `id` | pending |
| 27 | Italiano | `it` | `it` | pending |
| 28 | Japonés | `ja` | `ja` | pending |
| 29 | Kannada | `kn` | `kn` | pending |
| 30 | Coreano | `ko` | `ko` | pending |
| 31 | Lituano | `lt` | `lt` | pending |
| 32 | Letón | `lv` | `lv` | pending |
| 33 | Malayalam | `ml` | `ml` | pending |
| 34 | Marathi | `mr` | `mr` | pending |
| 35 | Malayo | `ms` | `ms` | pending |
| 36 | Neerlandés | `nl` | `nl` | pending |
| 37 | Noruego | `no` | `no` | pending |
| 38 | Polaco | `pl` | `pl` | pending |
| 39 | Portugués (Brasil) | `pt_BR` | `pt_BR` | pending |
| 40 | Portugués (Portugal) | `pt_PT` | `pt_PT` | pending |
| 41 | Rumano | `ro` | `ro` | pending |
| 42 | Ruso | `ru` | `ru` | pending |
| 43 | Eslovaco | `sk` | `sk` | pending |
| 44 | Esloveno | `sl` | `sl` | pending |
| 45 | Serbio | `sr` | `sr` | pending |
| 46 | Sueco | `sv` | `sv` | pending |
| 47 | Suajili | `sw` | `sw` | pending |
| 48 | Tamil | `ta` | `ta` | pending |
| 49 | Telugu | `te` | `te` | pending |
| 50 | Tailandés | `th` | `th` | pending |
| 51 | Turco | `tr` | `tr` | pending |
| 52 | Ucraniano | `uk` | `uk` | pending |
| 53 | Vietnamita | `vi` | `vi` | pending |
| 54 | Chino (China) | `zh_CN` | `zh_CN` | pending |
| 55 | Chino (Taiwán) | `zh_TW` | `zh_TW` | pending |

### Resumen de cobertura

| Concepto | Cantidad |
|----------|----------|
| Entradas CWS (listado oficial) | **55** |
| Carpetas físicas en `src/_locales/` | **51** (55 − 4 alias) |
| Ya activas | `en`, `es` |
| Pendientes de traducir (runtime) | **49** |
| Alias solo store (sin carpeta propia) | `en_AU`, `en_GB`, `en_US`, `es_419` |
| RTL (requieren QA manual) | `ar`, `fa`, `he` |

---

## Proposed Changes

### Fase 0 — Infraestructura (una sola vez, antes de traducir)

#### 0.1 Registro y documentación

- Mantener `docs/i18n/chrome-web-store-locales.json` como registro maestro (55 códigos CWS, `displayName`, `runtimeFolder`, `runtimeStatus`, `storeStatus`, `qaStatus`, `rtl`).
- Crear `docs/i18n/locale-onboarding.md` y `docs/i18n/README.md` (adaptados de Volume Booster, rutas de este repo).
- Crear `docs/i18n/i18n-surface-inventory.json` listando cada superficie visible y su clave.

#### 0.2 Scripts npm (en `tools/i18n/`)

| Script | Responsabilidad |
|--------|-----------------|
| `i18n:bootstrap-locale` | Scaffold en `.i18n/runtime-locales/<code>/` y `.i18n/store-locales/<code>/` copiando desde `en` |
| `i18n:check` | Paridad de claves, JSON válido, mensajes no vacíos, detección de copy idéntico a inglés sin allowlist |
| `i18n:generate` | Generar `src/generated/i18n-fallback.ts` desde `src/_locales/en/messages.json` |
| `i18n:audit` | Detectar literales visibles en `src/popup`, `src/shared/button-kits.ts`, `src/features/post-actions` |
| `i18n:promote-locale` | Mover `.i18n/runtime-locales/<code>` → `src/_locales/<code>` tras QA |
| `store:i18n:generate` | Generar HTML de listing/privacy desde `Publicacion Chrome Web Store/source/` |
| `store:i18n:check` | Validar paridad de secciones store vs `en` |

Actualizar `package.json`:

```json
"verify": "npm run i18n:generate && npm run i18n:check && npm run i18n:audit && npm run typecheck && npm run lint && npm run test && npm run build"
```

#### 0.3 Ampliar catálogo canónico `en`

- Añadir las 17 claves nuevas del popup/button kits en `src/_locales/en/messages.json` con `description` contextual en cada entrada.
- Replicar estructura (solo `message`, sin `description`) en `src/_locales/es/messages.json` con traducción manual de referencia.

#### 0.4 Migrar código a `getMessage()`

| Archivo | Cambio |
|---------|--------|
| `src/popup/index.html` | Sustituir textos estáticos por placeholders resueltos en `index.ts` al cargar |
| `src/popup/index.ts` | Usar `getMessage()` para `ACTION_LABELS`, títulos de kits, aria-labels |
| `src/shared/button-kits.ts` | Sustituir `name`/`description` hardcodeados por keys i18n (`kitClassicName`, etc.) |
| `src/shared/browser/getMessage.ts` | Eliminar `FALLBACK_MESSAGES` ad-hoc; importar fallback generado |

#### 0.5 Keywords DOM de X.com (paralelo)

- Crear `src/features/post-actions/config/locale-keywords.json` (canónico `en`) con arrays por acción: `block`, `mute`, `dismiss`, `dismissFeedbackThankYou`, `dismissFeedbackUndo`.
- Crear `.i18n/runtime-keywords/<locale>.json` para traducciones de keywords.
- Refactorizar `actionDefinitions.ts` y `dismissFeedbackKeywords.ts` para leer del registro.
- Mantener `en` + `es` como baseline; el agente rellena el resto en la misma sesión de traducción.

#### 0.6 Fuentes store en inglés

- Crear `Publicacion Chrome Web Store/source/en/listing.json` y `privacy-policy.json`.
- El bootstrap de cada locale copia estos archivos como plantilla.

#### 0.7 Worktree / rama aislada

- Toda la operación en rama `feature/i18n-55-locales` (o worktree dedicado), **nunca en `master`**.

---

### Fase 1 — Pipeline agentic por locale (se repite por idioma o lote)

Para cada locale pendiente (`de`, `fr`, `ja`, …):

#### Step 0: Context & Safety Verification

- Confirmar rama aislada activa (no `master`).
- Verificar que el código existe en `docs/i18n/chrome-web-store-locales.json`.
- Si es alias CWS (`en_US`, `es_419`), saltar runtime y procesar solo store si aplica.

#### Step 1: Bootstrap Target Locale

```powershell
npm run i18n:bootstrap-locale -- <LOCALE_CODE>
```

Genera:

- `.i18n/runtime-locales/<LOCALE_CODE>/messages.json` (copia de `en`)
- `.i18n/store-locales/<LOCALE_CODE>/listing.json`
- `.i18n/store-locales/<LOCALE_CODE>/privacy-policy.json`
- `.i18n/runtime-keywords/<LOCALE_CODE>.json` (si no existe)

#### Step 2: Automated Translation

**Runtime keys** — El agente procesa `.i18n/runtime-locales/<LOCALE_CODE>/messages.json`:

- Traducir únicamente valores de `"message"`.
- Preservar claves, estructura JSON y placeholders (`$NAME$`, etc.) sin alteraciones.
- No añadir `description` en locales no ingleses.
- Respetar límite Chrome Web Store de 75 caracteres en `extensionName` si aplica.

**Store texts** — El agente procesa `listing.json` y `privacy-policy.json`:

- Traducir valores manteniendo ids de sección y estructura del documento.
- Ajustar tono marketing natural en el idioma destino.

**DOM keywords** — El agente procesa `.i18n/runtime-keywords/<LOCALE_CODE>.json`:

- Traducir las frases que X.com muestra en menús contextuales y tarjetas de feedback.
- Incluir variantes comunes (mayúsculas, sin puntuación) si el matcher normaliza texto.

*Nota técnica*: Con ~24 claves por archivo, no hace falta chunking. Para store JSON largos, dividir por sección si superan límites de tokens.

#### Step 3: Promotion to Production Source

```powershell
npm run i18n:promote-locale -- <LOCALE_CODE>
```

- `.i18n/runtime-locales/<LOCALE_CODE>/` → `src/_locales/<LOCALE_CODE>/`
- `.i18n/runtime-keywords/<LOCALE_CODE>.json` → `src/features/post-actions/config/locale-keywords/<LOCALE_CODE>.json`
- `.i18n/store-locales/<LOCALE_CODE>/` → `Publicacion Chrome Web Store/source/<LOCALE_CODE>/`
- Actualizar `runtimeStatus` / `storeStatus` en `chrome-web-store-locales.json` → `active` / `generated`.

#### Step 4: Strict Pipeline Validation

```powershell
npm run i18n:generate
npm run i18n:check
npm run i18n:audit
npm run store:i18n:generate
npm run store:i18n:check
npm run verify
```

---

### Fase 2 — Ejecución masiva (49 locales runtime pendientes)

Estrategia recomendada en **6 lotes**:

| Lote | Locales | Notas |
|------|---------|-------|
| 1 | `de`, `fr`, `it`, `pt_BR`, `pt_PT`, `nl`, `pl`, `ru` | Mercados europeos/latam principales |
| 2 | `ja`, `ko`, `zh_CN`, `zh_TW`, `hi`, `id`, `th`, `vi` | CJK + Asia sur/sureste |
| 3 | `ar`, `he`, `fa` | RTL — verificar manualmente |
| 4 | `tr`, `uk`, `cs`, `sk`, `hu`, `ro`, `bg`, `hr`, `sr`, `sl` | Europa central/oriental |
| 5 | `sv`, `da`, `no`, `fi`, `et`, `lv`, `lt`, `ca`, `ms`, `fil` | Nórdicos + otros |
| 6 | `bn`, `gu`, `kn`, `ml`, `mr`, `ta`, `te`, `am`, `sw` | Scripts Indic/Etiopía |

Por lote:

1. Bootstrap paralelo de los locales del lote.
2. Traducción agentic (subagentes concurrentes, uno por locale).
3. Promote + validate del lote completo.
4. Commit: `i18n: add runtime and store locales for batch N (<codes>)`.

Al finalizar lote 6: **51 carpetas** en `src/_locales/` (49 nuevas + `en` + `es` ya existentes). Las 55 entradas CWS quedan cubiertas vía 4 alias de store (`en_AU`, `en_GB`, `en_US`, `es_419`).

---

## Verification Plan

### Automated Tests

| Comando | Garantiza |
|---------|-----------|
| `npm run i18n:check` | Paridad exacta de claves en las 51 carpetas runtime, JSON válido, sin mensajes vacíos |
| `npm run i18n:audit` | Cero literales visibles fuera de `_locales` en superficies inventariadas |
| `npm run i18n:generate` | Fallback TypeScript sincronizado con catálogo `en` |
| `npm run store:i18n:check` | Store docs con misma estructura que `en` |
| `npm run verify` | Typecheck + lint + tests + build exitoso |
| Test nuevo: `tests/i18n/locale-parity.test.ts` | CI rápido: cuenta carpetas = 51, cada `messages.json` parseable |

### Manual Verification

- Cargar extensión sin empaquetar desde `dist/`, cambiar idioma del navegador, verificar popup y tooltips en posts.
- Probar acciones Block / Mute / Not interested con cuenta X en al menos 3 idiomas (incl. uno RTL).
- Revisar HTML generado de listing/privacy para 2–3 locales clave antes de subir a CWS.
- Confirmar que `dist/_locales/` contiene las 51 carpetas tras `npm run build` (vía `tools/copy-static.mjs`).

---

## Estructura de directorios resultante

```
docs/i18n/
  chrome-web-store-locales.json   # registro maestro 55 locales
  implementation_plan.md            # este documento
  locale-onboarding.md
  README.md
  i18n-surface-inventory.json

.i18n/                            # scratchpads (gitignored o commit opcional)
  runtime-locales/<locale>/messages.json
  store-locales/<locale>/{listing,privacy-policy}.json
  runtime-keywords/<locale>.json

src/_locales/
  en/messages.json                  # canónico
  es/messages.json
  de/messages.json
  ... (51 carpetas)

src/generated/
  i18n-fallback.ts                  # generado

src/features/post-actions/config/
  locale-keywords/
    en.json
    es.json
    ...

Publicacion Chrome Web Store/source/
  en/{listing,privacy-policy}.json
  ...

tools/i18n/
  bootstrap-locale.mjs
  check-i18n.mjs
  generate-i18n-fallback.mjs
  audit-i18n-literals.mjs
  promote-locale.mjs
```

---

## Orden de implementación (PR plan)

| PR | Contenido | Depende de |
|----|-----------|------------|
| PR-1 | Infra: scripts, registro 55 locales, `i18n:generate` + `i18n:check` | — |
| PR-2 | Ampliar catálogo `en`/`es`, migrar popup + button kits a `getMessage()` | PR-1 |
| PR-3 | Keywords DOM: refactor + `en`/`es` | PR-1 |
| PR-4 | Store sources `en` + pipeline `store:i18n:*` | PR-1 |
| PR-5 | Lote 1 traducciones (8 locales) | PR-2, PR-3, PR-4 |
| PR-6 | Lote 2 traducciones (8 locales) | PR-5 |
| PR-7 | Lote 3 traducciones (3 locales RTL) | PR-5 |
| PR-8 | Lote 4 traducciones (10 locales) | PR-5 |
| PR-9 | Lote 5 traducciones (10 locales) | PR-5 |
| PR-10 | Lote 6 traducciones (9 locales) | PR-5 |

---

## Criterios de aceptación

- [ ] 51 carpetas en `src/_locales/` con paridad de claves respecto a `en`
- [ ] 55 entradas CWS cubiertas (51 runtime + 4 alias store)
- [ ] `npm run verify` pasa sin errores
- [ ] Popup y button kits renderizan texto vía `chrome.i18n.getMessage()`
- [ ] `getMessage.ts` usa fallback generado, no strings ad-hoc
- [ ] Keywords DOM disponibles para las 51 carpetas runtime
- [ ] Store listing/privacy generados para los 55 códigos CWS
- [ ] `chrome-web-store-locales.json` con todos los `runtimeStatus: "active"`

---

## Siguiente paso

Tras aprobación de este plan, ejecutar **Fase 0 (PR-1 a PR-4)** y luego indicar si se comienza por el **Lote 1** completo o por un locale piloto (`de` o `fr`) para validar el pipeline antes de escalar a los 49 restantes.