> 🤖 Written by AI --- read/modified by izkreny! 🤓

# Reference Ruby gems

The answer to [#1](https://github.com/izkreny/markdownifico/issues/1): which Ruby gems are maintained and written well enough to read before building a gem, and what each is worth reading for. Every fact below was checked on 2026-10-21 unless its line says otherwise.

100 gems were picked from 207 candidates across nine folders. Each pick is cloned as a read-only reference in the owner's reference-clone tree, one folder per category, at `<folder>/<owner>_<repo>`, beside a `compilers` folder that holds two references for #2 rather than picks (see *Also in the reference tree*), and kept current by an update script modelled on the one that serves the Go reference repositories.

## How they were picked

1. **Candidates.** 15 to 20 per folder from four sources: the agent's own knowledge, the [rubytoolbox/catalog](https://github.com/rubytoolbox/catalog) YAML, [awesome-ruby](https://github.com/markets/awesome-ruby), and the dependency trees of gems already chosen. The first release-date cut left `cli` with 7 live candidates and `config` with 6, so both were topped up with a second gather from the same sources before any repository was read.
2. **Release and archive cut.** Every candidate went to the [Ruby Toolbox compare endpoint](https://www.ruby-toolbox.com/pages/docs/api/projects); four it does not know (`unparser`, `yard-lint`, `tty-table`, `xdg`) were read from the RubyGems API instead. Cut: no release since 2025-10-21, or an archived repository. The Toolbox `score` was not used, since it measures popularity.
3. **Repository cut.** The survivors' repositories were read through the GitHub API: a CI workflow (`.github/workflows` or another CI file), a licence (the gem's metadata, the repository's detected licence, or a licence file), a CHANGELOG, and every commit of the last 12 months up to 500, which gives the activity and bus-factor figures; on a repository that reached 500 the author counts cover those 500 commits only. Cut: no CI configuration or no licence.
4. **Reading.** Every survivor was shallow-cloned and read against five yes/no points: a README that explains the design, a maintained CHANGELOG in the repository, a lib directory whose layout matches the concepts, a test suite worth copying, and code you would want to have written. Six subagents gathered the evidence against one written rubric and proposed the scores; the orchestrating session reviewed them, corrected the Spinel calls listed below, and made every pick.
5. **Documentation.** A pick must also have documentation beyond its README: prose in the repository (a docs or guides directory, man pages, an architecture or upgrade document, worked examples), a GitHub wiki with pages, or a documentation site. API documentation written as prose in the source counts wherever it is published, rubydoc.info and docs.ruby-lang.org alike, when at least 50% of the gem's public methods carry a doc comment of four or more words; a script over each lib directory measured that for the gems with no other documentation, and pages generated from bare signatures do not count. Every external site and wiki named below answered HTTP 200 on 2026-10-21.
6. **The pick.** At most 100 in all, with no limit per folder, so a folder short of qualifying gems leaves its room to the others; the floor is 3 of the 5 points. When more than 100 qualify, the lowest-scoring go first, and among equal scores the folder holding the most picks at that moment gives one up, a tie between folders going to the folder listed later here; within a folder, the order is a judgement, the gem with the narrowest reading reason, or one another pick already covers, going first, and its entry under *Rejected* says which and why. Bus factor is recorded, never disqualifying. Two picks from one repository share one clone, in the folder of the pick that comes first in this doc, and the second pick's entry names that folder.

No folder was padded: a folder's picks are the gems in it that met every criterion and survived the cut.

## Spinel candidates

Found in two passes. **Reading** first, against Spinel's limitations and require documents at commit `3a54c72` of [matz/spinel](https://github.com/matz/spinel): pure Ruby, no native extension, and a core free of string `eval`, `method_missing` dispatch, computed `define_method` or `send` names, and non-literal `require`, with code behind a `RUBY_ENGINE` check discounted and runtime dependencies counting against a gem. **Compiling** second: every gem the reading left standing, and kramdown as the one pure-Ruby Markdown parser, had its entry point compiled by Spinel `2026.09.12+11963 (6577e8393)`, built from master, with `--require-gate` on 2026-10-22. The compiler outranks the reading, and only one gem survives it:

- **tomlrb** (picked, `parsers`): compiles. A smoke program parsing a TOML document with tables, an array, a datetime and an array of tables is refused once, at lib/tomlrb/parser.rb:192 (`{}.compare_by_identity`); with that hash keyed by `object_id` instead, an 11-line change, Spinel builds a 1.2 MB binary that links only libc and libm and prints exactly what CRuby prints.
- **toml-rb** (picked, `parsers`): refused: `class LocalDateTime < Time` at lib/toml-rb/datetime.rb:4, since subclassing Time is not supported yet. Its `require "date"` compiles, so the require document's listing of `date` as unsatisfiable is stale.
- **xdg** (picked, `config`): refused: 18 errors, all Strings that are shared and changed in place (matz/spinel#9258), the first at lib/xdg/paths/directory.rb:12, once its own files are found through `-I`.
- **dotenv** (picked, `config`): refused at `require "English"`, a standard library Spinel does not provide.
- **unicode-display_width** (rejected, `cli`): refused at `require "unicode/emoji"`, its runtime dependency.
- **whirly** (rejected, `cli`): refused at `require "unicode/display_width"`, its runtime dependency.
- **kramdown** (picked, `parsers`): refused at `require "rexml/parsers/baseparser"`, once its own files are found through `-I`.

Every other pick was ruled out by the reading: it is native, uses a refused construct in its core, or depends on a gem that is one of those, and its entry names which, with a file and line wherever the reason is a construct. A rejected survivor's call is recorded only when it was compiled, as above.

## parsers

1. **[prism](https://github.com/ruby/prism)**: parsing: error-tolerant parser design, node generation from config.yml, translation layers; release: docs/releasing.md; testing: snapshot tests
   - Score 5 of 5. Docs: docs/ (design.md, serialization.md, parsing_rules.md, testing.md, releasing.md ...) and doc/ (site).
   - Latest release 2026-01-27 (1.9.0); 470 commits in the last 12 months, 25 authors, 10 with 3 or more commits; kddnewton wrote 56%. Spinel: n/a, native. Clone: `parsers/ruby_prism`.
2. **[regexp_parser](https://github.com/ammar/regexp_parser)**: parsing: scanner/lexer/parser staging and expression tree; API design: expression tree methods
   - Score 5 of 5. Docs: GitHub wiki.
   - Latest release 2026-09-28 (2.13.1); 19 commits in the last 12 months, 1 authors, 1 with 3 or more commits; jaynetics wrote 100%. Spinel: no, lib/regexp_parser/expression/subexpression.rb:28 class_eval with a string; quantifier.rb:32 likewise. Clone: `parsers/ammar_regexp_parser`.
3. **[parser](https://github.com/whitequark/parser)**: parsing: ragel lexer + racc grammar split, AST format spec, builder pattern, diagnostics engine; testing: assert_parses helper
   - Score 4 of 5, missing README design. Docs: doc/ (AST_FORMAT.md, INTERNALS.md, CUSTOMIZATION.md, PRISM_TRANSLATION.md).
   - Latest release 2026-07-16 (3.3.12.0); 23 commits in the last 12 months, 2 authors, 1 with 3 or more commits; koic wrote 96%. Spinel: no, the core needs the racc runtime, which Spinel does not bundle and which loads its C accelerator under a rescue, plus the ast gem. Clone: `parsers/whitequark_parser`.
4. **[kramdown](https://github.com/gettalong/kramdown)**: parsing: regexp-registered block/span parser rules; rendering: converter-per-output-format; docs: self-hosted webgen docs; testing: golden files
   - Score 4 of 5, missing README design. Docs: doc/ (documentation.page, syntax.page, options.page, quickref.page, parser/, converter/) and man/.
   - Latest release 2026-01-19 (2.5.2); 4 commits in the last 12 months, 1 authors, 1 with 3 or more commits; gettalong wrote 100%. Spinel: no, lib/kramdown/document.rb:113 method_missing dispatches output formats; converter/latex.rb:42 send with computed name. Clone: `parsers/gettalong_kramdown`.
5. **[commonmarker](https://github.com/gjtorikian/commonmarker)**: API design: thin Ruby wrapper over a native Markdown engine, options/config validation; parsing: markdown AST access
   - Score 4 of 5, missing README design. Docs: API documentation in the source, with doc comments on 73% of its 11 public methods.
   - Latest release 2026-10-16 (2.10.1); 143 commits in the last 12 months, 6 authors, 3 with 3 or more commits; gjtorikian wrote 86%. Spinel: n/a, native. Clone: `parsers/gjtorikian_commonmarker`.
6. **[markly](https://github.com/socketry/markly)**: parsing: AST over cmark-gfm; rendering: renderer classes; docs: socketry guides + releases.md; release: bake tasks
   - Score 4 of 5, missing README design. Docs: guides/ (getting-started, abstract-syntax-tree, extensions, headings, links.yaml).
   - Latest release 2026-09-09 (0.19.0); 37 commits in the last 12 months, 4 authors, 2 with 3 or more commits; ioquatix wrote 57%. Spinel: n/a, native. Clone: `parsers/socketry_markly`.
7. **[nokogiri](https://github.com/sparklemotion/nokogiri)**: API design: one DOM API over libxml2/Gumbo/Java; release: dependencies.yml, native gem packaging; docs: ADRs
   - Score 4 of 5, missing craft. Docs: adr/ (architecture decision records), doc/, ROADMAP.md, AGENTS.md.
   - Latest release 2026-06-18 (1.19.4); 74 commits in the last 12 months, 5 authors, 1 with 3 or more commits; flavorjones wrote 95%. Spinel: n/a, native. Clone: `parsers/sparklemotion_nokogiri`.
8. **[oga](https://github.com/yorickpeterse/oga)**: parsing: lexer plus racc parser plus XPath compiled to Ruby AST; API design: pull and SAX parsers; docs: topic guides
   - Score 4 of 5, missing README design. Docs: doc/ (css_selectors.md, xml_namespaces.md, migrating_from_nokogiri.md, manually_creating_documents.md).
   - Latest release 2026-06-10 (3.5); 5 commits in the last 12 months, 2 authors, 1 with 3 or more commits; yorickpeterse wrote 60%. Spinel: n/a, native. Clone: `parsers/yorickpeterse_oga`.
9. **[csv](https://github.com/ruby/csv)**: parsing: hand-written streaming parser and converter pipeline; API design: huge options surface; docs: recipes
   - Score 4 of 5, missing README design. Docs: doc/csv/ (recipes, arguments, options).
   - Latest release 2026-07-26 (3.3.6); 5 commits in the last 12 months, 4 authors, 0 with 3 or more commits; kou wrote 40%. Spinel: no, lib/csv/parser.rb:425 __send__(@parse_method); lib/csv.rb:2817 __send__(attr_name). Clone: `parsers/ruby_csv`.
10. **[toml-rb](https://github.com/emancu/toml-rb)**: parsing: StringScanner-based hand parser with visitor nodes; testing: spec example corpus
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-09-28 (6.0.0); 95 commits in the last 12 months, 4 authors, 2 with 3 or more commits; emancu wrote 94%. Spinel: no, Spinel refuses its Time subclass, `class LocalDateTime < Time` at lib/toml-rb/datetime.rb:4, when compiling lib/toml-rb.rb. Clone: `parsers/emancu_toml-rb`.
11. **[json](https://github.com/ruby/json)**: parsing: native parser/generator with pure-Ruby fallback; API design: Coder and generator state; release: README Release section
   - Score 3 of 5, missing README design, lib/ layout. Docs: docs.ruby-lang.org/en/master/JSON.html.
   - Latest release 2026-10-13 (3.1.0); 342 commits in the last 12 months, 35 authors, 11 with 3 or more commits; byroot wrote 59%. Spinel: n/a, native. Clone: `parsers/ruby_json`.
12. **[psych](https://github.com/ruby/psych)**: parsing: libyaml event stream, handler and visitor pipeline; API design: safe_load and class_loader restrictions
   - Score 3 of 5, missing README design, CHANGELOG. Docs: docs.ruby-lang.org/en/master/Psych.html.
   - Latest release 2026-08-21 (5.5.0); 88 commits in the last 12 months, 14 authors, 6 with 3 or more commits; hsbt wrote 52%. Spinel: n/a, native. Clone: `parsers/ruby_psych`.
13. **[tomlrb](https://github.com/fbernier/tomlrb)**: parsing: regex/StringScanner TOML 1.0/1.1 parser; testing: conformance suite
   - Score 3 of 5, missing README design, lib/ layout. Docs: GitHub wiki.
   - Latest release 2026-10-15 (3.0.0); 47 commits in the last 12 months, 2 authors, 2 with 3 or more commits; KitaitiMakoto wrote 72%. Spinel: candidate. Clone: `parsers/fbernier_tomlrb`.

## renderers

1. **[erb](https://github.com/ruby/erb)**: rendering: template to Ruby source compiler with hooks; docs: worked examples in class docs
   - Score 5 of 5. Docs: _doc/ (erb_executable.md).
   - Latest release 2026-08-04 (6.0.7); 65 commits in the last 12 months, 19 authors, 3 with 3 or more commits; k0kubun wrote 38%. Spinel: n/a, native. Clone: `renderers/ruby_erb`.
2. **[temple](https://github.com/judofyr/temple)**: plugin loading: engine/filter/generator pipeline; API design: S-expression IR and grammar DSL; rendering: template compilation
   - Score 5 of 5. Docs: EXPRESSIONS.md (the S-expression spec).
   - Latest release 2026-08-17 (0.10.7); 9 commits in the last 12 months, 5 authors, 1 with 3 or more commits; k0kubun wrote 44%. Spinel: no, lib/temple/filters/escapable.rb:20 eval; templates.rb:8 method_missing; mixins/dispatcher.rb:64 class_eval string. Clone: `renderers/judofyr_temple`.
3. **[liquid](https://github.com/Shopify/liquid)**: rendering: safe template language with drops and resource limits; parsing: tokenizer/lexer/parser; API design: environments and filters
   - Score 5 of 5. Docs: shopify.github.io/liquid.
   - Latest release 2026-09-17 (5.14.0); 136 commits in the last 12 months, 11 authors, 8 with 3 or more commits; karreiro wrote 26%. Spinel: no, lib/liquid/condition.rb:131 value.send(method_name); variable_lookup.rb:71 object.send(key). Clone: `renderers/Shopify_liquid`.
4. **[mustache](https://github.com/mustache/mustache)**: rendering: logic-less templates compiled to Ruby; CLI: bin/mustache and man pages; testing: shared spec suite
   - Score 5 of 5. Docs: man/ (mustache.1, mustache.5 sources).
   - Latest release 2026-08-20 (1.1.3); 19 commits in the last 12 months, 3 authors, 1 with 3 or more commits; locks wrote 84%. Spinel: no, lib/mustache/template.rb:41 instance_eval(compiled,...); generator.rb:95 send with computed name. Clone: `renderers/mustache_mustache`.
5. **[haml](https://github.com/haml/haml)**: rendering: Haml parser compiled to Temple S-expressions; plugin loading: Temple filter chain
   - Score 4 of 5, missing README design. Docs: REFERENCE.md, FAQ.md.
   - Latest release 2026-09-01 (7.5.1); 70 commits in the last 12 months, 16 authors, 3 with 3 or more commits; k0kubun wrote 40%. Spinel: no, lib/haml/attribute_compiler.rb:84 eval(build_code); force_escape.rb:18 eval; also runtime deps temple, tilt. Clone: `renderers/haml_haml`.
6. **[slim](https://github.com/slim-template/slim)**: plugin loading: Temple filter pipeline; rendering: template engine on Temple; testing: literate Markdown tests
   - Score 4 of 5, missing README design. Docs: doc/ (include.md, logic_less.md, smart.md, translator.md, jp/).
   - Latest release 2026-07-24 (5.2.2); 13 commits in the last 12 months, 3 authors, 1 with 3 or more commits; minad wrote 85%. Spinel: no, lib/slim/translator.rb:62 eval; command.rb:58 eval; and runtime dependencies temple/tilt use eval. Clone: `renderers/slim-template_slim`.
7. **[rouge](https://github.com/rouge-ruby/rouge)**: plugin loading: lexer registry with tags/aliases/filenames and lazy loading; rendering: formatters and themes; docs: lexer dev guide
   - Score 4 of 5, missing README design. Docs: docs/ (LexerDevelopment.md, Languages.md, DevEnvironment.md, Docker.md, sample app).
   - Latest release 2026-08-06 (5.1.0); 120 commits in the last 12 months, 32 authors, 6 with 3 or more commits; jneen wrote 44%. Spinel: no, lib/rouge/theme.rb:153 send("make_#{mode}!"); theme.rb:16 define_method mode. Clone: `renderers/rouge-ruby_rouge`.
8. **[unparser](https://github.com/mbj/unparser)**: rendering: AST to source emitters; testing: round-trip corpus; API design: node handler DSL
   - Score 4 of 5, missing README design. Docs: API documentation in the source, with doc comments on 57% of its 184 public methods.
   - Latest release 2026-03-20 (0.9.0); 46 commits in the last 12 months, 3 authors, 2 with 3 or more commits; sferik wrote 50%. Spinel: no, lib/unparser/dsl.rb:18 define_method(name) with computed name; abstract_type.rb:114 likewise. Clone: `renderers/mbj_unparser`.
9. **[alba](https://github.com/okuramasafumi/alba)**: API design: resource DSL with attributes/associations/traits; testing: property-based tests
   - Score 4 of 5, missing README design. Docs: docs/ (migrate_from_jbuilder.md, migrate_from_active_model_serializers.md, rails.md), HACKING.md.
   - Latest release 2026-10-17 (4.0.1); 165 commits in the last 12 months, 9 authors, 4 with 3 or more commits; okuramasafumi wrote 88%. Spinel: no, lib/alba/association.rb:80 __send__(@name); conditional_attribute.rb:56 __send__(@body.name). Clone: `renderers/okuramasafumi_alba`.
10. **[phlex](https://github.com/yippee-fun/phlex)**: rendering: components rendering straight to a buffer, optional method compiler; API design: view-as-object; testing: Quickdraw
   - Score 3 of 5, missing README design, CHANGELOG. Docs: phlex.fun.
   - Latest release 2026-02-06 (2.4.1); 170 commits in the last 12 months, 8 authors, 2 with 3 or more commits; joeldrapper wrote 94%. Spinel: no, lib/phlex/compiler.rb:174 eval; lib/phlex/sgml/elements.rb:79 class_eval with a string; also block.binding in lib/phlex.rb:59. Clone: `renderers/yippee-fun_phlex`.
11. **[jbuilder](https://github.com/rails/jbuilder)**: API design: block DSL building JSON; rendering: Rails template handler
   - Score 3 of 5, missing README design, CHANGELOG. Docs: GitHub wiki.
   - Latest release 2026-05-26 (2.15.1); 25 commits in the last 12 months, 7 authors, 2 with 3 or more commits; rafaelfranca wrote 56%. Spinel: no, lib/jbuilder.rb:237 alias_method :method_missing, :set!. Clone: `renderers/rails_jbuilder`.

## linters

1. **[rubocop](https://github.com/rubocop/rubocop)**: plugin loading (lib/rubocop/plugin/loader.rb, lint_roller plugins); rule API (Cop::Base, Commissioner callbacks, Corrector); config (ConfigLoader inheritance/merging)
   - Score 4 of 5, missing README design. Docs: docs/modules/ROOT/pages/ (Antora site source: configuration, development, plugins, cops_*.adoc, formatters, usage); CONTRIBUTING.md; AGENTS.md.
   - Latest release 2026-10-10 (1.92.0); 500+ commits in the last 12 months, 11 authors, 4 with 3 or more commits; koic wrote 64%. Spinel: no, lib/rubocop/cop/commissioner.rb:69 class_eval with string, cop/exclude_limit.rb:36 define_method computed name, commissioner.rb:109 public_send(callback), plugin loader requires plugins by runtime name, depends on parser/prism/rubocop-ast. Clone: `linters/rubocop_rubocop`.
2. **[standard](https://github.com/standardrb/standard)**: CLI (argv splitting and settings merge over RuboCop); config (opinionated config assembly, plugin composition via lint_roller); release (docs/RELEASE.md)
   - Score 4 of 5, missing README design. Docs: docs/ARCHITECTURE.md, RELEASE.md, RUBY_VERSIONS.md, UPGRADING.md.
   - Latest release 2026-10-05 (1.57.0); 60 commits in the last 12 months, 4 authors, 3 with 3 or more commits; jasonkarns wrote 50%. Spinel: no, hard dependency on rubocop (gemspec line 24); lib/standard/lsp/routes.rb:16 define_method(:"handle_#{name}"). Clone: `linters/standardrb_standard`.
3. **[rubocop-ast](https://github.com/rubocop/rubocop-ast)**: parsing (NodePattern lexer.rex/parser.y/compiler pipeline); API design (Node subclasses per type, traversal)
   - Score 4 of 5, missing README design. Docs: docs/modules/ROOT/pages/ (node_pattern.adoc, node_pattern_compiler.adoc, node_types.adoc, traversal.adoc, processed_source.adoc).
   - Latest release 2026-07-04 (1.50.0); 59 commits in the last 12 months, 5 authors, 3 with 3 or more commits; bbatsov wrote 39%. Spinel: no, lib/rubocop/ast/node.rb:145 and :197 class_eval string, node_pattern/method_definer.rb:54 define_method computed name and :58 class_eval(src), utilities/simple_forwardable.rb:12 class_eval string. Clone: `linters/rubocop_rubocop-ast`.
4. **[rubocop-rspec](https://github.com/rubocop/rubocop-rspec)**: rule API (cop authoring with def_node_matcher, autocorrect); testing (offense/correction annotated specs)
   - Score 4 of 5, missing README design. Docs: docs/modules/ROOT/pages/ (cops_rspec.adoc generated, development.adoc, installation.adoc).
   - Latest release 2026-06-06 (3.10.2); 158 commits in the last 12 months, 19 authors, 8 with 3 or more commits; bquorning wrote 42%. Spinel: no, depends on rubocop (gemspec); rubocop-rspec runs only inside RuboCop's runtime plugin loading. Clone: `linters/rubocop_rubocop-rspec`.
5. **[rubocop-performance](https://github.com/rubocop/rubocop-performance)**: rule API (small cops with node patterns); testing
   - Score 4 of 5, missing README design. Docs: docs/modules/ROOT/pages/ (cops_performance.adoc, usage.adoc, installation.adoc).
   - Latest release 2026-08-16 (1.27.0); 27 commits in the last 12 months, 2 authors, 1 with 3 or more commits; koic wrote 93%. Spinel: no, depends on rubocop and rubocop-ast at runtime. Clone: `linters/rubocop_rubocop-performance`.
6. **[reek](https://github.com/troessner/reek)**: rule API (smell detector base class and registration); docs (per-smell docs and internals guide); testing (custom RSpec matcher reek_of)
   - Score 4 of 5, missing README design. Docs: docs/ (one .md per smell, How-reek-works-internally.md, How-To-Write-New-Detectors.md, API.md, Command-Line-Options.md, Reek-4-to-Reek-5-migration.md).
   - Latest release 2026-10-02 (6.6.0); 47 commits in the last 12 months, 3 authors, 1 with 3 or more commits; mvz wrote 94%. Spinel: no, lib/reek/context_builder.rb:66 send(context_processor, ...) computed; smell_detectors/base_detector.rb:132 and ast/ast_node_class_map.rb:30 const_get by name; depends on dry-schema (configuration/schema.rb:3) and parser. Clone: `linters/troessner_reek`.
7. **[haml_lint](https://github.com/sds/haml-lint)**: rule API (Linter + LinterRegistry, directive comments); testing (linter shared context); CLI (runner/reporters)
   - Score 4 of 5, missing README design. Docs: lib/haml_lint/linter/README.md (per-linter docs); doc/ only an image.
   - Latest release 2026-08-20 (0.78.0); 48 commits in the last 12 months, 9 authors, 2 with 3 or more commits; sds wrote 54%. Spinel: no, lib/haml_lint/utils.rb:78 and :246 string eval with binding; depends on rubocop and haml. Clone: `linters/sds_haml-lint`.
8. **[slim_lint](https://github.com/sds/slim-lint)**: rule API (on_start/on :tag visitor DSL for linters); testing (linter shared context)
   - Score 4 of 5, missing README design. Docs: lib/slim_lint/linter/README.md.
   - Latest release 2026-08-20 (0.37.0); 12 commits in the last 12 months, 6 authors, 2 with 3 or more commits; sds wrote 42%. Spinel: no, lib/slim_lint/atom.rb:70 method_missing, sexp_visitor.rb:109 define_method computed; depends on rubocop and slim. Clone: `linters/sds_slim-lint`.
9. **[herb](https://github.com/marcoroth/herb)**: parsing (C lexer/parser for HTML+ERB with Prism annotation); testing (snapshot goldens); rendering (Herb::Engine)
   - Score 4 of 5, missing README design. Docs: docs/docs/ (VitePress source: overview, language, bindings, c-reference, configuration, integrations, blog).
   - Latest release 2026-10-20 (0.11.1); 435 commits in the last 12 months, 27 authors, 5 with 3 or more commits; marcoroth wrote 88%. Spinel: n/a, native. Clone: `linters/marcoroth_herb`.
10. **[rubycritic](https://github.com/whitesmith/rubycritic)**: plugin loading (analyser pipeline composing flay/flog/reek); rendering (HTML generators with ERB); CLI (commands/ with compare mode)
   - Score 4 of 5, missing README design. Docs: docs/ (core-metrics.md, formatters.md, building-own-code-climate.md, jenkins-pr-reviews.md), ROADMAP.md, CONTRIBUTING.md.
   - Latest release 2026-01-27 (5.0.0); 24 commits in the last 12 months, 7 authors, 2 with 3 or more commits; faisal wrote 54%. Spinel: no, lib/rubycritic/configuration.rb:92 method_missing, generators/html/base.rb:49 binding objects for ERB; depends on reek, flay, flog, parser, simplecov. Clone: `linters/whitesmith_rubycritic`.
11. **[yard-lint](https://github.com/mensfeld/yard-lint)**: rule API (validator = config + parser + result + messages_builder module); config (department/validator config, todo baseline, --check-todo); CLI (diff mode, SARIF output)
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-09-23 (1.12.0); 341 commits in the last 12 months, 5 authors, 2 with 3 or more commits; mensfeld wrote 97%. Spinel: no, core depends on yard (heavy runtime metaprogramming) and zeitwerk (non-literal require, autoload); lib/yard/lint/config_loader.rb:21 and result_builder.rb:145 const_get, todo_generator.rb:86 send. Clone: `linters/mensfeld_yard-lint`.
12. **[pronto](https://github.com/prontolabs/pronto)**: plugin loading (inherited-hook runner registry, runners discovered via Gem::Specification in gem_names.rb); CLI (Thor); API design (small Runner base class contract)
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2025-12-05 (0.11.5); 6 commits in the last 12 months, 5 authors, 0 with 3 or more commits; ashkulz wrote 33%. Spinel: no, lib/pronto/cli.rb:57 and rake_task/travis_pull_request.rb:37 require with non-literal name, gem_names.rb:10 Gem::Specification discovery of runtime-loaded gems; depends on rugged (native) and octokit. Clone: `linters/prontolabs_pronto`.
13. **[mdl](https://github.com/markdownlint/markdownlint)**: rule API (Rule/RuleSet/Style DSL, custom rulesets); docs (rule documentation generation, RULES.md); testing (annotated markdown goldens)
   - Score 3 of 5, missing README design, lib/ layout. Docs: docs/ (configuration.md, creating_rules.md, creating_styles.md, RULES.md, rolling_a_release.md).
   - Latest release 2026-08-09 (0.18.1); 62 commits in the last 12 months, 10 authors, 2 with 3 or more commits; jaymzh wrote 81%. Spinel: no, lib/mdl/style.rb:73 and ruleset.rb:86 instance_eval(File.read(...)) string eval to load styles/rulesets; depends on kramdown, mixlib-*. Clone: `linters/markdownlint_markdownlint`.

## cli

1. **[dry-cli](https://github.com/dry-rb/dry-cli)**: CLI: registry of commands/namespaces, option casting, inline commands
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-cli.
   - Latest release 2026-01-21 (1.4.1); 34 commits in the last 12 months, 10 authors, 5 with 3 or more commits; timriley wrote 32%. Spinel: no, lib/dry/cli/style.rb:344 and :354 define_method with a computed name (style.rb is required from lib/dry/cli.rb:15); otherwise send is over literal names (command.rb:650). Clone: `cli/dry-rb_dry-cli`.
2. **[clamp](https://github.com/mdub/clamp)**: CLI: declarative options/parameters/subcommands as class DSL; shell completion generation
   - Score 4 of 5, missing README design. Docs: examples/ (runnable example commands); no prose docs dir.
   - Latest release 2026-03-21 (1.5.2); 46 commits in the last 12 months, 3 authors, 2 with 3 or more commits; mdub wrote 89%. Spinel: no, lib/clamp/attribute/declaration.rb:26 define_method(attribute.read_method) with computed names; attribute/instance.rb:54 command.send(attribute.read_method). Clone: `cli/mdub_clamp`.
3. **[samovar](https://github.com/socketry/samovar)**: CLI: declarative rows (options/one/many/split/nested) per command class; completion; testable command objects
   - Score 4 of 5, missing README design. Docs: guides/getting-started/readme.md, guides/completion/readme.md, context/*.md.
   - Latest release 2026-06-17 (2.5.1); 11 commits in the last 12 months, 3 authors, 2 with 3 or more commits; ioquatix wrote 64%. Spinel: no, lib/samovar/table.rb:119 parent.send(key) and :123 public_send with computed names; depends on console gem. Clone: `cli/socketry_samovar`.
4. **[cli-kit](https://github.com/Shopify/cli-kit)**: CLI: app skeleton with registry/resolver/executor; error handling and signal traps
   - Score 4 of 5, missing CHANGELOG. Docs: examples/ (minimal, single-file, todo-list), TODO.md.
   - Latest release 2026-09-21 (5.3.1); 22 commits in the last 12 months, 4 authors, 3 with 3 or more commits; vinistock wrote 50%. Spinel: no, lib/cli/kit/opts.rb:58 and many more obj.opt.send(name) with computed names; command_help.rb:127 const_get; depends on cli-ui (no). Clone: `cli/Shopify_cli-kit`.
5. **[commander](https://github.com/commander-rb/commander)**: CLI: simple command-block DSL, help formatters (ERB templates)
   - Score 3 of 5, missing README design, craft. Docs: API documentation in the source, with doc comments on 90% of its 90 public methods.
   - Latest release 2026-08-02 (6.0.0); 2 commits in the last 12 months, 1 authors, 0 with 3 or more commits; ggilder wrote 100%. Spinel: no, lib/commander/command.rb:45 method_missing; lib/commander/delegates.rb:23 eval with binding; depends on highline. Clone: `cli/commander-rb_commander`.
6. **[cli-ui](https://github.com/Shopify/cli-ui)**: rendering: boxed frames, spinners, prompts, progress bars; stdout routing (stdout_router.rb)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: API documentation in the source, with doc comments on 77% of its 173 public methods.
   - Latest release 2025-11-05 (2.7.0); 23 commits in the last 12 months, 10 authors, 3 with 3 or more commits; rwstauner wrote 22%. Spinel: no, lib/cli/ui/stdout_router.rb:294 and :302 define_method(method) with computed names plus @stream.send(method, ...) at :297. Clone: `cli/Shopify_cli-ui`.
7. **[sod](https://github.com/bkuhlmann/sod)**: CLI: composable commands/actions on top of optparse, prefab actions (config, help, version)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: doc/architecture.msd (diagram source); alchemists.io/projects/sod.
   - Latest release 2026-09-17 (2.5.0); 44 commits in the last 12 months, 1 authors, 1 with 3 or more commits; bkuhlmann wrote 100%. Spinel: no, lib/sod/context.rb:22 method_missing; also depends on gems (zeitwerk, refinements, infusible) not checked. Clone: `cli/bkuhlmann_sod`.

## config

1. **[anyway_config](https://github.com/palkan/anyway_config)**: config (layered loaders pipeline, tracing of value sources); plugin loading (loader registry); API design (attr_config DSL)
   - Score 5 of 5. Docs: skills/anyway-config (agent skill prose); sig/ RBS types; no docs/ directory.
   - Latest release 2026-10-20 (2.9.0); 21 commits in the last 12 months, 5 authors, 2 with 3 or more commits; palkan wrote 62%. Spinel: no, lib/anyway/config.rb top-of-file refinements (using Anyway::Ext::DeepDup etc, refine Object), settings.rb:17 define_method(name) computed, config.rb:523 public_send(:"#{key}="); depends on ruby-next. Clone: `config/palkan_anyway_config`.
2. **[rails-settings-cached](https://github.com/huacnlee/rails-settings-cached)**: config (DB-backed typed settings with caching); API design (field DSL on an ActiveRecord model)
   - Score 5 of 5. Docs: docs/backward-compatible-to-scoped-settings.md.
   - Latest release 2026-09-16 (2.10.0); 4 commits in the last 12 months, 2 authors, 1 with 3 or more commits; huacnlee wrote 75%. Spinel: no, lib/rails-settings/base.rb:112 define_method with a computed name, :113 public_send(key), fields/base.rb:69 const_get; requires Rails/ActiveRecord. Clone: `config/huacnlee_rails-settings-cached`.
3. **[dry-configurable](https://github.com/dry-rb/dry-configurable)**: config (settings DSL, nested settings, constructors, inheritance); API design (extend/include mixin with class and instance settings)
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-configurable.
   - Latest release 2026-05-14 (1.4.0); 12 commits in the last 12 months, 3 authors, 2 with 3 or more commits; timriley wrote 50%. Spinel: no, lib/dry/configurable/config.rb:233 method_missing, class_methods.rb:93 define_method(name) computed, extension.rb:31 klass.class_eval, compiler.rb:20 public_send(:"visit_#{type}"); depends on zeitwerk and dry-core. Clone: `config/dry-rb_dry-configurable`.
4. **[chamber](https://github.com/thekompanee/chamber)**: config (layered settings files, namespaces, secure/encrypted values); CLI (Thor commands/ for secure, sign, verify)
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-01-08 (3.2.0); 7 commits in the last 12 months, 2 authors, 1 with 3 or more commits; jfelchner wrote 71%. Spinel: no, refinements in core: lib/chamber/filters/namespace_filter.rb:9 using ::Chamber::Refinements::DeepDup, lib/chamber/refinements/; depends on thor and mutex_m. Clone: `config/thekompanee_chamber`.
5. **[dry-schema](https://github.com/dry-rb/dry-schema)**: API design (schema DSL compiling to rules and type-coerced steps); parsing (key map, coercion pipeline)
   - Score 4 of 5, missing README design. Docs: examples/ (basic.rb, each.rb, json.rb, nested.rb, params.rb) only; user docs on dry-rb.org; hanakai.org/learn/dry/dry-schema.
   - Latest release 2026-03-03 (1.16.0); 28 commits in the last 12 months, 10 authors, 2 with 3 or more commits; timriley wrote 57%. Spinel: no, lib/dry/schema/messages/yaml.rb:172 string eval and :19 binding, config.rb:77 method_missing, dsl.rb:83 instance_eval(&) block form; depends on dry-configurable (method_missing), dry-types, dry-logic, zeitwerk. Clone: `config/dry-rb_dry-schema`.
6. **[ultra_settings](https://github.com/bdurand/ultra_settings)**: config (env var, runtime setting and YAML source hierarchy with source tracking); docs (ARCHITECTURE.md with diagram)
   - Score 4 of 5, missing README design. Docs: ARCHITECTURE.md, AGENTS.md, yard_plugin/.
   - Latest release 2026-08-15 (2.10.1); 90 commits in the last 12 months, 2 authors, 1 with 3 or more commits; bdurand wrote 98%. Spinel: no, lib/ultra_settings/configuration.rb:92 class_eval with string, config_helper.rb:23 define_method(config_alias) computed and :24 send, application_view.rb:42 binding objects for ERB. Clone: `config/bdurand_ultra_settings`.
7. **[dotenv](https://github.com/bkeepers/dotenv)**: parsing (.env grammar via commented extended regex and substitution pipeline); config; testing (Autorestore ENV in tests)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: API documentation in the source, with doc comments on 57% of its 37 public methods.
   - Latest release 2025-12-03 (3.2.0); 12 commits in the last 12 months, 2 authors, 1 with 3 or more commits; bkeepers wrote 92%. Spinel: no, Spinel stops at `require "English"`, a standard library it does not provide. Clone: `config/bkeepers_dotenv`.
8. **[xdg](https://github.com/bkuhlmann/xdg)**: API design (small immutable objects with injected environment); config (XDG base directory lookup)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: alchemists.io/projects/xdg.
   - Latest release 2026-09-16 (10.4.0); 33 commits in the last 12 months, 1 authors, 1 with 3 or more commits; bkuhlmann wrote 100%. Spinel: no, with its own files found through -I, Spinel refuses 18 places where Strings are shared and changed in place (matz/spinel#9258), the first at lib/xdg/paths/directory.rb:12. Clone: `config/bkuhlmann_xdg`.
9. **[runcom](https://github.com/bkuhlmann/runcom)**: config (locating rc files across XDG config/home paths, local vs global); API design
   - Score 3 of 5, missing README design, CHANGELOG. Docs: alchemists.io/projects/runcom.
   - Latest release 2026-09-16 (13.4.0); 38 commits in the last 12 months, 1 authors, 1 with 3 or more commits; bkuhlmann wrote 100%. Spinel: no, lib/runcom/paths/common.rb:9 `using Refinements::Pathname` (refinements) and runtime dependencies refinements, zeitwerk (lib/runcom.rb:3-4), xdg. Clone: `config/bkuhlmann_runcom`.

## frameworks

1. **[roda](https://github.com/jeremyevans/roda)**: plugin loading: plugin system via Module composition; rule API: matchers in the routing tree; API design
   - Score 5 of 5. Docs: doc/ (conventions.rdoc, release_notes/ with 146 files), www/ (site source with pages).
   - Latest release 2026-10-09 (3.109.0); 127 commits in the last 12 months, 5 authors, 1 with 3 or more commits; jeremyevans wrote 97%. Spinel: no, lib/roda.rb:127 class_eval with a string; :163 define_method(meth); :318 send(:include, ...). Clone: `frameworks/jeremyevans_roda`.
2. **[zeitwerk](https://github.com/fxn/zeitwerk)**: plugin loading: autoload/eager load/reload mechanics; config: inflector and collapse rules
   - Score 5 of 5. Docs: API documentation in the source, with doc comments on 100% of its 89 public methods.
   - Latest release 2026-08-01 (2.8.3); 89 commits in the last 12 months, 6 authors, 2 with 3 or more commits; fxn wrote 87%. Spinel: no, lib/zeitwerk/core_ext/kernel.rb:23 overrides Kernel#require and forwards a computed path via zeitwerk_original_require; autoload and const_get are the core mechanism (borderline: only the require decoration is on the refusal list). Clone: `frameworks/fxn_zeitwerk`.
3. **[rack](https://github.com/rack/rack)**: protocol: env/status-headers-body spec and Rack::Lint; API design: middleware composition (Builder)
   - Score 4 of 5, missing README design. Docs: SPEC.rdoc (protocol spec), GETTING-STARTED.md, UPGRADE-GUIDE.md, docs/index.html.
   - Latest release 2026-08-13 (3.2.7); 80 commits in the last 12 months, 26 authors, 5 with 3 or more commits; jeremyevans wrote 41%. Spinel: no, lib/rack/builder.rb:108 eval(builder_script, binding, path) and :6 BUILDER_TOPLEVEL_BINDING. Clone: `frameworks/rack_rack`.
4. **[hanami](https://github.com/hanami/hanami)**: config: app/slice configuration; plugin loading: providers and slices on dry-system
   - Score 4 of 5, missing README design. Docs: FEATURES.md, README.repo.md; no prose guides dir; hanakai.org/learn/hanami.
   - Latest release 2026-08-21 (3.0.2); 105 commits in the last 12 months, 10 authors, 5 with 3 or more commits; timriley wrote 71%. Spinel: no, lib/hanami.rb:61 require(app_path.to_s) with a computed argument; provider_registrar.rb:7 define_singleton_method; depends on dry-system (no). Clone: `frameworks/hanami_hanami`.
5. **[dry-system](https://github.com/dry-rb/dry-system)**: plugin loading: container plugins, providers and auto-registration; config: container settings
   - Score 4 of 5, missing README design. Docs: examples/ directory; docs on dry-rb.org; hanakai.org/learn/dry/dry-system.
   - Latest release 2025-11-30 (1.2.5); 15 commits in the last 12 months, 5 authors, 2 with 3 or more commits; timriley wrote 60%. Spinel: no, lib/dry/system/provider/source.rb:50 instance_eval with a heredoc string; manifest_registrar.rb:43 load(computed path). Clone: `frameworks/dry-rb_dry-system`.
6. **[minitest](https://github.com/minitest/minitest)**: testing: runner, reporters, plugin hooks (Minitest.load); API design: assertions plus spec DSL
   - Score 4 of 5, missing README design. Docs: design_rationale.rb (spec to unit-test mapping), README.rdoc FAQ; no docs dir.
   - Latest release 2026-05-01 (6.0.6); 109 commits in the last 12 months, 1 authors, 1 with 3 or more commits; zenspider wrote 100%. Spinel: no, lib/minitest.rb:140 require plugin_path (computed); test dispatch uses send on test method names. Clone: `frameworks/minitest_minitest`.
7. **[rake](https://github.com/ruby/rake)**: rule API: tasks, file tasks and pattern rules; CLI: application options/loader
   - Score 4 of 5, missing README design. Docs: doc/ (rakefile.rdoc, command_line_usage.rdoc, glossary.rdoc, rational.rdoc, proto_rake.rdoc, rake.1 man page).
   - Latest release 2026-04-16 (13.4.2); 122 commits in the last 12 months, 9 authors, 3 with 3 or more commits; matzbot wrote 48%. Spinel: no, lib/rake/cpu_counter.rb:31 class_eval with a heredoc string; rake_module.rb:29 load(path) computed. Clone: `frameworks/ruby_rake`.
8. **[bridgetown](https://github.com/bridgetownrb/bridgetown)**: plugin loading: PluginManager (bundler/gems/plugins folder); rendering: resources/converters/layouts; config
   - Score 4 of 5, missing README design. Docs: bridgetown-website/src/_docs (42 entries of prose docs; site source).
   - Latest release 2026-07-06 (2.2.2); 142 commits in the last 12 months, 15 authors, 3 with 3 or more commits; jaredcwhite wrote 60%. Spinel: no, bridgetown-core/lib/bridgetown-core.rb:13 require f (computed) (loads every file under a computed path). Clone: `frameworks/bridgetownrb_bridgetown`.
9. **[yard](https://github.com/lsegal/yard)**: docs: parser -> handlers -> registry -> templates pipeline; parsing: Ruby/C handlers; rendering: templates
   - Score 4 of 5, missing README design. Docs: docs/ (Overview.md, Parser.md, Handlers.md, CodeObjects.md, Tags.md, TagsArch.md, Templates.md, GettingStarted.md, WhatsNew.md).
   - Latest release 2026-07-14 (0.9.45); 131 commits in the last 12 months, 11 authors, 5 with 3 or more commits; lsegal wrote 82%. Spinel: no, lib/yard.rb:66 require file (computed); handlers register by subclass and are loaded by path, templates are evaluated at runtime. Clone: `frameworks/lsegal_yard`.
10. **[padrino](https://github.com/padrino/padrino-framework)**: API design: Sinatra extension with mountable apps; plugin loading: reloader and mounter
   - Score 4 of 5, missing README design. Docs: padrinorb.com/guides.
   - Latest release 2026-10-15 (0.17.0); 120 commits in the last 12 months, 5 authors, 4 with 3 or more commits; nesquena wrote 73%. Spinel: no, padrino-core/lib/padrino-core/reloader/storage.rb:66 ObjectSpace.each_object; application/application_setup.rb:84 class_eval(&configuration) is block-only but ObjectSpace rules it out. Clone: `frameworks/padrino_padrino-framework`.
11. **[rails](https://github.com/rails/rails)**: plugin loading: Railtie/Engine/initializer graph; config: Rails::Application configuration; CLI: command classes
   - Score 4 of 5, missing README design. Docs: rails_rails/guides/source (82 prose guides), railties/RDOC_MAIN.md, RELEASING_RAILS.md.
   - Latest release 2026-09-24 (8.1.4); 500+ commits in the last 12 months, 64 authors, 22 with 3 or more commits; amatsuda wrote 19%. Spinel: no, railties/lib/rails/configuration.rb:174 method_missing; all.rb:19 require railtie (computed). Clone: `frameworks/rails_rails`.
12. **[pry](https://github.com/pry/pry)**: plugin loading: command sets and commands; API design: embeddable REPL; testing: mock input helpers in spec/helper.rb
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-10-20 (0.16.1); 40 commits in the last 12 months, 5 authors, 1 with 3 or more commits; andrehjr wrote 90%. Spinel: no, lib/pry/cli.rb:99 eval(opts[:context]); lib/pry/code.rb:335 method_missing; the REPL core is built on Binding. Clone: `frameworks/pry_pry`.

## clients

1. **[sequel](https://github.com/jeremyevans/sequel)**: API design (dataset DSL), plugin loading (plugins/ and extensions/), docs
   - Score 5 of 5. Docs: doc/ (33 rdoc guides, release_notes/), www/ site source.
   - Latest release 2026-10-01 (5.109.0); 208 commits in the last 12 months, 14 authors, 2 with 3 or more commits; jeremyevans wrote 91%. Spinel: no, lib/sequel/sql.rb:112 and :280 string class_eval/module_eval, model/plugins.rb:33 string class_eval. Clone: `clients/jeremyevans_sequel`.
2. **[pg](https://github.com/ged/ruby-pg)**: protocol (type casting, COPY, pipeline), concurrency (fiber scheduler, GVL wrappers)
   - Score 5 of 5. Docs: README-OS_X.rdoc and README-Windows.rdoc, the platform install guides; README.ja.md, a Japanese README; sample/, worked examples.
   - Latest release 2026-10-02 (1.7.0); 155 commits in the last 12 months, 8 authors, 5 with 3 or more commits; larskanis wrote 79%. Spinel: n/a, native. Clone: `clients/ged_ruby-pg`.
3. **[typhoeus](https://github.com/typhoeus/typhoeus)**: concurrency (Hydra parallel queue), API design (concern modules)
   - Score 5 of 5. Docs: UPGRADE.md, perf/; usage docs only in the long README.
   - Latest release 2026-03-10 (1.6.0); 8 commits in the last 12 months, 2 authors, 2 with 3 or more commits; felipedmesquita wrote 63%. Spinel: no, its runtime dependency ethon, read at cb1d7ea, calls define_method with a computed name at lib/ethon/curls/options.rb:208 and send(method, value) at lib/ethon/easy.rb:240, and depends on the ffi gem, a native extension. Clone: `clients/typhoeus_typhoeus`.
4. **[async-http](https://github.com/socketry/async-http)**: concurrency (Async fibers, connection pool), protocol (HTTP/1 and HTTP/2), testing
   - Score 4 of 5, missing README design. Docs: guides/ (4 prose guides), context/, releases.md.
   - Latest release 2026-09-15 (0.105.0); 66 commits in the last 12 months, 5 authors, 2 with 3 or more commits; ioquatix wrote 61%. Spinel: no, depends on async, whose scheduler rests on the io-event native extension. Clone: `clients/socketry_async-http`.
5. **[aws-sdk-core](https://github.com/aws/aws-sdk-ruby)**: plugin loading (seahorse plugins and handler stack), protocol (xml/json/query/rest serializers), API design
   - Score 4 of 5, missing README design. Docs: AWS SDK for Ruby developer guide.
   - Latest release 2026-10-19 (3.258.0); 350 commits in the last 12 months, 23 authors, 6 with 3 or more commits; aws-sdk-ruby-automation wrote 70%. Spinel: no, lib/seahorse/client/configuration.rb:222 method_missing, plugin_list.rb:135 require(@gem_name), plugins/operation_methods.rb:42 define_method with computed name. Clone: `clients/aws_aws-sdk-ruby`.
6. **[sqlite3](https://github.com/sparklemotion/sqlite3-ruby)**: docs (ADR practice, install guide), release (vendored sqlite packaging), testing
   - Score 4 of 5, missing README design. Docs: adr/2024-09-fork-safety.md, FAQ.md, INSTALLATION.md.
   - Latest release 2026-10-19 (2.10.1); 92 commits in the last 12 months, 11 authors, 2 with 3 or more commits; flavorjones wrote 83%. Spinel: n/a, native. Clone: `clients/sparklemotion_sqlite3-ruby`.
7. **[http](https://github.com/httprb/http)**: API design (chainable builder), plugin loading (features), protocol (timeouts, connection)
   - Score 4 of 5, missing README design. Docs: UPGRADING.md, CONTRIBUTING.md, sig/ (RBS); API docs hosted externally.
   - Latest release 2026-07-14 (6.0.4); 127 commits in the last 12 months, 8 authors, 2 with 3 or more commits; sferik wrote 92%. Spinel: no, lib/http/options.rb:157 binding, options.rb:105 define_method with computed name, features/logging.rb:33 define_method with interpolated name; also depends on native llhttp. Clone: `clients/httprb_http`.
8. **[httpx](https://github.com/HoneyryderChuck/httpx)**: plugin loading (lib/httpx/plugins, per-class XMethods modules), concurrency, protocol (HTTP/2, DNS resolvers)
   - Score 4 of 5, missing README design. Docs: doc/release_notes/, test/README.md, CHEATSHEET.md, sig/ (RBS); user docs live on wiki/site, not in repo.
   - Latest release 2026-10-14 (1.9.0); 500+ commits in the last 12 months, 12 authors, 1 with 3 or more commits; HoneyryderChuck wrote 97%. Spinel: no, lib/httpx/chainable.rb:59 method_missing, chainable.rb:9 and options.rb:406 string class_eval, extensions.rb:8 refine. Clone: `clients/HoneyryderChuck_httpx`.
9. **[sawyer](https://github.com/lostisland/sawyer)**: API design (hypermedia resources over Faraday)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: SPEC.md, example/.
   - Latest release 2025-10-23 (0.9.3); 5 commits in the last 12 months, 2 authors, 1 with 3 or more commits; iMacTia wrote 60%. Spinel: no, lib/sawyer/resource.rb:81 method_missing, resource.rb:108 define_method per attribute. Clone: `clients/lostisland_sawyer`.
10. **[faraday](https://github.com/lostisland/faraday)**: plugin loading (middleware stack and registries), API design (adapter abstraction)
   - Score 3 of 5, missing README design, CHANGELOG. Docs: docs/ (documentation-site source: getting-started, middleware, adapters, advanced, customization), UPGRADING.md.
   - Latest release 2026-10-16 (2.15.0); 68 commits in the last 12 months, 19 authors, 5 with 3 or more commits; iMacTia wrote 31%. Spinel: no, lib/faraday.rb:176 method_missing, lib/faraday.rb:150 and connection.rb:198 string class_eval. Clone: `clients/lostisland_faraday`.

## servers

1. **[falcon](https://github.com/socketry/falcon)**: concurrency: fiber-per-request server on async; config: environment/ service definitions; CLI: samovar-based command/
   - Score 5 of 5. Docs: guides/ (getting-started, how-it-works, deployment, cluster-deployment, performance-tuning, rails-integration, websockets, interim-responses).
   - Latest release 2026-08-09 (0.57.0); 52 commits in the last 12 months, 4 authors, 2 with 3 or more commits; ioquatix wrote 58%. Spinel: no, serve path loads config.ru via Protocol::Rack::Adapter.parse_file (lib/falcon/environment/serve.rb:65, rackup.rb:22) which evals the rackup file; also depends on bundler and on async-service/samovar (not verifiable here). Clone: `servers/socketry_falcon`.
2. **[concurrent-ruby](https://github.com/ruby-concurrency/concurrent-ruby)**: concurrency: executors, promises, atomics, memory-model docs; docs: executed doc sources; API design: shared interfaces over MRI/JRuby/Truffle
   - Score 5 of 5. Docs: docs-source/ (promises.in.md, thread_pools.md, synchronization.md, signpost.md, channel.md, dataflow.md), examples/.
   - Latest release 2026-07-19 (1.3.8); 33 commits in the last 12 months, 11 authors, 4 with 3 or more commits; eregon wrote 39%. Spinel: no, lib/concurrent-ruby/concurrent/async.rb:305,378 method_missing; mutable_struct.rb:226 and settable_struct.rb:121 define_method with member names; utility/native_extension_loader.rb:59 require path (repo also holds optional ext/ for the separate -ext gem). Clone: `servers/ruby-concurrency_concurrent-ruby`.
3. **[nio4r](https://github.com/socketry/nio4r)**: concurrency: selector/monitor I/O multiplexing primitives; API design: minimal portable API over three backends
   - Score 5 of 5. Docs: GitHub wiki.
   - Latest release 2025-10-31 (2.7.5); 4 commits in the last 12 months, 3 authors, 0 with 3 or more commits; ioquatix wrote 50%. Spinel: n/a, native. Clone: `servers/socketry_nio4r`.
4. **[async](https://github.com/socketry/async)**: concurrency: fiber scheduler, task tree, barrier/semaphore primitives; docs: guides; API design: Async do /task/
   - Score 4 of 5, missing README design. Docs: guides/ (getting-started, tasks, scheduler, best-practices, thread-safety, debugging), lib/async/*.md, examples/.
   - Latest release 2026-09-14 (2.46.0); 71 commits in the last 12 months, 6 authors, 3 with 3 or more commits; ioquatix wrote 73%. Spinel: no, the fiber scheduler rests on the io-event native extension. Clone: `servers/socketry_async`.
5. **[karafka](https://github.com/karafka/karafka)**: concurrency: listener/coordinator/worker pipeline per subscription group; config: routing DSL and contracts; plugin loading: Pro loader injecting into base classes
   - Score 4 of 5, missing README design. Docs: karafka.io/docs.
   - Latest release 2026-08-24 (2.6.1); 345 commits in the last 12 months, 2 authors, 1 with 3 or more commits; mensfeld wrote 100%. Spinel: no, lib/karafka/app.rb:100,130 string class_eval; execution_mode.rb:39 define_method with computed name; depends on native karafka-rdkafka. Clone: `servers/karafka_karafka`.
6. **[resque](https://github.com/resque/resque)**: plugin loading: hook naming conventions and Plugin.lint; concurrency: fork-per-job worker; docs: HOOKS.md
   - Score 4 of 5, missing craft. Docs: docs/ (HOOKS.md, PLUGINS.md, FAILURE_IDS.md).
   - Latest release 2026-10-16 (3.2.0); 69 commits in the last 12 months, 21 authors, 5 with 3 or more commits; PatrickTulskie wrote 42%. Spinel: no, lib/resque.rb:473 and job.rb:160 send(hook, ...) with computed hook names; data_store.rb:63 method_missing. Clone: `servers/resque_resque`.
7. **[solid_queue](https://github.com/rails/solid_queue)**: concurrency: supervisor/worker/dispatcher process model, thread and fiber pools; plugin loading: lifecycle hooks; config: configuration.rb
   - Score 4 of 5, missing CHANGELOG. Docs: UPGRADING.md only.
   - Latest release 2026-08-21 (1.7.0); 181 commits in the last 12 months, 44 authors, 8 with 3 or more commits; rosa wrote 45%. Spinel: no, core built on ActiveRecord models and Rails engine; no own constructs found in grep but dependency on Rails rules it out. Clone: `servers/rails_solid_queue`.
8. **[sidekiq](https://github.com/sidekiq/sidekiq)**: concurrency: thread-per-processor with capsules and heartbeat; plugin loading: middleware chains; docs: internals.md
   - Score 4 of 5, missing README design. Docs: docs/ (internals.md, middleware.md, capsule.md, menu.md, upgrade guides 3.0-8.0).
   - Latest release 2026-08-17 (8.1.7); 283 commits in the last 12 months, 41 authors, 6 with 3 or more commits; mperham wrote 63%. Spinel: no, lib/sidekiq/job.rb:120,127 define_method with computed name; web/action.rb:125 string class_eval; redis_client_adapter.rb:45 method_missing. Clone: `servers/sidekiq_sidekiq`.
9. **[pitchfork](https://github.com/Shopify/pitchfork)**: concurrency: prefork monitor, reaping, refork templates (mold); docs: design/philosophy write-ups; config: configurator.rb
   - Score 4 of 5, missing craft. Docs: docs/ (DESIGN, PHILOSOPHY, FORK_SAFETY, REFORKING, SIGNALS, TUNING, CONFIGURATION, MIGRATING_FROM_UNICORN, Application_Timeouts).
   - Latest release 2026-01-28 (0.18.2); 73 commits in the last 12 months, 7 authors, 4 with 3 or more commits; byroot wrote 44%. Spinel: n/a, native. Clone: `servers/Shopify_pitchfork`.
10. **[puma](https://github.com/puma/puma)**: concurrency: thread pool + reactor + cluster/fork_worker supervision; config: DSL in dsl.rb; protocol: HTTP/1.1 parsing and TLS (minissl)
   - Score 4 of 5, missing craft. Docs: docs/ (architecture.md, deployment.md, signals.md, restart.md, fork_worker.md, plugins.md, stats.md, systemd.md, kubernetes.md, nginx.md, 5.0-8.0 upgrade guides).
   - Latest release 2026-05-26 (8.0.2); 150 commits in the last 12 months, 41 authors, 6 with 3 or more commits; nateberkopec wrote 30%. Spinel: n/a, native. Clone: `servers/puma_puma`.
11. **[good_job](https://github.com/bensheldon/good_job)**: concurrency: Postgres advisory locks, LISTEN/NOTIFY notifier, thread scheduler; API design: ActiveJob adapter and extensions
   - Score 4 of 5, missing README design. Docs: API documentation in the source, with doc comments on 68% of its 300 public methods.
   - Latest release 2026-10-13 (4.22.1); 163 commits in the last 12 months, 38 authors, 6 with 3 or more commits; bensheldon wrote 62%. Spinel: no, core is built on ActiveRecord/ActiveJob/Rails engine; own code uses string class_eval (log_subscriber.rb:365) and send with passed-in method name (good_job.rb:284). Clone: `servers/bensheldon_good_job`.
12. **[shoryuken](https://github.com/ruby-shoryuken/shoryuken)**: concurrency: thread-based SQS polling with manager/fetcher; API design: server middleware chain
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-09-23 (7.0.4); 82 commits in the last 12 months, 4 authors, 1 with 3 or more commits; mensfeld wrote 95%. Spinel: no, lib/shoryuken/worker.rb:295,304,318 define_method with computed name; runner.rb:94 ObjectSpace.each_object; depends on aws-sdk-sqs and thor. Clone: `servers/ruby-shoryuken_shoryuken`.
13. **[listen](https://github.com/guard/listen)**: concurrency: event queue, FSM-driven listener lifecycle; testing: adapter specs with fakes; API design: adapter selection
   - Score 4 of 5, missing CHANGELOG. Docs: GitHub wiki.
   - Latest release 2026-10-01 (3.10.1); 25 commits in the last 12 months, 4 authors, 3 with 3 or more commits; rymai wrote 60%. Spinel: no, lib/listen/options.rb:19 method_missing; depends on rb-inotify and rb-fsevent (FFI). Clone: `servers/guard_listen`.

## miscellaneous

1. **[mustermann](https://github.com/sinatra/mustermann)**: parsing: pattern string to AST to Regexp pipeline; API design: pattern types, composition, expand and peek
   - Score 5 of 5. Docs: docs/ (patterns/*.md per pattern type, custom-patterns.md, performance.md).
   - Latest release 2026-10-10 (4.0.1); 127 commits in the last 12 months, 4 authors, 2 with 3 or more commits; rkh wrote 94%. Spinel: no, lib/mustermann.rb:93 try_require with an interpolated path. Clone: `miscellaneous/sinatra_mustermann`.
2. **[dry-types](https://github.com/dry-rb/dry-types)**: API design: composable type objects (/ & constrained, default, schema); parsing/coercion pipelines (call_safe vs call_unsafe)
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-types.
   - Latest release 2026-02-06 (1.9.1); 18 commits in the last 12 months, 4 authors, 2 with 3 or more commits; timriley wrote 67%. Spinel: no, lib/dry/types/constructor.rb:176 method_missing; lib/dry/types/constructor/function.rb:63 string module_eval. Clone: `miscellaneous/dry-rb_dry-types`.
3. **[dry-monads](https://github.com/dry-rb/dry-monads)**: API design: monad/functor interfaces and do-notation; concurrency: Task monad over concurrent-ruby
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-monads.
   - Latest release 2026-09-11 (1.11.0); 25 commits in the last 12 months, 5 authors, 2 with 3 or more commits; timriley wrote 60%. Spinel: no, lib/dry/monads/do.rb:126 string module_eval; lib/dry/monads/maybe.rb:184 method_missing. Clone: `miscellaneous/dry-rb_dry-monads`.
4. **[dry-struct](https://github.com/dry-rb/dry-struct)**: API design: attribute DSL over dry-types schemas; class-level interface split (ClassInterface)
   - Score 4 of 5, missing README design. Docs: hanakai.org/learn/dry/dry-struct.
   - Latest release 2026-03-03 (1.8.1); 11 commits in the last 12 months, 2 authors, 1 with 3 or more commits; timriley wrote 82%. Spinel: no, lib/dry/struct/class_interface.rb:455 string class_eval; runtime dependency dry-types is itself no. Clone: `miscellaneous/dry-rb_dry-struct`.
5. **[activesupport](https://github.com/rails/rails)**: API design: Concern, callbacks, notifications, core_ext layout; config: lazy_load_hooks and ordered options
   - Score 4 of 5, missing README design. Docs: rails_rails/guides/source/active_support_core_extensions.md, active_support_instrumentation.md, api_documentation_guidelines.md; extensive RDoc in source.
   - Latest release 2026-09-24 (8.1.4); 500+ commits in the last 12 months, 64 authors, 22 with 3 or more commits; amatsuda wrote 19%. Spinel: no, lib/active_support/time_with_zone.rb:601 method_missing; time_with_zone.rb:493 string class_eval. Clone: `frameworks/rails_rails`, shared with the rails pick, since one repository is cloned once.
6. **[webmock](https://github.com/bblimke/webmock)**: testing: stub and expectation API; protocol: swapping HTTP client adapters behind one registry
   - Score 4 of 5, missing README design. Docs: GitHub wiki.
   - Latest release 2026-10-14 (3.34.0); 125 commits in the last 12 months, 18 authors, 3 with 3 or more commits; bblimke wrote 58%. Spinel: no, lib/webmock/webmock.rb:188 string class_eval; lib/webmock/util/query_mapper.rb:90 __send__ with computed name. Clone: `miscellaneous/bblimke_webmock`.
7. **[vcr](https://github.com/vcr/vcr)**: testing: cassette record/replay design; plugin loading: library_hooks and hook registry; config
   - Score 4 of 5, missing README design. Docs: docs/ (docsify site: cassettes, configuration, hooks, record_modes, request_matching) and features/.
   - Latest release 2025-12-22 (6.4.0); 11 commits in the last 12 months, 7 authors, 1 with 3 or more commits; fkmy wrote 27%. Spinel: no, lib/vcr.rb:257 eval('self', block.binding); lib/vcr/util/hooks.rb:55 define_method with computed name. Clone: `miscellaneous/vcr_vcr`.
8. **[factory_bot](https://github.com/thoughtbot/factory_bot)**: API design: Ruby DSL with instance_eval and evaluator; testing: fixtures/factories and strategy objects
   - Score 4 of 5, missing README design. Docs: docs/src (mdbook: defining, traits, sequences, callbacks, cookbook, ref) and GETTING_STARTED.md.
   - Latest release 2026-05-04 (6.6.0); 31 commits in the last 12 months, 16 authors, 1 with 3 or more commits; neilvcarvalho wrote 45%. Spinel: no, lib/factory_bot/definition_proxy.rb:91 method_missing; lib/factory_bot/evaluator.rb method_missing; depends on activesupport. Clone: `miscellaneous/thoughtbot_factory_bot`.
9. **[mutant](https://github.com/mbj/mutant)**: testing: mutation testing engine; parsing: AST node mutators; CLI/concurrency: parallel runner and isolation
   - Score 4 of 5, missing README design. Docs: docs/ (nomenclature.md, configuration.md, hooks.md, concurrency.md, limitations.md, reading-reports.md, ast-pattern.md, mutant-rspec.md).
   - Latest release 2026-10-21 (0.17.1); 312 commits in the last 12 months, 8 authors, 4 with 3 or more commits; mbj wrote 62%. Spinel: no, ruby/lib/mutant/zombifier.rb:77 kernel.eval; ruby/lib/mutant/hooks.rb:65 binding.eval; also require_highjack.rb overrides require. Clone: `miscellaneous/mbj_mutant`.
10. **[simplecov](https://github.com/simplecov-ruby/simplecov)**: testing: coverage collection, merging and reporting; config: configuration DSL and profiles; CLI
   - Score 4 of 5, missing README design. Docs: docs/ (Configuration.md, CLI.md, Formatters.md, Parallelism.md, Production.md, Troubleshooting.md, Roadmap.md) and man/simplecov.1.
   - Latest release 2026-09-30 (1.3.2); 473 commits in the last 12 months, 11 authors, 3 with 3 or more commits; sferik wrote 96%. Spinel: no, lib/simplecov/profiles.rb:32 require with interpolated name; depends on prism. Clone: `miscellaneous/simplecov-ruby_simplecov`.
11. **[timecop](https://github.com/travisjeffery/timecop)**: testing: clock mocking via a time stack and monkeypatching Time/Date
   - Score 4 of 5, missing craft. Docs: GitHub wiki.
   - Latest release 2026-04-12 (0.9.11); 6 commits in the last 12 months, 6 authors, 0 with 3 or more commits; NikolasPilavakis wrote 17%. Spinel: no, lib/timecop/time_extensions.rb:11 captures Time.now with alias_method and :17 rebinds :now to a method that calls the captured alias, which Spinel's limitations list as refused. Clone: `miscellaneous/travisjeffery_timecop`.
12. **[rdoc](https://github.com/ruby/rdoc)**: parsing: Ruby/C/Markdown source into code objects; rendering: markup formatters and generators; docs: markup reference
   - Score 3 of 5, missing README design, CHANGELOG. Docs: doc/markup_reference/{rdoc.rdoc,markdown.md}, doc/configuration.md, man/ri.1.
   - Latest release 2026-09-28 (8.1.0); 226 commits in the last 12 months, 23 authors, 10 with 3 or more commits; st0012 wrote 48%. Spinel: no, lib/rdoc/generator/darkfish.rb:297 binding for ERB templates; core depends on erb and prism. Clone: `miscellaneous/ruby_rdoc`.

## Also in the reference tree

Cloned for [#2](https://github.com/izkreny/markdownifico/issues/2) rather than picked, so they went through none of the steps above:

- **[roundhouse](https://github.com/rubys/roundhouse)**: the largest program compiled with Spinel, read for how it rewrites libraries that do not compile as they are. Clone: `compilers/rubys_roundhouse`.
- **[spinel](https://github.com/matz/spinel)**: the ahead-of-time compiler #2 tries, read for the subset it accepts, its FFI and its package format. Clone: `compilers/matz_spinel`.

## Rejected

Every candidate not picked, with the first criterion it failed, so a later pass need not evaluate it again. The sources are the ones in step 1.

### parsers

- **[redcarpet](https://github.com/vmg/redcarpet)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-02-25).
- **[ox](https://github.com/ohler55/ox)** (catalog, awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **[rexml](https://github.com/ruby/rexml)** (catalog): no release since 2025-10-21 (last release 2025-09-10).
- **[oj](https://github.com/ohler55/oj)** (catalog): scored 2 of 5 (missing README design, lib/ layout, craft).
- **[parslet](https://github.com/kschiess/parslet)** (agent): no release since 2025-10-21 (last release 2020-02-16).
- **[racc](https://github.com/ruby/racc)** (agent): no release since 2025-10-21 (last release 2024-07-30).
- **[citrus](https://github.com/mjijackson/citrus)** (agent): no release since 2025-10-21 (last release 2015-02-19).

### renderers

- **[erubi](https://github.com/jeremyevans/erubi)** (catalog): no release since 2025-10-21 (last release 2024-12-19).
- **[tilt](https://github.com/jeremyevans/tilt)** (catalog, awesome-ruby): no documentation beyond the README: its generated API pages carry doc comments on 28% of its 102 public methods, under the 50% the condition asks (scored 4).
- **[coderay](https://github.com/rubychan/coderay)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2020-05-30).
- **[syntax_tree](https://github.com/kddnewton/syntax_tree)** (agent): no release since 2025-10-21 (last release 2025-07-17).
- **[rufo](https://github.com/ruby-formatter/rufo)** (agent): scored 2 of 5 (missing README design, lib/ layout, craft).
- **[blueprinter](https://github.com/procore-oss/blueprinter)** (catalog): no documentation beyond the README: its generated API pages carry doc comments on 43% of its 60 public methods, under the 50% the condition asks (scored 4).
- **[terminal-table](https://github.com/tj/terminal-table)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-01-27).
- **[tty-markdown](https://github.com/piotrmurach/tty-markdown)** (catalog): no release since 2025-10-21 (last release 2023-03-12).
- **[prawn](https://github.com/prawnpdf/prawn)** (agent): no release since 2025-10-21 (last release 2024-03-05).

### linters

- **[flay](https://github.com/seattlerb/flay)** (catalog, awesome-ruby): no CI configuration in the repository.
- **[flog](https://github.com/seattlerb/flog)** (catalog, awesome-ruby): no CI configuration in the repository.
- **[brakeman](https://github.com/presidentbeef/brakeman)** (awesome-ruby): cut to keep the picks at 100: it scored 3, the lowest among the picks, in linters, which then held 14 picks, the most of any folder with a gem at that score; Rails-only security checks, while mdl stays as the one Markdown linter in the pool.
- **[fasterer](https://github.com/damirsvrtan/fasterer)** (awesome-ruby): no release since 2025-10-21 (last release 2023-11-20).
- **[rails_best_practices](https://github.com/flyerhzm/rails_best_practices)** (catalog, awesome-ruby): cut to keep the picks at 100: it scored 3, the lowest among the picks, in linters, which then held 15 picks, the most of any folder with a gem at that score; Rails-only rules over the same kind of AST walk rubocop covers.
- **[erb_lint](https://github.com/shopify/erb-lint)** (agent): no release since 2025-10-21 (last release 2025-01-20).
- **[debride](https://github.com/seattlerb/debride)** (agent): no CI configuration in the repository.

### cli

- **[thor](https://github.com/rails/thor)** (catalog, awesome-ruby): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **[optparse](https://github.com/ruby/optparse)** (catalog): scored 1 of 5 (missing README design, CHANGELOG, lib/ layout, craft).
- **[gli](https://github.com/davetron5000/gli)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-01-27).
- **[slop](https://github.com/leejarvis/slop)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2023-02-26).
- **[optimist](https://github.com/manageiq/optimist)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-03-19).
- **[cri](https://github.com/ddfreyne/cri)** (catalog): no release since 2025-10-21 (last release 2024-06-09).
- **[tty-option](https://github.com/piotrmurach/tty-option)** (catalog): no release since 2025-10-21 (last release 2023-05-29).
- **[command_kit](https://github.com/postmodern/command_kit.rb)** (catalog): no release since 2025-10-21 (last release 2024-06-20).
- **[tty-prompt](https://github.com/piotrmurach/tty-prompt)** (catalog): no release since 2025-10-21 (last release 2021-04-17).
- **[tty-table](https://github.com/piotrmurach/tty-table)** (catalog): no release since 2025-10-21 (last release 2020-09-20).
- **[pastel](https://github.com/piotrmurach/pastel)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2020-07-04).
- **[rainbow](https://github.com/sickill/rainbow)** (catalog, dependency): no release since 2025-10-21 (last release 2022-01-11).
- **[highline](https://github.com/jeg2/highline)** (catalog): no release since 2025-10-21 (last release 2025-01-06).
- **[mercenary](https://github.com/jekyll/mercenary)** (dependency): no release since 2025-10-21 (last release 2020-01-18).
- **[tabulo](https://github.com/matt-harvey/tabulo)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-01-19).
- **[cmdparse](https://github.com/gettalong/cmdparse)** (catalog): no release since 2025-10-21 (last release 2020-12-08).
- **[mixlib-cli](https://github.com/chef/mixlib-cli)** (catalog): no release since 2025-10-21 (last release 2020-08-21).
- **[optparse-plus](https://github.com/davetron5000/optparse-plus)** (catalog): no release since 2025-10-21 (last release 2021-02-14).
- **[docopt](https://github.com/docopt/docopt.rb)** (catalog): no release since 2025-10-21 (last release 2018-01-21).
- **[getoptions](https://rubygems.org/gems/getoptions)** (catalog): no release since 2025-10-21 (last release 2009-07-25).
- **[reline](https://github.com/ruby/reline)** (agent): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **[io-console](https://github.com/ruby/io-console)** (agent): scored 0 of 5 (missing README design, CHANGELOG, lib/ layout, tests, craft).
- **[amazing_print](https://github.com/amazing-print/amazing_print)** (agent): no documentation beyond the README: its generated API pages carry doc comments on 37% of its 89 public methods, under the 50% the condition asks (scored 4).
- **[unicode-display_width](https://github.com/janlelis/unicode-display_width)** (dependency): no documentation beyond the README: its generated API pages carry doc comments on 46% of its 13 public methods, under the 50% the condition asks (scored 5).
- **[colorize](https://github.com/fazibear/colorize)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2023-06-23).
- **[paint](https://github.com/janlelis/paint)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2022-07-05).
- **[ruby-progressbar](https://github.com/jfelchner/ruby-progressbar)** (awesome-ruby): no release since 2025-10-21 (last release 2023-03-04).
- **[tty-spinner](https://github.com/piotrmurach/tty-spinner)** (catalog): no release since 2025-10-21 (last release 2020-01-28).
- **[tty-progressbar](https://github.com/piotrmurach/tty-progressbar)** (catalog): no release since 2025-10-21 (last release 2024-11-10).
- **[tty-screen](https://github.com/piotrmurach/tty-screen)** (catalog): no release since 2025-10-21 (last release 2023-12-17).
- **[formatador](https://github.com/geemus/formatador)** (awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **[whirly](https://github.com/janlelis/whirly)** (awesome-ruby): scored 2 of 5 (missing README design, tests, craft).

### config

- **[config](https://github.com/rubyconfig/config)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-07-11).
- **[figaro](https://github.com/laserlemon/figaro)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-06-25).
- **[configatron](https://github.com/markbates/configatron)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2017-03-08).
- **[global](https://github.com/railsware/global)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-12-04).
- **[envied](https://github.com/javierjulio/envied)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-06-06).
- **[settingslogic](https://github.com/binarylogic/settingslogic)** (catalog): no release since 2025-10-21 (last release 2012-12-30).
- **[tty-config](https://github.com/piotrmurach/tty-config)** (catalog): no release since 2025-10-21 (last release 2022-06-18).
- **[mixlib-config](https://github.com/chef/mixlib-config)** (agent): no release since 2025-10-21 (last release 2022-06-08).
- **[dry-validation](https://github.com/dry-rb/dry-validation)** (agent): no release since 2025-10-21 (last release 2025-01-21).
- **[econfig](https://github.com/elabs/econfig)** (awesome-ruby): no release since 2025-10-21 (last release 2018-10-17).
- **[configus](https://github.com/kaize/configus)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2014-01-17).
- **[envyable](https://github.com/philnash/envyable)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2016-11-08).
- **[json_schemer](https://github.com/davishmcclurg/json_schemer)** (agent): no documentation beyond the README: its generated API pages carry doc comments on 0% of its 254 public methods, under the 50% the condition asks (scored 4).
- **[json-schema](https://github.com/voxpupuli/json-schema)** (agent): no documentation beyond the README: its generated API pages carry doc comments on 18% of its 171 public methods, under the 50% the condition asks (scored 3).
- **[sail](https://github.com/vinistock/sail)** (awesome-ruby): no release since 2025-10-21 (last release 2022-02-24).
- **[ledermann-rails-settings](https://github.com/ledermann/rails-settings)** (catalog): no release since 2025-10-21 (last release 2024-05-30).
- **[climate_control](https://github.com/thoughtbot/climate_control)** (agent): no release since 2025-10-21 (last release 2022-07-15).
- **[figjam](https://github.com/hlascelles/figjam)** (agent): no documentation beyond the README: its generated API pages carry doc comments on 0% of its 19 public methods, under the 50% the condition asks (scored 3).
- **[configurations](https://github.com/beatrichartz/configurations)** (catalog): no release since 2025-10-21 (last release 2016-11-12).

### frameworks

- **[sinatra](https://github.com/sinatra/sinatra)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-10-10).
- **[rspec-core](https://github.com/rspec/rspec)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-10-19).
- **[jekyll](https://github.com/jekyll/jekyll)** (agent): no release since 2025-10-21 (last release 2025-01-29).
- **[guard](https://github.com/guard/guard)** (awesome-ruby): cut to keep the picks at 100: it scored 3, the lowest among the picks, in frameworks, which then held 13 picks, the most of any folder with a gem at that score; its plugin host is covered by rake, yard and bridgetown.
- **[trailblazer](https://github.com/trailblazer/trailblazer)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2023-06-15).
- **[cuba](https://github.com/soveran/cuba)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-01-24).
- **[interactor](https://github.com/collectiveidea/interactor)** (awesome-ruby): no release since 2025-10-21 (last release 2025-07-10).
- **[wisper](https://github.com/krisleech/wisper)** (awesome-ruby): no release since 2025-10-21 (last release 2024-05-23).

### clients

- **[excon](https://github.com/excon/excon)** (catalog, awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **[net-http](https://github.com/ruby/net-http)** (agent): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **[httparty](https://github.com/jnunemaker/httparty)** (catalog, awesome-ruby): scored 2 of 5 (missing README design, CHANGELOG, craft).
- **[rest-client](https://github.com/rest-client/rest-client)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2019-08-21).
- **[octokit](https://github.com/octokit/octokit.rb)** (awesome-ruby): no release since 2025-10-21 (last release 2025-04-24).
- **[redis-client](https://github.com/redis-rb/redis-client)** (agent): no documentation beyond the README: its generated API pages carry doc comments on 1% of its 181 public methods, under the 50% the condition asks (scored 5).
- **[mysql2](https://github.com/brianmario/mysql2)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-09-22).
- **[trilogy](https://github.com/trilogy-libraries/trilogy)** (catalog, awesome-ruby): no documentation beyond the README: its generated API pages carry doc comments on 0% of its 13 public methods, under the 50% the condition asks (scored 3).
- **[stripe](https://github.com/stripe/stripe-ruby)** (agent): scored 2 of 5 (missing README design, lib/ layout, craft).
- **[anthropic](https://github.com/anthropics/anthropic-sdk-ruby)** (agent): scored 2 of 5 (missing README design, lib/ layout, craft).

### servers

- **[unicorn](https://rubygems.org/gems/unicorn)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2021-12-25).
- **[iodine](https://github.com/boazsegev/iodine)** (catalog, awesome-ruby): cut to keep the picks at 100: it scored 3, the lowest among the picks, in servers, which then held 15 picks, the most of any folder with a gem at that score; a C server whose Ruby side is a thin binding, while puma and falcon carry the server design in Ruby.
- **[agoo](https://github.com/ohler55/agoo)** (catalog, awesome-ruby): scored 2 of 5 (missing README design, tests, craft).
- **[webrick](https://github.com/ruby/webrick)** (catalog): cut to keep the picks at 100: it scored 3, the lowest among the picks, in servers, which then held 14 picks, the most of any folder with a gem at that score; the folder's last score-3 gem, and puma, falcon and pitchfork already cover the server design.
- **[que](https://github.com/que-rb/que)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-10-28).
- **[sucker_punch](https://github.com/brandonhilkert/sucker_punch)** (catalog, awesome-ruby): no documentation beyond the README: its generated API pages carry doc comments on 0% of its 50 public methods, under the 50% the condition asks (scored 5).
- **[foreman](https://github.com/ddollar/foreman)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2025-07-27).

### miscellaneous

- **[literal](https://github.com/joeldrapper/literal)** (awesome-ruby): cut to keep the picks at 100: it scored 3, the lowest among the picks, in miscellaneous, which then held 14 picks, the most of any folder with a gem at that score; its type DSL is covered by dry-types and dry-struct, both picked.
- **[hashie](https://github.com/hashie/hashie)** (catalog, awesome-ruby): cut to keep the picks at 100: it scored 3, the lowest among the picks, in miscellaneous, which then held 16 picks, the most of any folder with a gem at that score; read only for its hash mixins, the narrowest reading reason among the folder's score-3 gems.
- **[addressable](https://github.com/sporkmonger/addressable)** (awesome-ruby, dependency): cut to keep the picks at 100: it scored 3, the lowest among the picks, in miscellaneous, which then held 13 picks, the most of any folder with a gem at that score; its URI parser is a narrower parsing reason than rdoc's Markdown parser, which stays.
- **[docile](https://github.com/ms-ati/docile)** (catalog, awesome-ruby): no release since 2025-10-21 (last release 2024-07-25).
- **[memo_wise](https://github.com/panorama-ed/memo_wise)** (awesome-ruby): no release since 2025-10-21 (last release 2025-05-14).
- **[tzinfo](https://github.com/tzinfo/tzinfo)** (agent): no release since 2025-10-21 (last release 2023-01-28).
- **[benchmark-ips](https://github.com/evanphx/benchmark-ips)** (agent): cut to keep the picks at 100: it scored 3, the lowest among the picks, in miscellaneous, which then held 15 picks, the most of any folder with a gem at that score; read for a small benchmark DSL, a narrower reason than rdoc's Markdown parser.
- **[diffy](https://github.com/samg/diffy)** (awesome-ruby): no release since 2025-10-21 (last release 2025-06-09).
