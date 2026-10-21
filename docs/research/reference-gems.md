> 🤖 Written by AI --- read/modified by izkreny! 🤓

# Reference Ruby gems

The answer to [#1](https://github.com/izkreny/markdownifico/issues/1): which Ruby gems are maintained and written well enough to read before building a gem, and what each is worth reading for. Every fact below was checked on 2026-10-21 unless its line says otherwise.

83 gems were picked from 207 candidates across nine folders. Each pick is cloned as a read-only reference in the owner's reference-clone tree, one folder per category, at `<folder>/<owner>_<repo>`, and kept current by an update script modelled on the one that serves the Go reference repositories.

## How they were picked

1. **Candidates.** 15 to 20 per folder from four sources: the agent's own knowledge, the [rubytoolbox/catalog](https://github.com/rubytoolbox/catalog) YAML, [awesome-ruby](https://github.com/markets/awesome-ruby), and the dependency trees of gems already chosen. The first release-date cut left `cli` with 7 live candidates and `config` with 6, so both were topped up with a second gather from the same sources before any repository was read.
2. **Release and archive cut.** Every candidate went to the [Ruby Toolbox compare endpoint](https://www.ruby-toolbox.com/pages/docs/api/projects); four it does not know (`unparser`, `yard-lint`, `tty-table`, `xdg`) were read from the RubyGems API instead. Cut: no release since 2025-10-21, or an archived repository. The Toolbox `score` was not used, since it measures popularity.
3. **Repository cut.** The survivors' repositories were read through the GitHub API: a CI workflow (`.github/workflows` or another CI file), a licence (the gem's metadata, the repository's detected licence, or a licence file), a CHANGELOG, and every commit of the last 12 months up to 500, which gives the activity and bus-factor figures; on a repository that reached 500 the author counts cover those 500 commits only. Cut: no CI configuration or no licence.
4. **Reading.** Every survivor was shallow-cloned and read against five yes/no points: a README that explains the design, a maintained CHANGELOG in the repository, a lib directory whose layout matches the concepts, a test suite worth copying, and code you would want to have written. Six subagents gathered the evidence against one written rubric and proposed the scores; the orchestrating session reviewed them, corrected the Spinel calls listed below, and made every pick.
5. **Documentation.** A pick must also have documentation beyond its README: prose in the repository (a docs or guides directory, man pages, an architecture or upgrade document, worked examples), a GitHub wiki with pages, or a documentation site. Generated API pages such as rubydoc.info do not count. Every external site and wiki named below answered HTTP 200 on 2026-10-21.
6. **The pick.** At most 10 per folder, highest score first, with a floor of 3 of the 5 points. Where a tie crossed the 10th slot, the gem whose reading reason another pick already covers was left out, and its entry under *Rejected* says which. Bus factor is recorded, never disqualifying. Two picks from one repository share one clone, in the folder of the pick that comes first in this doc, and the second pick's entry names that folder.

A folder with fewer than 10 picks had fewer than 10 candidates meeting every criterion; it was not padded.

## Spinel candidates

Checked against Spinel's limitations and require documents at commit `3a54c72` of [matz/spinel](https://github.com/matz/spinel): pure Ruby, no native extension, and a core free of string `eval`, `method_missing` dispatch, computed `define_method` or `send` names, and non-literal `require`, with code behind a `RUBY_ENGINE` check discounted. Spinel also resolves a bare `require` only to its bundled features, so a gem that loads its own files with `require` instead of `require_relative` needs those lines rewritten; that is a mechanical change and does not disqualify a gem. Runtime dependencies count against it.

- **toml-rb** (picked, `parsers`): require_relative throughout, only date and strscan from the stdlib, both bundled by Spinel, no runtime dependencies
- **tomlrb** (rejected, `parsers`): require_relative throughout, no runtime dependencies
- **unicode-display_width** (rejected, `cli`): unverified past its core: depends on unicode-emoji, not read
- **whirly** (rejected, `cli`): unverified past its core: depends on paint and unicode-display_width, not read
- **dotenv** (rejected, `config`): unverified past its core: the reader agent found the parser free of refused constructs
- **xdg** (picked, `config`): Forwardable and Data.define, both supported, no runtime dependencies; its own files are loaded with require, which Spinel resolves only to bundled features, so those lines become require_relative

Every other survivor is native or uses a refused construct in its core; its entry or the reading data names which.

## parsers

1. **[prism](https://github.com/ruby/prism)**: parsing: error-tolerant parser design, node generation from config.yml, translation layers; release: docs/releasing.md; testing: snapshot tests
   - Score 5 of 5. Docs: docs/ (design.md, serialization.md, parsing_rules.md, testing.md, releasing.md ...) and doc/ (site).
   - Latest release 2026-01-27 (1.9.0); 470 commits in the last 12 months, 25 authors, 10 with 3 or more commits; kddnewton wrote 56%. Spinel: n/a, native. Clone: `parsers/ruby_prism`.
2. **[regexp_parser](https://github.com/ammar/regexp_parser)**: parsing: scanner/lexer/parser staging and expression tree; API design: expression tree methods
   - Score 5 of 5. Docs: GitHub wiki.
   - Latest release 2026-09-28 (2.13.1); 19 commits in the last 12 months, 1 authors, 1 with 3 or more commits; jaynetics wrote 100%. Spinel: no. Clone: `parsers/ammar_regexp_parser`.
3. **[parser](https://github.com/whitequark/parser)**: parsing: ragel lexer + racc grammar split, AST format spec, builder pattern, diagnostics engine; testing: assert_parses helper
   - Score 4 of 5, missing README design. Docs: doc/ (AST_FORMAT.md, INTERNALS.md, CUSTOMIZATION.md, PRISM_TRANSLATION.md).
   - Latest release 2026-07-16 (3.3.12.0); 23 commits in the last 12 months, 2 authors, 1 with 3 or more commits; koic wrote 96%. Spinel: no. Clone: `parsers/whitequark_parser`.
4. **[kramdown](https://github.com/gettalong/kramdown)**: parsing: regexp-registered block/span parser rules; rendering: converter-per-output-format; docs: self-hosted webgen docs; testing: golden files
   - Score 4 of 5, missing README design. Docs: doc/ (documentation.page, syntax.page, options.page, quickref.page, parser/, converter/) and man/.
   - Latest release 2026-01-19 (2.5.2); 4 commits in the last 12 months, 1 authors, 1 with 3 or more commits; gettalong wrote 100%. Spinel: no. Clone: `parsers/gettalong_kramdown`.
5. **[markly](https://github.com/socketry/markly)**: parsing: AST over cmark-gfm; rendering: renderer classes; docs: socketry guides + releases.md; release: bake tasks
   - Score 4 of 5, missing README design. Docs: guides/ (getting-started, abstract-syntax-tree, extensions, headings, links.yaml).
   - Latest release 2026-09-09 (0.19.0); 37 commits in the last 12 months, 4 authors, 2 with 3 or more commits; ioquatix wrote 57%. Spinel: n/a, native. Clone: `parsers/socketry_markly`.
6. **[nokogiri](https://github.com/sparklemotion/nokogiri)**: API design: one DOM API over libxml2/Gumbo/Java; release: dependencies.yml, native gem packaging; docs: ADRs
   - Score 4 of 5, missing craft. Docs: adr/ (architecture decision records), doc/, ROADMAP.md, AGENTS.md.
   - Latest release 2026-06-18 (1.19.4); 74 commits in the last 12 months, 5 authors, 1 with 3 or more commits; flavorjones wrote 95%. Spinel: n/a, native. Clone: `parsers/sparklemotion_nokogiri`.
7. **[oga](https://github.com/yorickpeterse/oga)**: parsing: lexer plus racc parser plus XPath compiled to Ruby AST; API design: pull and SAX parsers; docs: topic guides
   - Score 4 of 5, missing README design. Docs: doc/ (css_selectors.md, xml_namespaces.md, migrating_from_nokogiri.md, manually_creating_documents.md).
   - Latest release 2026-06-10 (3.5); 5 commits in the last 12 months, 2 authors, 1 with 3 or more commits; yorickpeterse wrote 60%. Spinel: n/a, native. Clone: `parsers/yorickpeterse_oga`.
8. **[csv](https://github.com/ruby/csv)**: parsing: hand-written streaming parser and converter pipeline; API design: huge options surface; docs: recipes
   - Score 4 of 5, missing README design. Docs: doc/csv/ (recipes, arguments, options).
   - Latest release 2026-07-26 (3.3.6); 5 commits in the last 12 months, 4 authors, 0 with 3 or more commits; kou wrote 40%. Spinel: no. Clone: `parsers/ruby_csv`.
9. **[toml-rb](https://github.com/emancu/toml-rb)**: parsing: StringScanner-based hand parser with visitor nodes; testing: spec example corpus
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-09-28 (6.0.0); 95 commits in the last 12 months, 4 authors, 2 with 3 or more commits; emancu wrote 94%. Spinel: candidate. Clone: `parsers/emancu_toml-rb`.
10. **[json](https://github.com/ruby/json)**: parsing: native parser/generator with pure-Ruby fallback; API design: Coder and generator state; release: README Release section
   - Score 3 of 5, missing README design, lib/ layout. Docs: docs.ruby-lang.org/en/master/JSON.html.
   - Latest release 2026-10-13 (3.1.0); 342 commits in the last 12 months, 35 authors, 11 with 3 or more commits; byroot wrote 59%. Spinel: n/a, native. Clone: `parsers/ruby_json`.

## renderers

1. **[erb](https://github.com/ruby/erb)**: rendering: template to Ruby source compiler with hooks; docs: worked examples in class docs
   - Score 5 of 5. Docs: _doc/ (erb_executable.md).
   - Latest release 2026-08-04 (6.0.7); 65 commits in the last 12 months, 19 authors, 3 with 3 or more commits; k0kubun wrote 38%. Spinel: n/a, native. Clone: `renderers/ruby_erb`.
2. **[temple](https://github.com/judofyr/temple)**: plugin loading: engine/filter/generator pipeline; API design: S-expression IR and grammar DSL; rendering: template compilation
   - Score 5 of 5. Docs: EXPRESSIONS.md (the S-expression spec).
   - Latest release 2026-08-17 (0.10.7); 9 commits in the last 12 months, 5 authors, 1 with 3 or more commits; k0kubun wrote 44%. Spinel: no. Clone: `renderers/judofyr_temple`.
3. **[liquid](https://github.com/Shopify/liquid)**: rendering: safe template language with drops and resource limits; parsing: tokenizer/lexer/parser; API design: environments and filters
   - Score 5 of 5. Docs: shopify.github.io/liquid.
   - Latest release 2026-09-17 (5.14.0); 136 commits in the last 12 months, 11 authors, 8 with 3 or more commits; karreiro wrote 26%. Spinel: no. Clone: `renderers/Shopify_liquid`.
4. **[mustache](https://github.com/mustache/mustache)**: rendering: logic-less templates compiled to Ruby; CLI: bin/mustache and man pages; testing: shared spec suite
   - Score 5 of 5. Docs: man/ (mustache.1, mustache.5 sources).
   - Latest release 2026-08-20 (1.1.3); 19 commits in the last 12 months, 3 authors, 1 with 3 or more commits; locks wrote 84%. Spinel: no. Clone: `renderers/mustache_mustache`.
5. **[haml](https://github.com/haml/haml)**: rendering: Haml parser compiled to Temple S-expressions; plugin loading: Temple filter chain
   - Score 4 of 5, missing README design. Docs: REFERENCE.md, FAQ.md.
   - Latest release 2026-09-01 (7.5.1); 70 commits in the last 12 months, 16 authors, 3 with 3 or more commits; k0kubun wrote 40%. Spinel: no. Clone: `renderers/haml_haml`.
6. **[slim](https://github.com/slim-template/slim)**: plugin loading: Temple filter pipeline; rendering: template engine on Temple; testing: literate Markdown tests
   - Score 4 of 5, missing README design. Docs: doc/ (include.md, logic_less.md, smart.md, translator.md, jp/).
   - Latest release 2026-07-24 (5.2.2); 13 commits in the last 12 months, 3 authors, 1 with 3 or more commits; minad wrote 85%. Spinel: no. Clone: `renderers/slim-template_slim`.
7. **[rouge](https://github.com/rouge-ruby/rouge)**: plugin loading: lexer registry with tags/aliases/filenames and lazy loading; rendering: formatters and themes; docs: lexer dev guide
   - Score 4 of 5, missing README design. Docs: docs/ (LexerDevelopment.md, Languages.md, DevEnvironment.md, Docker.md, sample app).
   - Latest release 2026-08-06 (5.1.0); 120 commits in the last 12 months, 32 authors, 6 with 3 or more commits; jneen wrote 44%. Spinel: no. Clone: `renderers/rouge-ruby_rouge`.
8. **[alba](https://github.com/okuramasafumi/alba)**: API design: resource DSL with attributes/associations/traits; testing: property-based tests
   - Score 4 of 5, missing README design. Docs: docs/ (migrate_from_jbuilder.md, migrate_from_active_model_serializers.md, rails.md), HACKING.md.
   - Latest release 2026-10-17 (4.0.1); 165 commits in the last 12 months, 9 authors, 4 with 3 or more commits; okuramasafumi wrote 88%. Spinel: no. Clone: `renderers/okuramasafumi_alba`.
9. **[phlex](https://github.com/yippee-fun/phlex)**: rendering: components rendering straight to a buffer, optional method compiler; API design: view-as-object; testing: Quickdraw
   - Score 3 of 5, missing README design, CHANGELOG. Docs: phlex.fun.
   - Latest release 2026-02-06 (2.4.1); 170 commits in the last 12 months, 8 authors, 2 with 3 or more commits; joeldrapper wrote 94%. Spinel: no. Clone: `renderers/yippee-fun_phlex`.
10. **[jbuilder](https://github.com/rails/jbuilder)**: API design: block DSL building JSON; rendering: Rails template handler
   - Score 3 of 5, missing README design, CHANGELOG. Docs: GitHub wiki.
   - Latest release 2026-05-26 (2.15.1); 25 commits in the last 12 months, 7 authors, 2 with 3 or more commits; rafaelfranca wrote 56%. Spinel: no. Clone: `renderers/rails_jbuilder`.

## linters

1. **[rubocop](https://github.com/rubocop/rubocop)**: plugin loading (lib/rubocop/plugin/loader.rb, lint_roller plugins); rule API (Cop::Base, Commissioner callbacks, Corrector); config (ConfigLoader inheritance/merging)
   - Score 4 of 5, missing README design. Docs: docs/modules/ROOT/pages/ (Antora site source: configuration, development, plugins, cops_*.adoc, formatters, usage); CONTRIBUTING.md; AGENTS.md.
   - Latest release 2026-10-10 (1.92.0); 500+ commits in the last 12 months, 11 authors, 4 with 3 or more commits; koic wrote 64%. Spinel: no. Clone: `linters/rubocop_rubocop`.
2. **[standard](https://github.com/standardrb/standard)**: CLI (argv splitting and settings merge over RuboCop); config (opinionated config assembly, plugin composition via lint_roller); release (docs/RELEASE.md)
   - Score 4 of 5, missing README design. Docs: docs/ARCHITECTURE.md, RELEASE.md, RUBY_VERSIONS.md, UPGRADING.md.
   - Latest release 2026-10-05 (1.57.0); 60 commits in the last 12 months, 4 authors, 3 with 3 or more commits; jasonkarns wrote 50%. Spinel: no. Clone: `linters/standardrb_standard`.
3. **[rubocop-ast](https://github.com/rubocop/rubocop-ast)**: parsing (NodePattern lexer.rex/parser.y/compiler pipeline); API design (Node subclasses per type, traversal)
   - Score 4 of 5, missing README design. Docs: docs/modules/ROOT/pages/ (node_pattern.adoc, node_pattern_compiler.adoc, node_types.adoc, traversal.adoc, processed_source.adoc).
   - Latest release 2026-07-04 (1.50.0); 59 commits in the last 12 months, 5 authors, 3 with 3 or more commits; bbatsov wrote 39%. Spinel: no. Clone: `linters/rubocop_rubocop-ast`.
4. **[rubocop-rspec](https://github.com/rubocop/rubocop-rspec)**: rule API (cop authoring with def_node_matcher, autocorrect); testing (offense/correction annotated specs)
   - Score 4 of 5, missing README design. Docs: docs/modules/ROOT/pages/ (cops_rspec.adoc generated, development.adoc, installation.adoc).
   - Latest release 2026-06-06 (3.10.2); 158 commits in the last 12 months, 19 authors, 8 with 3 or more commits; bquorning wrote 42%. Spinel: no. Clone: `linters/rubocop_rubocop-rspec`.
5. **[reek](https://github.com/troessner/reek)**: rule API (smell detector base class and registration); docs (per-smell docs and internals guide); testing (custom RSpec matcher reek_of)
   - Score 4 of 5, missing README design. Docs: docs/ (one .md per smell, How-reek-works-internally.md, How-To-Write-New-Detectors.md, API.md, Command-Line-Options.md, Reek-4-to-Reek-5-migration.md).
   - Latest release 2026-10-02 (6.6.0); 47 commits in the last 12 months, 3 authors, 1 with 3 or more commits; mvz wrote 94%. Spinel: no. Clone: `linters/troessner_reek`.
6. **[haml_lint](https://github.com/sds/haml-lint)**: rule API (Linter + LinterRegistry, directive comments); testing (linter shared context); CLI (runner/reporters)
   - Score 4 of 5, missing README design. Docs: lib/haml_lint/linter/README.md (per-linter docs); doc/ only an image.
   - Latest release 2026-08-20 (0.78.0); 48 commits in the last 12 months, 9 authors, 2 with 3 or more commits; sds wrote 54%. Spinel: no. Clone: `linters/sds_haml-lint`.
7. **[herb](https://github.com/marcoroth/herb)**: parsing (C lexer/parser for HTML+ERB with Prism annotation); testing (snapshot goldens); rendering (Herb::Engine)
   - Score 4 of 5, missing README design. Docs: docs/docs/ (VitePress source: overview, language, bindings, c-reference, configuration, integrations, blog).
   - Latest release 2026-10-20 (0.11.1); 435 commits in the last 12 months, 27 authors, 5 with 3 or more commits; marcoroth wrote 88%. Spinel: n/a, native. Clone: `linters/marcoroth_herb`.
8. **[rubycritic](https://github.com/whitesmith/rubycritic)**: plugin loading (analyser pipeline composing flay/flog/reek); rendering (HTML generators with ERB); CLI (commands/ with compare mode)
   - Score 4 of 5, missing README design. Docs: docs/ (core-metrics.md, formatters.md, building-own-code-climate.md, jenkins-pr-reviews.md), ROADMAP.md, CONTRIBUTING.md.
   - Latest release 2026-01-27 (5.0.0); 24 commits in the last 12 months, 7 authors, 2 with 3 or more commits; faisal wrote 54%. Spinel: no. Clone: `linters/whitesmith_rubycritic`.
9. **[yard-lint](https://github.com/mensfeld/yard-lint)**: rule API (validator = config + parser + result + messages_builder module); config (department/validator config, todo baseline, --check-todo); CLI (diff mode, SARIF output)
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-09-23 (1.12.0); 341 commits in the last 12 months, 5 authors, 2 with 3 or more commits; mensfeld wrote 97%. Spinel: no. Clone: `linters/mensfeld_yard-lint`.
10. **[pronto](https://github.com/prontolabs/pronto)**: plugin loading (inherited-hook runner registry, runners discovered via Gem::Specification in gem_names.rb); CLI (Thor); API design (small Runner base class contract)
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2025-12-05 (0.11.5); 6 commits in the last 12 months, 5 authors, 0 with 3 or more commits; ashkulz wrote 33%. Spinel: no. Clone: `linters/prontolabs_pronto`.

## cli

1. **[dry-cli](https://github.com/dry-rb/dry-cli)**: CLI: registry of commands/namespaces, option casting, inline commands
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-cli.
   - Latest release 2026-01-21 (1.4.1); 34 commits in the last 12 months, 10 authors, 5 with 3 or more commits; timriley wrote 32%. Spinel: no. Clone: `cli/dry-rb_dry-cli`.
2. **[clamp](https://github.com/mdub/clamp)**: CLI: declarative options/parameters/subcommands as class DSL; shell completion generation
   - Score 4 of 5, missing README design. Docs: examples/ (runnable example commands); no prose docs dir.
   - Latest release 2026-03-21 (1.5.2); 46 commits in the last 12 months, 3 authors, 2 with 3 or more commits; mdub wrote 89%. Spinel: no. Clone: `cli/mdub_clamp`.
3. **[samovar](https://github.com/socketry/samovar)**: CLI: declarative rows (options/one/many/split/nested) per command class; completion; testable command objects
   - Score 4 of 5, missing README design. Docs: guides/getting-started/readme.md, guides/completion/readme.md, context/*.md.
   - Latest release 2026-06-17 (2.5.1); 11 commits in the last 12 months, 3 authors, 2 with 3 or more commits; ioquatix wrote 64%. Spinel: no. Clone: `cli/socketry_samovar`.
4. **[cli-kit](https://github.com/Shopify/cli-kit)**: CLI: app skeleton with registry/resolver/executor; error handling and signal traps
   - Score 4 of 5, missing CHANGELOG. Docs: examples/ (minimal, single-file, todo-list), TODO.md.
   - Latest release 2026-09-21 (5.3.1); 22 commits in the last 12 months, 4 authors, 3 with 3 or more commits; vinistock wrote 50%. Spinel: no. Clone: `cli/Shopify_cli-kit`.
5. **[sod](https://github.com/bkuhlmann/sod)**: CLI: composable commands/actions on top of optparse, prefab actions (config, help, version)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: doc/architecture.msd (diagram source); alchemists.io/projects/sod.
   - Latest release 2026-09-17 (2.5.0); 44 commits in the last 12 months, 1 authors, 1 with 3 or more commits; bkuhlmann wrote 100%. Spinel: no. Clone: `cli/bkuhlmann_sod`.

## config

1. **[anyway_config](https://github.com/palkan/anyway_config)**: config (layered loaders pipeline, tracing of value sources); plugin loading (loader registry); API design (attr_config DSL)
   - Score 5 of 5. Docs: skills/anyway-config (agent skill prose); sig/ RBS types; no docs/ directory.
   - Latest release 2026-10-20 (2.9.0); 21 commits in the last 12 months, 5 authors, 2 with 3 or more commits; palkan wrote 62%. Spinel: no. Clone: `config/palkan_anyway_config`.
2. **[rails-settings-cached](https://github.com/huacnlee/rails-settings-cached)**: config (DB-backed typed settings with caching); API design (field DSL on an ActiveRecord model)
   - Score 5 of 5. Docs: docs/backward-compatible-to-scoped-settings.md.
   - Latest release 2026-09-16 (2.10.0); 4 commits in the last 12 months, 2 authors, 1 with 3 or more commits; huacnlee wrote 75%. Spinel: no. Clone: `config/huacnlee_rails-settings-cached`.
3. **[dry-configurable](https://github.com/dry-rb/dry-configurable)**: config (settings DSL, nested settings, constructors, inheritance); API design (extend/include mixin with class and instance settings)
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-configurable.
   - Latest release 2026-05-14 (1.4.0); 12 commits in the last 12 months, 3 authors, 2 with 3 or more commits; timriley wrote 50%. Spinel: no. Clone: `config/dry-rb_dry-configurable`.
4. **[chamber](https://github.com/thekompanee/chamber)**: config (layered settings files, namespaces, secure/encrypted values); CLI (Thor commands/ for secure, sign, verify)
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-01-08 (3.2.0); 7 commits in the last 12 months, 2 authors, 1 with 3 or more commits; jfelchner wrote 71%. Spinel: no. Clone: `config/thekompanee_chamber`.
5. **[dry-schema](https://github.com/dry-rb/dry-schema)**: API design (schema DSL compiling to rules and type-coerced steps); parsing (key map, coercion pipeline)
   - Score 4 of 5, missing README design. Docs: examples/ (basic.rb, each.rb, json.rb, nested.rb, params.rb) only; user docs on dry-rb.org; hanakai.org/learn/dry/dry-schema.
   - Latest release 2026-03-03 (1.16.0); 28 commits in the last 12 months, 10 authors, 2 with 3 or more commits; timriley wrote 57%. Spinel: no. Clone: `config/dry-rb_dry-schema`.
6. **[ultra_settings](https://github.com/bdurand/ultra_settings)**: config (env var, runtime setting and YAML source hierarchy with source tracking); docs (ARCHITECTURE.md with diagram)
   - Score 4 of 5, missing README design. Docs: ARCHITECTURE.md, AGENTS.md, yard_plugin/.
   - Latest release 2026-08-15 (2.10.1); 90 commits in the last 12 months, 2 authors, 1 with 3 or more commits; bdurand wrote 98%. Spinel: no. Clone: `config/bdurand_ultra_settings`.
7. **[xdg](https://github.com/bkuhlmann/xdg)**: API design (small immutable objects with injected environment); config (XDG base directory lookup)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: alchemists.io/projects/xdg.
   - Latest release 2026-09-16 (10.4.0); 33 commits in the last 12 months, 1 authors, 1 with 3 or more commits; bkuhlmann wrote 100%. Spinel: candidate. Clone: `config/bkuhlmann_xdg`.
8. **[runcom](https://github.com/bkuhlmann/runcom)**: config (locating rc files across XDG config/home paths, local vs global); API design
   - Score 3 of 5, missing README design, CHANGELOG. Docs: alchemists.io/projects/runcom.
   - Latest release 2026-09-16 (13.4.0); 38 commits in the last 12 months, 1 authors, 1 with 3 or more commits; bkuhlmann wrote 100%. Spinel: no. Clone: `config/bkuhlmann_runcom`.

## frameworks

1. **[roda](https://github.com/jeremyevans/roda)**: plugin loading: plugin system via Module composition; rule API: matchers in the routing tree; API design
   - Score 5 of 5. Docs: doc/ (conventions.rdoc, release_notes/ with 146 files), www/ (site source with pages).
   - Latest release 2026-10-09 (3.109.0); 127 commits in the last 12 months, 5 authors, 1 with 3 or more commits; jeremyevans wrote 97%. Spinel: no. Clone: `frameworks/jeremyevans_roda`.
2. **[rack](https://github.com/rack/rack)**: protocol: env/status-headers-body spec and Rack::Lint; API design: middleware composition (Builder)
   - Score 4 of 5, missing README design. Docs: SPEC.rdoc (protocol spec), GETTING-STARTED.md, UPGRADE-GUIDE.md, docs/index.html.
   - Latest release 2026-08-13 (3.2.7); 80 commits in the last 12 months, 26 authors, 5 with 3 or more commits; jeremyevans wrote 41%. Spinel: no. Clone: `frameworks/rack_rack`.
3. **[hanami](https://github.com/hanami/hanami)**: config: app/slice configuration; plugin loading: providers and slices on dry-system
   - Score 4 of 5, missing README design. Docs: FEATURES.md, README.repo.md; no prose guides dir; hanakai.org/learn/hanami.
   - Latest release 2026-08-21 (3.0.2); 105 commits in the last 12 months, 10 authors, 5 with 3 or more commits; timriley wrote 71%. Spinel: no. Clone: `frameworks/hanami_hanami`.
4. **[dry-system](https://github.com/dry-rb/dry-system)**: plugin loading: container plugins, providers and auto-registration; config: container settings
   - Score 4 of 5, missing README design. Docs: examples/ directory; docs on dry-rb.org; hanakai.org/learn/dry/dry-system.
   - Latest release 2025-11-30 (1.2.5); 15 commits in the last 12 months, 5 authors, 2 with 3 or more commits; timriley wrote 60%. Spinel: no. Clone: `frameworks/dry-rb_dry-system`.
5. **[minitest](https://github.com/minitest/minitest)**: testing: runner, reporters, plugin hooks (Minitest.load); API design: assertions plus spec DSL
   - Score 4 of 5, missing README design. Docs: design_rationale.rb (spec to unit-test mapping), README.rdoc FAQ; no docs dir.
   - Latest release 2026-05-01 (6.0.6); 109 commits in the last 12 months, 1 authors, 1 with 3 or more commits; zenspider wrote 100%. Spinel: no. Clone: `frameworks/minitest_minitest`.
6. **[rake](https://github.com/ruby/rake)**: rule API: tasks, file tasks and pattern rules; CLI: application options/loader
   - Score 4 of 5, missing README design. Docs: doc/ (rakefile.rdoc, command_line_usage.rdoc, glossary.rdoc, rational.rdoc, proto_rake.rdoc, rake.1 man page).
   - Latest release 2026-04-16 (13.4.2); 122 commits in the last 12 months, 9 authors, 3 with 3 or more commits; matzbot wrote 48%. Spinel: no. Clone: `frameworks/ruby_rake`.
7. **[bridgetown](https://github.com/bridgetownrb/bridgetown)**: plugin loading: PluginManager (bundler/gems/plugins folder); rendering: resources/converters/layouts; config
   - Score 4 of 5, missing README design. Docs: bridgetown-website/src/_docs (42 entries of prose docs; site source).
   - Latest release 2026-07-06 (2.2.2); 142 commits in the last 12 months, 15 authors, 3 with 3 or more commits; jaredcwhite wrote 60%. Spinel: no. Clone: `frameworks/bridgetownrb_bridgetown`.
8. **[yard](https://github.com/lsegal/yard)**: docs: parser -> handlers -> registry -> templates pipeline; parsing: Ruby/C handlers; rendering: templates
   - Score 4 of 5, missing README design. Docs: docs/ (Overview.md, Parser.md, Handlers.md, CodeObjects.md, Tags.md, TagsArch.md, Templates.md, GettingStarted.md, WhatsNew.md).
   - Latest release 2026-07-14 (0.9.45); 131 commits in the last 12 months, 11 authors, 5 with 3 or more commits; lsegal wrote 82%. Spinel: no. Clone: `frameworks/lsegal_yard`.
9. **[rails](https://github.com/rails/rails)**: plugin loading: Railtie/Engine/initializer graph; config: Rails::Application configuration; CLI: command classes
   - Score 4 of 5, missing README design. Docs: rails_rails/guides/source (82 prose guides), railties/RDOC_MAIN.md, RELEASING_RAILS.md.
   - Latest release 2026-09-24 (8.1.4); 500+ commits in the last 12 months, 64 authors, 22 with 3 or more commits; amatsuda wrote 19%. Spinel: no. Clone: `frameworks/rails_rails`.
10. **[pry](https://github.com/pry/pry)**: plugin loading: command sets and commands; API design: embeddable REPL; testing: mock input helpers in spec/helper.rb
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-10-20 (0.16.1); 40 commits in the last 12 months, 5 authors, 1 with 3 or more commits; andrehjr wrote 90%. Spinel: no. Clone: `frameworks/pry_pry`.

## clients

1. **[sequel](https://github.com/jeremyevans/sequel)**: API design (dataset DSL), plugin loading (plugins/ and extensions/), docs
   - Score 5 of 5. Docs: doc/ (33 rdoc guides, release_notes/), www/ site source.
   - Latest release 2026-10-01 (5.109.0); 208 commits in the last 12 months, 14 authors, 2 with 3 or more commits; jeremyevans wrote 91%. Spinel: no. Clone: `clients/jeremyevans_sequel`.
2. **[pg](https://github.com/ged/ruby-pg)**: protocol (type casting, COPY, pipeline), concurrency (fiber scheduler, GVL wrappers)
   - Score 5 of 5. Docs: README-OS_X.rdoc, README-Windows.rdoc, README.ja.md, sample/, translation/, POSTGRES.
   - Latest release 2026-10-02 (1.7.0); 155 commits in the last 12 months, 8 authors, 5 with 3 or more commits; larskanis wrote 79%. Spinel: n/a, native. Clone: `clients/ged_ruby-pg`.
3. **[typhoeus](https://github.com/typhoeus/typhoeus)**: concurrency (Hydra parallel queue), API design (concern modules)
   - Score 5 of 5. Docs: UPGRADE.md, perf/; usage docs only in the long README.
   - Latest release 2026-03-10 (1.6.0); 8 commits in the last 12 months, 2 authors, 2 with 3 or more commits; felipedmesquita wrote 63%. Spinel: no. Clone: `clients/typhoeus_typhoeus`.
4. **[async-http](https://github.com/socketry/async-http)**: concurrency (Async fibers, connection pool), protocol (HTTP/1 and HTTP/2), testing
   - Score 4 of 5, missing README design. Docs: guides/ (4 prose guides), context/, releases.md.
   - Latest release 2026-09-15 (0.105.0); 66 commits in the last 12 months, 5 authors, 2 with 3 or more commits; ioquatix wrote 61%. Spinel: no. Clone: `clients/socketry_async-http`.
5. **[aws-sdk-core](https://github.com/aws/aws-sdk-ruby)**: plugin loading (seahorse plugins and handler stack), protocol (xml/json/query/rest serializers), API design
   - Score 4 of 5, missing README design. Docs: AWS SDK for Ruby developer guide.
   - Latest release 2026-10-19 (3.258.0); 350 commits in the last 12 months, 23 authors, 6 with 3 or more commits; aws-sdk-ruby-automation wrote 70%. Spinel: no. Clone: `clients/aws_aws-sdk-ruby`.
6. **[sqlite3](https://github.com/sparklemotion/sqlite3-ruby)**: docs (ADR practice, install guide), release (vendored sqlite packaging), testing
   - Score 4 of 5, missing README design. Docs: adr/2024-09-fork-safety.md, FAQ.md, INSTALLATION.md.
   - Latest release 2026-10-19 (2.10.1); 92 commits in the last 12 months, 11 authors, 2 with 3 or more commits; flavorjones wrote 83%. Spinel: n/a, native. Clone: `clients/sparklemotion_sqlite3-ruby`.
7. **[http](https://github.com/httprb/http)**: API design (chainable builder), plugin loading (features), protocol (timeouts, connection)
   - Score 4 of 5, missing README design. Docs: UPGRADING.md, CONTRIBUTING.md, sig/ (RBS); API docs hosted externally.
   - Latest release 2026-07-14 (6.0.4); 127 commits in the last 12 months, 8 authors, 2 with 3 or more commits; sferik wrote 92%. Spinel: no. Clone: `clients/httprb_http`.
8. **[httpx](https://github.com/HoneyryderChuck/httpx)**: plugin loading (lib/httpx/plugins, per-class XMethods modules), concurrency, protocol (HTTP/2, DNS resolvers)
   - Score 4 of 5, missing README design. Docs: doc/release_notes/, test/README.md, CHEATSHEET.md, sig/ (RBS); user docs live on wiki/site, not in repo.
   - Latest release 2026-10-14 (1.9.0); 500+ commits in the last 12 months, 12 authors, 1 with 3 or more commits; HoneyryderChuck wrote 97%. Spinel: no. Clone: `clients/HoneyryderChuck_httpx`.
9. **[sawyer](https://github.com/lostisland/sawyer)**: API design (hypermedia resources over Faraday)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: SPEC.md, example/.
   - Latest release 2025-10-23 (0.9.3); 5 commits in the last 12 months, 2 authors, 1 with 3 or more commits; iMacTia wrote 60%. Spinel: no. Clone: `clients/lostisland_sawyer`.
10. **[faraday](https://github.com/lostisland/faraday)**: plugin loading (middleware stack and registries), API design (adapter abstraction)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: docs/ (documentation-site source: getting-started, middleware, adapters, advanced, customization), UPGRADING.md.
   - Latest release 2026-10-16 (2.15.0); 68 commits in the last 12 months, 19 authors, 5 with 3 or more commits; iMacTia wrote 31%. Spinel: no. Clone: `clients/lostisland_faraday`.

## servers

1. **[falcon](https://github.com/socketry/falcon)**: concurrency: fiber-per-request server on async; config: environment/ service definitions; CLI: samovar-based command/
   - Score 5 of 5. Docs: guides/ (getting-started, how-it-works, deployment, cluster-deployment, performance-tuning, rails-integration, websockets, interim-responses).
   - Latest release 2026-08-09 (0.57.0); 52 commits in the last 12 months, 4 authors, 2 with 3 or more commits; ioquatix wrote 58%. Spinel: no. Clone: `servers/socketry_falcon`.
2. **[concurrent-ruby](https://github.com/ruby-concurrency/concurrent-ruby)**: concurrency: executors, promises, atomics, memory-model docs; docs: executed doc sources; API design: shared interfaces over MRI/JRuby/Truffle
   - Score 5 of 5. Docs: docs-source/ (promises.in.md, thread_pools.md, synchronization.md, signpost.md, channel.md, dataflow.md), examples/.
   - Latest release 2026-07-19 (1.3.8); 33 commits in the last 12 months, 11 authors, 4 with 3 or more commits; eregon wrote 39%. Spinel: no. Clone: `servers/ruby-concurrency_concurrent-ruby`.
3. **[nio4r](https://github.com/socketry/nio4r)**: concurrency: selector/monitor I/O multiplexing primitives; API design: minimal portable API over three backends
   - Score 5 of 5. Docs: GitHub wiki.
   - Latest release 2025-10-31 (2.7.5); 4 commits in the last 12 months, 3 authors, 0 with 3 or more commits; ioquatix wrote 50%. Spinel: n/a, native. Clone: `servers/socketry_nio4r`.
4. **[async](https://github.com/socketry/async)**: concurrency: fiber scheduler, task tree, barrier/semaphore primitives; docs: guides; API design: Async do /task/
   - Score 4 of 5, missing README design. Docs: guides/ (getting-started, tasks, scheduler, best-practices, thread-safety, debugging), lib/async/*.md, examples/.
   - Latest release 2026-09-14 (2.46.0); 71 commits in the last 12 months, 6 authors, 3 with 3 or more commits; ioquatix wrote 73%. Spinel: no. Clone: `servers/socketry_async`.
5. **[karafka](https://github.com/karafka/karafka)**: concurrency: listener/coordinator/worker pipeline per subscription group; config: routing DSL and contracts; plugin loading: Pro loader injecting into base classes
   - Score 4 of 5, missing README design. Docs: karafka.io/docs.
   - Latest release 2026-08-24 (2.6.1); 345 commits in the last 12 months, 2 authors, 1 with 3 or more commits; mensfeld wrote 100%. Spinel: no. Clone: `servers/karafka_karafka`.
6. **[resque](https://github.com/resque/resque)**: plugin loading: hook naming conventions and Plugin.lint; concurrency: fork-per-job worker; docs: HOOKS.md
   - Score 4 of 5, missing craft. Docs: docs/ (HOOKS.md, PLUGINS.md, FAILURE_IDS.md).
   - Latest release 2026-10-16 (3.2.0); 69 commits in the last 12 months, 21 authors, 5 with 3 or more commits; PatrickTulskie wrote 42%. Spinel: no. Clone: `servers/resque_resque`.
7. **[solid_queue](https://github.com/rails/solid_queue)**: concurrency: supervisor/worker/dispatcher process model, thread and fiber pools; plugin loading: lifecycle hooks; config: configuration.rb
   - Score 4 of 5, missing CHANGELOG. Docs: UPGRADING.md only.
   - Latest release 2026-08-21 (1.7.0); 181 commits in the last 12 months, 44 authors, 8 with 3 or more commits; rosa wrote 45%. Spinel: no. Clone: `servers/rails_solid_queue`.
8. **[sidekiq](https://github.com/sidekiq/sidekiq)**: concurrency: thread-per-processor with capsules and heartbeat; plugin loading: middleware chains; docs: internals.md
   - Score 4 of 5, missing README design. Docs: docs/ (internals.md, middleware.md, capsule.md, menu.md, upgrade guides 3.0-8.0).
   - Latest release 2026-08-17 (8.1.7); 283 commits in the last 12 months, 41 authors, 6 with 3 or more commits; mperham wrote 63%. Spinel: no. Clone: `servers/sidekiq_sidekiq`.
9. **[pitchfork](https://github.com/Shopify/pitchfork)**: concurrency: prefork monitor, reaping, refork templates (mold); docs: design/philosophy write-ups; config: configurator.rb
   - Score 4 of 5, missing craft. Docs: docs/ (DESIGN, PHILOSOPHY, FORK_SAFETY, REFORKING, SIGNALS, TUNING, CONFIGURATION, MIGRATING_FROM_UNICORN, Application_Timeouts).
   - Latest release 2026-01-28 (0.18.2); 73 commits in the last 12 months, 7 authors, 4 with 3 or more commits; byroot wrote 44%. Spinel: n/a, native. Clone: `servers/Shopify_pitchfork`.
10. **[puma](https://github.com/puma/puma)**: concurrency: thread pool + reactor + cluster/fork_worker supervision; config: DSL in dsl.rb; protocol: HTTP/1.1 parsing and TLS (minissl)
   - Score 4 of 5, missing craft. Docs: docs/ (architecture.md, deployment.md, signals.md, restart.md, fork_worker.md, plugins.md, stats.md, systemd.md, kubernetes.md, nginx.md, 5.0-8.0 upgrade guides).
   - Latest release 2026-05-26 (8.0.2); 150 commits in the last 12 months, 41 authors, 6 with 3 or more commits; nateberkopec wrote 30%. Spinel: n/a, native. Clone: `servers/puma_puma`.

## miscellaneous

1. **[mustermann](https://github.com/sinatra/mustermann)**: parsing: pattern string to AST to Regexp pipeline; API design: pattern types, composition, expand and peek
   - Score 5 of 5. Docs: docs/ (patterns/*.md per pattern type, custom-patterns.md, performance.md).
   - Latest release 2026-10-10 (4.0.1); 127 commits in the last 12 months, 4 authors, 2 with 3 or more commits; rkh wrote 94%. Spinel: no. Clone: `miscellaneous/sinatra_mustermann`.
2. **[dry-types](https://github.com/dry-rb/dry-types)**: API design: composable type objects (/ & constrained, default, schema); parsing/coercion pipelines (call_safe vs call_unsafe)
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-types.
   - Latest release 2026-02-06 (1.9.1); 18 commits in the last 12 months, 4 authors, 2 with 3 or more commits; timriley wrote 67%. Spinel: no. Clone: `miscellaneous/dry-rb_dry-types`.
3. **[dry-monads](https://github.com/dry-rb/dry-monads)**: API design: monad/functor interfaces and do-notation; concurrency: Task monad over concurrent-ruby
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-monads.
   - Latest release 2026-09-11 (1.11.0); 25 commits in the last 12 months, 5 authors, 2 with 3 or more commits; timriley wrote 60%. Spinel: no. Clone: `miscellaneous/dry-rb_dry-monads`.
4. **[activesupport](https://github.com/rails/rails)**: API design: Concern, callbacks, notifications, core_ext layout; config: lazy_load_hooks and ordered options
   - Score 4 of 5, missing README design. Docs: rails_rails/guides/source/active_support_core_extensions.md, active_support_instrumentation.md, api_documentation_guidelines.md; extensive RDoc in source.
   - Latest release 2026-09-24 (8.1.4); 500+ commits in the last 12 months, 64 authors, 22 with 3 or more commits; amatsuda wrote 19%. Spinel: no. Clone: `frameworks/rails_rails`, shared with the rails pick, since one repository is cloned once.
5. **[webmock](https://github.com/bblimke/webmock)**: testing: stub and expectation API; protocol: swapping HTTP client adapters behind one registry
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-10-14 (3.34.0); 125 commits in the last 12 months, 18 authors, 3 with 3 or more commits; bblimke wrote 58%. Spinel: no. Clone: `miscellaneous/bblimke_webmock`.
6. **[vcr](https://github.com/vcr/vcr)**: testing: cassette record/replay design; plugin loading: library_hooks and hook registry; config
   - Score 4 of 5, missing README design. Docs: docs/ (docsify site: cassettes, configuration, hooks, record_modes, request_matching) and features/.
   - Latest release 2025-12-22 (6.4.0); 11 commits in the last 12 months, 7 authors, 1 with 3 or more commits; fkmy wrote 27%. Spinel: no. Clone: `miscellaneous/vcr_vcr`.
7. **[factory_bot](https://github.com/thoughtbot/factory_bot)**: API design: Ruby DSL with instance_eval and evaluator; testing: fixtures/factories and strategy objects
   - Score 4 of 5, missing README design. Docs: docs/src (mdbook: defining, traits, sequences, callbacks, cookbook, ref) and GETTING_STARTED.md.
   - Latest release 2026-05-04 (6.6.0); 31 commits in the last 12 months, 16 authors, 1 with 3 or more commits; neilvcarvalho wrote 45%. Spinel: no. Clone: `miscellaneous/thoughtbot_factory_bot`.
8. **[mutant](https://github.com/mbj/mutant)**: testing: mutation testing engine; parsing: AST node mutators; CLI/concurrency: parallel runner and isolation
   - Score 4 of 5, missing README design. Docs: docs/ (nomenclature.md, configuration.md, hooks.md, concurrency.md, limitations.md, reading-reports.md, ast-pattern.md, mutant-rspec.md).
   - Latest release 2026-10-21 (0.17.1); 312 commits in the last 12 months, 8 authors, 4 with 3 or more commits; mbj wrote 62%. Spinel: no. Clone: `miscellaneous/mbj_mutant`.
9. **[simplecov](https://github.com/simplecov-ruby/simplecov)**: testing: coverage collection, merging and reporting; config: configuration DSL and profiles; CLI
   - Score 4 of 5, missing README design. Docs: docs/ (Configuration.md, CLI.md, Formatters.md, Parallelism.md, Production.md, Troubleshooting.md, Roadmap.md) and man/simplecov.1.
   - Latest release 2026-09-30 (1.3.2); 473 commits in the last 12 months, 11 authors, 3 with 3 or more commits; sferik wrote 96%. Spinel: no. Clone: `miscellaneous/simplecov-ruby_simplecov`.
10. **[timecop](https://github.com/travisjeffery/timecop)**: testing: clock mocking via a time stack and monkeypatching Time/Date
   - Score 4 of 5, missing craft. Docs: GitHub wiki.
   - Latest release 2026-04-12 (0.9.11); 6 commits in the last 12 months, 6 authors, 0 with 3 or more commits; NikolasPilavakis wrote 17%. Spinel: no. Clone: `miscellaneous/travisjeffery_timecop`.

## Also in the reference tree

Cloned for [#2](https://github.com/izkreny/markdownifico/issues/2) rather than picked, so they went through none of the steps above:

- **[roundhouse](https://github.com/rubys/roundhouse)**: the largest program compiled with Spinel, read for how it rewrites libraries that do not compile as they are. Clone: `compilers/rubys_roundhouse`.
- **[spinel](https://github.com/matz/spinel)**: the ahead-of-time compiler #2 tries, read for the subset it accepts, its FFI and its package format. Clone: `compilers/matz_spinel`.

## Rejected

Every candidate not picked, with the first criterion it failed, so a later pass need not evaluate it again. The sources are the ones in step 1.

### parsers

- **commonmarker** (catalog): no documentation beyond the README and generated API pages (scored 4).
- **redcarpet** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-02-25).
- **ox** (catalog, awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **rexml** (catalog): no release since 2025-10-21 (last release 2025-09-10).
- **oj** (catalog): scored 2 of 5 (missing README design, lib/ layout, craft).
- **psych** (agent): tied at 3 with json and tomlrb for the last parsers slot; json was picked because no other pick shows a native extension with a pure-Ruby fallback.
- **tomlrb** (agent): tied at 3 for the last parsers slot; toml-rb already covers a pure-Ruby TOML parser and a Spinel candidate. Spinel: candidate.
- **parslet** (agent): no release since 2025-10-21 (last release 2020-02-16).
- **racc** (agent): no release since 2025-10-21 (last release 2024-07-30).
- **citrus** (agent): no release since 2025-10-21 (last release 2015-02-19).

### renderers

- **erubi** (catalog): no release since 2025-10-21 (last release 2024-12-19).
- **tilt** (catalog, awesome-ruby): no documentation beyond the README and generated API pages (scored 4).
- **coderay** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2020-05-30).
- **syntax_tree** (agent): no release since 2025-10-21 (last release 2025-07-17).
- **rufo** (agent): scored 2 of 5 (missing README design, lib/ layout, craft).
- **unparser** (agent): no documentation beyond the README and generated API pages (scored 4).
- **blueprinter** (catalog): no documentation beyond the README and generated API pages (scored 4).
- **terminal-table** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-01-27).
- **tty-markdown** (catalog): no release since 2025-10-21 (last release 2023-03-12).
- **prawn** (agent): no release since 2025-10-21 (last release 2024-03-05).

### linters

- **rubocop-performance** (awesome-ruby): tied at 4 with eleven other linters; its reading reason, cops shipped as a RuboCop plugin, is rubocop-rspec's.
- **flay** (catalog, awesome-ruby): no CI configuration in the repository.
- **flog** (catalog, awesome-ruby): no CI configuration in the repository.
- **brakeman** (awesome-ruby): scored 3 where ten linters scored 4.
- **fasterer** (awesome-ruby): no release since 2025-10-21 (last release 2023-11-20).
- **rails_best_practices** (catalog, awesome-ruby): scored 3 where ten linters scored 4.
- **erb_lint** (agent): no release since 2025-10-21 (last release 2025-01-20).
- **slim_lint** (agent): tied at 4 with eleven other linters; same author and same linter registry design as haml_lint.
- **mdl** (agent): scored 3 where ten linters scored 4; read it anyway for a Markdown rule DSL, since it is the one Markdown linter in the pool.
- **debride** (agent): no CI configuration in the repository.

### cli

- **thor** (catalog, awesome-ruby): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **optparse** (catalog): scored 1 of 5 (missing README design, CHANGELOG, lib/ layout, craft).
- **gli** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-01-27).
- **slop** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2023-02-26).
- **optimist** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-03-19).
- **commander** (catalog, awesome-ruby): no documentation beyond the README and generated API pages (scored 3).
- **cri** (catalog): no release since 2025-10-21 (last release 2024-06-09).
- **tty-option** (catalog): no release since 2025-10-21 (last release 2023-05-29).
- **command_kit** (catalog): no release since 2025-10-21 (last release 2024-06-20).
- **cli-ui** (catalog): no documentation beyond the README and generated API pages (scored 3).
- **tty-prompt** (catalog): no release since 2025-10-21 (last release 2021-04-17).
- **tty-table** (catalog): no release since 2025-10-21 (last release 2020-09-20).
- **pastel** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2020-07-04).
- **rainbow** (catalog, dependency): no release since 2025-10-21 (last release 2022-01-11).
- **highline** (catalog): no release since 2025-10-21 (last release 2025-01-06).
- **mercenary** (dependency): no release since 2025-10-21 (last release 2020-01-18).
- **tabulo** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-01-19).
- **cmdparse** (catalog): no release since 2025-10-21 (last release 2020-12-08).
- **mixlib-cli** (catalog): no release since 2025-10-21 (last release 2020-08-21).
- **optparse-plus** (catalog): no release since 2025-10-21 (last release 2021-02-14).
- **docopt** (catalog): no release since 2025-10-21 (last release 2018-01-21).
- **getoptions** (catalog): no release since 2025-10-21 (last release 2009-07-25).
- **reline** (agent): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **io-console** (agent): scored 0 of 5 (missing README design, CHANGELOG, lib/ layout, tests, craft).
- **amazing_print** (agent): no documentation beyond the README and generated API pages (scored 4).
- **unicode-display_width** (dependency): no documentation beyond the README and generated API pages (scored 5). Spinel: candidate.
- **colorize** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2023-06-23).
- **paint** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2022-07-05).
- **ruby-progressbar** (awesome-ruby): no release since 2025-10-21 (last release 2023-03-04).
- **tty-spinner** (catalog): no release since 2025-10-21 (last release 2020-01-28).
- **tty-progressbar** (catalog): no release since 2025-10-21 (last release 2024-11-10).
- **tty-screen** (catalog): no release since 2025-10-21 (last release 2023-12-17).
- **formatador** (awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **whirly** (awesome-ruby): scored 2 of 5 (missing README design, tests, craft). Spinel: candidate.

### config

- **config** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-07-11).
- **dotenv** (catalog, awesome-ruby): no documentation beyond the README and generated API pages (scored 3). Spinel: candidate.
- **figaro** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-06-25).
- **configatron** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2017-03-08).
- **global** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-12-04).
- **envied** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-06-06).
- **settingslogic** (catalog): no release since 2025-10-21 (last release 2012-12-30).
- **tty-config** (catalog): no release since 2025-10-21 (last release 2022-06-18).
- **mixlib-config** (agent): no release since 2025-10-21 (last release 2022-06-08).
- **dry-validation** (agent): no release since 2025-10-21 (last release 2025-01-21).
- **econfig** (awesome-ruby): no release since 2025-10-21 (last release 2018-10-17).
- **configus** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2014-01-17).
- **envyable** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2016-11-08).
- **json_schemer** (agent): no documentation beyond the README and generated API pages (scored 4).
- **json-schema** (agent): no documentation beyond the README and generated API pages (scored 3).
- **sail** (awesome-ruby): no release since 2025-10-21 (last release 2022-02-24).
- **ledermann-rails-settings** (catalog): no release since 2025-10-21 (last release 2024-05-30).
- **climate_control** (agent): no release since 2025-10-21 (last release 2022-07-15).
- **figjam** (agent): no documentation beyond the README and generated API pages (scored 3).
- **configurations** (catalog): no release since 2025-10-21 (last release 2016-11-12).

### frameworks

- **sinatra** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-10-10).
- **zeitwerk** (awesome-ruby): no documentation beyond the README and generated API pages (scored 5).
- **rspec-core** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-10-19).
- **jekyll** (agent): no release since 2025-10-21 (last release 2025-01-29).
- **guard** (awesome-ruby): scored 3 where ten frameworks scored 4 or 5.
- **trailblazer** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2023-06-15).
- **padrino** (catalog, awesome-ruby): tied at 4 with ten other frameworks; its reading reason, a Sinatra-style app framework, is covered by roda and hanami.
- **cuba** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-01-24).
- **interactor** (awesome-ruby): no release since 2025-10-21 (last release 2025-07-10).
- **wisper** (awesome-ruby): no release since 2025-10-21 (last release 2024-05-23).

### clients

- **excon** (catalog, awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **net-http** (agent): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **httparty** (catalog, awesome-ruby): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **rest-client** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2019-08-21).
- **octokit** (awesome-ruby): no release since 2025-10-21 (last release 2025-04-24).
- **redis-client** (agent): no documentation beyond the README and generated API pages (scored 5).
- **mysql2** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-09-22).
- **trilogy** (catalog, awesome-ruby): no documentation beyond the README and generated API pages (scored 3).
- **stripe** (agent): scored 2 of 5 (missing README design, lib/ layout, craft).
- **anthropic** (agent): scored 2 of 5 (missing README design, lib/ layout, craft).

### servers

- **unicorn** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2021-12-25).
- **iodine** (catalog, awesome-ruby): scored 3 where every pick in the folder scored 4 or more.
- **agoo** (catalog, awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **webrick** (catalog): no documentation beyond the README and generated API pages (scored 3).
- **good_job** (catalog, awesome-ruby): no documentation beyond the README and generated API pages (scored 4).
- **que** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-10-28).
- **sucker_punch** (catalog, awesome-ruby): no documentation beyond the README and generated API pages (scored 5).
- **shoryuken** (catalog, awesome-ruby): tied at 4 with ten other servers; its worker model overlaps sidekiq and karafka.
- **foreman** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-07-27).
- **listen** (awesome-ruby, dependency): tied at 4 with ten other servers; a file-watching library more than a long-running process, and the folder was full.

### miscellaneous

- **dry-struct** (agent): tied at 4 with ten other miscellaneous gems; its attribute DSL is a thin layer over dry-types, which is picked.
- **literal** (awesome-ruby): scored 3 where ten miscellaneous gems scored 4 or 5.
- **hashie** (catalog, awesome-ruby): scored 3 where every pick in the folder scored 4 or more.
- **addressable** (awesome-ruby, dependency): no documentation beyond the README and generated API pages (scored 3).
- **docile** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-07-25).
- **memo_wise** (awesome-ruby): no release since 2025-10-21 (last release 2025-05-14).
- **tzinfo** (agent): no release since 2025-10-21 (last release 2023-01-28).
- **rdoc** (catalog, awesome-ruby): scored 3 where ten miscellaneous gems scored 4 or 5; read it for its Markdown parser regardless.
- **benchmark-ips** (agent): scored 3 where every pick in the folder scored 4 or more.
- **diffy** (awesome-ruby): no release since 2025-10-21 (last release 2025-06-09).
