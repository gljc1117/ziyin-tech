# Chcomct SI website showcase — 2026-11-12

Base: `08b1c0e8c43ef5bb3accc8cb04904d85218bd04d`.

## Scope

User requested a public SI demonstration of automatic modelling and print collaboration, reviewed the proposed approach, then instructed “开干”. Implement a first release using verified real screenshots, with a homepage entry, dedicated product page, product catalogue/search/sitemap discovery, and a preselected SI inquiry. Preserve all previously published hospital updates and existing public-demo allowlists. No SI runtime, printer, account, access policy or database changes.

## Evidence and assets

Four images are exact, unmodified extractions from the owner's November roadshow decks. Reviewed visually: no patient name, birth date, hospital imaging number, credentials or network location visible in these selected images. Original research task codes, dates, pending-review indicators and version identifiers are retained. They are static historical development screenshots, not a recording or proof of clinical release.

| Website file | Source media | Presentation |
| --- | --- | --- |
| `public/images/si/pelvis-workbench.png` | `ppt/media/image8.png` | chcomct-SI_春雨行动路演_视频联动版.pptx |
| `public/images/si/pelvis-ct-review.png` | `ppt/media/image6.png` | same deck |
| `public/images/si/si-entry.png` | `ppt/media/image1.png` | same deck |
| `public/images/si/technical-review.png` | `ppt/media/image5.png` | chcomct-SI_春雨行动路演_15分钟截图增强版.pptx |

The two pelvis screens are the same October 28 task/version. Other screens show separate demonstration views. They do not depict the November 12 pelvis printing run. Existing bone-model product imagery is clearly labelled as an independent product example, not the corresponding printed output. Hospital cases are operational context, not evidence of SI deployment at those hospitals.

The video deck has no embedded movie: its slide link names `chcomct_SI_120s_demo.mp4`. No matching video was found in Library or in the accessible portion of a bounded read-only search under the connected workstation's MEDIFORGE_OPS documents. No playback button or fabricated recording was added. Same-task continuous footage, corresponding printed-model photographs and a public pelvis interactive model remain outstanding.

Published SI engineering articles support the descriptive workflow. Do not claim autonomous three-printer dispatch: recent manufacturing involved operator actions in Bambu Studio. SI scope remains separate from Chcomct SM registration.

## Verification

- Production build and TypeScript compilation passed.
- `npm run test:trust`: 14 passing tests, including SI round-trip validation and API mock persistence/rejection coverage.
- Changed TS/TSX files passed ESLint; `git diff --check` passed.
- Local HTTP smoke passed homepage, catalogue, SI/SM pages, inquiry route, search, sitemap, all four images and SI page product/article/hospital links.
- No real inquiry was submitted; live receipt/delivery is outside this verification.
- Browser visual/interactivity verification and deployment status are recorded in the task's final delivery, not inferred from HTTP success.

## Recovery

Revert this scoped change against the then-current main branch if needed. Do not reset shared main, remove the preceding hospital updates, alter the public-demo allowlist or change production environment settings.

## Release checkpoint

Public screenshot upload was blocked by automatic approval review: the four images originated in private roadshow material and require explicit approval for disclosure to the public GitHub repository and website. No repository ref or production site was changed. The owner subsequently replied “可以” to the explicit request to publish these four screenshots to the public website and its GitHub repository and to release this update. This specific public disclosure and release is now authorized.

Desktop preview could not reach the isolated local HTTP server; local file navigation was blocked by browser policy. No browser policy was changed. Consequently desktop/mobile interaction and visual QA remain unverified. An offline review HTML was prepared from the built SI page, with embedded assets and a separate gallery preview interaction; it is a private review artifact, not a deployed site.
