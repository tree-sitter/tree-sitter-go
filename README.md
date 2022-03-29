tree-sitter-go
===========================

[![Build/test](https://github.com/tree-sitter/tree-sitter-go/actions/workflows/ci.yml/badge.svg)](https://github.com/tree-sitter/tree-sitter-go/actions/workflows/ci.yml)

A [tree-sitter][] grammar for [Go](https://go.dev/ref/spec).

Run `tree-sitter generate` to create a new parser after editing
`grammar.js`. This step will report any ambiguities.

Run `npm test` to test your changes to the grammar or tests.

The `corpus/*.txt` files contain input/output pairs, where the input
is Go source and the output is the expected parse tree in S-expression
form.  Run `tree-sitter test --update` to update the expectations to
match the current behavior.

The `examples/` tree contains valid Go source files that are expected
to parse without error.

[tree-sitter]: https://github.com/tree-sitter/tree-sitter
