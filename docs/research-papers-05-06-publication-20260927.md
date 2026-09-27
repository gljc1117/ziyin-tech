# Digital medicine research series: papers 5 and 6

Publication requested by the site owner on 2026-09-27.

- Paper 5: `/news/fdm-medical-models-rehabilitation-quality-20260927`
- Paper 6: `/news/modified-peek-performance-translation-20260927`
- Authors: 王文波、杨秀雯、李映锡、陈善玮.
- Source: approved V1.0 manuscripts dated 2026-09-27.
- Category: 学术观点, displayed in 子殷洞察.
- Each full text retains three tables and eight references. Internal project references remain plain text; public references link to their sources.
- The papers distinguish historical test reports, external literature, proposed methods and unvalidated future work. Website publication does not imply journal peer review or acceptance as a project assessment deliverable.

## Implementation and checks

The article-specific server component preserves paragraph/table order and adds citation links. Existing article routes and content remain in place. No database, access policy, dependency or deployment configuration changes are included.

- TypeScript check: passed.
- Targeted ESLint: passed.
- Production webpack build: passed.
- Git whitespace check: passed.

Release through the existing main-branch GitHub integration. Only fast-forward updates are allowed; if main changes, incorporate the current article catalog and route before retrying. Rollback, if needed, is a separate revert without resetting unrelated publications.
